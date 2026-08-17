/**
 * Navigation
 * - Toggles a `.is-scrolled` class on the navbar past a scroll threshold.
 * - Drives the accessible mobile drawer: open/close, focus trap,
 *   Escape-to-close, backdrop click, and closing on link selection.
 */

const SCROLL_THRESHOLD = 12;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function initNavigation() {
  initScrollState();
  initMobileDrawer();
}

function initScrollState() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const updateState = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };

  updateState();
  window.addEventListener("scroll", updateState, { passive: true });
}

function initMobileDrawer() {
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileNav");
  const panel = document.getElementById("mobileNavPanel");
  const closeBtn = document.getElementById("mobileNavClose");

  if (!toggle || !drawer || !panel) return;

  let lastFocusedElement = null;

  const getFocusable = () =>
    Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null
    );

  const openDrawer = () => {
    lastFocusedElement = document.activeElement;
    drawer.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("no-scroll");

    const focusable = getFocusable();
    (focusable[0] || panel).focus();

    document.addEventListener("keydown", handleKeydown);
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("no-scroll");

    document.removeEventListener("keydown", handleKeydown);

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDrawer();
      return;
    }

    if (event.key === "Tab") {
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    isOpen ? closeDrawer() : openDrawer();
  });

  closeBtn?.addEventListener("click", closeDrawer);

  drawer.querySelectorAll("[data-mobile-nav-close]").forEach((el) => {
    el.addEventListener("click", closeDrawer);
  });

  drawer.querySelectorAll("[data-mobile-nav-link]").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}
