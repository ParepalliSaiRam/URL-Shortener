function SearchBar({ value, onChange }) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search URLs..."
            className="border rounded-lg p-2 w-full"
        />
    );
}

export default SearchBar;