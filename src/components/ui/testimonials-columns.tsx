"use client";
import React from "react";
import { motion } from "framer-motion";

export const testimonials = [
  {
    text: "Thank you for keeping an eye on things and taking good care of them while I was gone. Your efforts are much appreciated.",
    image: "avatars/Eric.png",
    name: "Eric Udell",
    role: "Arizona Natural Health Center",
  },
  {
    text: "I am seeing 20+ per week accepting the invites, so it seems like a pretty good success rate to me.",
    image: "avatars/Nick.png",
    name: "Nick Jarvis",
    role: "Pinnacle Logistics",
  },
  {
    text: "Aaron has been a great help, very reliable , and I really appreciate the updates he provides. His work has been amazing, and he always makes things easy for me to review and manage. I’m happy to trust him with additional work because I know he delivers quality results.",
    image: "avatars/Gloria.png",
    name: "Gloria Cuttica",
    role: "Interopa Holidays",
  },
  {
    text: "I hired Aaron to help with admin tasks and he not only did what I asked very fast but went above and beyond. I would recommend his services to anyone.",
    image: "avatars/Stuart.png",
    name: "Stuart Baker",
    role: "Forbes Trading LLC",
  },
  {
    text: "I trust and appreciate you. I have been taken advantage of before — that is why I triple check to make sure we are hitting our targets.",
    image: "avatars/Forest.png",
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
                    <div className="font-medium text-sm tracking-[-0.02em] leading-5 text-[hsl(var(--foreground))]">
                      {name}
                    </div>
                    <div className="text-xs leading-5 text-[hsl(var(--muted-foreground))] tracking-[-0.02em]">
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
