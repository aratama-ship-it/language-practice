# Mac mini: ~/.venvs/web-patrol/bin/python tests/progress-browser.py
# Serve repository on 127.0.0.1:8766 first. Uses isolated browser contexts only.
from playwright.sync_api import sync_playwright
from pathlib import Path
import json,time,statistics
out=Path('/Users/arata/git-repos/_scratch/eifutsu-home-progress')
out.mkdir(parents=True,exist_ok=True)
fixture='''(runs) => {
  function rng(seed) { return function(){ seed|=0; seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296; }; }
  const r=rng(7), now=Date.now();
  BANK.ids().forEach(id => {
    const bank=BANK._questionsOf(BANK.subjects[id]), sessions=[];
    for(let i=0;i<runs;i++) {
      const date=new Date(now-(runs-i-1)*4*3600000-60000).toISOString();
      const answers=Array.from({length:30},(_,j)=>{const q=bank[Math.floor(r()*bank.length)],correct=r()<(.5+(i/runs)*.3);return {qid:q.id,chosen:correct?q.answer:(q.answer+1)%4,correct,timeSec:i<runs/4?undefined:Math.round(15+r()*35)};});
      sessions.push({id:date,date,mode:'vol-time',volId:1,timeLimitSec:1200,timeUsedSec:1000,answers});
    }
    localStorage.setItem(BANK.subjects[id].storageKey,JSON.stringify({version:1,subject:id,sessions}));
    ['dictation','listening'].forEach(skill=>localStorage.setItem(id+'-'+skill+'-data',JSON.stringify({version:1,subject:id,results:Array.from({length:runs?3:0},(_,i)=>({id:''+i,date:new Date(now-i*86400000).toISOString(),correct:10+i,total:20,rate:(10+i)/20}))})));
  });
  App.goHome();
}'''
report={'states':[],'performance':{},'errors':[]}
start=time.time()
with sync_playwright() as p:
 for name in ['chromium','webkit']:
  browser=getattr(p,name).launch()
  for width in [390,900]:
   context=browser.new_context(viewport={'width':width,'height':1000},timezone_id='Asia/Tokyo',service_workers='block')
   page=context.new_page()
   errors=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
   page.goto('http://127.0.0.1:8766/')
   for runs in [0,2,60]:
    page.evaluate(fixture,runs)
    for id,label in [('toeic','TOEIC'),('french','フランス語'),('chinese','中国語')]:
     page.get_by_role('button',name=label,exact=True).click()
     assert page.locator('#screen-home .prog').count()==1
     assert page.locator('#screen-home .chart svg').count()==(1 if runs>=3 else 0)
     assert page.evaluate('document.documentElement.scrollWidth===document.documentElement.clientWidth'),(name,width,runs,id,'home overflow')
     page.screenshot(path=str(out/f'{name}-{width}-{runs}-{id}-home.png'),full_page=True)
     page.get_by_role('button',name='くわしく ›').click()
     assert page.locator('#screen-analysis').is_visible()
     assert page.evaluate('document.documentElement.scrollWidth===document.documentElement.clientWidth'),(name,width,runs,id,'analysis overflow')
     page.screenshot(path=str(out/f'{name}-{width}-{runs}-{id}-analysis.png'),full_page=True)
     page.get_by_role('button',name='ホームへ',exact=True).click()
     if runs>=3:
      page.locator('#screen-home .prog-weak-go').first.click()
      assert page.evaluate('App.session.mode')=='review-category'
      assert page.evaluate('App.session.order.length === Math.min(10, BANK.allQuestions().filter(q=>q.category===App.session.category).length)')
      page.evaluate('clearInterval(App.timerId); App.goHome()')
      page.get_by_role('button',name='解き直す',exact=True).click()
      assert page.evaluate('App.session.mode')=='review-wrong'
      assert page.evaluate('App.session.order.length')==10
      page.evaluate('clearInterval(App.timerId); App.goHome()')
     report['states'].append([name,width,runs,id,'pass'])
   # Pointer tooltip and resizing actual chart.
   chart=page.locator('#screen-home .chart svg'); rect=chart.bounding_box()
   page.mouse.move(rect['x']+rect['width']-40,rect['y']+40)
   assert page.locator('#screen-home .tip').is_visible()
   old=chart.get_attribute('viewBox')
   page.set_viewport_size({'width':900 if width==390 else 390,'height':1000})
   page.wait_for_timeout(100)
   assert chart.get_attribute('viewBox')!=old
   if width==390:
    page.evaluate(fixture,500)
    values=page.evaluate('''() => Array.from({length:5},()=>{const old=document.querySelector('#screen-home .prog');const t=performance.now();const card=ProgressUI.buildHomeBlock(BANK.activeId);old.replaceWith(card);ProgressUI.draw(card);card.getBoundingClientRect();return performance.now()-t;})''')
    report['performance'][name]={'ms':values,'median':statistics.median(values)}
   report['errors']+=errors
   context.close()
  browser.close()
report['seconds']=round(time.time()-start,2)
(out/'browser-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False))
assert not report['errors']
assert all(v['median']<50 for v in report['performance'].values())
