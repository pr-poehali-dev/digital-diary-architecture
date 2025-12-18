import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Calendar',
      title: 'Визуальный дневник',
      description: 'Каждый день — это цветная клетка. Через месяц увидишь паттерны своей жизни.',
    },
    {
      icon: 'Sparkles',
      title: 'Твои метрики',
      description: 'Настроение, сон, продуктивность — отслеживай то, что важно именно тебе.',
    },
    {
      icon: 'TrendingUp',
      title: 'Понятная статистика',
      description: 'Графики и инсайты помогают видеть, что работает, а что нет.',
    },
  ];

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📔</span>
            <span className="text-lg font-semibold">Моя жизнь в цифрах</span>
          </div>
          <Button onClick={handleGetStarted} size="sm">
            Войти
          </Button>
        </div>
      </nav>

      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Твой цифровой дневник<br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                с визуальной памятью
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Отмечай настроение и привычки. Смотри, как складывается узор твоей жизни.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleGetStarted} size="lg" className="text-base">
                Начать
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 bg-white shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-7 gap-1 p-4 opacity-40">
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded animate-fade-in"
                      style={{
                        backgroundColor: ['#E5DEFF', '#FFDEE2', '#FEF7CD', '#F2FCE2', '#D3E4FD'][i % 5],
                        animationDelay: `${i * 0.03}s`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10 text-center">
                  <span className="text-6xl block mb-3">📅</span>
                  <p className="text-xl font-semibold text-foreground">Календарь-мозаика</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Как это работает
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="p-6 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
              "Через месяц я увидел паттерны,<br />которые раньше не замечал"
            </blockquote>
            <p className="text-muted-foreground">— Дмитрий, пользователь</p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Начни прямо сейчас
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Регистрация занимает 30 секунд
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="text-base px-8"
            >
              Создать аккаунт
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📔</span>
            <span className="font-semibold">Моя жизнь в цифрах</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;