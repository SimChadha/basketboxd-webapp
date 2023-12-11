import './App.css';
import { HashRouter } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';
import Basketboxd from './Basketboxd';
import './index.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
          <div>
            <Routes>
              <Route path="/*" element={<Basketboxd />} />
            </Routes>
         </div>
      </HashRouter>
    </div>
  );
}

export default App;
