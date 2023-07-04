import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Lending from '../src/feature/lendingPage/components/lendingPage.jsx';
import HomePage from '../src/feature/homepage/components/home.jsx'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lending />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
