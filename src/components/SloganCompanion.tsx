// src/components/SloganCompanion.tsx
import React, { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';

interface SloganCompanionProps {
    onInsertToRSVP: (sloganText: string) => void;
}

export default function SloganCompanion({ onInsertToRSVP }: SloganCompanionProps) {
    const [dept, setDept] = useState('개발');
    const [mood, setMood] = useState('감동');

    const slogansDatabase: Record<string, Record<string, string[]>> = {
        개발: {
            감동: [
                "서버는 터져도 동료애는 안 터졌다, 2026 수고하셨습니다.",
                "수많은 밤을 지샌 코드 끝에, 마침내 찬란한 결실의 밤.",
                "우리들의 밤샘 투혼이 모여 회사의 빛나는 오늘을 만들었습니다."
            ],
            코믹: [
                "지표가 휘어지면 내 척추도 갈라진다! 아자아자!",
                "서버는 아직 떠있으니 일단 삼겹살 먹으러 갑니다!",
                "버그 없는 세상보다 고기 굽는 송년회가 더 달콤하다."
            ]
        },
        영업: {
            감동: [
                "발로 뛴 365일, 당신의 땀방울이 우리의 프론티어입니다.",
                "고객의 거절 속에서도 희망을 쏘아 올린 위대한 여정.",
                "실적보다 빛나는 건 함께 걷는 영업본부 동료의 미소입니다."
            ],
            코믹: [
                "시안 최종_파이널_진짜최종 극복 완료! 마셔 마셔!",
                "내 사전의 네고란 없다, 오늘 밤 술잔만 네고 가능!",
                "매출 압박 던져버리고 오늘은 골드바 대신 골든벨 누르자!"
            ]
        }
    };

    const currentSlogans = slogansDatabase[dept]?.[mood] || slogansDatabase['개발']['감동'];

    return (
        <div className="w-full bg-[#131f3b]/60 border border-slate-700/50 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="h-5 w-5 text-gold-500" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100">Gemini AI Slogan Companion 슬로건 컴패니언</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
                부서와 원하시는 분위기 톤앤매너를 선택해 주세요. 사내 소통을 빛내줄 위트와 애환이 담긴 2026 커스텀 단합 슬로건 세트 3가지를 초정밀 소구하여 즉석 인가해 드립니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gold-400 mb-2">소속 부서 / 본부 선택</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['개발', '영업', '기획/디자인', '총무/CS/기타'].map((d) => (
                            <button
                                key={d}
                                onClick={() => setDept(d.includes('개발') ? '개발' : '영업')}
                                className={`py-2 text-xs font-medium rounded-lg border transition-all ${(d.includes('개발') && dept === '개발') || (d.includes('영업') && dept === '영업')
                                        ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                                        : 'border-slate-800 bg-[#0c1222]/80 text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gold-400 mb-2">슬로건 감성 및 무드 톤</label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: '💖 눈물 감동', value: '감동' },
                            { label: '⚡ 개그 코믹', value: '코믹' }
                        ].map((m) => (
                            <button
                                key={m.value}
                                onClick={() => setMood(m.value)}
                                className={`py-2 text-xs font-medium rounded-lg border transition-all h-full flex items-center justify-center ${mood === m.value
                                        ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                                        : 'border-slate-800 bg-[#0c1222]/80 text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-2 pt-2">
                {currentSlogans.map((slogan, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 bg-[#090f1d]/80 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-gold-500/20 transition-all">
                        <p className="text-xs sm:text-sm text-slate-300 font-medium">"{slogan}"</p>
                        <button
                            onClick={() => onInsertToRSVP(slogan)}
                            className="p-1.5 bg-slate-800 hover:bg-gold-500/20 rounded-md border border-slate-700 hover:border-gold-500/40 group transition-all shrink-0"
                            title="방명록에 바로 넣기"
                        >
                            <Plus className="h-3.5 w-3.5 text-slate-400 group-hover:text-gold-400" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}