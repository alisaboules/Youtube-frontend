import cn from 'clsx';
import { type ChangeEvent, type KeyboardEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TagsFieldProps {
  label: string;
  placeholder?: string;
  error?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

export function TagsField({
  label,
  placeholder = 'Enter tags...',
  error,
  tags = [],
  onTagsChange,
  className,
}: TagsFieldProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      e.preventDefault();
      removeTag(tags[tags.length - 1].trim());
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setInputValue('');
      onTagsChange(newTags);
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    onTagsChange(newTags);
  };

  return (
    <div className={twMerge('mb-4', className)}>
      <label>
        <span className="block text-gray-400 font-semibold mb-2">{label}</span>
        <div
          className={cn(
            'w-full px-3 py-2 border-2 rounded-lg shadow-sm flex flex-wrap gap-2 transition-colors bg-tertiary border-transparent focus-within:border-border',
            error && 'border-red-500',
          )}>
          {tags.map((tag, index) => (
            <div
              key={tag}
              className="flex items-center px-2 py-1 bg-gray-700 text-foreground rounded-lg">
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeTag(tag.trim());
                }}
                className="ml-2 text-gray-400 hover:text-gray-200">
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="bg-tertiary outline-none flex-grow text-foreground"
          />
        </div>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
