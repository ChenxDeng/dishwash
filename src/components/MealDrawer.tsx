"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { Coffee, Sun, Utensils, Moon } from "lucide-react";

interface MealDrawerProps {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
  nicknames: { partnerA: string; partnerB: string };
  onUpdate?: () => void;
}

const MEAL_TYPES = [
  { id: 'breakfast', label: '早餐', icon: Coffee, icon_emoji: '🌅' },
  { id: 'lunch', label: '午餐', icon: Sun, icon_emoji: '☀️' },
  { id: 'dinner', label: '晚餐', icon: Utensils, icon_emoji: '🌙' },
  { id: 'snack', label: '宵夜', icon: Moon, icon_emoji: '✨' },
];

export default function MealDrawer({ date, isOpen, onClose, nicknames, onUpdate }: MealDrawerProps) {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<'me' | 'partner'>('me');
  const [selectedMeal, setSelectedMeal] = useState<string>('dinner');

  const formattedDate = format(date, "yyyy-MM-dd");

  useEffect(() => {
    if (isOpen) {
      fetchRecords();
    }
  }, [isOpen, date]);

  const fetchRecords = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('dish_records')
      .select('*')
      .eq('date', formattedDate)
      .eq('user_id', session.user.id);
    
    if (!error) setRecords(data || []);
    setLoading(false);
  };

  const updateRecord = async (mealType: string, washer: string | null) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    if (washer === null) {
      await supabase
        .from('dish_records')
        .delete()
        .eq('date', formattedDate)
        .eq('meal_type', mealType)
        .eq('user_id', session.user.id);
    } else {
      await supabase
        .from('dish_records')
        .upsert({
          date: formattedDate,
          meal_type: mealType,
          washer: washer,
          user_id: session.user.id,
        }, { onConflict: 'date,meal_type,user_id' });
    }
    fetchRecords();
    if (onUpdate) onUpdate();
  };

  if (!isOpen) return null;

  return (
    <div className="mt-4">
      <div className="card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[16px] font-medium text-[var(--text-main)] font-serif">
              {format(date, "M月d日")} {['日','一','二','三','四','五','六'][date.getDay()]}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">记录</div>
          </div>
          <button onClick={onClose} className="text-[18px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">✕</button>
        </div>

        {/* Existing Records List */}
        <div className="space-y-1.5 mb-4">
          {records.map((record) => (
            <div key={record.id} className="flex items-center justify-between bg-[#f5efe0] rounded-xl px-2.5 py-2">
              <div className="flex items-center gap-2 text-[12px] text-[var(--text-main)]">
                <span className="text-[16px]">
                  {MEAL_TYPES.find(m => m.id === record.meal_type)?.icon_emoji || '🍽️'}
                </span>
                <span>
                  <strong>{record.washer === 'me' ? nicknames.partnerA : nicknames.partnerB}</strong> 
                  洗了{MEAL_TYPES.find(m => m.id === record.meal_type)?.label}
                </span>
              </div>
              <button 
                onClick={() => updateRecord(record.meal_type, null)}
                className="text-[14px] text-[#c9956a] hover:text-red-500 transition-colors p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">谁洗的？</div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedPerson('me')}
                className={`flex-1 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  selectedPerson === 'me' ? 'bg-[var(--accent-a)] text-white shadow-sm' : 'bg-[#f5efe0] text-[var(--text-muted)]'
                }`}
              >
                {nicknames.partnerA}
              </button>
              <button
                onClick={() => setSelectedPerson('partner')}
                className={`flex-1 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  selectedPerson === 'partner' ? 'bg-[var(--accent-b)] text-white shadow-sm' : 'bg-[#f5efe0] text-[var(--text-muted)]'
                }`}
              >
                {nicknames.partnerB}
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">哪一顿？</div>
            <div className="flex gap-1.5">
              {MEAL_TYPES.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal.id)}
                  className={`flex-1 py-2 rounded-xl text-[11px] flex flex-col items-center gap-1 transition-all ${
                    selectedMeal === meal.id ? 'bg-[var(--text-main)] text-white shadow-sm' : 'bg-[#f5efe0] text-[var(--text-dim)]'
                  }`}
                >
                  <span className="text-[16px]">{meal.icon_emoji}</span>
                  {meal.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => updateRecord(selectedMeal, selectedPerson)}
            className="w-full py-2.5 bg-[var(--text-main)] text-[#fdfcf8] rounded-xl text-[13px] font-medium hover:bg-[#2e251a] transition-all shadow-sm"
          >
            ＋ 记一下
          </button>
        </div>
      </div>
    </div>
  );
}
