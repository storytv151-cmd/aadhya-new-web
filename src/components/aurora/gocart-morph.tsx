"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { goCartFromPrice } from "@/content/gocart";
import { storeMock } from "@/content/visuals";
import { AuroraButton } from "./aurora-button";

const I = {
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>,
  bag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 13H6z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>,
  home: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" /></svg>,
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" /></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h10" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>,
  apple: <svg viewBox="0 0 24 24" fill="#0b0d12"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7a4.6 4.6 0 0 0-3.6-1.9c-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.2-.9A4.8 4.8 0 0 0 4 9.5c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8 2.1-1.2 2.9-2.4a10 10 0 0 0 1.3-2.7 4.2 4.2 0 0 1-2.3-4zM14 5.4A4.3 4.3 0 0 0 15 2.3a4.4 4.4 0 0 0-2.9 1.5 4.1 4.1 0 0 0-1 3 3.6 3.6 0 0 0 2.9-1.4z" /></svg>,
  play: <svg viewBox="0 0 24 24"><path d="M4 2.5l10.5 9.5L4 21.5c-.4-.2-.6-.6-.6-1.1V3.6c0-.5.2-.9.6-1.1z" fill="#34a853" /><path d="M14.5 12L4 2.5l12.9 7.1z" fill="#4285f4" /><path d="M14.5 12L4 21.5l12.9-7.1z" fill="#ea4335" /><path d="M16.9 9.6l3.3 1.8c.8.5.8 1.3 0 1.8l-3.3 1.8-2.4-3z" fill="#fbbc04" /></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="#0b0d12" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></svg>,
};

const POINTS = ["Android and iOS apps", "Unlimited push notifications", "Automations that bring shoppers back"];

function Badge({ className, icon, small, big }: { className: string; icon: React.ReactNode; small: string; big: string }) {
  return (
    <div className={`gcm-bdg ${className}`}>
      <div className="gcm-float flex items-center gap-2.5 rounded-2xl bg-white py-2.5 pl-3 pr-4 text-sm font-bold text-[#0b0d12] shadow-[0_24px_44px_-14px_rgba(0,0,0,.4)] [&_svg]:size-[22px] [&_svg]:flex-none">
        {icon}
        <span>
          <small className="block text-[10px] font-semibold leading-tight text-[#6b7280]">{small}</small>
          {big}
        </span>
      </div>
    </div>
  );
}

/**
 * Go Cart story in one pinned scroll: a desktop Shopify store shrinks into a phone, the
 * app UI takes over, a push notification lands and the store badges pop in. Only the
 * device box changes size; the screens inside just scale and fade, so nothing reflows.
 */
export function GoCartMorph({
  kicker = "(02) Our product · Go Cart",
  cta = { href: "/GoCart", label: "Explore Go Cart" },
}: {
  kicker?: string;
  cta?: { href: string; label: string; external?: boolean };
}) {
  const root = useRef<HTMLElement>(null);
  const { products } = storeMock;

  useGSAP(
    () => {
      const pin = root.current?.querySelector<HTMLElement>(".gcm-pin");
      const stage = pin?.querySelector<HTMLElement>(".gcm-stage");
      const dev = pin?.querySelector<HTMLElement>(".gcm-dev");
      const head = pin?.querySelector<HTMLElement>("[data-head]");
      const copy = pin?.querySelector<HTMLElement>(".gcm-copy");
      const desk = pin?.querySelector<HTMLElement>(".gcm-d");
      const phone = pin?.querySelector<HTMLElement>(".gcm-m");
      if (!pin || !stage || !dev || !head || !copy || !desk || !phone) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", pin);
      const clamp = gsap.utils.clamp;

      let side = true;
      const layout = () => {
        side = innerWidth >= 900 || innerWidth > innerHeight * 1.15;
        pin.classList.toggle("gcm-side", side);
        pin.classList.toggle("gcm-stack", !side);
        pin.classList.toggle("gcm-compact", innerHeight < 640 || (!side && innerHeight < 740));
        gsap.set(copy, { yPercent: side ? -50 : 0 });
      };
      layout();
      ScrollTrigger.addEventListener("refreshInit", layout);

      const headB = () => head.offsetTop + head.offsetHeight;
      const copyR = () => copy.offsetLeft + copy.offsetWidth;
      const copyB = () => copy.offsetTop + copy.offsetHeight;
      const sD = () => clamp(0.18, 1, Math.min((innerWidth - (side ? 120 : 28)) / 960, (innerHeight - headB() - 60) / 600));
      const yD = () => (headB() + 16 + innerHeight - 44) / 2 - innerHeight / 2;
      const sM = () =>
        side
          ? clamp(0.25, 1, Math.min((innerHeight - 120) / 620, (innerWidth - copyR() - 70) / 300))
          : clamp(0.25, 0.85, (innerHeight - copyB() - 64) / 620);
      const xM = () => (side ? (copyR() + 30) / 2 : 0);
      const yM = () => (side ? -8 : copyB() + 10 + 310 * sM() - innerHeight / 2);
      const badgeRoom = () => pin.classList.toggle("gcm-no-b2", side && innerWidth / 2 + xM() - 330 * sM() < copyR() + 10);
      ScrollTrigger.addEventListener("refresh", badgeRoom);

      gsap.set(dev, { xPercent: -50, yPercent: -50 });
      const DESK = "0 50px 100px -30px rgba(0,0,0,.45), 0 0 0 0px #0b0d12, 0 0 0 1px rgba(255,255,255,.3)";
      const PHONE = "0 50px 100px -30px rgba(0,0,0,.5), 0 0 0 10px #0b0d12, 0 0 0 11px rgba(255,255,255,.28)";
      const M0 = 0.5;
      const MD = 3.6;
      const E = "power2.inOut";
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: "top top",
          end: () => `+=${innerHeight * 3.2}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            const k = s.progress < 0.5 ? 0 : s.progress < 0.74 ? 1 : 2;
            steps.forEach((el, i) => el.classList.toggle("is-on", i === k));
          },
        },
      });
      tl.fromTo(stage, { scale: sD, x: 0, y: yD, rotateX: 14 }, { scale: sM, x: xM, y: yM, rotateX: 0, duration: MD, ease: E }, M0)
        .fromTo(dev, { width: 960, height: 600, borderRadius: 16, boxShadow: DESK }, { width: 300, height: 620, borderRadius: 46, boxShadow: PHONE, duration: MD, ease: E }, M0)
        .fromTo(desk, { scale: 1 }, { scale: 0.34, duration: MD, ease: E }, M0)
        .fromTo(desk, { opacity: 1 }, { opacity: 0, duration: MD * 0.22, ease: "power1.in" }, M0 + MD * 0.45)
        .fromTo(phone, { scale: 1.4 }, { scale: 1, duration: MD * 0.5, ease: "power2.out" }, M0 + MD * 0.45)
        .fromTo(phone, { opacity: 0 }, { opacity: 1, duration: MD * 0.2, ease: "power1.out" }, M0 + MD * 0.5)
        .to("[data-orb]", { scale: 1, duration: MD, ease: "power1.out" }, M0)
        .to(head, { yPercent: -60, opacity: 0, duration: 1.2, ease: "power2.in" }, M0 + 0.1)
        .fromTo(copy, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1.3, ease: "power2.out" }, M0 + MD - 0.8)
        .fromTo("[data-push]", { y: -130 }, { y: 0, duration: 0.9, ease: "back.out(1.4)" }, M0 + MD + 0.5)
        .fromTo(".gcm-bdg", { opacity: 0, scale: 0.5, y: 30 }, { opacity: 1, scale: 1, y: 0, stagger: 0.3, duration: 0.8, ease: "back.out(2)" }, M0 + MD + 0.7)
        .to({}, { duration: 1.2 });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", layout);
        ScrollTrigger.removeEventListener("refresh", badgeRoom);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="gocart" aria-labelledby="gocart-title">
      <div className="gcm-pin gcm-side">
        <div data-orb="" aria-hidden="true" className="gcm-orb pointer-events-none absolute left-1/2 top-1/2 -ml-[60vmax] -mt-[60vmax] size-[120vmax] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.16),rgba(255,255,255,0))]" />
        <div data-head="" className="absolute inset-x-0 top-[clamp(76px,11vh,120px)] z-[3] px-4 text-center">
          <span className="inline-flex h-8 items-center rounded-full border border-white/20 bg-white/15 px-3.5 font-mono text-[11.5px] uppercase tracking-[0.06em]">
            {kicker}
          </span>
          <h2 id="gocart-title" className="mt-3.5 text-[clamp(34px,5.4vw,82px)] font-bold leading-[.98] tracking-[-0.05em]">
            Your Shopify store<span className="aur-em">…</span>
          </h2>
          <p className="gcm-head-note mt-3 font-mono text-[11.5px] uppercase tracking-[0.08em] opacity-75">Keep scrolling ↓</p>
        </div>

        <div className="gcm-copy">
          <p className="text-[clamp(28px,4vw,60px)] font-bold leading-[1.02] tracking-[-0.045em]">
            …now an <span className="aur-em">app</span> your shoppers keep.
          </p>
          <ul className="gcm-list my-6 grid gap-3 [.gcm-stack_&]:my-3 [.gcm-stack_&]:flex [.gcm-stack_&]:flex-wrap [.gcm-stack_&]:gap-1.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-base font-semibold [.gcm-stack_&]:rounded-full [.gcm-stack_&]:bg-white/15 [.gcm-stack_&]:px-3 [.gcm-stack_&]:py-1.5 [.gcm-stack_&]:text-[12.5px]">
                <span className="grid size-5 flex-none place-items-center rounded-full bg-white/20 p-[3px] [.gcm-stack_&]:hidden [&_svg]:size-full">{I.check}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <p className="flex items-baseline gap-1.5 font-semibold">
              from <b className="text-[clamp(30px,3.4vw,48px)] font-bold tracking-[-0.04em]">${goCartFromPrice}</b> /mo
            </p>
            <AuroraButton href={cta.href} external={cta.external} variant="light" cursor="Explore" arrow>
              {cta.label}
            </AuroraButton>
          </div>
        </div>

        <div className="gcm-stage" aria-hidden="true">
          <div className="gcm-dev">
            {/* Desktop storefront */}
            <div className="gcm-scr gcm-d">
              <div className="relative flex h-10 items-center gap-1.5 border-b border-[#e4e4e8] bg-[#f1f1f3] px-3.5">
                <i className="size-[11px] rounded-full bg-[#ff5f57]" />
                <i className="size-[11px] rounded-full bg-[#febc2e]" />
                <i className="size-[11px] rounded-full bg-[#28c840]" />
                <div className="absolute left-1/2 top-2 flex h-6 w-[300px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-[7px] border border-[#e4e4e8] bg-white text-xs text-[#6b6b72] [&_svg]:size-[11px]">
                  {I.lock}
                  {storeMock.domain}
                </div>
              </div>
              <div className="flex h-14 items-center justify-between border-b border-[#efebe6] px-6">
                <span className="font-serif text-lg tracking-[0.26em]">{storeMock.name}</span>
                <span className="flex gap-6 text-[13px] text-[#6d655c]">
                  <span>New in</span>
                  <span>Women</span>
                  <span>Men</span>
                  <span>Accessories</span>
                  <span>Sale</span>
                </span>
                <span className="flex gap-3.5">
                  {I.search}
                  {I.user}
                  {I.bag}
                </span>
              </div>
              <div className="grid grid-cols-[580px_1fr] gap-3 px-6 pt-4">
                <div className="relative h-[292px] overflow-hidden rounded-[14px] bg-[#eee]">
                  <Image src={storeMock.hero} alt="" fill sizes="580px" className="object-cover" />
                  <div className="absolute bottom-6 left-7 text-white [text-shadow:0_2px_20px_rgba(0,0,0,.25)]">
                    <small className="block text-[11px] font-bold uppercase tracking-[0.22em]">Summer &apos;26</small>
                    <p className="my-1.5 mb-3.5 font-serif text-5xl leading-none">{storeMock.edit}</p>
                    <span className="inline-block rounded-full bg-white px-[18px] py-2.5 text-[13px] font-bold text-[#1d1a17] [text-shadow:none]">Shop the edit</span>
                  </div>
                </div>
                <div className="relative h-[292px] overflow-hidden rounded-[14px] bg-[#eee]">
                  <Image src={storeMock.promo} alt="" fill sizes="320px" className="object-cover" />
                  <span className="absolute bottom-3.5 left-3.5 rounded-full bg-white px-3 py-2 text-xs font-bold">New in · Shirts</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2.5 px-6 pt-3.5">
                {products.map((p) => (
                  <div key={p.name}>
                    <div className="relative h-[118px] overflow-hidden rounded-[10px] bg-[#f3f1ee]">
                      <Image src={p.src} alt="" fill sizes="220px" className="object-cover" />
                    </div>
                    <div className="flex justify-between pt-[7px] text-[12.5px] font-semibold">
                      {p.name}
                      <span className="font-medium text-[#8a8278]">{p.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone app */}
            <div className="gcm-scr gcm-m">
              <div className="relative flex h-11 items-center justify-between pl-[30px] pr-6 pt-0.5 text-sm font-bold">
                <span>9:41</span>
                <span className="absolute left-1/2 top-[11px] h-[27px] w-[92px] -translate-x-1/2 rounded-[20px] bg-black" />
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 17 11" fill="#111" className="!h-[11px] !w-[17px]"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg>
                  <svg viewBox="0 0 24 12" className="!h-3 !w-6"><rect x=".5" y=".5" width="20" height="11" rx="3" fill="none" stroke="#111" opacity=".4" /><rect x="2" y="2" width="15" height="8" rx="1.5" fill="#111" /></svg>
                </span>
              </div>
              <div className="flex h-11 items-center justify-between px-4">
                {I.menu}
                <span className="font-serif text-sm tracking-[0.24em]">{storeMock.name}</span>
                <span className="relative">
                  {I.bag}
                  <b className="absolute -right-1.5 -top-1.5 grid size-[15px] place-items-center rounded-full bg-[#1d1a17] text-[9px] text-white">2</b>
                </span>
              </div>
              <div className="relative mx-3 mt-1 h-[176px] overflow-hidden rounded-[14px] bg-[#eee]">
                <Image src={storeMock.hero} alt="" fill sizes="280px" className="object-cover" />
                <div className="absolute bottom-3.5 left-3.5 text-white [text-shadow:0_2px_14px_rgba(0,0,0,.3)]">
                  <small className="block text-[8.5px] font-bold uppercase tracking-[0.22em]">Summer &apos;26</small>
                  <p className="mt-1 font-serif text-[26px] leading-none">{storeMock.edit}</p>
                </div>
              </div>
              <div className="flex gap-1.5 overflow-hidden px-3 pt-2.5 text-[11px] font-semibold">
                {["New in", "Women", "Men", "Bags", "Sale"].map((c, i) => (
                  <span key={c} className={i === 0 ? "whitespace-nowrap rounded-full bg-[#1d1a17] px-[11px] py-1.5 text-white" : "whitespace-nowrap rounded-full bg-[#f2f0ed] px-[11px] py-1.5"}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 px-3 pt-2.5">
                {products.map((p) => (
                  <div key={p.name}>
                    <div className="relative h-[92px] overflow-hidden rounded-[10px] bg-[#f3f1ee]">
                      <Image src={p.src} alt="" fill sizes="140px" className="object-cover" />
                    </div>
                    <div className="flex justify-between pt-[5px] text-[10.5px] font-semibold">
                      {p.name}
                      <span className="font-medium text-[#8a8278]">{p.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 flex h-[58px] items-start justify-around border-t border-[#efebe6] bg-white pt-2.5 text-[#9a948c] [&_svg]:size-[21px] [&>svg:first-child]:text-[#1d1a17]">
                {I.home}
                {I.search}
                {I.heart}
                {I.bag}
                {I.user}
                <span className="absolute bottom-[7px] left-1/2 h-1 w-[108px] -translate-x-1/2 rounded bg-[#111]" />
              </div>
              <div data-push="" className="absolute inset-x-2.5 top-[50px] z-[3] flex h-[66px] items-center gap-2.5 rounded-[20px] bg-[rgba(246,246,248,.96)] px-3 py-2.5 shadow-[0_14px_34px_rgba(0,0,0,.22)]">
                <span className="grid size-10 flex-none place-items-center rounded-[10px] bg-[#1d1a17] font-serif text-[17px] text-[#f3e9dc]">MN</span>
                <div className="min-w-0 flex-1 text-[11.5px] leading-[1.3] text-[#1b1b1f]">
                  <b className="flex justify-between text-xs">
                    Maison Nord<span className="font-medium text-[#8b8b92]">now</span>
                  </b>
                  {storeMock.push}
                </div>
              </div>
            </div>
          </div>
          <Badge className="b1" icon={I.apple} small="Live on the" big="App Store" />
          <Badge className="b2" icon={I.play} small="Get it on" big="Google Play" />
          <Badge className="b3" icon={I.bell} small="Every plan" big="Unlimited push" />
        </div>

        <div className="gcm-steps absolute bottom-[18px] left-1/2 z-[3] flex -translate-x-1/2 gap-1.5" aria-hidden="true">
          {["01 Store", "02 App", "03 Push"].map((s, i) => (
            <span
              key={s}
              data-step=""
              className={`whitespace-nowrap rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.05em] transition-colors duration-500 [&.is-on]:bg-white [&.is-on]:text-[#6f52ff] ${i === 0 ? "is-on" : ""} bg-white/10 text-white/70`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
