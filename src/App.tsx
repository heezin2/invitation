import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import SeatingMap from './components/SeatingMap';
import LuckyDraw from './components/LuckyDraw';
import SloganCompanion from './components/SloganCompanion';
import RSVPForm from './components/RSVPForm';
import AdminPanel from './components/AdminPanel';
import { Landmark, Heart, Star, Bus, Wine, Utensils, Trash2 } from 'lucide-react';
import type { GuestInfo } from './types';

export default function App() {
    const [selectedSlogan, setSelectedSlogan] = useState('');
    const [statsTrigger, setStatsTrigger] = useState(0);
    const [guests, setGuests] = useState<GuestInfo[]>([]);

    const handleInsertSlogan = (sloganText: string) => {
        setSelectedSlogan(sloganText);
    };

    const handleClearSlogan = () => {
        setSelectedSlogan('');
    };

    const triggerStatsRefresh = () => {
        setStatsTrigger((prev) => prev + 1);
        loadGuests(); // 방명록 업데이트를 위해 즉시 다시 불러오기
    };

    // 로컬 스토리지에서 방명록 데이터 불러오기
    const loadGuests = () => {
        const saved = JSON.parse(localStorage.getItem('gala_guests') || '[]');
        setGuests(saved);
    };

    // 처음 렌더링 시 데이터 로드
    useEffect(() => {
        loadGuests();
    }, []);

    // 개발용: 특정 카드 삭제
    const handleDeleteGuest = (id: string) => {
        const updated = guests.filter(g => g.id !== id);
        localStorage.setItem('gala_guests', JSON.stringify(updated));
        setGuests(updated);
        setStatsTrigger((prev) => prev + 1);
    };

    // 날짜 포맷 함수
    const formatDate = (timestamp: number) => {
        const d = new Date(timestamp);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    return (
        // 다크 네이비 테마 기본 적용
        <div className="min-h-screen bg-[#0b0f19] text-slate-300 font-sans selection:bg-[#c6a052] selection:text-[#0b0f19]">
            
            {/* 메인 모바일-퍼스트 컨테이너 본체 */}
            <main className="relative flex-1 w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 z-10 space-y-8">

                <div className="space-y-8">
                    {/* 1. 상단 화려한 이미지 배너 & 카운트다운 */}
                    <Banner />

                    {/* 2. 인터랙티브 좌석 배치도 */}
                    <SeatingMap />

                    {/* 3. 럭키 드로우 룰렛 */}
                    <LuckyDraw />

                    {/* 4. AI 소통 슬로건 도우미 */}
                    <SloganCompanion onInsertToRSVP={handleInsertSlogan} />

                    {/* 5. RSVP 참가 확인 신청 폼 */}
                    <RSVPForm
                        initialSlogan={selectedSlogan}
                        onClearSlogan={handleClearSlogan}
                        onRSVPChange={triggerStatsRefresh}
                    />

                    {/* [NEW] 방명록 월 (Guestbook Wall) */}
                    <div className="bg-[#111827]/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl mt-12">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                            <h2 className="text-xl md:text-2xl font-serif font-bold text-white flex items-center gap-2">
                                <Star className="w-5 h-5 text-[#c6a052] fill-[#c6a052]" />
                                GALA GUESTBOOK : 따뜻한 덕담 월
                            </h2>
                            <div className="border border-slate-700 px-3 py-1 rounded-full text-xs text-slate-400">
                                실시간 <strong className="text-white">{guests.length}명</strong>
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {guests.length === 0 ? (
                                <div className="text-center py-10 text-slate-500">
                                    <p>아직 남겨진 덕담이 없습니다. 첫 번째 주인공이 되어주세요!</p>
                                </div>
                            ) : (
                                guests.map((guest) => (
                                    <div key={guest.id} className="bg-[#0b0f19] border border-slate-800 p-5 rounded-xl border-l-4 border-l-[#c6a052] relative group">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-white">{guest.name}</span>
                                                <span className="text-xs text-slate-500">{guest.department}</span>
                                                {guest.shuttle && (
                                                    <span className="flex items-center gap-1 text-[10px] bg-[#c6a052]/20 text-[#c6a052] px-2 py-0.5 rounded border border-[#c6a052]/30">
                                                        <Bus className="w-3 h-3" /> 셔틀 버스
                                                    </span>
                                                )}
                                                {!guest.shuttle && (
                                                    <span className="flex items-center gap-1 text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                                                        자가
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] text-slate-600">{formatDate(guest.timestamp)}</span>
                                                <button onClick={() => handleDeleteGuest(guest.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Trash2 className="w-3.5 h-3.5 text-slate-600 hover:text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="flex items-center gap-1.5 text-xs bg-[#111827] border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                                                <Wine className="w-3.5 h-3.5 text-rose-500" /> {guest.drink}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs bg-[#111827] border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                                                <Utensils className="w-3.5 h-3.5 text-amber-600" /> {guest.meal}
                                            </span>
                                        </div>

                                        <div className="bg-[#111827] rounded-lg p-4 italic text-sm text-slate-300">
                                            "{guest.message}"
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* 푸터 및 관리자 판넬 */}
            <footer className="relative w-full border-t border-slate-800 bg-[#0b0f19] py-12 px-4 z-20">
                <div className="mx-auto max-w-3xl space-y-8">
                    {/* 6. 비밀 패스코드 잠금식 어드민용 실시간 통계 모듈 */}
                    <AdminPanel statsTrigger={statsTrigger} onStatsRefresh={triggerStatsRefresh} />

                    {/* 하단 사내 가짜 크레딧 & 매장 텍스트 */}
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-1.5 font-serif text-xs text-slate-500">
                            <Landmark className="h-3.5 w-3.5 text-[#c6a052]" />
                            <span>2026 사내 Gala Night 준비위원회</span>
                        </div>
                        <p className="font-sans text-[10px] text-slate-600">
                            © 2026 All Corporate Excellence. This app is designed premium for Korea year-end assembly.
                        </p>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-700">
                            <Heart className="h-3 w-3 text-red-900" />
                            <span>함께 동료들의 눈부신 내일을 응원합니다.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
