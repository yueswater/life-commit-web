import React, { useState } from 'react';
import { supabase } from '@/services/supabase';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let loginEmail: string = identifier;

    if (!identifier.includes('@')) {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', identifier)
        .single();

      if (profileError || !data || !data.email) {
        alert('找不到該使用者名稱');
        setLoading(false);
        return;
      }
      loginEmail = data.email as string;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      navigate('/dashboard', { replace: true });
    }
  };

  const inputStyle = "input input-bordered w-full bg-base-200 border-base-300 text-base-content rounded-2xl h-14 focus:border-primary transition-all";

  return (
    <Card title={t('auth.welcomeBack')}>
      <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-base-content/60 font-bold uppercase tracking-widest text-[10px]">
              {t('common.username')} / {t('common.email')}
            </span>
          </label>
          <input
            type="text"
            className={inputStyle}
            placeholder={t('auth.placeholders.account')}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-base-content/60 font-bold uppercase tracking-widest text-[10px]">
              {t('common.password')}
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={inputStyle}
              placeholder={t('common.passwordPlaceholder')}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-4 text-base-content/40 hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          className={`btn btn-primary w-full rounded-2xl h-14 font-black uppercase tracking-tighter font-huninn ${loading ? 'loading' : ''}`}
          type="submit"
          disabled={loading}
        >
          {t('common.login')}
        </button>

        <div className="divider text-base-content/20 text-[10px] font-bold uppercase tracking-[0.2em] px-4">
          {t('common.or')}
        </div>

        <div className="text-center">
          <span className="text-base-content/60 font-medium">{t('common.noAccount')} </span>
          <Link
            to="/register"
            className="text-primary hover:underline font-black uppercase tracking-tighter"
          >
            {t('common.register')}
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Login;