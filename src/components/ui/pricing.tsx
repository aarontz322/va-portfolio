"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, StarIcon } from "lucide-react";
import { motion, Transition } from "framer-motion";
import { BorderTrail } from "@/components/ui/border-trail";

type FREQUENCY = "monthly" | "yearly";
const frequencies: FREQUENCY[] = ["monthly", "yearly"];

interface Plan {
  name: string;
  info: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: {
    text: string;
    tooltip?: string;
  }[];
  btn: {
    text: string;
    href: string;
  };
  highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<"div"> {
  plans: Plan[];
  heading: string;
  description?: string;
}

export function PricingSection({
  plans,
  heading,
  description,
  ...props
}: PricingSectionProps) {
  const [frequency, setFrequency] = React.useState<"monthly" | "yearly">("monthly");

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center space-y-5 p-4",
        props.className
      )}
      {...props}
    >
      <div className="mx-auto max-w-xl space-y-2">
        <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl font-display">
          {heading}
        </h2>
        {description && (
          <p className="text-muted-foreground text-center text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3 mt-8">
        {plans.map((plan) => (
          <PricingCard plan={plan} key={plan.name} frequency="monthly" />
        ))}
      </div>
    </div>
  );
}

type PricingFrequencyToggleProps = React.ComponentProps<"div"> & {
  frequency: FREQUENCY;
  setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
  frequency,
  setFrequency,
  ...props
}: PricingFrequencyToggleProps) {
  return (
    <div
      className={cn(
        "bg-muted/30 mx-auto flex w-fit rounded-full border p-1",
        props.className
      )}
      {...props}
    >
      {frequencies.map((freq) => (
        <button
          key={freq}
          onClick={() => setFrequency(freq)}
          className="relative px-4 py-1 text-sm capitalize"
        >
          <span className="relative z-10">{freq}</span>
          {frequency === freq && (
            <motion.span
              layoutId="frequency"
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-foreground absolute inset-0 z-10 rounded-full mix-blend-difference"
            />
          )}
        </button>
      ))}
    </div>
  );
}

type PricingCardProps = React.ComponentProps<"div"> & {
  plan: Plan;
  frequency?: FREQUENCY;
};

export function PricingCard({
  plan,
  className,
  frequency = frequencies[0],
  ...props
}: PricingCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative flex w-full flex-col rounded-lg border bg-background/70 backdrop-blur-md group overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 80%)",
        }}
      />
      {plan.highlighted ? (
        <BorderTrail
          style={{
            boxShadow:
              "0px 0px 60px 30px rgb(59 142 255 / 30%), 0 0 100px 60px rgb(59 142 255 / 15%)",
          }}
          size={100}
        />
      ) : (
        <BorderTrail
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "0 0 20px 10px rgba(59, 130, 246, 0.25)",
          }}
          size={80}
        />
      )}
      <div
        className={cn(
          "bg-muted/20 rounded-t-lg border-b p-4",
          plan.highlighted && "bg-muted/40"
        )}
      >
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
          {plan.highlighted && (
            <p className="bg-background flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
              <StarIcon className="h-3 w-3 fill-current" />
              Popular
            </p>
          )}
          {frequency === "yearly" && (
            <p className="bg-primary text-primary-foreground flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
              {Math.round(
                ((plan.price.monthly * 12 - plan.price.yearly) /
                  plan.price.monthly /
                  12) *
                  100
              )}
              % off
            </p>
          )}
        </div>

        <div className="text-lg font-medium font-display">{plan.name}</div>
        <p className="text-muted-foreground text-base font-normal">{plan.info}</p>
        <h3 className="mt-2 flex items-end gap-1">
          <span className="text-3xl font-bold font-display">
            ${frequency === "monthly" ? plan.price.monthly : Math.round(plan.price.yearly / 12)}
          </span>
          <span className="text-muted-foreground">
            {plan.name !== "Free" ? "/month" : ""}
          </span>
        </h3>
        {frequency === "yearly" && (
          <p className="text-muted-foreground text-xs mt-1">
            ${plan.price.yearly}/year billed annually
          </p>
        )}
      </div>
      <div
        className={cn(
          "text-muted-foreground space-y-4 px-4 py-6 text-base flex-1",
          plan.highlighted && "bg-muted/10"
        )}
      >
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircleIcon className="text-foreground h-4 w-4 shrink-0" />
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p
                    className={cn(
                      feature.tooltip && "cursor-pointer border-b border-dashed"
                    )}
                  >
                    {feature.text}
                  </p>
                </TooltipTrigger>
                {feature.tooltip && (
                  <TooltipContent>
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "mt-auto w-full border-t p-3",
          plan.highlighted && "bg-muted/40"
        )}
      >
        <Button
          className="w-full"
          variant={plan.highlighted ? "default" : "outline"}
          asChild
        >
          <a href={plan.btn.href}>{plan.btn.text}</a>
        </Button>
      </div>
    </div>
  );
}


