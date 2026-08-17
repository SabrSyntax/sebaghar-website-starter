/**
 * Pointer parallax
 * Subtle desktop-only parallax across the hero illustration and
 * background blobs. Each [data-depth] element moves proportionally to
 * pointer position relative to the hero's centre. Disabled entirely for
 * touch devices and for prefers-reduced-motion.
 */

const MAX_OFFSET_PX = 18;

export function initParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReducedMotion || isTouchDevice) return;

  const layers = Array.from(hero.querySelectorAll(".parallax-layer"));
  if (layers.length === 0) return;

  let rafId = null;
  let pointerX = 0;
  let pointerY = 0;

  const applyTransform = () => {
    rafId = null;
    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth || "0.2");
      const x = pointerX * MAX_OFFSET_PX * depth;
      const y = pointerY * MAX_OFFSET_PX * depth;
      layer.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    });
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    pointerY = (event.clientY - rect.top) / rect.height - 0.5;

    if (rafId === null) {
      rafId = requestAnimationFrame(applyTransform);
    }
  });

  hero.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
    if (rafId === null) {
      rafId = requestAnimationFrame(applyTransform);
    }
  });
}
