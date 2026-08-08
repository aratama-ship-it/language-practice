(function () {
  "use strict";

  if (location.protocol === "file:" || !("serviceWorker" in navigator)) return;

  window.addEventListener("load", function () {
    try {
      navigator.serviceWorker.register("sw.js").then(function (registration) {
        var updateBanner = document.getElementById("pwa-update");
        var updateButton = document.getElementById("pwa-update-btn");
        var waitingWorker = null;

        function showUpdate(worker) {
          waitingWorker = worker;
          if (updateBanner) updateBanner.classList.remove("hidden");
        }

        if (registration.waiting) showUpdate(registration.waiting);

        registration.addEventListener("updatefound", function () {
          var newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", function () {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              showUpdate(newWorker);
            }
          });
        });

        if (updateButton) {
          updateButton.addEventListener("click", function () {
            var worker = registration.waiting || waitingWorker;
            if (worker) worker.postMessage("SKIP_WAITING");
          });
        }
      }).catch(function () {});
    } catch (error) {}
  });

  var reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", function () {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });
})();
