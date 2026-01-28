import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Register = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) alert(error.message);
    else alert(t('auth.registerSuccess'));
  };

  return (
    <Card title={t('auth.createAccount')}>
      <form className="w-full flex flex-col gap-5" onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control text-left">
            <label className="label py-1">
              <span className="label-text text-gray-400 font-bold">
                {t('common.firstName')}
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-[#15191e] border-gray-700 rounded-2xl h-14"
              required
            />
          </div>
          <div className="form-control text-left">
            <label className="label py-1">
              <span className="label-text text-gray-400 font-bold">
                {t('common.lastName')}
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-[#15191e] border-gray-700 rounded-2xl h-14"
              required
            />
          </div>
        </div>

        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-gray-400 font-bold">
              {t('common.username')}
            </span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full bg-[#15191e] border-gray-700 rounded-2xl h-14"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-control w-full text-left">
          <label className="label py-1">
            <span className="label-text text-gray-400 font-bold">
              {t('common.email')}
            </span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full bg-[#15191e] border-gray-700 rounded-2xl h-14"
            onChange={(e) => setEmail(e.target.value)}
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
          className="btn btn-neutral w-full rounded-2xl h-14 bg-[#2a303c] border-none text-gray-400 text-lg mt-4"
          type="submit"
        >
          {t('common.register')}
        </button>

        <div className="text-center mt-2">
          <span className="text-gray-400">{t('common.hasAccount')} </span>
          <Link
            to="/login"
            className="text-gray-600 hover:text-white font-bold"
          >
            {t('common.login')}
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Register;
