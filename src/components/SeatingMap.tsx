// src/components/SeatingMap.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Users, Info, X } from 'lucide-react';

interface TableInfo {
    id: string;
    label: string;
    deptName: string;
    description: string;
    seats: number;
}

export default function SeatingMap() {
    const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);

    // ★핵심 수정 사항 2: 요청하신 부서 라벨(경영지원, 연구개발, 품질보증, 영업마케팅, 생산팀) 매칭 완료
    const tables: TableInfo[] = [
        {
            id: 'A',
            label: 'A',
            deptName: '경영지원',
            description: 'STAGE 전면 좌측 구역입니다. 총무, 인사, 재무 파트 좌석이 배치되어 있습니다.',
            seats: 8
        },
        {
            id: 'B',
            label: 'B',
            deptName: '연구개발',
            description: 'STAGE 전면 우측 구역입니다. 핵심 코어 개발진 및 기술 연구소 좌석이 배치되어 있습니다.',
            seats: 12
        },
        {
            id: 'C',
            label: 'C',
            deptName: '품질보증',
            description: 'STAGE 중앙 구역입니다. QA, 제품 검증 및 품질 신뢰성 관리 파트 좌석이 배치되어 있습니다.',
            seats: 8
        },
        {
            id: 'D',
            label: 'D',
            deptName: '영업마케팅',
            description: 'STAGE 후면 좌측 구역입니다. 국내외 영업 및 브랜드 마케팅 본부 좌석이 배치되어 있습니다.',
            seats: 10
        },
        {
            id: 'E',
            label: 'E',
            deptName: '생산팀',
            description: 'STAGE 후면 우측 구역입니다. 제조 공정 관리 및 필드 생산 파트 좌석이 배치되어 있습니다.',
            seats: 10
        }
    ];

    return (
        <div className="w-full bg-[#131f3b]/60 border border-slate-700/50 rounded-2xl p-6 shadow-2xl space-y-6 relative z-10">

            {/* ★핵심 수정 사항 1: "그랜드 볼룸"에서 "파인(Pine) 룸"으로 타이틀 전면 변경 */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Map className="h-5 w-5 text-[#c6a052]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100">
                    파인(Pine) 룸 실시간 좌석 배치도
                </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
                금년 송년의 밤 행사장은 지정 테이블제로 운영됩니다. 아래의 테이블 블록을 터치하여 각 부서별 배정 구역 및 세부 정보를 확인해 주세요.
            </p>

            {/* 가상 무대 및 원형 테이블 배치 배치도 시각화 보드 */}
            <div className="w-full bg-[#090f1d]/90 border border-slate-800 rounded-xl p-6 relative overflow-hidden shadow-inner min-h-[460px] flex flex-col items-center">

                {/* STAGE 라벨 */}
                <div className="w-40 py-1.5 bg-gradient-to-b from-[#1c2642] to-[#0a0f1d] border border-[#c6a052]/30 rounded-md text-center shadow-md mb-12">
                    <span className="font-serif text-xs font-bold tracking-widest text-[#c6a052]">★ STAGE ★</span>
                </div>

                {/* 원형 구체 배치 그리드 레이아웃 (A, B, C, D, E 오차 없이 정렬) */}
                <div className="w-full max-w-sm relative flex flex-col items-center gap-8 my-auto">

                    {/* 상단 레이어: A, B */}
                    <div className="flex justify-between w-full px-4">
                        {tables.slice(0, 2).map((table) => (
                            <button
                                key={table.id}
                                onClick={() => setSelectedTable(table)}
                                className="w-28 h-28 rounded-full border border-slate-700/60 bg-[#0e162a]/90 hover:border-[#c6a052]/50 hover:bg-[#131f3b] flex flex-col items-center justify-center p-2 group transition-all duration-300 shadow-xl active:scale-95"
                            >
                                <span className="w-1.5 h-1.5 bg-[#c6a052] rounded-full mb-1 animate-pulse" />
                                <span className="font-serif text-2xl font-black text-[#c6a052] group-hover:scale-110 transition-transform">{table.label}</span>
                                <span className="text-[11px] font-bold text-slate-400 mt-1 tracking-tight">{table.deptName}</span>
                            </button>
                        ))}
                    </div>

                    {/* 중단 레이어: C, D */}
                    <div className="flex justify-between w-full px-4">
                        {tables.slice(2, 4).map((table) => (
                            <button
                                key={table.id}
                                onClick={() => setSelectedTable(table)}
                                className="w-28 h-28 rounded-full border border-slate-700/60 bg-[#0e162a]/90 hover:border-[#c6a052]/50 hover:bg-[#131f3b] flex flex-col items-center justify-center p-2 group transition-all duration-300 shadow-xl active:scale-95"
                            >
                                <span className="w-1.5 h-1.5 bg-[#c6a052] rounded-full mb-1 animate-pulse" />
                                <span className="font-serif text-2xl font-black text-[#c6a052] group-hover:scale-110 transition-transform">{table.label}</span>
                                <span className="text-[11px] font-bold text-slate-400 mt-1 tracking-tight">{table.deptName}</span>
                            </button>
                        ))}
                    </div>

                    {/* 하단 단독 레이어: E */}
                    {tables.slice(4, 5).map((table) => (
                        <button
                            key={table.id}
                            onClick={() => setSelectedTable(table)}
                            className="w-28 h-28 rounded-full border border-slate-700/60 bg-[#0e162a]/90 hover:border-[#c6a052]/50 hover:bg-[#131f3b] flex flex-col items-center justify-center p-2 group transition-all duration-300 shadow-xl active:scale-95"
                        >
                            <span className="w-1.5 h-1.5 bg-[#c6a052] rounded-full mb-1 animate-pulse" />
                            <span className="font-serif text-2xl font-black text-[#c6a052] group-hover:scale-110 transition-transform">{table.label}</span>
                            <span className="text-[11px] font-bold text-slate-400 mt-1 tracking-tight">{table.deptName}</span>
                        </button>
                    ))}

                </div>

                {/* 배치도 하단 마이너 캡션 */}
                <div className="w-full text-center mt-6 border-t border-slate-800/60 pt-4">
                    <p className="text-[10px] sm:text-xs text-slate-500 flex items-center justify-center gap-1.5">
                        <Info className="h-3.5 w-3.5 shrink-0" /> 구역 기호(A~E)가 그려진 구체를 클릭하면 안내 카드가 열립니다.
                    </p>
                </div>
            </div>

            {/* 부서 클릭 시 하단이나 중앙에 부드럽게 레이어링되는 정보 모달 팝업 */}
            <AnimatePresence>
                {selectedTable && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="w-full bg-[#0d1424] border border-[#c6a052]/40 rounded-xl p-4 shadow-2xl space-y-3 relative overflow-hidden"
                    >
                        <div className="absolute top-3 right-3">
                            <button
                                onClick={() => setSelectedTable(null)}
                                className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-200 transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-[#c6a052]">
                            <Users className="h-4 w-4" />
                            <h4 className="font-serif text-sm font-bold tracking-wide">
                                [테이블 {selectedTable.label}] {selectedTable.deptName} 배정 안내
                            </h4>
                        </div>

                        <p className="text-xs text-slate-300 font-light leading-relaxed pr-6">
                            {selectedTable.description}
                        </p>

                        <div className="text-[11px] text-[#c6a052]/80 bg-gold-500/5 border border-gold-500/10 rounded px-2.5 py-1 inline-block font-semibold">
                            👥 최대 수용 인원: {selectedTable.seats}석 (지정석 부착 완료)
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}