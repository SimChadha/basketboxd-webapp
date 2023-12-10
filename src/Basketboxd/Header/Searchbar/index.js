import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const navigate = useNavigate();
  const [searchPlayer, setSearchPlayer] = useState("");
  const [searchYear, setSearchYear] = useState(2023);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(
      `/Search?player=${encodeURIComponent(
        searchPlayer
      )}&year=${encodeURIComponent(searchYear)}`
    );
    setSearchPlayer("");
    setSearchYear(2023);
  };

  const handlePlayerChange = (event) => {
    setSearchPlayer(event.target.value);
  };

  const handleYearChange = (event) => {
    setSearchYear(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control w-75"
        placeholder="Search..."
        value={searchPlayer}
        onChange={handlePlayerChange}
      />
      <select
        className="form-control"
        value={searchYear}
        onChange={handleYearChange}
      >
        {Array.from(
          { length: 2024 - 2006 + 1 },
          (_, index) => 2006 + index
        ).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Searchbar;
