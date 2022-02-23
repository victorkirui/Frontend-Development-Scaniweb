import {useState} from 'react';
import './App.css';
import Home from './pages/Home'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  const [isOpen,setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  }


  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
