"use client";

import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import CoinFlip from "@/components/CoinFlip";
import MealDrawer from "@/components/MealDrawer";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, Settings, X } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ countA: 0, countB: 0, recent: [] as any[] });
  const [nicknames, setNicknames] = useState({ partnerA: '伴侣A', partnerB: '伴侣B' });
  const [isSavingNicknames, setIsSavingNicknames] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const router = useRouter();

  const fetchStats = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: records, error } = await supabase
      .from('dish_records')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })
      .limit(50);
    
    if (!error && records) {
      const now = new Date();
      const currentMonthStr = format(now, "yyyy-MM");
      const monthRecords = records.filter(r => r.date.startsWith(currentMonthStr));
      
      let cA = 0, cB = 0;
      monthRecords.forEach(r => {
        if (r.washer === 'me') cA++;
        else cB++;
      });

      setStats({
        countA: cA,
        countB: cB,
        recent: records.slice(0, 5)
      });
    }
  };

  useEffect(() => {
    if (session) {
      fetchStats();
      // Fetch nicknames from user metadata
      const metadata = session.user.user_metadata;
      if (metadata?.partnerA || metadata?.partnerB) {
        setNicknames({
          partnerA: metadata.partnerA || '伴侣A',
          partnerB: metadata.partnerB || '伴侣B',
        });
      }
    }
  }, [session, selectedDate, refreshTrigger]);

  const saveNicknames = async () => {
    setIsSavingNicknames(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        partnerA: nicknames.partnerA,
        partnerB: nicknames.partnerB,
      }
    });
    
    if (!error) {
      alert("昵称已更新！");
    }
    setIsSavingNicknames(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) router.push("/login");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.push("/login");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto md:p-4 bg-[var(--bg-app)]">
      {/* Topbar */}
      <div className="flex items-center justify-between px-5 h-14 bg-white/90 backdrop-blur-sm border-b border-[var(--border-color)] md:rounded-t-2xl relative z-30">
        <div className="flex items-center gap-2 text-[16px] font-medium text-[var(--text-main)]">
          <span className="text-lg">🫧</span> 洗碗记录
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-xl hover:bg-[#f5efe0]"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={handleLogout}
            className="text-[12px] text-[var(--text-muted)] border border-[var(--border-color)] rounded-xl px-2.5 py-1 hover:bg-[#f5efe0] transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            退出
          </button>
        </div>

        {/* Settings Dropdown */}
        <AnimatePresence>
          {isSettingsOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsSettingsOpen(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-14 right-5 w-64 bg-[#fdfcf8] border border-[var(--border-color)] rounded-2xl shadow-xl p-4 z-50 origin-top-right"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[14px] font-bold text-[var(--text-main)] font-serif">昵称设置</h3>
                  <button onClick={() => setIsSettingsOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider ml-1">伴侣A (橙色)</label>
                    <input 
                      type="text" 
                      value={nicknames.partnerA}
                      onChange={(e) => setNicknames({ ...nicknames, partnerA: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f5efe0] border-none rounded-xl text-[12px] focus:ring-1 focus:ring-[var(--accent-a)] outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider ml-1">伴侣B (蓝色)</label>
                    <input 
                      type="text" 
                      value={nicknames.partnerB}
                      onChange={(e) => setNicknames({ ...nicknames, partnerB: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f5efe0] border-none rounded-xl text-[12px] focus:ring-1 focus:ring-[var(--accent-b)] outline-none"
                    />
                  </div>
                  <button 
                    onClick={async () => {
                      await saveNicknames();
                      setIsSettingsOpen(false);
                    }}
                    disabled={isSavingNicknames}
                    className="w-full py-2.5 bg-[var(--text-main)] text-white rounded-xl text-[12px] font-medium hover:bg-[#2e251a] disabled:opacity-50 transition-all shadow-sm"
                  >
                    {isSavingNicknames ? '保存中...' : '确认修改'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <main className="flex flex-col md:flex-row gap-4 p-4">
        {/* Left Column: Calendar & Record Drawer */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="card">
            <Calendar 
              selectedDate={selectedDate} 
              onDateSelect={handleDateSelect} 
              nicknames={nicknames}
              refreshTrigger={refreshTrigger}
            />
          </div>

          <MealDrawer 
            date={selectedDate}
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            nicknames={nicknames}
            onUpdate={() => setRefreshTrigger(prev => prev + 1)}
          />
        </div>

        {/* Right Column: Coin & Stats */}
        <div className="w-full md:w-[240px] flex flex-col gap-4">
          <CoinFlip nicknames={nicknames} />
          
          <div className="card">
            <h3 className="section-title">{format(new Date(), "M月")}统计</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[var(--text-dim)]">
                  <span>{nicknames.partnerA}</span>
                  <span id="stat-count-a">{stats.countA} 次</span>
                </div>
                <div className="h-2 bg-[#f5efe0] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-a)] transition-all" 
                    style={{ width: `${(stats.countA + stats.countB) > 0 ? (stats.countA / (stats.countA + stats.countB) * 100) : 50}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[var(--text-dim)]">
                  <span>{nicknames.partnerB}</span>
                  <span id="stat-count-b">{stats.countB} 次</span>
                </div>
                <div className="h-2 bg-[#f5efe0] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--accent-b)] transition-all" 
                    style={{ width: `${(stats.countA + stats.countB) > 0 ? (stats.countB / (stats.countA + stats.countB) * 100) : 50}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-[#f5efe0] rounded-xl p-2 text-center text-[12px] text-[var(--text-dim)] mt-2">
                {stats.countA === stats.countB ? "🌿 非常公平！" : 
                 stats.countA > stats.countB ? `${nicknames.partnerA} 多洗了 ${stats.countA - stats.countB} 次` : 
                 `${nicknames.partnerB} 多洗了 ${stats.countB - stats.countA} 次`}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">最近记录</h3>
            <div className="space-y-2">
              {stats.recent.map((record, i) => (
                <div key={i} className="flex justify-between items-center text-[12px] border-b border-[#f5efe0] pb-2 last:border-0 last:pb-0">
                  <div className="flex gap-2 items-center">
                    <span className={`badge ${record.washer === 'me' ? 'badge-a' : 'badge-b'}`}>
                      {record.washer === 'me' ? nicknames.partnerA : nicknames.partnerB}
                    </span>
                    <span className="text-[var(--text-main)]">
                      {record.meal_type === 'breakfast' ? '早餐' : 
                       record.meal_type === 'lunch' ? '午餐' : 
                       record.meal_type === 'dinner' ? '晚餐' : '宵夜'}
                    </span>
                  </div>
                  <span className="text-[var(--text-muted)]">
                    {format(new Date(record.date), "M/d")}
                  </span>
                </div>
              ))}
              {stats.recent.length === 0 && (
                <div className="text-[11px] text-[var(--text-muted)] text-center py-2">暂无记录</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
