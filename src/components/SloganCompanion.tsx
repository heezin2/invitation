// src/components/SloganCompanion.tsx
import React, { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';

interface SloganCompanionProps {
    onInsertToRSVP: (sloganText: string) => void;
}

export default function SloganCompanion({ onInsertToRSVP }: SloganCompanionProps) {
    const [dept, setDept] = useState('경영지원');
    const [mood, setMood] = useState('감동');

    const slogansDatabase: Record<string, Record<string, string[]>> = {
        '경영지원': {
            '감동': [
                "보이지 않는 곳에서의 헌신, 여러분의 지원이 우리의 튼튼한 뿌리였습니다.",
                "서류 한 장에 담긴 진심이 모여, 회사의 위대한 2026년을 만들었습니다.",
                "가장 든든한 조력자 경영지원팀, 여러분이 있어 우리가 마음껏 달렸습니다."
            ],
            '코믹': [
                "영수증은 챙기셨나요? 오늘 밤은 비용 처리 걱정 말고 마셔봅시다!",
                "법인카드 한도보다 더 큰 여러분의 열정! 오늘 제대로 발산하세요.",
                "연말정산보다 더 짜릿한 연말 갈라 나이트! 일단 즐기고 봅시다."
            ]
        },
        '연구개발': {
            '감동': [
                "수만 줄의 코드와 밤샘 연구, 마침내 찬란한 결실의 밤을 맞이합니다.",
                "불가능을 가능으로 바꾼 연구소의 땀방울, 회사의 미래를 밝혔습니다.",
                "우리가 써 내려간 기술의 역사가 곧 회사의 자부심이 되었습니다."
            ],
            '코믹': [
                "버그 없는 세상보다 고기 굽는 송년회가 더 달콤한 법입니다.",
                "서버는 아직 살아있으니, 오늘만큼은 멘탈 셧다운하고 즐깁시다!",
                "빌드 성공보다 기분 좋은 건 오늘 밤 우리의 건배 제의입니다."
            ]
        },
        '품질보증/생산관리': {
            '감동': [
                "결함 없는 열정 100%, 품질보증팀의 꼼꼼함이 우리의 신뢰가 되었습니다.",
                "멈추지 않는 생산 라인처럼, 여러분의 노력은 회사의 심장이었습니다.",
                "완벽을 향한 고집스러운 신념, 그 가치가 빛나는 2026년의 밤입니다."
            ],
            '코믹': [
                "불량률 0% 도전! 오늘 밤 우리의 스트레스 불량도 제로로 만듭시다.",
                "공정 라인 가동 중지! 대신 오늘 밤은 술잔 가동 100%입니다.",
                "검수 통과보다 통과하기 힘든 건 오늘 밤 주임님의 건배사!"
            ]
        },
        '디자인/마케팅': {
            '감동': [
                "회사의 가치를 아름답게 수놓은 창의적 영감, 당신이 최고의 아티스트입니다.",
                "시장을 움직인 날카로운 전략, 마케팅의 힘이 우리의 한계를 넘게 했습니다.",
                "픽셀 하나에 담긴 정성, 2026년의 모든 순간을 찬란하게 디자인했습니다."
            ],
            '코믹': [
                "시안 최종_진짜최종_극복 완료! 이제 뚜껑 열고 샴페인 시작합니다.",
                "내 사전의 네고란 없다! 오늘 밤 술잔만큼은 네고 없이 원샷!",
                "브랜딩보다 중요한 건 오늘 밤 우리들의 끈끈한 단합 브랜딩입니다."
            ]
        }
    };

    const currentSlogans = slogansDatabase[dept]?.[mood] || slogansDatabase['경영지원']['감동'];

    return (
        <div className="w-full bg-[#131f3b]/60 border border-slate-700/50 rounded-2xl p-6 shadow-2xl space-y-6 relative z-10">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="h-5 w-5 text-[#c6a052]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100">Gemini AI Slogan Companion 슬로건 컴패니언</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
                부서와 원하시는 분위기 톤앤매너를 선택해 주세요. 사내 소통을 빛내줄 위트와 애환이 담긴 2026 커스텀 단합 슬로건 세트 3가지를 즉석 인가해 드립니다.
            </p>

            <div>
                <label className="block text-[10px] font-bold text-[#c6a052] uppercase tracking-widest mb-2.5">소속 부서 / 본부 선택</label>
                <div className="grid grid-cols-2 gap-2">
                    {['경영지원', '연구개발', '품질보증/생산관리', '디자인/마케팅'].map((d) => (
                        <button
                            key={d}
                            type="button"
                            onClick={() => setDept(d)}
                            className={`py-2.5 text-[11px] font-bold rounded-lg border transition-all ${dept === d
                                ? 'border-[#c6a052] bg-[#c6a052]/10 text-[#c6a052] shadow-[0_0_10px_rgba(198,160,82,0.2)]'
                                : 'border-slate-800 bg-[#0c1222]/80 text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold text-[#c6a052] uppercase tracking-widest mb-2.5">슬로건 감성 및 무드 톤</label>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: '💖 눈물 감동', value: '감동' },
                        { label: '⚡ 개그 코믹', value: '코믹' }
                    ].map((m) => (
                        <button
                            key={m.value}
                            type="button"
                            onClick={() => setMood(m.value)}
                            className={`py-2.5 text-[11px] font-bold rounded-lg border transition-all flex items-center justify-center gap-2 ${mood === m.value
                                ? 'border-[#c6a052] bg-[#c6a052]/10 text-[#c6a052]'
                                : 'border-slate-800 bg-[#0c1222]/80 text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2 pt-2">
                {currentSlogans.map((slogan, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 bg-[#090f1d]/80 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-[#c6a052]/20 transition-all group">
                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">"{slogan}"</p>
                        <button
                            type="button"
                            onClick={() => onInsertToRSVP(slogan)}
                            className="p-2 bg-slate-800 hover:bg-[#c6a052]/20 rounded-lg border border-slate-700 hover:border-[#c6a052]/40 transition-all shrink-0"
                        >
                            <Plus className="h-4 w-4 text-slate-400 group-hover:text-[#c6a052]" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}