import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const [defaultSort, setDefaultSort] = useLocalStorage("defaultSort", "relevance");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Preferences</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Theme</label>
          <div className="flex gap-3">
            {["light", "dark"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-md text-sm border ${
                  theme === t
                    ? "bg-accent text-white border-accent"
                    : "border-neutral-300 dark:border-neutral-700"
                }`}
              >
                {t === "light" ? "☀️ Light" : "🌙 Dark"}
              </button>
            ))}
          </div>
        </div>

     <select
  value={defaultSort}
  onChange={(e) => setDefaultSort(e.target.value)}
  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
>
  <option value="relevance">Relevance</option>
  <option value="year-desc">Year: Newest</option>
  <option value="year-asc">Year: Oldest</option>
</select>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-accent text-white text-sm font-medium"
        >
          {saved ? "Saved ✓" : "Save preferences"}
        </button>
      </div>
    </div>
  );
}
