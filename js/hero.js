/**
 * Hero interactions
 * Entrance and ambient animation are handled declaratively in hero.css.
 * This module only wires the scroll cue button.
 */

export function initHero() {
  const scrollCue = document.getElementById("scrollCue");
  if (!scrollCue) return;

  scrollCue.addEventListener("click", () => {
    const hero = document.getElementById("top");
    const target = hero?.nextElementSibling;
    const scrollTarget = target || hero;

    if (!scrollTarget) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    scrollTarget.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
}
