// src/components/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, BarChart3 } from 'lucide-react';

interface AdminPanelProps {
    statsTrigger: number;
    onStatsRefresh: () => void;
}

export default function AdminPanel({ statsTrigger }: AdminPanelProps) {
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [stats, setStats] = useState({ total: 0, wine: 0, beer: 0, nonAlc: 0, steak: 0, shuttleCount: 0 });

    const checkLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '1226') {
            setIsAdmin(true);
            calculateStats();
        } else {
            alert('🔒 패스코드가 올바르지 않습니다.');
        }
    };

    const calculateStats = () => {
        const saved = localStorage.getItem('gala_rsvp_list');
        if (saved) {
            const data = JSON.parse(saved);
            let wine = 0, beer = 0, nonAlc = 0, steak = 0, shuttleCount = 0;

            data.forEach((item: any) => {
                if (item.drink.includes('Wine')) wine++;
                if (item.drink.includes('Beer')) beer++;
                if (item.drink.includes('Non-Alc')) nonAlc++;
                if (item.meal.includes('스테이크')) steak++;
                if (item.shuttle) shuttleCount++;
            });

            setStats({ total: data.length, wine, beer, nonAlc, steak, shuttleCount });
        }
    };

    useEffect(() => {
        if (isAdmin) calculateStats();
    }, [statsTrigger, isAdmin]);

    if (!isAdmin) {
        return (
            <div className="w-full bg-[#0d1527]/90 border border-slate-800 rounded-2xl p-8 text-center max-w-md mx-auto shadow-2xl">
                <div className="w-12 h-12 bg-slate-800/60 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-5 w-5 text-gold-500" />
                </div>
                <h4 className="font-serif text-base font-bold text-slate-200 mb-2">Admin Dashboard 잠금 해제</h4>
                <p className="text-xs text-slate-400 mb-6">사내 주최자 관리용 대시보드 암호 '1226'을 입력하세요.</p>
                <form onSubmit={checkLogin} className="flex gap-2 justify-center">
                    <input
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="패스코드"
                        className="bg-[#050912] border border-slate-800 focus:border-gold-500 rounded-xl px-4 py-2 text-sm text-slate-200 outline-none w-48 text-center"
                    />
                    <button type="submit" className="px-5 py-2 bg-[#c6a052] hover:bg-[#b08e45] text-midnight-950 font-bold rounded-xl text-sm transition-all">
                        로그인
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#0d1527] border border-gold-500/30 rounded-2xl p-6 shadow-2xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-gold-500" />
                    <h4 className="font-serif text-base font-bold text-gold-400">📊 주최측 통합 실시간 어드민 패널</h4>
                </div>
                <button onClick={() => setIsAdmin(false)} className="text-xs text-slate-500 hover:text-slate-400 flex items-center gap-1">
                    <Unlock className="h-3 w-3" /> 대시보드 잠그기
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#111c3a]/40 p-3 rounded-xl border border-slate-800"><p className="text-[10px] text-slate-400">총 참석 인원</p><p className="text-lg font-bold text-gold-400">{stats.total + 3}명</p></div>
                <div className="bg-[#111c3a]/40 p-3 rounded-xl border border-slate-800"><p className="text-[10px] text-slate-400">셔틀 이용 수요</p><p className="text-lg font-bold text-amber-400">{stats.shuttleCount + 1}명</p></div>
                <div className="bg-[#111c3a]/40 p-3 rounded-xl border border-slate-800"><p className="text-[10px] text-slate-400">안심 스테이크 발주</p><p className="text-lg font-bold text-emerald-400">{stats.steak + 2}개</p></div>
            </div>

            {/* 실시간 CSS 미니 게이지 바 그래프 */}
            <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400">🍷 실시간 주류 수요 분포</h5>
                {[
                    { label: '와인류 (레드/화이트)', count: stats.wine + 1, color: 'bg-purple-500' },
                    { label: '생맥주 발주량', count: stats.beer + 1, color: 'bg-amber-500' },
                    { label: '무알콜 음료', count: stats.nonAlc + 1, color: 'bg-blue-500' }
                ].map((item, i) => {
                    const totalCount = stats.wine + stats.beer + stats.nonAlc + 3;
                    const percent = Math.round((item.count / totalCount) * 100);
                    return (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-300"><span>{item.label}</span><span className="font-bold">{item.count}개 ({percent}%)</span></div>
                            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden"><div className={`${item.color} h-full transition-all duration-500`} style={{ width: `${percent}%` }} /></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}