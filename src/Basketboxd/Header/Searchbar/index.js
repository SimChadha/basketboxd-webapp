import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  const navigate = useNavigate();
  const [searchPlayer, setSearchPlayer] = useState('');
  const [searchYear, setSearchYear] = useState(2023);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/Search?player=${encodeURIComponent(searchPlayer)}&year=${encodeURIComponent(searchYear)}`);
    setSearchPlayer('');
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
      <input
        type="number"
        className="form-control"
        min="2008" max="2023"
        value={searchYear}
        onChange={handleYearChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Searchbar;