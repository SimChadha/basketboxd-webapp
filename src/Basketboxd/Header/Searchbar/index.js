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
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search..."
        value={searchPlayer}
        style={{ width: "400px" }}
        onChange={handlePlayerChange}
      />
      <select
        className="form-control me-2 text-center"
        value={searchYear}
        style={{ width: "75px" }}
        onChange={handleYearChange}
      >
        {Array.from(
          { length: 2023 - 2006 + 1 },
          (_, index) => 2006 + index
        ).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <input
        type="submit"
        value="Submit"
        className="btn btn-outline-success"
      />
    </form>
  );
}

export default Searchbar;
