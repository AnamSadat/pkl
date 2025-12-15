"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@repo/ui/components/card";
import { Home } from "lucide-react";

export function OverviewCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = Array.from({ length: 4 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.firstElementChild?.clientWidth || 1;
      const index = Math.round(el.scrollLeft / (cardWidth + 16)); // 16 = gap-4
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-3">
      {/* Carousel */}
      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto pb-2
          scroll-snap-x scroll-snap-mandatory
          lg:grid lg:grid-cols-4 lg:gap-6
          lg:scroll-snap-none
          no-scrollbar
        "
      >
        {items.map((_, index) => (
          <Card
            key={index}
            className="
              min-w-[75%] sm:min-w-[240px]
              flex flex-row items-center gap-2 p-4 
              scroll-snap-center shrink-0
            "
          >
            <Home />
            <div>
              <p>saya</p>
              <p>saya</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 lg:hidden">
        {items.map((_, i) => (
          <div
            key={i}
            className={`
              h-2 w-2 rounded-full transition-all duration-300
              ${i === activeIndex ? "bg-black w-4" : "bg-gray-400"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
