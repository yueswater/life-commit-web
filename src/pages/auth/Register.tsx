import React, { useState } from 'react';
import { supabase } from '@/services/supabase';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@/components/ui/Card';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert(t('auth.registerSuccess'));
      navigate('/login');
    }
  };

  const inputStyle =
    'input input-bordered w-full bg-base-200 border-base-300 text-base-content rounded-2xl h-14 focus:border-primary transition-all';

  return (
    <Card title={t('auth.createAccount')}>
      <form className="w-full flex flex-col gap-5" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control text-left">
            <label className="label py-1">
              <span className="label-text text-base-content/60 font-bold uppercase tracking-widest text-[10px]">
                {t('common.firstName')}
              </span>
            </label>
            <input type="text" className={inputStyle} required />
          </div>
          <div className="form-control text-left">
            <label className="label py-1">
              <span className="label-text text-base-content/60 font-bold uppercase tracking-widest text-[10px]">
                {t('common.lastName')}
              </span>
            </label>
            <input type="text" className={inputStyle} required />
          </div>
        </div>

        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-base-content/60 font-bold uppercase tracking-widest text-[10px]">
              {t('common.username')}
            </span>
          </label>
          <input
            type="text"
            className={inputStyle}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-base-content/60 font-bold uppercase tracking-widest text-[10px]">
              {t('common.email')}
            </span>
          </label>
          <input
            type="email"
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
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
          className={`btn btn-primary w-full rounded-2xl h-14 font-black uppercase tracking-tighter mt-4 font-huninn ${loading ? 'loading' : ''}`}
          type="submit"
          disabled={loading}
        >
          {t('common.register')}
        </button>

        <div className="text-center mt-2">
          <span className="text-base-content/60 font-medium">
            {t('common.hasAccount')}{' '}
          </span>
          <Link
            to="/login"
            className="text-primary hover:underline font-black uppercase tracking-tighter"
          >
            {t('common.login')}
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Register;
