// src/components/Banner.tsx
import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

// ★ 핵심 해결책: Netlify 배포 환경에서 이미지가 깨지지 않도록 절대경로로 직접 수입합니다.
import bannerImg from '../assets/images/banner_1.png';

const FlipCard = memo(({ value, label }: { value: number; label: string }) => {
    const formatNum = (num: number) => String(num).padStart(2, '0');
    return (
        <div className="flex flex-col items-center">
            <div className="relative flex h-14 w-12 sm:h-16 sm:w-14 items-center justify-center rounded-lg border border-slate-700/60 bg-[#070b14] shadow-lg overflow-hidden">
                <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-black/60 z-10" />
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 15, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                        className="font-mono text-xl sm:text-2xl font-black text-[#dfc082] tracking-tight"
                    >
                        {formatNum(value)}
                    </motion.span>
                </AnimatePresence>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/[0.02] pointer-events-none" />
            </div>
            <span className="mt-1.5 font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {label}
            </span>
        </div>
    );
});

FlipCard.displayName = 'FlipCard';

export default function Banner() {
    const targetDate = new Date('2026-12-25T18:00:00+09:00').getTime();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = Date.now();
            const difference = targetDate - now;
            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
                return;
            }
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            setTimeLeft({ days, hours, minutes, seconds, isOver: false });
        };
        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="relative w-full rounded-2xl border border-gold-500/20 bg-[#0e1526] shadow-2xl overflow-hidden">
            <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden select-none">
                {/* ★ 핵심 마감:src 속성에 방금 위에서 수입한 bannerImg 변수를 매핑합니다. */}
                <img
                    src={bannerImg}
                    alt="Gala Night 2026 배경"
                    className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-1000 scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a13] via-transparent to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060a13]/40 via-transparent to-[#060a13]/40" />

                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 z-10">
                    <div className="flex items-center justify-between w-full">
                        <span className="inline-flex items-center rounded-full border border-[#c6a052]/40 bg-black/60 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#c6a052] backdrop-blur-md shadow-lg">
                            JANYTREE INVITATION
                        </span>
                        <span className="font-serif text-xs sm:text-sm font-semibold italic text-[#c6a052]/80 tracking-wider">
                            Gala Night 2026
                        </span>
                    </div>

                    <div className="mt-auto space-y-2">
                        <div className="space-y-0">
                            <p className="font-serif text-[10px] sm:text-xs tracking-[0.4em] text-[#c6a052]/60 uppercase pl-1">
                                INVITATION
                            </p>
                            <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-normal bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(198,160,82,0.5)]">
                                2026 송년의 밤
                            </h1>
                        </div>
                        <p className="font-sans text-[11px] sm:text-xs md:text-sm text-slate-300 tracking-wide font-light max-w-md leading-relaxed border-l-2 border-[#c6a052]/30 pl-2">
                            한 해 동안의 눈부신 여정에 감사드리며, 더 높은 도약을 꿈꾸는 자리에 함께 동행해 주세요.
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 bg-gradient-to-b from-[#0e1526] to-[#070b14] p-5 sm:p-6 text-center space-y-4">
                <div className="mx-auto max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-[#0a101f]/90 p-3.5 text-slate-200 shadow-md">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c6a052]/10 border border-[#c6a052]/20 text-[#c6a052]">
                            <Calendar className="h-4.5 w-4.5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">일정</p>
                            <p className="text-xs sm:text-sm font-extrabold text-slate-200 tracking-wide">2026. 12. 25 (금) 18:00</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-[#0a101f]/90 p-3.5 text-slate-200 shadow-md">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c6a052]/10 border border-[#c6a052]/20 text-[#c6a052]">
                            <MapPin className="h-4.5 w-4.5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">장소</p>
                            <p className="text-xs sm:text-sm font-extrabold text-slate-200 tracking-wide leading-tight">
                                그랜드 워커힐 서울 컨벤션 센터 4층 파인룸
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-md rounded-xl border border-[#c6a052]/20 bg-[#090f1d] p-4 sm:p-5 shadow-inner mt-2">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <Clock className="h-3.5 w-3.5 text-[#c6a052]" />
                        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#c6a052]">
                            GALA NIGHT COUNTDOWN
                        </span>
                    </div>

                    {timeLeft.isOver ? (
                        <div className="py-2">
                            <span className="font-serif text-sm sm:text-base font-black text-[#c6a052] tracking-wide animate-pulse">
                                🎉 2026 사내 송년의 밤이 개막했습니다! 지금 입장해 주세요 🎉
                            </span>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center gap-2.5 sm:gap-4 py-1">
                            <FlipCard value={timeLeft.days} label="Days" />
                            <div className="text-[#c6a052]/50 font-mono text-lg font-bold -mt-4">:</div>
                            <FlipCard value={timeLeft.hours} label="Hours" />
                            <div className="text-[#c6a052]/50 font-mono text-lg font-bold -mt-4">:</div>
                            <FlipCard value={timeLeft.minutes} label="Min" />
                            <div className="text-[#c6a052]/50 font-mono text-lg font-bold -mt-4">:</div>
                            <FlipCard value={timeLeft.seconds} label="Sec" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}