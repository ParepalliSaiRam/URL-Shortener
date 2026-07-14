function SearchBar({ value, onChange }) {

    return (

        <input
            className="border rounded-lg p-2 w-full"
            placeholder="Search URLs..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />

    );

}

export default SearchBar;