import { useState } from 'react'
import Login from './Login';
import Posts from './Posts';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // State to verify if user is logged

  return loggedIn ? <Posts/> : <Login onLoggedIn={() => setLoggedIn(true)} />
  
}

export default App
