const LOWER = "abcdefghijklmnopqrstuvwxyz";
export const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=";

type ScrambleTarget = HTMLElement & { _scrambleRaf?: number };

/** Letters settle left to right from random characters into `to`. */
export function scramble(el: HTMLElement, to: string, duration = 700, charset = LOWER) {
  const target = el as ScrambleTarget;
  const from = target.textContent ?? "";
  const start = performance.now();
  if (target._scrambleRaf) cancelAnimationFrame(target._scrambleRaf);
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const length = Math.round(from.length + (to.length - from.length) * p);
    const settled = Math.floor(p * to.length);
    let text = "";
    for (let i = 0; i < length; i++) {
      if (i < settled) text += to[i];
      else if (to[i] === " ") text += " ";
      else text += charset[(Math.random() * charset.length) | 0];
    }
    target.textContent = text;
    if (p < 1) target._scrambleRaf = requestAnimationFrame(step);
    else {
      target.textContent = to;
      target._scrambleRaf = undefined;
    }
  };
  target._scrambleRaf = requestAnimationFrame(step);
}
