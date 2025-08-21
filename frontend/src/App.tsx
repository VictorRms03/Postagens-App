import { useState } from 'react'
import Login from './Login';
import Posts from './Posts';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // State to verify if user is logged

  return (

    <html lang="pt_BR" className="h-full bg-white">

      <head>
        <meta charSet="UTF-8" />
        <title>Postagens App</title>
      </head>

      <body className="h-full">
        {loggedIn ? <Posts/> : <Login onLoggedIn={() => setLoggedIn(true)} />}
      </body>

    </html>

  );                                    

}

export default App
