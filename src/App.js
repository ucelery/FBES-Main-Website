import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './views/dashboard';
import Login from './views/login';
import Homepage from './views/homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
