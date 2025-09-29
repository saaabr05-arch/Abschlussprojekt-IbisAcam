"use client";

import { bmwModels, BMWModel } from "@/lib/bmw-data";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface BMWCarCardProps 
{
  model: BMWModel;
}

function BMWCarCard(
{ 
  model 
}
: BMWCarCardProps) 
{
  return (
    <div className="bmw-card flex-shrink-0 bg-[#fafaf5] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 max-w-[200px] snap-start">
      <Image
        src={model.bild}
        alt={`BMW ${model.name}`}
        width={200}
        height={140}
        className="w-full h-[140px] object-cover block"
      />
      <div className="p-2.5 text-center">
        <h3 className="bmw-title my-0.5 text-base font-semibold text-black">
          BMW {model.name}
        </h3>
        <br />
        <p className="bmw-location text-[#666] text-sm m-0">
          Typ: {model.typ} – {model.bes}
        </p>
      </div>
    </div>
  );
}

interface CategorySectionProps 
{
  category: string;
  models: BMWModel[];
}

function CategorySection({ category, models }: CategorySectionProps) 
{
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => 
  {
    const container = containerRef.current;
    if (!container) return;

    let scrollInterval: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => 
    {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;

      if (scrollInterval) 
      {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }

      const speed = 400;

      if (x < width / 3) 
      {
        scrollInterval = setInterval(() => 
          {
          container.scrollLeft -= speed;
          if (container.scrollLeft <= 0) {
            if (scrollInterval) clearInterval(scrollInterval);
          }
        }, 16);
      } 
      else if (x > (width * 2) / 3) 
      {
        scrollInterval = setInterval(() => 
        {
          container.scrollLeft += speed;
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScroll) 
          {
            if (scrollInterval) clearInterval(scrollInterval);
          }
        }, 16);
      }
    };

    const handleMouseLeave = () => 
    {
      if (scrollInterval) 
      {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => 
    {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (scrollInterval) 
      {
        clearInterval(scrollInterval);
      }
    };
  }, []);

  return (
    <section className="category-block mb-12 px-2.5">
      <h2
        className="category-title text-[22px] my-8 mx-0 mb-2.5 font-bold text-center py-1.5 border-l-[6px] border-r-[6px] border-[var(--text-secondary)]"
        style={{
          background: "#FAFAF5",
          color: "var(--text-secondary)",
          fontFamily: "Newsreader, serif",
          opacity: "0.84",
        }}
      >
        {category}
      </h2>
      <div
        ref={containerRef}
        className="card-scroll-container overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="card-grid-horizontal flex gap-5 p-2.5 py-2.5 px-1.5">
          {models.map((model, index) => (
            <BMWCarCard key={`${category}-${index}`} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BMWCarGrid() 
{
  return (
    <div className="w-full" id="car-grid">
      {Object.entries(bmwModels).map(([category, models]) => (
        <CategorySection key={category} category={category} models={models} />
      ))}
    </div>
  );
}