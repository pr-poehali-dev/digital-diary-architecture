import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DayRecord {
  date: string;
  mood: string;
  emoji: string;
  note: string;
  moodScore: number;
}

interface CalendarMosaicProps {
  year: number;
  month: number;
  records: DayRecord[];
  onDayClick?: (date: string) => void;
}

const CalendarMosaic = ({ year, month, records, onDayClick }: CalendarMosaicProps) => {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const getMoodColor = (score: number) => {
    const colors = [
      { threshold: 1, bg: '#ef4444', text: 'Плохо' },
      { threshold: 2, bg: '#f97316', text: 'Грустно' },
      { threshold: 3, bg: '#fbbf24', text: 'Нормально' },
      { threshold: 4, bg: '#84cc16', text: 'Хорошо' },
      { threshold: 5, bg: '#22c55e', text: 'Отлично' },
    ];
    
    const mood = colors.find(c => score <= c.threshold) || colors[4];
    return mood.bg;
  };

  const getSeasonalDecoration = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1) {
      return { emoji: '❄️', animation: 'animate-pulse-soft' };
    } else if (currentMonth >= 2 && currentMonth <= 4) {
      return { emoji: '🌸', animation: 'animate-bounce' };
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      return { emoji: '☀️', animation: 'animate-spin' };
    } else {
      return { emoji: '🍂', animation: 'animate-pulse' };
    }
  };

  const getHolidayDecoration = (date: string) => {
    const d = new Date(date);
    const monthDay = `${d.getMonth() + 1}-${d.getDate()}`;
    
    const holidays: Record<string, { emoji: string; name: string }> = {
      '1-1': { emoji: '🎆', name: 'Новый год' },
      '2-14': { emoji: '💝', name: 'День Валентина' },
      '10-31': { emoji: '🎃', name: 'Хэллоуин' },
      '12-25': { emoji: '🎄', name: 'Рождество' },
      '12-31': { emoji: '🎉', name: 'Новый год' },
    };
    
    return holidays[monthDay];
  };

  const getDaysInMonth = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const record = records.find(r => r.date === date);
      const holiday = getHolidayDecoration(date);
      days.push({ day, date, record, holiday });
    }
    
    return days;
  };

  const handleMouseEnter = (date: string, e: React.MouseEvent) => {
    setHoveredDay(date);
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const seasonal = getSeasonalDecoration();
  const hoveredRecord = hoveredDay ? records.find(r => r.date === hoveredDay) : null;

  return (
    <Card className="p-6 animate-scale-in shadow-lg relative">
      <div className="absolute top-4 right-4 text-3xl opacity-20 pointer-events-none">
        <span className={seasonal.animation}>{seasonal.emoji}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{monthNames[month]} {year}</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" aria-label="Предыдущий месяц">
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Следующий месяц">
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {getDaysInMonth().map((item, idx) => (
          <div key={idx} className="aspect-square">
            {item ? (
              <button
                onClick={() => onDayClick?.(item.date)}
                onMouseEnter={(e) => handleMouseEnter(item.date, e)}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full rounded-xl flex items-center justify-center text-lg font-medium transition-all hover:scale-110 hover:shadow-lg relative group"
                style={{
                  backgroundColor: item.record 
                    ? getMoodColor(item.record.moodScore)
                    : 'hsl(var(--muted) / 0.3)',
                  color: item.record ? '#fff' : 'hsl(var(--muted-foreground))'
                }}
                aria-label={item.record ? `${item.day} число, настроение ${item.record.mood}` : `${item.day} число`}
              >
                {item.holiday && (
                  <span className="absolute -top-1 -right-1 text-lg animate-bounce">
                    {item.holiday.emoji}
                  </span>
                )}
                {item.record ? item.record.emoji : item.day}
              </button>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>

      {hoveredRecord && hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <Card className="p-4 shadow-2xl animate-scale-in bg-white border-2 max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{hoveredRecord.emoji}</span>
              <div>
                <p className="font-semibold">{hoveredRecord.mood}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(hoveredDay).toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long'
                  })}
                </p>
              </div>
            </div>
            {hoveredRecord.note && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {hoveredRecord.note}
              </p>
            )}
          </Card>
        </div>
      )}
    </Card>
  );
};

export default CalendarMosaic;
