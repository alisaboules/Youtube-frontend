import { HeaderLinks } from './HeaderLinks';
import { HeaderProfile } from './HeaderProfile';
import { SearchField } from './SearchField';

export function Header() {
  return (
    <header className="p-3 mt-2 relative">
      <div className="flex items-center justify-end">
        <div className="absolute left-1/2 -translate-x-1/2">
          <SearchField />
        </div>
        <div className="flex gap-6 items-center pr-7">
          <HeaderLinks />
          <HeaderProfile />
        </div>
      </div>
      <div className="bg-border h-px mt-4 mb-2" />
    </header>
  );
}
