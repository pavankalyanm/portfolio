"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
  tags?: string[]
  href?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const layoutIcons = {
  stack: Layers,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function Component({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse()
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 6,
          left: stackPosition * 6,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  const containerStyles = {
    stack: "relative h-52 w-[290px]",
    list: "flex flex-col gap-2 w-full max-w-[290px] h-52 overflow-y-auto pr-1 [scrollbar-width:thin]",
  }

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("flex flex-col items-center gap-2.5 w-full", className)}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-0.5 rounded-md bg-[#f5f5f7] p-0.5 w-fit mx-auto border border-[#ececef]">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={cn(
                "rounded p-1.5 transition-all",
                layout === mode
                  ? "bg-white text-[#1d1d1f] shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
                  : "text-[#86868b] hover:text-[#1d1d1f]",
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          )
        })}
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isExpanded ? 1.05 : 1,
                    x: 0,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-[10px] border border-[#ececef] bg-white p-2.5",
                    "hover:border-[#c7c7cc] transition-colors",
                    layout === "stack" && "absolute w-[278px] h-[196px] overflow-hidden",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "list" && "w-full",
                    isExpanded && "ring-2 ring-[#1d1d1f]/20",
                  )}
                  style={{
                    backgroundColor: card.color || undefined,
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    {card.icon && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f5f5f7] text-[#1d1d1f] [&>svg]:h-4 [&>svg]:w-4">
                        {card.icon}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-[12.5px] font-semibold text-[#1d1d1f] truncate tracking-[-0.005em]">
                          {card.title}
                        </h3>
                        {card.href && (
                          <a
                            href={card.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="shrink-0 text-[9px] uppercase tracking-[0.12em] text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                          >
                            Visit ↗
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-[#86868b] leading-[1.45] mt-1">
                        {card.description}
                      </p>
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {card.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full border border-[#ececef] bg-[#fafafa] px-1.5 py-[1px] text-[9px] font-medium text-[#6e6e73] tracking-[-0.005em]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {isTopCard && (
                    <div className="absolute bottom-1.5 left-0 right-0 text-center">
                      <span className="text-[9px] text-[#a1a1a6] tracking-[0.04em]">
                        swipe
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-1">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1 rounded-full transition-all",
                index === activeIndex
                  ? "w-3 bg-[#1d1d1f]"
                  : "w-1 bg-[#d2d2d7] hover:bg-[#86868b]",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
