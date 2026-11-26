"use client";

import { memo, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import Image, { getImageProps } from "next/image";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import styles from "./work-helix.module.css";

export type HelixSample = {
  title: string; label: string; href: string; action: string;
  image?: string; alt?: string; metric?: string;
};

/*
 * Helix geometry adapted from Helix Ribbon Hero by Kedhareswer Naidu (MIT).
 * Copyright (c) Kedhareswer Naidu.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
// Four tangent slices per panel and a second, readable face on the reverse.
const HELIX = { perTurn: 7, slices: 4, pitch: 1.34, tiltZ: -17, tiltX: -9 };
const tau = Math.PI * 2;
const angleStep = tau / HELIX.perTurn;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const segment = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));
const sine = (t: number) => .5 - .5 * Math.cos(Math.PI * t);
const rise = (t: number) => (.5 - .5 * Math.cos(Math.PI * t)) * .35 + t * .65;
// Durations are distances in visible stage heights. Each additional project
// adds browsing time without stretching either end of the transition.
const exitDistance = .58;
const settledGridTop = .14;
function travelFor(count: number, hasIntro: boolean) {
  const intro = hasIntro ? .68 : .18;
  const browse = .38 + Math.max(0, count - 1) * .09;
  const travel = intro + browse + exitDistance;
  return { travel, start: intro / travel, end: (intro + browse) / travel };
}
const px = (value: number) => value.toFixed(2) + "px";
const deg = (angle: number) => (angle * 180 / Math.PI).toFixed(3) + "deg";
const motionQuery = "(prefers-reduced-motion: no-preference) and (min-height: 281px)";
const motionAllowed = () => window.matchMedia(motionQuery).matches;
const staticFirst = () => false;
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function positionFor(index: number, count: number, start: number, end: number) {
  if (index === 0 || count < 2) return start;
  if (index === count - 1) return end;
  const target = index / (count - 1);
  let low = 0, high = 1;
  for (let i = 0; i < 16; i++) {
    const mid = (low + high) / 2;
    if (rise(mid) < target) low = mid;
    else high = mid;
  }
  return start + (end - start) * (low + high) / 2;
}

function TypePanel({ sample }: { sample: HelixSample }) {
  return <div className={styles.typePanel}>
    <span>{sample.label}</span>
    <strong>{sample.title}</strong>
    {sample.metric && <small>{sample.metric}</small>}
  </div>;
}

const RibbonFaces = memo(function RibbonFaces({ samples, textures }: { samples: HelixSample[]; textures: (string | undefined)[] }) {
  return samples.map((sample, i) => <div key={sample.title} data-helix-panel={i} data-title={sample.title}
    className={styles.panel} style={textures[i] ? { "--texture": `url(${JSON.stringify(textures[i])})` } as CSSProperties : undefined}>
    {Array.from({ length: HELIX.slices * 2 }, (_, face) => <div key={face} data-helix-slice="" className={styles.slice}>
      <div className={styles.texture} data-fit={sample.action === "Open result" ? "contain" : "cover"}>
        {!sample.image && <TypePanel sample={sample} />}
      </div>
    </div>)}
  </div>);
});

function jumpToCards(event: MouseEvent<HTMLDivElement>, enableDirectBrowse: () => void) {
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href^='#']") : null;
  if (!link?.hash || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target?.closest("#work-card-list")) return;
  event.preventDefault();
  const disclosure = target.closest("details");
  if (disclosure) disclosure.open = true;
  if (location.hash !== link.hash) window.history.pushState(window.history.state, "", link.hash);
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: "instant", block: "start" });
  enableDirectBrowse();
}

export function WorkHelix({ samples, intro }: { samples: HelixSample[]; intro?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const screw = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const seek = useRef<((index: number) => void) | null>(null);
  const enterCards = useRef<(() => void) | null>(null);
  const [current, setCurrent] = useState(0);
  const [near, setNear] = useState(false);
  const allowsMotion = useSyncExternalStore(subscribeMotion, motionAllowed, staticFirst);
  const animate = allowsMotion && samples.length > 1;
  const hasIntro = Boolean(intro);
  const activeIndex = Math.min(current, Math.max(0, samples.length - 1));
  const selected = samples[activeIndex];
  const still = animate ? samples[0] : selected;
  const { start, end, travel } = travelFor(samples.length, hasIntro);

  // Use the application's responsive image loader, including its versioned,
  // privacy-safe URLs. Eight texture faces share a single thumbnail download.
  const textures = useMemo(() => samples.map(sample => {
    if (!sample.image) return undefined;
    const { props } = getImageProps({ src: sample.image, alt: "", width: 512, height: 341 });
    return props.srcSet?.split(",")[0].trim().split(/\s+/)[0] || props.src;
  }), [samples]);

  useEffect(() => {
    if (!animate || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNear(true);
        observer.disconnect();
      }
    }, { rootMargin: "450px 0px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [animate]);

  useEffect(() => {
    const region = root.current, pinned = stage.current, viewport = view.current;
    const carrier = group.current, cylinder = screw.current;
    if (!animate || !near || !region || !pinned || !viewport || !carrier || !cylinder) return;
    const panels = Array.from(cylinder.children) as HTMLElement[];
    const count = panels.length;
    const lighting = new Float32Array(count).fill(-2);
    const layout = { width: 0, height: 0, cardHeight: 0, radius: 0, pitch: 0, visiblePanels: 0, pinTop: 0 };
    const nextSection = region.nextElementSibling;
    const list = nextSection instanceof HTMLElement && nextSection.id === "work-card-list" ? nextSection : null;
    const landingGrid = list?.querySelector<HTMLElement>("[data-helix-landing-grid]");
    let directFrom: number | null = null;
    let lastLanding = "";
    let drawn = -1, target = 0, frame = 0, lastTime = 0, visible = false;
    let lastIndex = -1;
    let lastSplit = -1, lastControls = -1;
    const updateTarget = () => {
      const rect = region.getBoundingClientRect();
      const runway = rect.height - pinned.offsetHeight;
      return runway > 0 ? clamp01((layout.pinTop - rect.top) / runway) : 0;
    };
    function showLanding(progress: number) {
      if (!list) return;
      if (directFrom !== null && progress < end && window.scrollY < directFrom - 24) {
        directFrom = null;
        delete region!.dataset.helixDirect;
      }
      const amount = directFrom === null ? segment(progress, end, 1) : 1;
      const rounded = amount.toFixed(4);
      if (rounded === lastLanding) return;
      lastLanding = rounded;
      list.dataset.helixLanding = amount === 0 ? "before" : amount === 1 ? "after" : "active";
      list.style.setProperty("--helix-landing", rounded);
    }
    enterCards.current = () => {
      directFrom = window.scrollY;
      region.dataset.helixDirect = "true";
      showLanding(1);
    };
    function paint(progress: number, force = false) {
      const browse = segment(progress, start, end);
      const at = rise(browse) * (count - 1);
      const index = Math.round(at);
      const introTime = segment(progress, 0, start);
      const exitTime = segment(progress, end, 1);
      const enter = sine(segment(introTime, hasIntro ? .08 : 0, 1));
      const leave = sine(exitTime);
      const phase = introTime < .10 && hasIntro ? "intro" : progress < start ? "entry" : progress <= end ? "gallery" : "exit";
      if (region!.dataset.helixPhase !== phase) region!.dataset.helixPhase = phase;

      // The two supplied intro lines pull away as the upper end of the screw
      // comes up from below the reader. Both layers share the same page scroll.
      const split = sine(segment(introTime, .15, 1));
      if (introRef.current && (split !== lastSplit || force)) {
        const opacity = 1 - sine(segment(split, .35, 1));
        introRef.current.style.setProperty("--intro-shift", px(layout.width * .84 * split));
        introRef.current.style.setProperty("--intro-alpha", opacity.toFixed(3));
        introRef.current.inert = opacity < .04;
        introRef.current.setAttribute("aria-hidden", String(opacity < .04));
        lastSplit = split;
      }
      const controlsAlpha = (hasIntro ? sine(segment(introTime, .65, 1)) : 1) * (1 - sine(segment(exitTime, 0, .22)));
      if (controls.current && (controlsAlpha !== lastControls || force)) {
        controls.current.style.setProperty("--control-alpha", String(controlsAlpha));
        controls.current.inert = controlsAlpha < .04;
        lastControls = controlsAlpha;
      }
      // In the original screw the upper end enters first. Assign collection
      // index zero to that end, then bring each successive face to the reader.
      const angle = (count - 1 - at + .5) * angleStep;
      const spin = -angle + .12 - (1 - enter) * .65 + leave * .72;
      const screwY = -layout.pitch * spin / tau;
      const centre = -layout.pitch * angle / tau + screwY;
      const reach = layout.height * .67 + layout.cardHeight * 1.75;
      const arrival = (1 - enter) * (hasIntro ? 1 : .30);
      const lift = (arrival - leave) * reach;
      const scale = 1 - arrival * .20;
      carrier!.style.transform = `translate3d(${px(-layout.width * .025)},${px(lift - centre - layout.radius * .12)},${px(-layout.radius)}) scale3d(${scale},${scale},${scale}) rotateZ(${HELIX.tiltZ}deg) rotateX(${HELIX.tiltX}deg)`;
      cylinder!.style.transform = `rotateY(${deg(spin)}) translateY(${px(screwY)})`;
      for (let i = Math.max(0, index - layout.visiblePanels); i <= Math.min(count - 1, index + layout.visiblePanels); i++) {
        const facing = Math.cos((count - 1 - i + .5) * angleStep + spin);
        if (force || Math.abs(lighting[i] - facing) > .045) {
          panels[i].style.setProperty("--front-light", (.74 + .26 * Math.max(0, facing)).toFixed(3));
          panels[i].style.setProperty("--back-light", (.74 + .26 * Math.max(0, -facing)).toFixed(3));
          lighting[i] = facing;
        }
      }
      if (index !== lastIndex || force) {
        panels.forEach((panel, i) => {
          panel.toggleAttribute("data-near", Math.abs(i - index) <= layout.visiblePanels);
        });
        lastIndex = index;
        setCurrent(index);
      }
      drawn = progress;
    }
    function tick(time: number) {
      frame = 0;
      if (!visible) return;
      const dt = Math.min(64, time - lastTime || 16);
      lastTime = time;
      const next = drawn + (target - drawn) * (1 - Math.exp(-dt / 90));
      if (Math.abs(target - next) < .00008) {
        paint(target);
      } else {
        paint(next);
        frame = requestAnimationFrame(tick);
      }
    }
    const onScroll = () => {
      if (!visible) return;
      target = updateTarget();
      showLanding(target);
      if (!frame && Math.abs(target - drawn) > .00005) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const measure = () => {
      const W = viewport.clientWidth, H = viewport.clientHeight;
      if (!W || !H) return;
      const unit = Math.max(Math.min(W, H * 1.6), H * .62);
      const cardWidth = unit * .4;
      const cardHeight = cardWidth / 1.5;
      const radius = cardWidth / angleStep;
      const pitch = cardHeight * HELIX.pitch;
      const sliceAngle = angleStep / HELIX.slices;
      const sw = 2 * radius * Math.sin(sliceAngle / 2);
      const dy = pitch * sliceAngle / tau;
      const skew = Math.atan2(dy, sw);
      layout.width = W;
      layout.height = H;
      layout.cardHeight = cardHeight;
      layout.radius = radius;
      layout.pitch = pitch;
      layout.pinTop = parseFloat(getComputedStyle(pinned!).top) || 0;
      layout.visiblePanels = Math.ceil((H / 2 + cardHeight) / pitch * HELIX.perTurn);
      if (list && landingGrid) {
        // The project header and filters wrap at different widths. Measure
        // the grid itself so the first row reaches the same place on screen.
        const beforeGrid = landingGrid.getBoundingClientRect().top - list.getBoundingClientRect().top;
        region.style.setProperty("--landing-overlap", px(pinned.offsetHeight * (1 - settledGridTop) + beforeGrid));
      }
      viewport.style.perspective = px(unit * 1.05);
      cylinder.style.setProperty("--face-width", px(sw + 2));
      cylinder.style.setProperty("--face-height", px(cardHeight));
      cylinder.style.setProperty("--texture-width", px(sw * HELIX.slices));
      cylinder.style.setProperty("--type-title", px(cardHeight * .15));
      panels.forEach((panel, index) => {
        const order = count - 1 - index;
        Array.from(panel.children).forEach((node, face) => {
          const slice = node as HTMLElement;
          const back = face % 2 === 1;
          const j = Math.floor(face / 2);
          const a = order * angleStep + (j + .5) * sliceAngle;
          const y = -pitch * a / tau;
          const sourceColumn = back ? HELIX.slices - 1 - j : j;
          slice.style.setProperty("--texture-left", px(1 - sourceColumn * sw));
          slice.style.transform = `rotateY(${deg(a)}) translate3d(${px(-sw / 2 - 1)},${px(y - cardHeight / 2 + dy / 2)},${px(radius)}) skewY(${deg(-skew)})` +
            (back ? ` translateX(${px(sw + 2)}) rotateY(180deg)` : "");
        });
      });
      target = updateTarget();
      showLanding(target);
      paint(target, true);
      region.dataset.ready = "true";
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    if (list) resize.observe(list);
    if (landingGrid) resize.observe(landingGrid);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      target = updateTarget();
      showLanding(target);
      if (visible) {
        paint(target);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    io.observe(region);
    window.addEventListener("scroll", onScroll, { passive: true });
    const initialAnchor = document.getElementById(location.hash.slice(1));
    if (initialAnchor && list?.contains(initialAnchor)) enterCards.current();
    seek.current = (index) => {
      target = positionFor(index, count, start, end);
      const box = region.getBoundingClientRect();
      const y = window.scrollY + box.top - layout.pinTop + target * (box.height - pinned.offsetHeight);
      window.scrollTo({ top: y, behavior: "instant" });
      showLanding(target);
      paint(target);
    };
    return () => {
      seek.current = null;
      enterCards.current = null;
      delete region.dataset.ready;
      delete region.dataset.helixPhase;
      delete region.dataset.helixDirect;
      region.style.removeProperty("--landing-overlap");
      if (list) {
        delete list.dataset.helixLanding;
        list.style.removeProperty("--helix-landing");
      }
      if (introRef.current) {
        introRef.current.inert = false;
        introRef.current.removeAttribute("aria-hidden");
        introRef.current.style.removeProperty("--intro-alpha");
        introRef.current.style.removeProperty("--intro-shift");
      }
      if (controls.current) {
        controls.current.inert = false;
        controls.current.style.removeProperty("--control-alpha");
      }
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      resize.disconnect();
      io.disconnect();
    };
  }, [animate, hasIntro, near, samples, start, end]);

  if (!selected) return intro ? <div className={styles.root} data-motion="still" data-helix-gallery="" data-count={0}>{intro}</div> : null;
  const choose = (index: number) => {
    if (seek.current) seek.current(index);
    else setCurrent(index);
  };
  return (
    <div ref={root} data-helix-gallery="" data-motion={animate ? "scroll" : "still"} data-count={samples.length} data-has-intro={hasIntro}
      data-helix-browse-start={start} data-helix-landing-start={end}
      onClick={event => jumpToCards(event, () => enterCards.current?.())}
      className={styles.root} style={{ "--travel": "calc(var(--stage-height) * " + travel + ")" } as CSSProperties}>
      <div ref={stage} data-helix-stage="" className={styles.stage}>
        {intro && <div ref={introRef} data-helix-intro="" className={styles.intro}>{intro}</div>}
        <div className={styles.frame}>
          <div className={styles.still}>
            {still.image ? <Image src={still.image} alt={still.alt || still.title} fill sizes="(max-width: 640px) 90vw, 680px" className={styles.stillImage} /> : <TypePanel sample={still} />}
          </div>
          <div ref={view} className={styles.view} aria-hidden="true">
            <div className={styles.scene}><div ref={group} className={styles.group}><div ref={screw} className={styles.screw}>
              {animate && near && <RibbonFaces samples={samples} textures={textures} />}
            </div></div></div>
          </div>
        </div>
        <div ref={controls} className={styles.footer}>
          <div className={styles.choice}>
            <span className={styles.index}>{String(activeIndex + 1).padStart(2, "0")} / {String(samples.length).padStart(2, "0")}</span>
            <div className={styles.selectWrap}>
              <select aria-label="Choose a work sample" value={activeIndex} onChange={event => choose(Number(event.target.value))}>
                {samples.map((sample, i) => <option value={i} key={sample.title}>{sample.title}</option>)}
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
          </div>
          <a data-helix-open="" className={styles.open} href={selected.href} aria-label={selected.action + " for " + selected.title}>{selected.action} <ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href="#work-card-list" data-helix-skip="" className={styles.skip}>Browse as cards <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  );
}
