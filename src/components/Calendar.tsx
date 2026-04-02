"use client";

import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  nicknames: { partnerA: string; partnerB: string };
  refreshTrigger?: number;
}

export default function Calendar({ selectedDate, onDateSelect, nicknames, refreshTrigger }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));
  const [monthlyRecords, setMonthlyRecords] = useState<any[]>([]);

  useEffect(() => {
    fetchMonthlyRecords();
  }, [currentMonth, refreshTrigger]);

  const fetchMonthlyRecords = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const start = format(startOfWeek(startOfMonth(currentMonth)), "yyyy-MM-dd");
    const end = format(endOfWeek(endOfMonth(currentMonth)), "yyyy-MM-dd");

    const { data, error } = await supabase
      .from('dish_records')
      .select('*')
      .gte('date', start)
      .lte('date', end)
      .eq('user_id', session.user.id);

    if (!error) setMonthlyRecords(data || []);
  };

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="btn-icon">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-[17px] font-medium text-[var(--text-main)] font-serif">
          {format(currentMonth, "yyyy年 M月")}
        </h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="btn-icon">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center mb-2">
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <div key={day} className="text-[11px] text-[var(--text-muted)] py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const dateStr = format(day, "yyyy-MM-dd");
          const dayRecords = monthlyRecords.filter(r => r.date === dateStr);
          const isToday = isSameDay(day, new Date());
          
          let cellClass = "day-cell";
          if (isSelected) cellClass += " ring-2 ring-[var(--text-main)] ring-inset z-10 bg-[#f5efe0]";
          if (isToday) cellClass += " day-today";
          else if (dayRecords.length > 0) {
            const washers = new Set(dayRecords.map(r => r.washer));
            if (washers.size >= 2) cellClass += " day-both";
            else if (washers.has('me')) cellClass += " day-a";
            else cellClass += " day-b";
          } else if (!isCurrentMonth) {
            cellClass += " day-dim";
          }

          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={cellClass}
            >
              <span>{format(day, "d")}</span>
              
              {dayRecords.length > 0 && !isToday && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayRecords.map((record: any) => (
                    <div 
                      key={record.id}
                      className={`w-1 h-1 rounded-full ${
                        record.washer === 'me' ? 'bg-[var(--accent-a)]' : 'bg-[var(--accent-b)]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 justify-center mt-4 pt-3 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-a)]" />{nicknames.partnerA}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-b)]" />{nicknames.partnerB}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-both)]" />都洗了
        </div>
      </div>
    </div>
  );
}
