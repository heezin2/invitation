// src/components/RSVPForm.tsx
import React, { useState, useEffect } from 'react';
import { ClipboardList, User, Building2, MessageSquare } from 'lucide-react';

interface RSVPFormProps {
    initialSlogan: string;
    onClearSlogan: () => void;
    onRSVPChange: () => void;
}

interface RSVPRecord {
    id: string;
    name: string;
    dept: string;
    drink: string;
    meal: string;
    shuttle: boolean;
    message: string;
    date: string;
}

export default function RSVPForm({ initialSlogan, onClearSlogan, onRSVPChange }: RSVPFormProps) {
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [drink, setDrink] = useState('Red Wine');
    const [meal, setMeal] = useState('한우 안심 스테이크');
    const [shuttle, setShuttle] = useState(false);
    const [message, setMessage] = useState('');
    const [guestbook, setGuestbook] = useState<RSVPRecord[]>([]);

    // 처음 로드할 때 로컬스토리지에서 기존 방명록 읽어오기
    useEffect(() => {
        const saved = localStorage.getItem('gala_rsvp_list');
        if (saved) {
            setGuestbook(JSON.parse(saved));
        }
    }, []);

    // AI 슬로건 추천 카드에서 더하기 버튼 누르면 실시간으로 감지해서 채워 넣기
    useEffect(() => {
        if (initialSlogan) {
            setMessage(initialSlogan);
            onClearSlogan(); // 연동 후 상위 상태 초기화
        }
    }, [initialSlogan, onClearSlogan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !dept) {
            alert('참석자 성함과 소속 부서를 기재해 주세요!');
            return;
        }

        const newRecord: RSVPRecord = {
            id: String(Date.now()),
            name,
            dept,
            drink,
            meal,
            shuttle,
            message: message || "올 한 해 모두 고생하셨습니다. 내년에도 화이팅!",
            date: new Date().toLocaleDateString('ko-KR')
        };

        const updatedList = [newRecord, ...guestbook];
        setGuestbook(updatedList);
        localStorage.setItem('gala_rsvp_list', JSON.stringify(updatedList));

        // 어드민 실시간 대시보드 동기화 신호 보내기
        onRSVPChange();

        // 입력 폼 초기화
        setName('');
        setDept('');
        setMessage('');
        alert('🎉 2026 연말 갈라 나이트 참석 확정이 완료되었습니다!');
    };

    return (
        <div className="w-full space-y-6">
            {/* RSVP 입력 카드 */}
            <form onSubmit={handleSubmit} className="w-full bg-[#131f3b]/60 border border-slate-700/50 rounded-2xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <ClipboardList className="h-5 w-5 text-gold-500" />
                    <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100">📋 2026 송년의 밤 참가 동향 및 RSVP 등록</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                    좌석 관리 및 고급 웰컴 식단 조율을 위해 아래의 필수 참가 정보를 정확히 등록해 주시기를 바랍니다. 제출한 참석 의사는 연말 집계 통계 대시보드에 자동 정위됩니다.
                </p>

                {/* 성함 / 부서 입력창 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gold-400">참석자 성함 <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="예: 홍길동"
                                className="w-full bg-[#0a101f] border border-slate-800 focus:border-gold-500 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gold-400">소속 부서 / 본부 <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <input
                                type="text" value={dept} onChange={(e) => setDept(e.target.value)}
                                placeholder="예: 개발본부, 영업마케팅본부 등"
                                className="w-full bg-[#0a101f] border border-slate-800 focus:border-gold-500 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* 웰컴 드링크 라디오 버튼 그룹 */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gold-400">송년의 밤 웰컴 드링크 (주류 프리미엄)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                            { label: '🍷 Red Wine', value: 'Red Wine' },
                            { label: '🥂 White Wine', value: 'White Wine' },
                            { label: '🍺 Draft Beer', value: 'Draft Beer' },
                            { label: '🥤 Safe Non-Alc', value: 'Safe Non-Alc' }
                        ].map((d) => (
                            <button
                                type="button" key={d.value} onClick={() => setDrink(d.value)}
                                className={`py-2.5 text-xs font-medium rounded-xl border transition-all ${drink === d.value
                                        ? 'border-gold-500 bg-gold-500/10 text-gold-400 font-bold'
                                        : 'border-slate-800 bg-[#0a101f] text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 식단 및 셔틀버스 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-gold-400">연회 코스 요리 메뉴 선택</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['한우 안심 스테이크', '락토오보 채식', '셰프 특별 할랄식'].map((m) => (
                                <button
                                    type="button" key={m} onClick={() => setMeal(m)}
                                    className={`py-2.5 text-[11px] font-medium rounded-xl border transition-all ${meal === m
                                            ? 'border-gold-500 bg-gold-500/10 text-gold-400 font-bold'
                                            : 'border-slate-800 bg-[#0a101f] text-slate-400 hover:text-slate-300'
                                        }`}
                                >
                                    {m.split(' ')[0]} {/* 텍스트 압축 */}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gold-400">귀가 셔틀 서비스 버스 신청</label>
                        <div
                            onClick={() => setShuttle(!shuttle)}
                            className="flex items-center justify-between bg-[#0a101f] border border-slate-800 rounded-xl p-2.5 cursor-pointer select-none"
                        >
                            <span className="text-xs text-slate-400">{shuttle ? '🚌 신청 완료 (탑승)' : '🚗 신청 안함 (자가퇴근)'}</span>
                            <div className={`w-8 h-4 rounded-full transition-all relative ${shuttle ? 'bg-gold-500' : 'bg-slate-700'}`}>
                                <div className={`w-3 h-3 bg-midnight-950 rounded-full absolute top-0.5 transition-all ${shuttle ? 'right-0.5' : 'left-0.5'}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 방명록 한마디 */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gold-400">덕담 방명록 및 단합 한마디</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <textarea
                            value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder="올 한 해 함께 고생한 동료들에게 따뜻한 한마디 혹은 유쾌한 포부를 남겨주세요."
                            rows={3}
                            className="w-full bg-[#0a101f] border border-slate-800 focus:border-gold-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all resize-none"
                        />
                    </div>
                    <p className="text-[10px] text-right text-slate-500">
                        슬로건 컴패니언의 추천 문구를 이곳에 바로 넣어보세요!
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-[#c6a052] hover:bg-[#b08e45] text-midnight-950 font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] tracking-wider text-sm"
                >
                    🚀 2026 연말 갈라 나이트 참석 확정
                </button>
            </form>

            {/* GALA GUESTBOOK 방명록 월 타임라인 */}
            <div className="w-full bg-[#131f3b]/40 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gold-500">⭐</span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100">GALA GUESTBOOK : 따뜻한 덕담 월</h3>
                    </div>
                    <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-medium">
                        실시간 {guestbook.length + 3}명
                    </span>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                    {/* 입력한 동적 리스트 출력 */}
                    {guestbook.map((g) => (
                        <div key={g.id} className="bg-[#111c3a]/50 border border-slate-800/80 rounded-xl p-4 space-y-3 shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gold-100">{g.name}</span>
                                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">{g.dept}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${g.shuttle ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                        {g.shuttle ? '🚌 셔틀 버스' : '🚗 자가'}
                                    </span>
                                </div>
                                <span className="text-[10px] text-slate-500">{g.date}</span>
                            </div>
                            <div className="flex gap-1.5">
                                <span className="text-[11px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md">🍷 {g.drink}</span>
                                <span className="text-[11px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">🥩 {g.meal}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-300 bg-[#090f1d]/40 p-3 rounded-lg border border-slate-900 italic font-serif">
                                "{g.message}"
                            </p>
                        </div>
                    ))}

                    {/* 스크린샷 3번에 있던 고정식 예시 카드 디테일들 */}
                    <div className="bg-[#111c3a]/50 border border-slate-800/80 rounded-xl p-4 space-y-3 shadow-md opacity-70">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gold-100">이지민</span>
                                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">기획디자인실</span>
                                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md">🚌 셔틀 버스</span>
                            </div>
                            <span className="text-[10px] text-slate-500">2026-12-11</span>
                        </div>
                        <div className="flex gap-1.5">
                            <span className="text-[11px] bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md">🥂 White Wine</span>
                            <span className="text-[11px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">🥗 락토오보 채식</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 bg-[#090f1d]/40 p-3 rounded-lg border border-slate-900 italic font-serif">
                            "시안 최종_파이널_진짜최종_끝_완성_version.png! 결국 1번 시안 선택하시는 고객사 고문 극복 완료 🎨"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}