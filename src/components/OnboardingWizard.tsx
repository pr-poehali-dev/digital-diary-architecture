import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Metric {
  id: string;
  name: string;
  icon: string;
  category: string;
  type: 'mvp' | 'extended';
  description: string;
  color: string;
}

const metrics: Metric[] = [
  { id: 'mood', name: 'Настроение', icon: 'Smile', category: 'Настроение', type: 'mvp', description: 'Отслеживай эмоции', color: 'bg-pastel-pink' },
  { id: 'sleep', name: 'Сон', icon: 'Moon', category: 'Здоровье', type: 'mvp', description: 'Часы сна', color: 'bg-pastel-purple' },
  { id: 'coffee', name: 'Кофе', icon: 'Coffee', category: 'Здоровье', type: 'mvp', description: 'Чашек в день', color: 'bg-pastel-peach' },
  { id: 'steps', name: 'Шаги', icon: 'Footprints', category: 'Здоровье', type: 'mvp', description: 'Физическая активность', color: 'bg-pastel-green' },
  { id: 'weather', name: 'Погода', icon: 'Cloud', category: 'Настроение', type: 'mvp', description: 'Погодные условия', color: 'bg-pastel-blue' },
  { id: 'note', name: 'Заметка', icon: 'FileText', category: 'Продуктивность', type: 'mvp', description: 'Дневник', color: 'bg-pastel-yellow' },
  { id: 'photo', name: 'Фото дня', icon: 'Camera', category: 'Творчество', type: 'mvp', description: 'Визуальные воспоминания', color: 'bg-pastel-pink' },
  
  { id: 'energy', name: 'Энергия', icon: 'Zap', category: 'Здоровье', type: 'extended', description: 'Уровень энергии', color: 'bg-pastel-yellow' },
  { id: 'water', name: 'Вода', icon: 'Droplet', category: 'Здоровье', type: 'extended', description: 'Стаканов воды', color: 'bg-pastel-blue' },
  { id: 'calories', name: 'Калории', icon: 'Utensils', category: 'Здоровье', type: 'extended', description: 'Питание', color: 'bg-pastel-peach' },
  { id: 'meditation', name: 'Медитация', icon: 'Sparkles', category: 'Здоровье', type: 'extended', description: 'Минут медитации', color: 'bg-pastel-purple' },
  { id: 'reading', name: 'Чтение', icon: 'BookOpen', category: 'Творчество', type: 'extended', description: 'Страниц прочитано', color: 'bg-pastel-green' },
  { id: 'exercise', name: 'Упражнения', icon: 'Dumbbell', category: 'Здоровье', type: 'extended', description: 'Физические тренировки', color: 'bg-pastel-pink' },
  { id: 'hobby', name: 'Хобби', icon: 'Palette', category: 'Творчество', type: 'extended', description: 'Творческие занятия', color: 'bg-pastel-yellow' },
  { id: 'social', name: 'Общение', icon: 'Users', category: 'Социальная активность', type: 'extended', description: 'Встречи с людьми', color: 'bg-pastel-blue' },
];

const categories = [
  { id: 'all', name: 'Все категории', icon: 'Grid3x3' },
  { id: 'Здоровье', name: 'Здоровье', icon: 'Heart' },
  { id: 'Продуктивность', name: 'Продуктивность', icon: 'Target' },
  { id: 'Настроение', name: 'Настроение', icon: 'Smile' },
  { id: 'Творчество', name: 'Творчество', icon: 'Palette' },
  { id: 'Социальная активность', name: 'Социальная', icon: 'Users' },
];

interface OnboardingWizardProps {
  onComplete: (selectedMetrics: string[]) => void;
}

const OnboardingWizard = ({ onComplete }: OnboardingWizardProps) => {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['mood', 'note']);
  const [showExtended, setShowExtended] = useState(false);

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const filteredMetrics = metrics.filter(m => {
    const categoryMatch = selectedCategory === 'all' || m.category === selectedCategory;
    const typeMatch = showExtended || m.type === 'mvp';
    return categoryMatch && typeMatch;
  });

  const handleComplete = () => {
    if (selectedMetrics.length === 0) {
      toast.error('Выберите хотя бы одну метрику');
      return;
    }
    onComplete(selectedMetrics);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-pulse-soft">🌟</div>
        <div className="absolute top-32 right-20 text-5xl animate-pulse-soft" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-20 left-32 text-7xl animate-pulse-soft" style={{ animationDelay: '2s' }}>🎨</div>
        <div className="absolute bottom-32 right-16 text-6xl animate-pulse-soft" style={{ animationDelay: '1.5s' }}>🚀</div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {step === 0 && (
          <Card className="p-8 md:p-12 text-center animate-scale-in shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-pastel-yellow to-pastel-pink rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
              <span className="text-6xl">📔</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Добро пожаловать!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Создай свой уникальный цифровой дневник. Выбери метрики, которые важны именно тебе, и начни строить красивую мозаику своей жизни.
            </p>
            <Button onClick={() => setStep(1)} size="lg" className="h-14 px-8">
              <Icon name="ArrowRight" size={20} className="mr-2" />
              Начать настройку
            </Button>
          </Card>
        )}

        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <Card className="p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Выбери свои метрики</h2>
                  <p className="text-muted-foreground">
                    Отмечай то, что хочешь отслеживать каждый день
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {selectedMetrics.length} выбрано
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <Icon name={cat.icon} size={18} />
                    <span className="font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6 p-4 bg-pastel-yellow rounded-xl">
                <div className="flex items-center gap-3">
                  <Icon name="Sparkles" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold">Расширенные метрики</p>
                    <p className="text-sm text-muted-foreground">Показать дополнительные опции</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExtended(!showExtended)}
                  className={`w-14 h-8 rounded-full transition-all ${
                    showExtended ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                    showExtended ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMetrics.map(metric => {
                  const isSelected = selectedMetrics.includes(metric.id);
                  return (
                    <button
                      key={metric.id}
                      onClick={() => toggleMetric(metric.id)}
                      className={`p-4 rounded-xl transition-all hover:scale-105 ${
                        isSelected
                          ? `${metric.color} ring-4 ring-primary/50 shadow-lg`
                          : `${metric.color} opacity-50 hover:opacity-100`
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Icon 
                          name={metric.icon} 
                          size={28} 
                          className={isSelected ? 'text-primary' : 'text-muted-foreground'}
                        />
                        {isSelected && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Icon name="Check" size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className="font-semibold text-sm mb-1">{metric.name}</p>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                      {metric.type === 'extended' && (
                        <Badge variant="outline" className="mt-2 text-xs">Расширенная</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(0)}
                size="lg"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <Button
                onClick={handleComplete}
                size="lg"
                disabled={selectedMetrics.length === 0}
              >
                Завершить настройку
                <Icon name="Check" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingWizard;
