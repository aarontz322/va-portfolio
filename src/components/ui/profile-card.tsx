"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Briefcase, 
  ArrowUpRight, 
  Clock, 
  Globe,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  name?: string;
  role?: string;
  bio?: string;
  avatarSrc?: string;
  skills?: string[];
  status?: "available" | "busy" | "away";
  email?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    onlinejobs?: string;
    upwork?: string;
  };
  calendlyLink?: string;
}

export function ProfileCard({
  name = "Aaron Novicio",
  role = "Lead Gen, Outreach and Automation Specialist",
  bio = "I help founders scale by automating their friction and managing their lead machines.",
  avatarSrc = "/avatar.png",
  skills = ["Lead Gen", "Outreach", "Automations", "Data"],
  status = "available",
  email = "eyronggwp@gmail.com",
  socialLinks = {
    facebook: "#",
    linkedin: "#",
    onlinejobs: "#",
    upwork: "#",
  },
  calendlyLink = "#contact",
}: ProfileCardProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColor = {
    available: "bg-emerald-500",
    busy: "bg-amber-500",
    away: "bg-rose-500",
  }[status];

  const statusText = {
    available: "Available for new projects",
    busy: "Currently booked",
    away: "Away / Resting",
  }[status];

  const timeText = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Background Decorative Elements */}
      <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000" />
      
      <div className="relative overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-600 opacity-20 blur-3xl"
        />
      </div>

      <Card className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_70px_-15px_rgba(120,119,198,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

        <CardContent className="relative p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center h-3 w-3">
                <span className={cn("absolute h-3 w-3 rounded-full animate-pulse", statusColor)} />
                <span className={cn("absolute h-3 w-3 rounded-full", statusColor, "animate-ping")} />
              </div>
              <span className="text-sm font-medium text-gray-300">{statusText}</span>
            </div>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 blur-md opacity-60" />
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 shadow-xl">
                <div className="relative h-full w-full bg-gray-800 flex items-center justify-center text-3xl">
                  {avatarSrc === "/avatar.png" ? "👨‍💻" : (
                     <Image
                     src={avatarSrc}
                     alt={`${name} avatar`}
                     fill
                     sizes="96px"
                     className="object-cover"
                     style={{ objectPosition: '98% 30%' }}
                   />
                  )}
                </div>
              </div>
            </motion.div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <h1 className="mb-1 text-2xl sm:text-3xl font-extrabold tracking-tighter text-white font-display leading-tight">
                {name}
              </h1>
              <p className="mb-4 text-sm sm:base font-semibold text-[hsl(var(--primary))] uppercase tracking-wider">{role}</p>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed line-clamp-3 sm:line-clamp-none">{bio}</p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2 justify-center sm:justify-start">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 px-4 py-2 text-sm font-medium text-gray-200 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredButton("hire")}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <Button
                className="relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-purple-700 hover:to-cyan-700 border-none"
                asChild
              >
                <a href={calendlyLink} target={calendlyLink.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Hire Me
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleCopy}
                variant="outline"
                className="h-14 w-full rounded-2xl border-white/20 bg-white/5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
              >
                <Mail className="mr-2 h-5 w-5" />
                {copied ? "Email Copied!" : "Copy Email"}
              </Button>
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            {[
              { icon: FaFacebook, label: "Facebook", href: socialLinks.facebook },
              { icon: FaLinkedin, label: "LinkedIn", href: socialLinks.linkedin },
              { icon: Briefcase, label: "Onlinejobs.ph", href: socialLinks.onlinejobs },
              { icon: SiUpwork, label: "Upwork", href: socialLinks.upwork },
            ].map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white/5 p-3 text-gray-400 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <motion.div
            className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
