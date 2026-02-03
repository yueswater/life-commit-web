import React, { useState } from 'react';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Shield, Camera, Loader2 } from 'lucide-react';

const Settings = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) alert(error.message);
    else alert('驗證信已發送至新舊信箱');
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(
      user?.email || '',
      {
        redirectTo: `${window.location.origin}/settings`,
      }
    );
    if (error) alert(error.message);
    else alert('密碼重設連結已發送');
    setLoading(false);
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!user || !event.target.files || event.target.files.length === 0)
        return;
      const file = event.target.files[0];
      const filePath = `${user.id}/${Math.random()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: data.publicUrl })
        .eq('id', user.id);
      if (updateError) throw updateError;
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-base-100">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12 py-6 md:py-10 px-4 md:px-6">
        <div className="w-full lg:w-1/3 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-base-300 ring-offset-4 bg-neutral shadow-2xl transition-all">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl font-black text-neutral-content bg-primary">
                  {profile?.username?.[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <label className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2.5 md:p-3 bg-primary text-primary-content rounded-full cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-transform">
              {uploading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Camera size={20} className="md:w-6 md:h-6" />
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </label>
          </div>
          <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl font-black italic tracking-tighter text-primary break-all">
            @{profile?.username}
          </h2>
        </div>

        <div className="w-full lg:w-2/3 bg-base-100 rounded-3xl p-2">
          <div className="tabs tabs-bordered grid grid-cols-2 mb-8">
            <button
              className={`tab tab-lg font-bold pb-4 h-auto ${activeTab === 'account' ? 'tab-active text-primary border-primary' : 'text-base-content/40'}`}
              onClick={() => setActiveTab('account')}
            >
              帳戶資訊
            </button>
            <button
              className={`tab tab-lg font-bold pb-4 h-auto ${activeTab === 'security' ? 'tab-active text-primary border-primary' : 'text-base-content/40'}`}
              onClick={() => setActiveTab('security')}
            >
              安全設定
            </button>
          </div>

          {activeTab === 'account' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-base-content/40 uppercase tracking-widest text-[10px]">
                    使用者名稱
                  </span>
                </label>
                <div className="text-lg md:text-xl font-bold py-2 border-b border-base-content/10 dark:text-white">
                  {profile?.username}
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-base-content/40 uppercase tracking-widest text-[10px]">
                    電子郵件
                  </span>
                </label>
                <div className="text-lg md:text-xl font-bold py-2 border-b border-base-content/10 dark:text-white break-all">
                  {user?.email}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 md:gap-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleUpdateEmail} className="flex flex-col gap-4">
                <label className="label">
                  <span className="label-text font-bold text-base-content/60 uppercase tracking-widest text-[10px]">
                    更改電子郵件
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="input input-bordered flex items-center gap-3 grow bg-base-200 border-base-300 h-14 rounded-2xl focus-within:border-primary transition-all">
                    <Mail size={20} className="text-base-content/40" />
                    <input
                      type="email"
                      className="grow font-bold bg-transparent"
                      placeholder="輸入新郵件"
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </label>
                  <button
                    className="btn btn-primary h-14 rounded-2xl px-8 font-black uppercase italic tracking-tighter"
                    type="submit"
                    disabled={loading}
                  >
                    儲存
                  </button>
                </div>
              </form>
              <div className="flex flex-col gap-4">
                <label className="label">
                  <span className="label-text font-bold text-base-content/60 uppercase tracking-widest text-[10px]">
                    安全防護
                  </span>
                </label>
                <button
                  onClick={handleResetPassword}
                  className="btn btn-outline border-base-300 hover:border-error hover:bg-error hover:text-white h-14 rounded-2xl flex items-center justify-center gap-3 group transition-all font-black uppercase italic tracking-tighter"
                  disabled={loading}
                >
                  <Shield size={20} className="group-hover:animate-pulse" />
                  重設登入密碼
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;