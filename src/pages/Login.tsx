import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Login = () => {
  const { t } = useTranslation();
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

    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <Card title={t('auth.welcomeBack')}>
      <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-gray-400 font-bold">
              {t('common.username')} / {t('common.email')}
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full bg-[#15191e] border-gray-700 rounded-2xl h-14"
            placeholder="yueswater / email@example.com"
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>

        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-gray-400 font-bold">
              {t('common.password')}
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input input-bordered w-full bg-[#15191e] border-gray-700 rounded-2xl h-14"
              placeholder={t('common.passwordPlaceholder')}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          className={`btn btn-neutral w-full rounded-2xl h-14 bg-[#2a303c] border-none text-gray-400 text-lg ${loading ? 'loading' : ''}`}
          type="submit"
          disabled={loading}
        >
          {t('common.login')}
        </button>

        <div className="divider text-gray-600 text-xs px-4">
          {t('common.or')}
        </div>

        <div className="text-center">
          <span className="text-gray-400">{t('common.noAccount')} </span>
          <Link
            to="/register"
            className="text-gray-600 hover:text-white font-bold"
          >
            {t('common.register')}
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Login;
