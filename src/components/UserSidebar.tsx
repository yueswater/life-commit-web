import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Settings,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar = ({ isOpen, onClose }: UserSidebarProps) => {
  const { t } = useTranslation();
  const { profile, signOut } = useAuth();

  return (
    <>
      <div
        className={`fixed inset-0 z-[150] transition-all duration-500 ${
          isOpen
            ? 'bg-black/40 backdrop-blur-md opacity-100'
            : 'bg-transparent opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[320px] bg-base-100 z-[160] shadow-2xl transition-transform duration-500 ease-out border-l border-base-300/30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle hover:bg-base-200"
            >
              <X size={28} />
            </button>
            <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase opacity-50">
              {t('sidebar.userMenu')}
            </span>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-3xl bg-neutral ring-4 ring-primary ring-offset-4 ring-offset-base-100 mb-6 overflow-hidden flex items-center justify-center shadow-xl">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon size={32} />
              )}
            </div>
            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase mb-1">
              {profile?.username}
            </h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-80">
              {t('stats.plan')}
            </p>
          </div>

          <div className="flex flex-col gap-2 flex-grow">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              label={t('sidebar.habits')}
              to="/dashboard"
              onClick={onClose}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              label={t('sidebar.settings')}
              to="/settings"
              onClick={onClose}
            />
          </div>

          <div className="pt-6 border-t border-base-300">
            <button
              onClick={() => {
                signOut();
                onClose();
              }}
              className="w-full btn btn-error btn-outline rounded-3xl font-black uppercase tracking-widest gap-3 h-14"
            >
              <LogOut size={20} />
              {t('common.logout')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const SidebarItem = ({
  icon,
  label,
  to,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-base-200 transition-all font-bold text-gray-400 hover:text-white group"
  >
    <div className="text-gray-500 group-hover:text-primary transition-colors">
      {icon}
    </div>
    <span className="uppercase tracking-tight text-sm">{label}</span>
  </Link>
);

export default UserSidebar;
