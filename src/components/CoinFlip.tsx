"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CoinFlipProps {
  nicknames: { partnerA: string; partnerB: string };
}

export default function CoinFlip({ nicknames }: CoinFlipProps) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    const winner = Math.random() < 0.5 ? "A" : "B";
    
    // 多转几圈增加写实感 (10圈 + 结果偏移)
    const baseRotation = rotation + 3600; 
    const finalRotation = winner === "A" ? baseRotation - (baseRotation % 360) : baseRotation - (baseRotation % 360) + 180;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setResult(winner);
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <div className="card">
      <h3 className="section-title">今天谁洗？</h3>
      <div className="flex flex-col items-center gap-4">
        {/* 3D Coin Container with more realism */}
        <div className="perspective-1000 w-[80px] h-[80px] cursor-pointer group" onClick={flipCoin}>
          <motion.div
            animate={{ rotateY: rotation }}
            transition={{ duration: 1, ease: [0.45, 0.05, 0.55, 0.95] }}
            className="relative w-full h-full preserve-3d"
          >
            {/* Front Side (Partner A) - Metallic Orange */}
            <div className="absolute inset-0 backface-hidden w-full h-full rounded-full bg-gradient-to-br from-[#f8e0c8] via-[var(--accent-a)] to-[#d09050] border-[3px] border-[#b07030] flex items-center justify-center text-white font-bold text-[10px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.2)] px-2 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_70%)]"></div>
              <span className="relative z-10 drop-shadow-md">{nicknames.partnerA}</span>
              {/* Coin Edge Texture */}
              <div className="absolute inset-0 border-[1px] border-white/20 rounded-full scale-95"></div>
            </div>

            {/* Back Side (Partner B) - Metallic Blue */}
            <div className="absolute inset-0 backface-hidden w-full h-full rounded-full bg-gradient-to-br from-[#c8e0f8] via-[var(--accent-b)] to-[#7090d0] border-[3px] border-[#6080c0] flex items-center justify-center text-white font-bold text-[10px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_8px_rgba(0,0,0,0.2)] px-2 text-center rotate-y-180 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_70%)]"></div>
              <span className="relative z-10 drop-shadow-md">{nicknames.partnerB}</span>
              {/* Coin Edge Texture */}
              <div className="absolute inset-0 border-[1px] border-white/20 rounded-full scale-95"></div>
            </div>
          </motion.div>
          {/* Subtle drop shadow below coin */}
          <div className="w-12 h-1.5 bg-black/10 rounded-full blur-[2px] mx-auto mt-2 scale-x-125 transition-transform group-hover:scale-x-150"></div>
        </div>
        
        <div className="text-center min-h-[40px] flex items-center justify-center">
          {isFlipping ? (
            <span className="text-[11px] text-[var(--text-muted)] animate-pulse">决定中…</span>
          ) : result ? (
            <div className="text-[13px] text-[var(--text-main)] leading-tight">
              今天由<br />
              <strong className={`text-[15px] ${result === 'A' ? 'text-[#b06020]' : 'text-[#6080c0]'}`}>
                {result === 'A' ? nicknames.partnerA : nicknames.partnerB}
              </strong><br />
              来洗碗 🫧
            </div>
          ) : (
            <span className="text-[11px] text-[var(--text-muted)]">点击硬币翻转</span>
          )}
        </div>
      </div>
    </div>
  );
}
