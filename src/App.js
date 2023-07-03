import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Lending from '../src/feature/lendingPage/components/lendingPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lending />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
