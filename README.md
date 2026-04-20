# Mark Aaron Novicio — VA Portfolio

Built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Components used
- `shiny-button` — from 21st.dev/r/dillionverma/shiny-button
- `pricing` — from 21st.dev/r/sshahaider/pricing
- `testimonials-columns` — scrolling columns
- `hover-footer` — from 21st.dev/r/mdafsarx/hover-footer (SVG draw-on text + cursor glow)
- `splite` — from 21st.dev/r/serafimcloud/splite (Spline 3D scene wrapper)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
npm start
```

## Deploy to Vercel (free)
```bash
npm install -g vercel
vercel
```

Or drag the project folder to [vercel.com](https://vercel.com) for instant deploy.

## Project Structure
```
src/
  app/
    globals.css        # CSS variables + Tailwind
    layout.tsx         # Root layout with fonts
    page.tsx           # Main page assembling all sections
  components/
    ui/
      button.tsx           # shadcn Button
      tooltip.tsx          # shadcn Tooltip
      shiny-button.tsx     # 21st.dev shiny button
      hover-footer.tsx         # 21st.dev hover text effect + footer gradient
      splite.tsx               # 21st.dev Spline 3D scene wrapper
      testimonials-columns.tsx  # Scrolling testimonials columns
    sections/
      nav.tsx
      hero.tsx
      transform.tsx
      services.tsx
      pricing-wrapper.tsx
      works.tsx
      testimonials.tsx
      about.tsx
      contact.tsx
  lib/
    utils.ts           # shadcn cn() utility
```

## Customization
- Colors: edit CSS variables in `src/app/globals.css`
- Content: edit data directly in each section file
- Fonts: change in `src/app/layout.tsx`
