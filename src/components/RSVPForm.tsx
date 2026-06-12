// src/components/RSVPForm.tsx
import React, { useState, useEffect } from 'react';
import { User, Building2, Bus, MessageSquare, Rocket } from 'lucide-react';

// 부모와 통신하기 위한 데이터 통로 규격 정의
interface RSVPFormProps {
    insertedSlogan?: string;
    onFinalSubmit: (data: any) => void;
}

// ★ 핵심 수정 부하: 함수 시작할 때 괄호 안에 { insertedSlogan, onFinalSubmit } 매개변수를 확실하게 정의했습니다.
export default function RSVPForm({ insertedSlogan = "", onFinalSubmit }: RSVPFormProps) {
    // 폼 입력 데이터 상태 관리
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        drink: 'Red Wine',
        meal: '한우',
        shuttle: false,
        guestbook: ''
    });

    // AI 슬로건 컴패니언에서 [+] 버튼을 눌렀을 때 방명록에 자동으로 문구를 주입해 주는 효과
    useEffect(() => {
        if (insertedSlogan) {
            setFormData(prev => ({ ...prev, guestbook: insertedSlogan }));
        }
    }, [insertedSlogan]);

    // [참석 확정] 버튼을 눌렀을 때 실행되는 함수
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 이제 부모 컴포넌트(App.tsx)의 함수를 정상적으로 호출하여 전광판과 대시보드에 실시간 데이터를 전송합니다!
        if (typeof onFinalSubmit === 'function') {
            onFinalSubmit({
                name: formData.name,
                department: formData.department,
                drink: formData.drink,
                meal: formData.meal,
                shuttle: formData.shuttle,
                guestbook: formData.guestbook
            });
        }

        // 축하 알림창을 띄웁니다.
        alert(`🎉 ${formData.name}님, 2026 연말 갈라 나이트 참석 확정이 완료되었습니다!`);

        // 다음 사람 등록을 위해 입력창을 깔끔하게 리셋합니다.
        setFormData({
            name: '',
            department: '',
            drink: 'Red Wine',
            meal: '한우',
            shuttle: false,
            guestbook: ''
        });
    };

    return (
        <div className="w-full bg-[#131f3b]/40 border border-slate-700/30 rounded-2xl p-6 shadow-2xl space-y-6 relative z-10">
            <div className="text-center space-y-2">
                <p className="text-xs text-slate-400 leading-relaxed">
                    좌석 관리 및 고급 웰컴 식단 조율을 위해 아래의 필수 참가 정보를 정확히 등록해 주시기를 바랍니다. 제출한 참석 의사는 연말 집계 통계 대시보드에 자동 정위됩니다.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* 1. 참석자 성함 입력란 */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gold-100 flex items-center gap-1.5">
                        참석자 성함 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <User className="h-4 w-4 text-slate-500" />
                        </span>
                        <input
                            type="text"
                            required
                            placeholder="예: 홍길동"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#0c1222]/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#c6a052]/50 transition-all"
                        />
                    </div>
                </div>

                {/* 2. 소속 부서 / 본부 입력란 */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gold-100 flex items-center gap-1.5">
                        소속 부서 / 본부 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <Building2 className="h-4 w-4 text-slate-500" />
                        </span>
                        <input
                            type="text"
                            required
                            placeholder="예: 경영지원, 품질보증 등"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#0c1222]/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#c6a052]/50 transition-all"
                        />
                    </div>
                </div>

                {/* 3. 웰컴 드링크 선택 */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gold-100 flex items-center gap-1.5">
                        송년의 밤 웰컴 드링크 (주류 프리미엄)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: 'Red Wine', label: '🍷 Red Wine' },
                            { id: 'White Wine', label: '🥂 White Wine' },
                            { id: 'Draft Beer', label: '🍺 Draft Beer' },
                            { id: 'Safe Non-Alc', label: '🥤 Safe Non-Alc' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, drink: item.id })}
                                className={`py-3 text-[11px] sm:text-xs font-semibold rounded-xl border transition-all ${formData.drink === item.id
                                        ? 'border-[#c6a052] bg-[#c6a052]/10 text-[#c6a052]'
                                        : 'border-slate-800 bg-[#0c1222]/60 text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. 연회 코스 요리 메뉴 선택 */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gold-100 flex items-center gap-1.5">
                        연회 코스 요리 메뉴 선택
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: '한우', label: '한우 스테이크', desc: '일반식' },
                            { id: '락토오보', label: '락토-오보', desc: '채식(계란/유제품)' },
                            { id: '셰프', label: '셰프 특선', desc: '해산물 베이스' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, meal: item.id })}
                                className={`py-2.5 rounded-xl border transition-all flex flex-col items-center justify-center ${formData.meal === item.id
                                        ? 'border-[#c6a052] bg-[#c6a052]/10 text-[#c6a052]'
                                        : 'border-slate-800 bg-[#0c1222]/60 text-slate-400 hover:text-slate-500'
                                    }`}
                            >
                                <span className="text-[11px] sm:text-xs font-bold">{item.label}</span>
                                <span className="text-[9px] opacity-70 mt-0.5">{item.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 5. 귀가 셔틀 서비스 신청 */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gold-100 flex items-center gap-1.5">
                        귀가 셔틀 서비스 버스 신청
                    </label>
                    <div className="flex items-center justify-between bg-[#0c1222]/60 border border-slate-800 rounded-xl p-3.5">
                        <span className="text-xs text-slate-400 flex items-center gap-2">
                            <span className="text-slate-500">🚌</span>
                            {formData.shuttle ? "행사장 ➔ 신도림/강남역 노선 신청 완료" : "신청 안함 (자가퇴근)"}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.shuttle}
                                onChange={(e) => setFormData({ ...formData, shuttle: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-[#c6a052] after:border-slate-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c6a052]/20 border border-slate-700"></div>
                        </label>
                    </div>
                </div>

                {/* 6. 덕담 방명록 한마디 */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gold-100 flex items-center gap-1.5">
                        덕담 방명록 및 단합 한마디
                    </label>
                    <div className="relative">
                        <span className="absolute top-3 left-3.5 pointer-events-none">
                            <MessageSquare className="h-4 w-4 text-slate-500" />
                        </span>
                        <textarea
                            rows={3}
                            placeholder="슬로건 컴패니언의 추천 문구를 이곳에 바로 넣어보세요!"
                            value={formData.guestbook}
                            onChange={(e) => setFormData({ ...formData, guestbook: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-[#0c1222]/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#c6a052]/50 transition-all resize-none leading-relaxed"
                        />
                    </div>
                </div>

                {/* 참석 확정 전송 단추 */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#c6a052] to-[#b38f43] hover:from-[#d7b263] hover:to-[#c6a052] text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm mt-2"
                >
                    <Rocket className="h-4 w-4 shrink-0" />
                    2026 연말 갈라 나이트 참석 확정
                </button>
            </form>
        </div>
    );
}