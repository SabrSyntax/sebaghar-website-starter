import { initNavigation } from "./navigation.js";
import { initHero } from "./hero.js";
import { initParallax } from "./parallax.js";
import { initComingSoonModal } from "./modal.js";

function init() {
  initNavigation();
  initHero();
  initParallax();
  initComingSoonModal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
