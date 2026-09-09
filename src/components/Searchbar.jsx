export default function Searchbar({ value,onChange }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
      />
    </div>

  )
}