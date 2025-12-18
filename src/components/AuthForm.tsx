import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AuthFormProps {
  onSuccess: (token: string, user: { id: number; email: string }) => void;
}

const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Заполните все поля');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Введите корректный email');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      toast.error('Пароль должен быть не менее 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/1385c68f-14e2-486b-9fdb-441aec84a5e5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Произошла ошибка');
        return;
      }

      toast.success(isLogin ? 'Добро пожаловать!' : 'Регистрация успешна!');
      onSuccess(data.token, data.user);
      
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      toast.error('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Введите email для восстановления пароля');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Введите корректный email');
      return;
    }

    toast.success('Инструкции отправлены на ваш email');
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue p-4">
        <Card className="w-full max-w-md p-8 animate-scale-in shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Key" size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Восстановление пароля</h2>
            <p className="text-muted-foreground">Введите ваш email</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <Button onClick={handleForgotPassword} className="w-full h-12" size="lg">
              Отправить инструкции
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowForgotPassword(false)}
              className="w-full"
            >
              Вернуться к входу
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue p-4">
      <Card className="w-full max-w-md p-8 animate-scale-in shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-pastel-yellow rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
            <span className="text-4xl">📔</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? 'Добро пожаловать!' : 'Создайте аккаунт'}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? 'Войдите в свой цифровой дневник' : 'Начните вести свой дневник'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Icon name="Mail" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Icon name="Lock" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <div className="relative">
                <Icon name="Lock" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-primary hover:underline"
              >
                Забыли пароль?
              </button>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Загрузка...
              </>
            ) : (
              <>
                <Icon name={isLogin ? 'LogIn' : 'UserPlus'} size={20} className="mr-2" />
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
            {' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setConfirmPassword('');
              }}
              className="text-primary font-medium hover:underline"
              disabled={isLoading}
            >
              {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
            </button>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            Нажимая кнопку регистрации, вы соглашаетесь с условиями использования
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
