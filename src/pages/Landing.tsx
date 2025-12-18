import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const features = [
    {
      icon: 'Clock',
      title: 'Отмечай день за 15 секунд',
      description: 'Быстрый ввод настроения, привычек и заметок. Никакого лишнего — только то, что важно тебе.',
      color: 'bg-pastel-blue'
    },
    {
      icon: 'Grid3x3',
      title: 'Видь узор своей жизни',
      description: 'Каждый день становится цветной плиткой. Эмоции и привычки складываются в красивую мозаику.',
      color: 'bg-pastel-purple'
    },
    {
      icon: 'TrendingUp',
      title: 'Получай красивые отчёты',
      description: 'Графики, статистика, достижения — видь, как ты растёшь день за днём.',
      color: 'bg-pastel-yellow'
    },
    {
      icon: 'Share2',
      title: 'Делись с друзьями',
      description: 'Экспортируй свою мозаику в PDF или делись результатами в соцсетях.',
      color: 'bg-pastel-green'
    }
  ];

  const testimonials = [
    {
      name: 'Анна',
      avatar: '👩‍💼',
      text: 'Это не просто трекер — это моя визуальная история. Вижу паттерны, которые раньше не замечала.',
      color: 'bg-pastel-pink'
    },
    {
      name: 'Дмитрий',
      avatar: '👨‍💻',
      text: 'Заполняю каждый вечер за минуту. Через месяц увидел, как настроение связано со сном — открытие!',
      color: 'bg-pastel-blue'
    },
    {
      name: 'Мария',
      avatar: '🎨',
      text: 'Самое красивое приложение для дневника. Хочется возвращаться каждый день.',
      color: 'bg-pastel-purple'
    }
  ];

  const screenshots = [
    { title: 'Календарь-мозаика', emoji: '📅' },
    { title: 'Карточка дня', emoji: '✨' },
    { title: 'Статистика', emoji: '📊' },
    { title: 'Достижения', emoji: '🏆' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue">
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">📔</span>
            <span className="text-xl font-bold">Моя жизнь в цифрах</span>
          </div>
          <Button onClick={handleGetStarted} size="lg" className="hidden md:flex">
            Начать бесплатно
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 rounded-lg animate-pulse-soft"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#E5DEFF', '#FFDEE2', '#FEF7CD', '#F2FCE2', '#D3E4FD'][i % 5],
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-6 py-2 text-base animate-fade-in">
            ✨ Новый взгляд на свою жизнь
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Видь свою жизнь в цифрах —<br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              красиво, просто, вдохновляюще
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Каждый день создаёт мозаику твоей жизни. Отмечай привычки и эмоции, чтобы увидеть, как ты растёшь.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button onClick={handleGetStarted} size="lg" className="h-14 px-8 text-lg">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Начать бесплатно
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Бесплатно навсегда • Без регистрации карты • Доступно везде
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Что это и зачем
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className={`p-6 hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer animate-scale-in ${feature.color}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Icon name={feature.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Превью интерфейса
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Простой, красивый и интуитивный дизайн
          </p>

          <div className="relative">
            <Card className="p-8 md:p-16 bg-white/80 backdrop-blur-lg shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-pastel-purple to-pastel-blue rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <span className="text-8xl mb-4 block animate-pulse-soft">
                    {screenshots[currentScreenshot].emoji}
                  </span>
                  <p className="text-2xl font-semibold text-white">
                    {screenshots[currentScreenshot].title}
                  </p>
                </div>
                
                <div className="absolute inset-0 grid grid-cols-7 gap-2 p-4 opacity-20">
                  {[...Array(35)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg animate-fade-in"
                      style={{
                        backgroundColor: ['#E5DEFF', '#FFDEE2', '#FEF7CD', '#F2FCE2', '#D3E4FD'][i % 5],
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentScreenshot(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentScreenshot === idx ? 'bg-primary w-8' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-pastel-yellow via-pastel-pink to-pastel-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-9xl animate-pulse-soft">✨</div>
          <div className="absolute bottom-10 left-10 text-9xl animate-pulse-soft" style={{ animationDelay: '1s' }}>🌟</div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <blockquote className="text-3xl md:text-5xl font-bold mb-8 leading-relaxed">
            "Это не статистика.<br />
            Это история твоей жизни —<br />
            в цвете, ритме и эмоциях."
          </blockquote>

          <div className="mt-12 p-8 bg-white/80 backdrop-blur-lg rounded-3xl">
            <p className="text-xl font-semibold mb-4">Твоя мозаика за год</p>
            <div className="grid grid-cols-12 gap-1">
              {[...Array(365)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm animate-scale-in"
                  style={{
                    backgroundColor: ['#E5DEFF', '#FFDEE2', '#FEF7CD', '#F2FCE2', '#D3E4FD'][i % 5],
                    animationDelay: `${i * 0.005}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Что говорят пользователи
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className={`p-6 hover:shadow-xl transition-all animate-scale-in ${testimonial.color}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-br from-primary to-secondary text-white shadow-2xl animate-scale-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Создай свою мозаику жизни
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Начни сегодня — и через месяц увидишь свою жизнь по-новому
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              variant="secondary"
              className="h-16 px-12 text-lg animate-pulse-soft"
            >
              <Icon name="Sparkles" size={24} className="mr-2" />
              Начать бесплатно
            </Button>
            <p className="text-sm mt-4 opacity-75">
              Бесплатно навсегда • Без регистрации карты
            </p>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">📔</span>
                <span className="text-xl font-bold">Моя жизнь в цифрах</span>
              </div>
              <p className="text-sm opacity-75">
                Создавай красивую мозаику своей жизни каждый день
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Продукт</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100">Возможности</a></li>
                <li><a href="#" className="hover:opacity-100">Цены</a></li>
                <li><a href="#" className="hover:opacity-100">Блог</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Поддержка</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100">Помощь</a></li>
                <li><a href="#" className="hover:opacity-100">Контакты</a></li>
                <li><a href="#" className="hover:opacity-100">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Соцсети</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                  <Icon name="Twitter" size={20} />
                </button>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                  <Icon name="Instagram" size={20} />
                </button>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                  <Icon name="Facebook" size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
            <p>© 2025 Моя жизнь в цифрах. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100">Политика конфиденциальности</a>
              <a href="#" className="hover:opacity-100">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
