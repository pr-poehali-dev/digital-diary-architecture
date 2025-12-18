import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DayRecord {
  date: string;
  mood: string;
  emoji: string;
  note: string;
  color: string;
}

const moods = [
  { emoji: '😊', label: 'Отлично', color: 'bg-pastel-green' },
  { emoji: '😌', label: 'Хорошо', color: 'bg-pastel-blue' },
  { emoji: '😐', label: 'Нормально', color: 'bg-pastel-yellow' },
  { emoji: '😔', label: 'Грустно', color: 'bg-pastel-peach' },
  { emoji: '😫', label: 'Плохо', color: 'bg-pastel-pink' },
];

const achievements = [
  { id: 1, title: 'Первая запись', icon: 'Sparkles', earned: true },
  { id: 2, title: '7 дней подряд', icon: 'Calendar', earned: false },
  { id: 3, title: '30 дней подряд', icon: 'Trophy', earned: false },
  { id: 4, title: 'Все настроения', icon: 'Heart', earned: false },
];

const Index = () => {
  const [records, setRecords] = useState<DayRecord[]>([
    { date: '2025-12-18', mood: 'Отлично', emoji: '😊', note: 'Начал работу над проектом мечты!', color: 'bg-pastel-green' },
    { date: '2025-12-17', mood: 'Хорошо', emoji: '😌', note: 'Продуктивный день', color: 'bg-pastel-blue' },
    { date: '2025-12-16', mood: 'Нормально', emoji: '😐', note: 'Обычный день', color: 'bg-pastel-yellow' },
  ]);

  const [currentNote, setCurrentNote] = useState('');
  const [selectedMood, setSelectedMood] = useState(moods[0]);

  const getDaysInMonth = () => {
    const year = 2025;
    const month = 11;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const record = records.find(r => r.date === date);
      days.push({ day, date, record });
    }
    
    return days;
  };

  const handleAddRecord = () => {
    const today = new Date().toISOString().split('T')[0];
    const newRecord: DayRecord = {
      date: today,
      mood: selectedMood.label,
      emoji: selectedMood.emoji,
      note: currentNote,
      color: selectedMood.color,
    };
    
    setRecords(prev => {
      const filtered = prev.filter(r => r.date !== today);
      return [...filtered, newRecord].sort((a, b) => b.date.localeCompare(a.date));
    });
    
    setCurrentNote('');
  };

  const moodStats = moods.map(mood => ({
    ...mood,
    count: records.filter(r => r.mood === mood.label).length,
  }));

  const totalDays = records.length;
  const streak = Math.min(totalDays, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">
            Моя жизнь в цифрах
          </h1>
          <p className="text-muted-foreground text-lg">Создай красивую мозаику своей жизни</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <Card className="lg:col-span-2 p-6 animate-scale-in shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Декабрь 2025</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
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
                      className={`w-full h-full rounded-xl flex items-center justify-center text-lg font-medium transition-all hover:scale-110 hover:shadow-lg ${
                        item.record 
                          ? `${item.record.color} text-foreground` 
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {item.record ? item.record.emoji : item.day}
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            
            <Card className="p-6 animate-scale-in shadow-lg" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Smile" size={24} className="text-primary" />
                Сегодняшнее настроение
              </h3>

              <div className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {moods.map(mood => (
                    <button
                      key={mood.label}
                      onClick={() => setSelectedMood(mood)}
                      className={`p-3 rounded-xl text-3xl transition-all hover:scale-110 ${
                        selectedMood.emoji === mood.emoji 
                          ? `${mood.color} ring-4 ring-primary/50` 
                          : `${mood.color} opacity-50 hover:opacity-100`
                      }`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>

                <Textarea
                  placeholder="Что произошло сегодня?"
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  className="min-h-24 resize-none"
                />

                <Button 
                  onClick={handleAddRecord} 
                  className="w-full"
                  size="lg"
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Сохранить день
                </Button>
              </div>
            </Card>

            <Card className="p-6 animate-scale-in shadow-lg" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Zap" size={24} className="text-primary" />
                Статистика
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-pastel-purple rounded-lg">
                  <span className="font-medium">Дней записано</span>
                  <Badge variant="secondary" className="text-lg px-3">{totalDays}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-pastel-green rounded-lg">
                  <span className="font-medium">Серия дней</span>
                  <Badge variant="secondary" className="text-lg px-3">
                    <Icon name="Flame" size={16} className="mr-1" />
                    {streak}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Настроения</p>
                  {moodStats.map(stat => (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="text-xl">{stat.emoji}</span>
                          {stat.label}
                        </span>
                        <span className="font-medium">{stat.count}</span>
                      </div>
                      <Progress value={(stat.count / totalDays) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-scale-in shadow-lg" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Award" size={24} className="text-primary" />
                Достижения
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl text-center transition-all ${
                      achievement.earned 
                        ? 'bg-pastel-yellow animate-pulse-soft' 
                        : 'bg-muted/50 opacity-50'
                    }`}
                  >
                    <Icon 
                      name={achievement.icon} 
                      size={32} 
                      className={`mx-auto mb-2 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                    <p className="text-sm font-medium">{achievement.title}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 animate-fade-in shadow-lg" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={24} className="text-primary" />
            Последние записи
          </h3>

          <div className="space-y-3">
            {records.slice(0, 5).map(record => (
              <div 
                key={record.date} 
                className={`p-4 rounded-xl ${record.color} hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{record.emoji}</span>
                    <div>
                      <p className="font-semibold">{record.mood}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(record.date).toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm">{record.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
