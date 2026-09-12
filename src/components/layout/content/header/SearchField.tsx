import { PUBLIC_PAGE } from "@/config/public-page.config";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";


export function SearchField() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const term = searchTerm.trim();

    if (!term) return;

    router.push(PUBLIC_PAGE.SEARCH(encodeURIComponent(term)));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="w-[500]">
      <input type="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search" className="relative w-full py-2 px-4 w-1/2 rounded-full border border-border"/>
      <button type='button' onClick={handleSearch} className="absolute bg-border right-0 top-0 text-foreground py-2 px-5 border-1 border-transparent rounded-r-full">
        <Search className=""/>
      </button>
    </div>
  );
}