export default function SearchBar({ value, onChange }) {
  return (
<input
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  placeholder="Search for a movie (e.g. Inception)..."
  className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent"
/>
  );
}
