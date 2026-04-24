"use client";

import { useState } from "react";

const characters = [
  { name: "Nyanis", src: "/characters/Nyanis.png" },
  { name: "Fuwa", src: "/characters/Fuwa.png" },
  { name: "Mav", src: "/characters/Mav.png" },
  { name: "Xia", src: "/characters/Xia.png" },
  { name: "Grey", src: "/characters/Grey.png" },
  { name: "Yuuki", src: "/characters/Yuuki.png" },
  { name: "Nicole", src: "/characters/Jeanrine.png" },
  { name: "Jem", src: "/characters/Jem.png" },
  { name: "Rae", src: "/characters/Rae.png" },
];

const CharacterGallery = () => {
  const [expandedIndex, setExpandedIndex] = useState(4); // Default to center item (Grey)

  return (
    <section className="w-full py-20 bg-[#0f1923] overflow-hidden flex flex-col items-center">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
          THE <span className="text-[#ff4655]">SQUAD</span>
        </h2>
        <p className="text-gray-400 mt-2 font-medium tracking-widest uppercase text-sm">
          Select an Agent to Expand
        </p>
      </div>

      <div className="relative flex w-full max-w-7xl h-[32rem] items-center justify-center gap-2 px-4">
        {characters.map((char, idx) => {
          const isExpanded = idx === expandedIndex;
          
          return (
            <div
              key={idx}
              className={`relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group ${
                isExpanded ? "flex-[4] ring-2 ring-[#ff4655] shadow-[0_0_30px_rgba(255,70,85,0.3)]" : "flex-1 grayscale opacity-60 hover:opacity-100"
              }`}
              style={{
                height: "100%",
              }}
              onMouseEnter={() => setExpandedIndex(idx)}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={char.src}
                alt={char.name}
              />
              
              {/* Overlay for name */}
              <div className={`absolute bottom-0 left-0 w-full p-6 transition-all duration-500 bg-gradient-to-t from-black/80 to-transparent ${
                isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <p className="text-[#ff4655] text-xs font-bold tracking-[0.3em] uppercase mb-1">Agent Details</p>
                <h3 className="text-white text-3xl font-black uppercase tracking-tighter italic">
                  {char.name}
                </h3>
              </div>

              {/* Character number / indicator */}
              <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
                0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CharacterGallery;
