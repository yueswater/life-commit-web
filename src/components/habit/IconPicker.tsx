import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Search, X, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ICON_MAPPING } from '@/data/icons';

interface IconPickerProps {
  selectedIcon: string;
  onSelect: (iconName: string) => void;
}

const IconPicker = ({ selectedIcon, onSelect }: IconPickerProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const filteredIcons = ICON_MAPPING.filter((item) => {
    const translatedName = t(`icons.${item.label}`);
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      translatedName.includes(searchTerm) ||
      item.tags.some((tag) => tag.includes(searchTerm))
    );
  });

  const IconData = (Icons as any)[selectedIcon];
  const SelectedIconComponent = IconData || Target;
  const currentIconInfo = ICON_MAPPING.find((i) => i.name === selectedIcon);
  const displayLabel = currentIconInfo
    ? t(`icons.${currentIconInfo.label}`)
    : selectedIcon;

  return (
    <div className="form-control w-full relative">
      <label className="label py-1 px-0">
        <span className="label-text text-base-content/60 font-bold uppercase text-[10px] tracking-widest">
          {t('habit.icon')}
        </span>
      </label>

      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-3 md:gap-4 bg-base-200 border-none h-12 md:h-14 rounded-2xl px-4 hover:ring-2 hover:ring-primary/50 transition-all w-full overflow-hidden group active:scale-[0.98]"
      >
        <div className="p-1.5 md:p-2 bg-primary/10 rounded-xl text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
          <SelectedIconComponent size={20} className="md:w-6 md:h-6" />
        </div>
        <span className="font-bold text-base-content truncate text-sm md:text-base text-left grow">
          {displayLabel}
        </span>
      </button>

      {showPicker && (
        <div className="absolute top-[80px] md:top-[88px] left-0 w-full bg-base-100 border border-base-300 rounded-2xl md:rounded-3xl shadow-2xl z-[70] p-3 md:p-4 animate-in fade-in zoom-in-95 duration-200 origin-top">
          <div className="flex items-center gap-2 bg-base-200 border-none rounded-xl px-3 mb-3 md:mb-4 focus-within:ring-2 focus-within:ring-primary transition-all">
            <Search size={16} className="text-base-content/40 shrink-0" />
            <input
              type="text"
              className="bg-transparent w-full py-2 text-xs md:text-sm font-bold outline-none text-base-content placeholder:text-base-content/20"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <X
                size={16}
                className="cursor-pointer text-base-content/40 hover:text-base-content transition-colors shrink-0"
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 md:max-h-56 overflow-y-auto pr-1 custom-scrollbar">
            {filteredIcons.map((item) => {
              const IconComp = (Icons as any)[item.name] || Target;
              const isSelected = selectedIcon === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  title={t(`icons.${item.label}`)}
                  onClick={() => {
                    onSelect(item.name);
                    setShowPicker(false);
                    setSearchTerm('');
                  }}
                  className={`flex items-center justify-center p-2.5 md:p-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105'
                      : 'hover:bg-base-200 text-base-content/40 hover:text-base-content'
                  }`}
                >
                  <IconComp size={20} className="md:w-[22px] md:h-[22px]" />
                </button>
              );
            })}
            {filteredIcons.length === 0 && (
              <div className="col-span-4 sm:col-span-5 py-6 text-center text-base-content/40 text-[10px] font-bold uppercase tracking-widest">
                {t('common.noResults')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;