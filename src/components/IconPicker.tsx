import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Search, X, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ICON_MAPPING } from '../data/icons';

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
        <span className="label-text text-gray-400 font-bold uppercase text-xs">
          {t('habit.icon')}
        </span>
      </label>

      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-4 bg-base-200 border border-gray-700 h-14 rounded-2xl px-4 hover:border-primary transition-all w-full overflow-hidden group"
      >
        <div className="p-2 bg-primary/10 rounded-xl text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
          <SelectedIconComponent size={24} />
        </div>
        <span className="font-bold text-gray-200 truncate">{displayLabel}</span>
      </button>

      {showPicker && (
        <div className="absolute top-[88px] left-0 w-full bg-base-300 border border-gray-700 rounded-3xl shadow-2xl z-[70] p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 bg-base-100 border border-gray-800 rounded-xl px-3 mb-4 focus-within:border-primary transition-all">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              className="bg-transparent w-full py-2 text-sm font-bold outline-none text-white"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <X
                size={16}
                className="cursor-pointer hover:text-white"
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>

          <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
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
                  className={`flex items-center justify-center p-3 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-content shadow-lg shadow-primary/20'
                      : 'hover:bg-base-200 text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComp size={22} />
                </button>
              );
            })}
            {filteredIcons.length === 0 && (
              <div className="col-span-5 py-6 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
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
