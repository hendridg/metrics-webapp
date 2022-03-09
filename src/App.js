import { Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import Home from './pages/Home';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id/:date" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
