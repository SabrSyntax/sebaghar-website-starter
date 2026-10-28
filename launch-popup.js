/* SebaGhar temporary launch popup.
   Display schedule is calculated using India Standard Time (IST, UTC+05:30). */
(() => {
  "use strict";

  const overlay = document.getElementById("sgLaunchOverlay");
  const closeButton = document.getElementById("sgLaunchClose");

  if (!overlay || !closeButton) return;

  // Popup appears from deployment/upload until 4 December 2026, 6:00 PM IST.
  const endAt = new Date("2026-12-04T18:00:00+05:30").getTime();
  const now = Date.now();

  // At and after the deadline, do not display the popup.
  if (now >= endAt) {
    overlay.classList.remove("sg-launch-visible");
    overlay.setAttribute("aria-hidden", "true");
    return;
  }

  const closePopup = () => {
    overlay.classList.remove("sg-launch-visible");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Close button.
  closeButton.addEventListener("click", closePopup);

  // Close when clicking the dimmed area outside the popup panel.
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closePopup();
  });

  // Close with the Escape key.
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.classList.contains("sg-launch-visible")) {
      closePopup();
    }
  });

  // Do not save dismissal: it reappears on every new page load until the deadline.
  overlay.classList.add("sg-launch-visible");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  closeButton.focus({ preventScroll: true });
})();
