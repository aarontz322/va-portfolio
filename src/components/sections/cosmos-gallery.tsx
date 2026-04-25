"use client"
import { useRef } from "react"
import { useInView } from "framer-motion"
import dynamic from "next/dynamic"

const CosmosCanvas = dynamic(() => import("@/components/ui/cosmos-canvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-[hsl(213_100%_62%)] border-t-transparent animate-spin" />
    </div>
  ),
})

export function CosmosGallery() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { amount: 0.1, once: false })

  // The 11 sample work images from /public/works/
  const workImages = [
    "/works/Airtable%20Auto.png",
    "/works/Example.png",
    "/works/Example1.png",
    "/works/Example2.png",
    "/works/Example3.png",
    "/works/Example4.png",
    "/works/GHL%20Sample.png",
    "/works/Instantly.png",
    "/works/instantly_2026-03-23%20(2).jpg",
    "/works/Lead%20list.png",
    "/works/Make%20Sample%20Automations.png",
  ]

  return (
    <section ref={containerRef} id="cosmos-gallery" className="relative w-full h-[80vh] bg-black overflow-hidden">
      {/* Heading overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-16 pb-6 pointer-events-none">
        <h2 className="max-w-3xl mx-auto text-white text-center font-instrument-serif px-6 md:text-5xl text-3xl text-balance tracking-tight font-normal leading-tight">
          Real work. Real results.<br />
          <span className="text-[hsl(213_100%_62%)]">Drag to explore.</span>
        </h2>
      </div>

      {/* 3D Canvas — Only render when in view */}
      <div className="absolute inset-0">
        {isInView && <CosmosCanvas images={workImages} />}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(222_47%_5%)] to-transparent pointer-events-none z-10" />
    </section>
  )
}
