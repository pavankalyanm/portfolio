"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconGridItem {
  id: string;
  icon: React.ReactNode;
  name: string;
  href?: string;
  copyValue?: string;
}

export interface IconGridProps {
  items: IconGridItem[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const IconGrid = React.forwardRef<HTMLDivElement, IconGridProps>(
  ({ items, className }, ref) => {
    const [copiedId, setCopiedId] = React.useState<string | null>(null);

    const handleCopy = (e: React.MouseEvent, item: IconGridItem) => {
      e.preventDefault();
      e.stopPropagation();
      const value = item.copyValue;
      if (!value) return;
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((c) => (c === item.id ? null : c)), 1600);
      const writeToClipboard = (text: string) => {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
        } else {
          fallbackCopy(text);
        }
      };
      const fallbackCopy = (text: string) => {
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        } catch {
          /* swallow */
        }
      };
      writeToClipboard(value);
    };

    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "grid grid-cols-3 gap-4 text-center sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
          className
        )}
      >
        {items.map((item) => {
          const isCopied = copiedId === item.id;
          const tile = (
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-card p-4 transition-all duration-300 ease-in-out group-hover:bg-card/60 group-hover:shadow-md">
              {item.icon}
            </div>
          );
          const copyBtn = item.copyValue ? (
            <button
              type="button"
              onClick={(e) => handleCopy(e, item)}
              aria-label={isCopied ? "Copied" : `Copy ${item.name}`}
              className="absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-[#e5e5ea] bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(16,24,40,0.08)] transition-all duration-150 hover:bg-[#f5f5f7] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e639c]"
            >
              {isCopied ? (
                <Check className="h-2.5 w-2.5 text-[#0e7d4f]" strokeWidth={3} />
              ) : (
                <Copy className="h-2.5 w-2.5" strokeWidth={2.25} />
              )}
            </button>
          ) : null;
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:-translate-y-1"
              aria-label={item.name}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0e639c]"
                >
                  {tile}
                </a>
              ) : (
                tile
              )}
              {copyBtn}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }
);

IconGrid.displayName = "IconGrid";

export { IconGrid };
