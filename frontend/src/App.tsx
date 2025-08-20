import { useState } from 'react'
import './App.css'
import Login from './Login';
import Posts from './Posts';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  return loggedIn ? <Posts/> : <Login onLoggedIn={() => setLoggedIn(true)} />;

}

export default App
