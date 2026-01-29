import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/services/supabase';
import { Tag, Search, Plus, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TagSearchProps {
  selectedTagId: string | null;
  onSelect: (id: string | null, name: string) => void;
}

const TagSearch = ({ selectedTagId, onSelect }: TagSearchProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchTags = async (searchQuery: string) => {
    setLoading(true);
    let rpc = supabase
      .from('tags')
      .select('id, name')
      .order('created_at', { ascending: false });

    if (searchQuery) {
      rpc = rpc.ilike('name', `%${searchQuery}%`);
    } else {
      rpc = rpc.limit(5);
    }

    const { data } = await rpc;
    setResults(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTags(query);
  }, [query]);

  const handleCreateTag = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data, error } = await supabase
        .from('tags')
        .insert({
          name: query,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        onSelect(data.id, data.name);
        setQuery(data.name);
        setShowDropdown(false);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-control relative w-full" ref={dropdownRef}>
      <label className="label py-1 px-0">
        <span className="label-text text-base-content/60 font-bold uppercase text-[10px] tracking-widest">
          {t('habit.tag')}
        </span>
      </label>
      <div className="flex items-center gap-3 bg-base-200 border border-base-300 h-14 rounded-2xl px-4 focus-within:border-primary transition-all w-full">
        <Tag
          size={18}
          className={selectedTagId ? 'text-primary' : 'text-base-content/40'}
        />
        <input
          type="text"
          className="grow font-bold bg-transparent outline-none w-full text-base-content placeholder:text-base-content/20"
          placeholder={t('habit.searchOrAddTag')}
          value={query}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) onSelect(null, '');
          }}
        />
        {loading ? (
          <Loader2 size={16} className="animate-spin text-primary" />
        ) : (
          <Search size={16} className="text-base-content/40" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-[88px] left-0 w-full bg-base-100 border border-base-300 rounded-2xl shadow-2xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 flex flex-col gap-1 max-h-60 overflow-y-auto custom-scrollbar">
            {results.length > 0
              ? results.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-primary hover:text-primary-content rounded-xl font-bold transition-colors text-left w-full text-base-content"
                    onClick={() => {
                      onSelect(tag.id, tag.name);
                      setQuery(tag.name);
                      setShowDropdown(false);
                    }}
                  >
                    <Tag size={14} className="opacity-40" /> {tag.name}
                  </button>
                ))
              : query && (
                  <div className="p-4 text-center text-base-content/40 text-sm">
                    {t('habit.noMatchingTags')}
                  </div>
                )}

            {query &&
              !results.some(
                (r) => r.name.toLowerCase() === query.toLowerCase()
              ) && (
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-content rounded-xl font-black transition-colors border border-primary/20 mt-1 w-full"
                  onClick={handleCreateTag}
                >
                  <Plus size={16} /> {t('habit.addTag', { tag: query })}
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSearch;