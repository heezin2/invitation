// src/components/LuckyDraw.tsx
import React, { useState } from 'react';
import { Gift, Award } from 'lucide-react';

export default function LuckyDraw() {
    const [result, setResult] = useState('추첨 대기 중 • 어떤 보상이 당신을 맞이할까요?');
    const [isRolling, setIsRolling] = useState(false);

    const rewards = [
        '🎫 오전 지각 1회 무료 이용권',
        '🍱 사장님과의 1:1 최고급 오찬 상담권',
        '🚀 오후 반차 프리패스권',
        '☕ 스타벅스 기프트 카드 3만원권',
        '🍺 회식 프리패스 도망권'
    ];

    const startDraw = () => {
        if (isRolling) return;
        setIsRolling(true);
        setResult('행운의 추첨 함을 흔드는 중...');

        let count = 0;
        const interval = setInterval(() => {
            const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
            setResult(randomReward);
            count++;

            if (count > 15) {
                clearInterval(interval);
                const finalReward = rewards[Math.floor(Math.random() * rewards.length)];
                setResult(`🎉 당첨! [ ${finalReward} ]`);
                setIsRolling(false);
            }
        }, 100);
    };

    return (
        <div className="w-full bg-[#131f3b]/60 border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-gold-500" />
                    <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100">Lucky Draw: 송년의 밤 행운 추첨</h3>
                </div>
                <span className="text-[10px] bg-gold-500/10 border border-gold-500/30 text-gold-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Award className="h-3 w-3" /> EVENT NO. 1
                </span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                본 행사에서 실시간으로 제공되는 오프라인 꿀잼 즉석 경품입니다. 버튼을 누르고 올 한 해 고생한 보상으로 다가올 엄청난 사내 프리미엄 쿠폰 혜택을 미리 빌어보세요!
            </p>

            <div className="bg-[#090f1d]/80 border border-slate-800 rounded-xl p-8 text-center mb-4 min-h-[100px] flex items-center justify-center shadow-inner">
                <div className="space-y-2">
                    {isRolling ? (
                        <Gift className="h-8 w-8 text-gold-400 animate-bounce mx-auto" />
                    ) : (
                        <Gift className="h-8 w-8 text-gold-500/40 mx-auto" />
                    )}
                    <p className={`text-sm sm:text-base font-medium tracking-wide ${isRolling ? 'text-gold-400 animate-pulse' : 'text-slate-300'}`}>
                        {result}
                    </p>
                </div>
            </div>

            <button
                onClick={startDraw}
                disabled={isRolling}
                className="w-full py-4 bg-[#c6a052] hover:bg-[#b08e45] text-midnight-950 font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 tracking-wider flex items-center justify-center gap-2"
            >
                <span>✨ 즉석 행운권 추첨하기 (터치!)</span>
            </button>
        </div>
    );
}