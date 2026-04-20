"use client";
import React from "react";
import { motion } from "framer-motion";

export const testimonials = [
  {
    text: "Thank you for keeping an eye on things and taking good care of them while I was gone. Your efforts are much appreciated.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    name: "Eric Udell",
    role: "Arizona Natural Health Center",
  },
  {
    text: "I am seeing 20+ per week accepting the invites, so it seems like a pretty good success rate to me.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Nick Jarvis",
    role: "Pinnacle Logistics",
  },
  {
    text: "I hired Mark to help with admin tasks and he not only did what I asked very fast but went above and beyond. I would recommend his services to anyone.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    name: "Stuart Baker",
    role: "Forbes Trading LLC",
  },
  {
    text: "I trust and appreciate you. I have been taken advantage of before — that is why I triple check to make sure we are hitting our targets.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    name: "Forest Hipp",
    role: "Legal Spark LLC",
  },
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-lg shadow-[hsl(var(--primary)/8%)] max-w-xs w-full"
                key={i}
              >
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{text}</p>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border border-[hsl(var(--border))]"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium text-sm tracking-tight leading-5 text-[hsl(var(--foreground))]">
                      {name}
                    </div>
                    <div className="text-xs leading-5 text-[hsl(var(--muted-foreground))] tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
