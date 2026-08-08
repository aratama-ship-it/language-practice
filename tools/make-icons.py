#!/usr/bin/env python3
"""英仏練習アプリのPWAアイコンを生成する。

依存は Pillow のみ（SVGラスタライザを入れずに済ませるため、図形を直接描く）。

    python3 tools/make-icons.py

出力先: icons/
  icon-192.png / icon-512.png      … manifest 用（全面塗り）
  icon-maskable-512.png            … Android maskable 用（安全域80%内に収める）
  apple-touch-icon.png (180)       … iOS ホーム画面用
  favicon-32.png                   … ブラウザタブ用

デザインの意図:
  左＝不規則な縦バー（耳で聴いた音）、右＝整った短いブロック（書き取られた語）、
  下＝罫線。ディクテーションという中心機能を1枚で表す。
"""

from PIL import Image, ImageDraw
import os

BG = (16, 31, 56)          # 深い紺
CREAM = (244, 236, 224)    # 音の波形
AMBER = (232, 163, 61)     # 書き取られた語
RULE = (244, 236, 224, 90) # 罫線（半透明）

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "icons")


def rounded_bar(draw, cx, bottom, height, width, color):
    """(cx, bottom) を下端中央として、角丸の縦バーを描く。"""
    r = width / 2
    left, right = cx - r, cx + r
    top = bottom - height
    draw.rounded_rectangle([left, top, right, bottom], radius=r, fill=color)


def draw_icon(size, content_scale=1.0):
    """アイコンを描く。content_scale<1 で中身を縮め、maskable の安全域に収める。"""
    ss = 4  # スーパーサンプリング倍率（縁を滑らかにする）
    S = size * ss
    img = Image.new("RGBA", (S, S), BG + (255,))
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    # 1024基準で設計し、最後に size へ縮小する
    u = S / 1024.0 * content_scale
    cx0 = S / 2.0
    cy0 = S / 2.0

    def X(x):  # 1024基準座標 → 実座標（中心基準でスケール）
        return cx0 + (x - 512) * u

    def Y(y):
        return cy0 + (y - 512) * u

    # --- 構成（1024基準）。幅を合算してから中央寄せする ---
    wave_heights = [300, 440, 230, 380]   # 左：不規則＝耳で聴いた音
    wave_w, wave_gap = 58.0, 38.0
    word_widths = [120, 80, 150]          # 右：整然＝書き取られた語
    word_h, word_gap, word_r = 80.0, 34.0, 22.0
    mid_gap = 60.0                        # 音と語の境目

    wave_span = len(wave_heights) * wave_w + (len(wave_heights) - 1) * wave_gap
    word_span = sum(word_widths) + (len(word_widths) - 1) * word_gap
    total = wave_span + mid_gap + word_span
    x0 = 512 - total / 2

    # 縦位置：中身の重心が中央へ来るよう罫線の高さを決める
    baseline = 512 + max(wave_heights) / 2

    # 罫線（書き取る行）— 中身より少しだけ外へ伸ばす
    rule_h = 16 * u
    top_of_rule = Y(baseline) - rule_h / 2
    d.rounded_rectangle(
        [X(x0 - 34), Y(baseline) - rule_h / 2, X(x0 + total + 34), Y(baseline) + rule_h / 2],
        radius=rule_h / 2,
        fill=RULE,
    )

    # 左：音の波形
    for i, h in enumerate(wave_heights):
        cx = X(x0 + i * (wave_w + wave_gap) + wave_w / 2)
        rounded_bar(d, cx, top_of_rule, h * u, wave_w * u, CREAM + (255,))

    # 右：書き取られた語
    x = x0 + wave_span + mid_gap
    for w in word_widths:
        d.rounded_rectangle(
            [X(x), top_of_rule - word_h * u, X(x + w), top_of_rule],
            radius=word_r * u,
            fill=AMBER + (255,),
        )
        x += w + word_gap

    img = Image.alpha_composite(img, layer)
    return img.resize((size, size), Image.LANCZOS).convert("RGB")


def main():
    os.makedirs(OUT, exist_ok=True)
    # FULL=全面塗り用の余白込み倍率、MASK=Android maskable の安全域（中央80%円）に収める倍率
    FULL, MASK = 0.82, 0.68
    targets = [
        ("icon-192.png", 192, FULL),
        ("icon-512.png", 512, FULL),
        ("icon-maskable-512.png", 512, MASK),
        ("apple-touch-icon.png", 180, FULL),
        ("favicon-32.png", 32, FULL),
    ]
    for name, size, scale in targets:
        img = draw_icon(size, scale)
        path = os.path.join(OUT, name)
        img.save(path, "PNG", optimize=True)
        print(f"{name:26} {size}x{size}  {os.path.getsize(path):>6} bytes")

    # 目視確認用: ホーム画面サイズ相当の縮小プレビュー
    preview = draw_icon(512, FULL)
    strip = Image.new("RGB", (512 + 20 + 120 + 20 + 60, 512), (238, 240, 244))
    strip.paste(preview, (0, 0))
    strip.paste(preview.resize((120, 120), Image.LANCZOS), (532, 196))
    strip.paste(preview.resize((60, 60), Image.LANCZOS), (672, 226))
    strip.save(os.path.join(OUT, "_preview.png"), "PNG")
    print("_preview.png (512 / 120 / 60 の見え方比較)")


if __name__ == "__main__":
    main()
