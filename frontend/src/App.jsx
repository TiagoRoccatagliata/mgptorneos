import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar.jsx';
import Torneos from './components/Torneos.jsx';
import Calendar from './components/Calendario.jsx';
import Ranking from './components/Ranking.jsx';
import Perfil from './components/Perfil.jsx';
import TournamentDetails from './components/TournamentDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* Navbar siempre visible */}
      <Navbar />

      {/* Rutas de la aplicación */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/torneos" element={<Torneos />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />

        {/* Rutas protegidas */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;