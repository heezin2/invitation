// src/App.tsx
import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import SeatingMap from './components/SeatingMap';
import SloganCompanion from './components/SloganCompanion';
import RSVPForm from './components/RSVPForm';

interface GuestbookItem {
    name: string;
    department: string;
    drink: string;
    meal: string;
    shuttle: boolean;
    guestbook: string;
    date: string;
}

export default function App() {
    const [sharedSlogan, setSharedSlogan] = useState('');
    const [isAdminOpen, setIsAdminOpen] = useState(false); // 관리자 모드 패널 열림 상태
    const [passcode, setPasscode] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);

    // 참석자 데이터 상태 관리 (LocalStorage 연동)
    const [attendees, setAttendees] = useState<GuestbookItem[]>(() => {
        const saved = localStorage.getItem('gala_attendees');
        if (saved) return JSON.parse(saved);
        return [
            {
                name: "김민준",
                department: "연구개발",
                drink: "Red Wine",
                meal: "한우",
                shuttle: true,
                guestbook: "수만 줄의 코드와 밤샘 연구, 마침내 찬란한 결실의 밤을 맞이합니다.",
                date: "2026-12-10"
            },
            {
                name: "이서연",
                department: "디자인/마케팅",
                drink: "White Wine",
                meal: "셰프",
                shuttle: false,
                guestbook: "시안 최종_진짜최종_극복 완료! 이제 뚜껑 열고 샴페인 시작합니다.",
                date: "2026-12-11"
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('gala_attendees', JSON.stringify(attendees));
    }, [attendees]);

    // 슬로건 수송 함수
    const handleInsertToRSVP = (sloganText: string) => {
        setSharedSlogan(sloganText);
        const rsvpSection = document.getElementById('rsvp-section');
        if (rsvpSection) {
            rsvpSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // RSVP 최종 접수 함수 (★방명록에 글이 나타나게 만드는 핵심 엔진)
    const handleRegisterRSVP = (newAttendee: Omit<GuestbookItem, 'date'>) => {
        const fullData: GuestbookItem = {
            ...newAttendee,
            date: new Date().toISOString().split('T')[0]
        };
        setAttendees(prev => [fullData, ...prev]); // 최신 등록자가 맨 위로 오게 추가
        setSharedSlogan('');
    };

    // 대시보드 통계 계산 데이터들
    const mealCount = attendees.reduce((acc, cur) => {
        acc[cur.meal] = (acc[cur.meal] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const shuttleCount = attendees.filter(a => a.shuttle).length;

    return (
        <div className="min-h-screen bg-[#060a13] text-slate-100 font-sans antialiased pb-20">
            <Banner />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12 mt-12">
                <SeatingMap />
                <SloganCompanion onInsertToRSVP={handleInsertToRSVP} />

                <div id="rsvp-section">
                    {/* ★ 중요: RSVPForm에 최종 제출 통로인 onFinalSubmit을 확실하게 뚫어줍니다. */}
                    <RSVPForm
                        insertedSlogan={sharedSlogan}
                        onFinalSubmit={handleRegisterRSVP}
                    />
                </div>

                {/* 4. GALA GUESTBOOK : 따뜻한 덕담 월 */}
                <div className="w-full bg-[#131f3b]/60 border border-slate-700/50 rounded-2xl p-6 shadow-2xl space-y-4 relative z-10">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-[#c6a052]">⭐</span>
                            <h3 className="font-serif text-base sm:text-lg font-bold text-gold-100">GALA GUESTBOOK : 따뜻한 덕담 월</h3>
                        </div>
                        <span className="text-xs bg-[#0c1222] border border-slate-800 text-slate-300 px-3 py-1 rounded-full font-medium">
                            실시간 {attendees.length}명
                        </span>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                        {attendees.map((item, idx) => (
                            <div key={idx} className="bg-[#0c1222]/90 border border-slate-800/80 rounded-xl p-4 space-y-2 shadow-md">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-200">{item.name}</span>
                                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">{item.department}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500">{item.date}</span>
                                </div>
                                <div className="flex gap-1.5 text-[10px]">
                                    <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded">🍹 {item.drink}</span>
                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">🥩 {item.meal === '한우' ? '한우 스테이크' : item.meal === '락토오보' ? '락토-오보' : '셰프 특선'}</span>
                                    {item.shuttle && <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded">🚌 셔틀버스</span>}
                                </div>
                                <p className="text-xs sm:text-sm text-slate-300 bg-black/20 p-3 rounded-lg border border-slate-900/60 italic font-serif">
                                    "{item.guestbook}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. 👑 돌아온 비밀 관리자 대시보드 패널 */}
                <div className="w-full bg-[#090f1d]/90 border border-red-900/30 rounded-2xl p-6 shadow-2xl space-y-4 relative z-10">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="text-sm font-bold text-red-400 tracking-wider flex items-center gap-2">
                            🔒 대시보드 관리자 시스템 관제탑 (Admin)
                        </h3>
                        <button
                            onClick={() => setIsAdminOpen(!isAdminOpen)}
                            className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-300 transition-all"
                        >
                            {isAdminOpen ? "접기" : "관리자 인증 열기"}
                        </button>
                    </div>

                    {isAdminOpen && (
                        <div className="space-y-4 animate-fade-in">
                            {!isAuthorized ? (
                                <div className="flex gap-2 max-w-sm">
                                    <input
                                        type="password"
                                        placeholder="비밀번호 입력 (1226)"
                                        value={passcode}
                                        onChange={(e) => setPasscode(e.target.value)}
                                        className="flex-1 bg-black/50 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-red-500/50"
                                    />
                                    <button
                                        onClick={() => {
                                            if (passcode === '1226') setIsAuthorized(true);
                                            else alert('비밀번호가 틀렸습니다!');
                                        }}
                                        className="bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                                    >
                                        인증
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                                    {/* 식단 발주 통계 */}
                                    <div className="bg-[#0e162a] border border-slate-800 p-4 rounded-xl space-y-2">
                                        <h4 className="font-bold text-[#c6a052]">🥩 코스요리 실시간 발주 통계</h4>
                                        <div className="space-y-1 text-slate-400">
                                            <div>일반식 (한우): <span className="text-white font-bold">{mealCount['한우'] || 0}개</span></div>
                                            <div>채식 (락토오보): <span className="text-white font-bold">{mealCount['락토오보'] || 0}개</span></div>
                                            <div>셰프 특선 (해산물): <span className="text-white font-bold">{mealCount['셰프'] || 0}개</span></div>
                                        </div>
                                    </div>
                                    {/* 기타 지원 통계 */}
                                    <div className="bg-[#0e162a] border border-slate-800 p-4 rounded-xl space-y-2">
                                        <h4 className="font-bold text-[#c6a052]">🚌 귀가 셔틀버스 대절 현황</h4>
                                        <div className="text-slate-400">
                                            신청 인원: <span className="text-white font-bold text-sm">{shuttleCount}명</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (confirm('정말 방명록을 전체 초기화하시겠습니까?')) {
                                                    setAttendees([]);
                                                    localStorage.removeItem('gala_attendees');
                                                }
                                            }}
                                            className="mt-3 text-[10px] text-red-400 hover:text-red-300 underline"
                                        >
                                            데이터 전체 초기화(DB 리셋)
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}