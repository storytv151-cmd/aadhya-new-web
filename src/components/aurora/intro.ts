"use client";

// The home preloader and the hero intro share this flag: the hero waits for the
// preloader's curtain before animating in. Pages without a preloader never wait.
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onIntroDone(fn: () => void): () => void {
  if (done || !document.querySelector("[data-aur-intro]")) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
