'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const categories = [
  { label: 'All', value: '' },
  { label: 'Apparel', value: 'Apparel' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Light Stick', value: 'Light Stick' },
];

export function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get('category') || '';

  const handleFilter = (value: string) => {
    if (value) {
      router.push(`/?category=${value}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleFilter(cat.value)}
          className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition-colors ${
            currentCategory === cat.value
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
