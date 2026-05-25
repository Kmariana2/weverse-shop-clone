'use client';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 md:py-24 overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
          BTS WORLD TOUR
          <br />
          <span className="text-red-500">[ARIRANG]</span>
        </h1>

        <p className="text-2xl md:text-3xl mb-8 text-gray-300">
          Official Tour Merchandise
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full pulse-red" />
            <span>2026.06 — 2027.01 · 28 Cities · Worldwide</span>
          </div>
        </div>
      </div>
    </div>
  );
}
