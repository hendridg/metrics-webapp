import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchApiByDate } from './redux/home/home';
import { BASE_URL, today } from './utils';
import Details from './components/Details';
import Home from './components/Home';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApiByDate(`${BASE_URL}${today()}`));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id/:date" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
