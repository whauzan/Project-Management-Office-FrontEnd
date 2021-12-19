import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Employee, Register } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/employee' element={<Employee />}/>
      </Routes>
    </Router>
  );
}

export default App;
