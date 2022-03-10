import { Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id/:date" element={<Details />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
