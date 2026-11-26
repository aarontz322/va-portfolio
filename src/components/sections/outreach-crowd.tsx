"use client";

/*!
 * Cold Email Crowd Hero by floo.design (@floodesign), 2026. Adapted for Aaron's portfolio.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Open Peeps illustrations by Pablo Stanley are released under CC0.
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, Mail, Pause, Play } from "lucide-react";
import styles from "./outreach-crowd.module.css";

const peeps = [
  "381d6479-f5b5-49ca-82f3-474c87c62996", "9df39fca-20db-4273-bf7e-488d04a13321",
  "3c8ee64a-67b3-4a2c-84d5-c665c725e7c5", "3ccafa92-f479-4885-a6fb-0af92993b7f6",
  "735686b6-9bd5-4ab1-9fe6-59c50b5e2eb0", "3f775475-8920-4f55-b7c1-16bf192a0b1f",
  "b56ceaf5-7fb3-40a2-bb1a-d41c547c71ca", "4bd0452d-b321-4488-b57a-0c52dc73ceb1",
  "5d3553c5-a46f-4238-bcb5-02ff60b0f907", "6669baf9-e6d8-476b-abd4-e3d52517aee8",
  "2a2fffcb-9e4e-4610-a2ec-c2c334e29001", "742a5c0b-c77f-4ab3-96eb-dbca387f5ff8",
  "da0b3073-d6fd-46d2-a1f6-747fbfedf2b1", "d9738cd5-9685-47c4-9eab-e004c4d83776",
  "706557e0-8408-4b07-bcab-2968cf4c493e", "45a054f3-181d-4746-983d-12be5078e2f0",
  "38ab3806-883c-4868-9198-a1db96941d06", "6a165ed6-e6e5-4695-9aff-bd2cd51c4b1e",
  "c5d7e55b-3899-4297-8632-a5f6a186ac05", "25b3470e-e046-42f5-9b36-591d37e72d28",
];
const examples = [
  { tag:"Hiring", signal:"Rillmere is hiring dispatchers", line:"Saw your dispatch team is growing.", reply:"Can you send a sample list?" },
  { tag:"Expansion", signal:"Mossquill opened a new office", line:"How is the new office settling in?", reply:"Our local manager handles that." },
  { tag:"Launch", signal:"Fernquarry added a service", line:"I saw the new service on your site.", reply:"Let’s talk on Thursday." },
];
const walkers = Array.from({length:42}, (_, i) => {
  const depth = ((i * 13 + 3) % 29) / 28;
  return { depth, x: ((i * .618034 + .18) % 1) * 108 - 4, dir: i % 3 === 0 ? -1 : 1,
    speed: 108 / (18 + (i * 7) % 25), phase: i * 1.83, image: peeps[(i * 7) % peeps.length] };
});
type Walker = typeof walkers[number] & { el:HTMLElement; w:number; h:number; y:number; px:number; bob:number; v:number; active:boolean; reached:boolean };
type Slot = { p:Walker; tip:HTMLElement; box:HTMLElement; tag:HTMLElement; text:HTMLElement; story:typeof examples[number]; t0:number; phase:number };
type Point = { x:number; y:number };
type Controls = { toggle:()=>void };
const blue = "126,180,255";
const unit = (n:number) => Math.max(0,Math.min(1,n));
const ease = (n:number) => n<.5 ? 4*n*n*n : 1-Math.pow(-2*n+2,3)/2;

// Original quadratic beam, outgoing envelope, impact ripple and incoming reply.
function drawBeam(g:CanvasRenderingContext2D, start:Point, end:Point, size:number, age:number, now:number) {
  const bend = { x:(start.x+end.x)/2, y:Math.min(start.y,end.y)-26-Math.abs(start.x-end.x)*.07 };
  const at = (u:number) => {
    const v=1-u;
    return { x:v*v*start.x+2*v*u*bend.x+u*u*end.x, y:v*v*start.y+2*v*u*bend.y+u*u*end.y };
  };
  const stroke = (u0:number,u1:number,steps:number) => {
    g.beginPath();
    for (let i=0;i<=steps;i++) {
      const p=at(u0+(u1-u0)*i/steps);
      if (i) g.lineTo(p.x,p.y); else g.moveTo(p.x,p.y);
    }
    g.stroke();
  };
  g.save();
  g.lineCap="round"; g.strokeStyle=`rgb(${blue})`;
  if(age<3.75) {
    const k=unit(age/.5), r=size*.255;
    g.save(); g.translate(end.x,end.y); g.rotate(now*1.2);
    g.globalAlpha=.85*k; g.lineWidth=1.5; g.setLineDash([r*.5,r*.285]);
    g.beginPath(); g.arc(0,0,r*(1+1.2*Math.pow(1-k,3)),0,Math.PI*2); g.stroke(); g.restore();
  }
  g.save(); g.lineWidth=1.35; g.globalAlpha=age<3.75?.67:.36*unit((6.25-age)/.4);
  if(age<3.75) { g.setLineDash([3,6]); g.lineDashOffset=-now*24; }
  stroke(0,unit(age/.6),28); g.restore();
  if(age>=2.9 && age<3.75) {
    const u=ease((age-2.9)/.85);
    g.save(); g.shadowColor=`rgba(${blue},.65)`; g.shadowBlur=12;
    for(let i=0;i<12;i++) {
      const u1=u-.42*i/12;
      if(u1<=0) break;
      const f=1-i/12; g.globalAlpha=.7*f; g.lineWidth=6*f+.7;
      stroke(Math.max(0,u-.42*(i+1)/12),u1,3);
    }
    g.restore();
    const p=at(u), ahead=at(Math.min(1,u+.02)), dx=ahead.x-p.x;
    g.save(); g.translate(p.x,p.y); g.rotate(Math.atan2(ahead.y-p.y,Math.abs(dx)||1)*Math.sign(dx)*.6);
    g.scale(.85,.85); g.fillStyle="#f1f7ff"; g.strokeStyle="#3269ad"; g.lineWidth=2;
    g.beginPath(); g.roundRect(-15,-10.5,30,21,4); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(-12,-7); g.lineTo(0,2.5); g.lineTo(12,-7); g.stroke(); g.restore();
  }
  if(age>=3.75 && age<4.4) {
    const k=(age-3.75)/.65, e=1-Math.pow(1-k,3);
    g.save(); g.globalAlpha=1-k; g.lineWidth=2;
    g.beginPath(); g.arc(end.x,end.y,size*(.2+e*.32),0,Math.PI*2); g.stroke();
    for(let i=0;i<10;i++) {
      const a=i/10*Math.PI*2, r=size*(.3+e*.22);
      g.beginPath(); g.moveTo(end.x+Math.cos(a)*r,end.y+Math.sin(a)*r);
      g.lineTo(end.x+Math.cos(a)*(r+10*(1-k)),end.y+Math.sin(a)*(r+10*(1-k))); g.stroke();
    }
    g.restore();
  }
  if(age>=5.3 && age<6) {
    const u=1-ease((age-5.3)/.7), p=at(u);
    g.save(); g.lineWidth=3; g.globalAlpha=.75; stroke(u,Math.min(1,u+.13),9);
    g.globalAlpha=1; g.shadowColor=`rgb(${blue})`; g.shadowBlur=12;
    g.fillStyle="#b9d9ff"; g.beginPath(); g.arc(p.x,p.y,5,0,Math.PI*2); g.fill(); g.restore();
  }
  g.restore();
}

export function OutreachCrowd() {
  const scene = useRef<HTMLDivElement>(null);
  const controls = useRef<Controls|null>(null);
  const [state,setState] = useState<"playing"|"paused"|"reduced">("playing");
  useEffect(()=>{
    const root=scene.current;
    if(!root) return;
    const canvas=root.querySelector<HTMLCanvasElement>("canvas")!;
    const g=canvas.getContext("2d");
    if(!g) return;
    const tile=root.querySelector<HTMLElement>("[data-tile]")!;
    const compose=root.querySelector<HTMLElement>("[data-compose]")!;
    const typed=root.querySelector<HTMLElement>("[data-typed]")!;
    const tips=Array.from(root.querySelectorAll<HTMLElement>("[data-tip]"));
    const people:Walker[]=Array.from(root.querySelectorAll<HTMLElement>("[data-walker]"),(el,i)=>({
      ...walkers[i],el,w:0,h:0,y:0,px:0,bob:0,v:1,active:false,reached:false,
    }));
    const preference=matchMedia("(prefers-reduced-motion: reduce)");
    const slots:Slot[]=[];
    const localAnims=new Set<Animation>();
    let visible:Walker[]=[], width=0, height=0, source:Point={x:0,y:0};
    let paused=false, reduced=preference.matches, inView=true, raf=0, last=0, now=0, next=.6, count=0, pointer=0, parallax=0;
    const animate=(el:HTMLElement,frames:Keyframe[],duration:number)=>{
      if(reduced) return;
      const a=el.animate(frames,{duration,easing:"cubic-bezier(.24,.76,.24,1)"});
      localAnims.add(a); a.onfinish=()=>localAnims.delete(a);
    };
    function measure() {
      width=root!.clientWidth; height=root!.clientHeight;
      const dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
      g!.setTransform(dpr,0,0,dpr,0,0);
      source={x:width/2,y:tile.offsetHeight/2+tile.parentElement!.offsetTop};
      visible=people.filter(p=>getComputedStyle(p.el).display!=="none");
      const base=width<=480?84:width<=740?108:140;
      for(const p of visible) {
        p.w=base*(1+p.depth*.93); p.h=p.w*1.35; p.y=height*(.59+p.depth*.39);
        p.el.style.width=p.w+"px"; p.el.style.height=p.h+"px"; p.el.style.top=p.y+"px";
      }
      for(let i=slots.length-1;i>=0;i--) if(!visible.includes(slots[i].p) || (width<760 && i>0)) release(i);
      paint(0);
    }
    function release(index:number) {
      const s=slots[index]; s.box.dataset.show="false"; s.p.active=false;
      delete s.p.el.dataset.focused; slots.splice(index,1);
    }
    function start(time:number, force=false) {
      const activeLimit=width<760?1:width<1150?2:3;
      if(slots.length>=activeLimit) return;
      const side=count%2===0?1:-1, cx=width/2;
      const candidates=visible.filter(p=>!p.active && !p.reached && p.depth>.27 && p.depth<.89 &&
        p.px>width*.10 && p.px<width*.90 && Math.abs(p.px-cx)>Math.min(112,width*.13) &&
        slots.every(s=>Math.abs(s.p.px-p.px)>Math.min(325,width*.28)));
      const p=candidates.find(p=>(p.px-cx)*side>0)??candidates[0]??(force?visible[3]:undefined);
      const tip=tips.find(t=>slots.every(s=>s.tip!==t));
      if(!p||!tip) return;
      p.active=true; p.el.dataset.focused="true";
      const box=tip.firstElementChild as HTMLElement;
      slots.push({p,tip,box,tag:box.firstElementChild as HTMLElement,text:box.lastElementChild as HTMLElement,story:examples[count++%examples.length],t0:time,phase:0});
      next=time+(width<760?7.45:3.25);
    }
    function tipContent(s:Slot,kind:"signal"|"reply") {
      s.box.dataset.kind=kind; s.box.dataset.show="true";
      s.tag.textContent=kind==="signal"?s.story.tag:"Reply";
      s.text.textContent=kind==="signal"?s.story.signal:s.story.reply;
      animate(s.box,[{opacity:0,translate:"0 5px"},{opacity:1,translate:"0 0"}],220);
    }
    function paint(dt:number) {
      if(!width||!height) return;
      parallax+=(pointer-parallax)*Math.min(1,dt*4);
      for(const p of visible) {
        const desired=p.active?(p.reached?0:.38):1;
        p.v+=(desired-p.v)*Math.min(1,dt*5);
        p.x+=p.dir*p.speed*p.v*dt;
        if(!p.active && (p.x>115||p.x< -15)) {
          p.x=p.dir>0?-14:114; p.reached=false; delete p.el.dataset.done;
        }
        const phase=Math.sin(now*Math.PI*(1.5+p.speed*.22)+p.phase);
        p.bob=-Math.abs(phase)*(1.5+2.5*p.depth)*p.v;
        p.px=p.x/100*width-parallax*p.depth*width*.02;
        p.el.style.transform=`translate3d(${(p.px-p.w/2).toFixed(1)}px,${(-p.h/2+p.bob).toFixed(1)}px,0) rotate(${(phase*.7*p.v).toFixed(2)}deg)`;
      }
      if(now>=next&&!reduced) { next=now+.3; start(now); }
      g!.clearRect(0,0,width,height);
      let composing:Slot|undefined;
      for(let i=slots.length-1;i>=0;i--) {
        const s=slots[i], age=now-s.t0, p=s.p;
        if(age>=7.1) { release(i); continue; }
        if(age>=.9 && s.phase<1) { s.phase=1; tipContent(s,"signal"); }
        if(age>=1.8 && age<2.9) composing=s;
        if(age>=2.9 && s.phase<2) { s.phase=2; animate(tile,[{scale:"1"},{scale:"1.13"},{scale:"1"}],440); }
        if(age>=3.75 && s.phase<3) {
          s.phase=3; p.reached=true;
          animate(p.el.firstElementChild as HTMLElement,[{translate:"0 0"},{translate:"0 -15px"},{translate:"0 0"}],510);
        }
        if(age>=4.45 && s.phase<4) { s.phase=4; tipContent(s,"reply"); }
        if(age>=6 && s.phase<5) { s.phase=5; p.el.dataset.done="true"; }
        if(age>=6.7) s.box.dataset.show="false";
        const head={x:p.px,y:p.y-p.h*.2+p.bob};
        drawBeam(g!,source,head,p.w,age,now);
        if(s.box.dataset.show==="true") {
          const half=s.box.offsetWidth/2;
          const x=Math.min(width-half-7,Math.max(half+7,head.x));
          let y=Math.max(126,head.y-p.h*.21-11);
          for(const other of slots.slice(0,i)) {
            if(Math.abs(other.p.px-p.px)<285 && Math.abs(other.p.y-p.y)<48) y-=32;
          }
          s.tip.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
          s.box.style.setProperty("--tail",(50+(head.x-x)/(half*2)*100)+"%");
        }
      }
      compose.dataset.show=composing?"true":"false";
      if(composing) {
        const letters=Math.ceil(unit((now-composing.t0-1.8)/.8)*composing.story.line.length);
        const text=composing.story.line.slice(0,letters);
        if(typed.textContent!==text) typed.textContent=text;
      }
    }
    function frame(ms:number) {
      const dt=last?Math.min(.09,(ms-last)/1000):0; last=ms; now+=dt; paint(dt);
      raf=requestAnimationFrame(frame);
    }
    function sync() {
      if(raf) cancelAnimationFrame(raf); raf=0; last=0;
      const running=!paused&&!reduced&&!document.hidden&&inView;
      for(const a of localAnims) if(running) a.play(); else a.pause();
      if(running) raf=requestAnimationFrame(frame);
      setState(reduced?"reduced":paused?"paused":"playing");
    }
    function staticFrame() {
      while(slots.length) release(0);
      for(const p of people) { p.active=false; p.reached=false; delete p.el.dataset.done; }
      now=0; next=.6; count=0; paint(0); start(0,true); now=5.55; paint(0);
      if(slots[0]) slots[0].p.el.dataset.done="true";
    }
    const resize=new ResizeObserver(()=>{measure(); if(reduced) staticFrame();});
    const intersection=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting; sync();});
    const change=()=>{reduced=preference.matches; if(reduced) staticFrame(); sync();};
    const move=(e:PointerEvent)=>{pointer=(e.clientX-root!.getBoundingClientRect().left)/width-.5;};
    controls.current={toggle:()=>{paused=!paused;sync();}};
    measure(); if(reduced) staticFrame(); sync();
    resize.observe(root); intersection.observe(root); root.addEventListener("pointermove",move);
    document.addEventListener("visibilitychange",sync); preference.addEventListener("change",change);
    return ()=>{
      if(raf) cancelAnimationFrame(raf); controls.current=null;
      resize.disconnect(); intersection.disconnect(); localAnims.forEach(a=>a.cancel());
      root.removeEventListener("pointermove",move); document.removeEventListener("visibilitychange",sync);
      preference.removeEventListener("change",change);
    };
  },[]);
  const still=state!=="playing";
  return (
    <div className={styles.scene} ref={scene} data-outreach-scene data-animation-state={state}>
      <div className={styles.controls}>
        <span className={styles.sample}>Fictional outreach example</span>
        <button className={styles.motionButton} type="button" aria-label={still?"Play outreach animation":"Pause outreach animation"} onClick={()=>controls.current?.toggle()}>
          {still?<Play size={15} aria-hidden="true"/>:<Pause size={15} aria-hidden="true"/>}
        </button>
      </div>
      <p className={styles.pausedText}>An illustrated prospect shows a hiring signal. Aaron writes a first line, sends the email, and receives a reply asking for a sample list.</p>
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.figures}>
          {walkers.map((p,i)=>(
            <div key={i} className={styles.person} data-walker style={{
              "--x":p.x+"vw","--top":(59+p.depth*39)+"%","--w":`clamp(${84+p.depth*80}px,${12+p.depth*8}vw,${140+p.depth*130}px)`,
              "--order":Math.round(10+p.depth*80),"--tone":`blur(${((1-p.depth)*1.05).toFixed(2)}px)`,
              "--opacity":.43+p.depth*.51,"--dir":p.dir,
            } as CSSProperties}>
              <span className={styles.figure}>
                {/* The original illustration files are local resolution-independent SVGs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/crowd-peeps/${p.image}.svg`} alt="" loading="lazy" decoding="async" draggable={false}/>
                <i className={styles.tick}><Check size={14} strokeWidth={3}/></i>
              </span>
            </div>
          ))}
        </div>
        <canvas className={styles.effectCanvas}/>
        <div className={styles.beacon}><div className={styles.tile} data-tile><Mail size={26} strokeWidth={1.8}/></div></div>
        <div className={styles.compose}><div className={styles.composeBox} data-compose data-show="false"><span className={styles.tag}>First line</span><span data-typed/><i className={styles.cursor}/></div></div>
        {[0,1,2].map(i=><div key={i} className={styles.tip} data-tip><div className={styles.bubble} data-show="false"><span className={styles.tag}/><span/></div></div>)}
      </div>
    </div>
  );
}
