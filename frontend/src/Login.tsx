import { useState } from 'react'
import api from './api';
import './App.css'

function Login({ onLoggedIn }: { onLoggedIn: () => void }) {

  /**
   * Use States
   */
  const [email, setEmail] = useState(''); // Email of login form
  const [password, setPassword] = useState(''); // Password of login form
  const [error, setError] = useState(''); // Msg of login form

  /**
   * Authenticate login via API and set Token on localStorage
   * @param e Form Event
   */
  async function handleSubmit( e: React.FormEvent ) {
    
    e.preventDefault();
    
    try {

        const res = await api.post('/login', { email, password });

        localStorage.setItem('token', res.data.token);

        onLoggedIn(); // Tell App.tsx that user has logged to change page

    } catch( err: any ) {

        setError( err?.response?.data?.message ?? "Falha no Login" );

    }

  }

  return (

    /* Login Form */
    <div>
      <form onSubmit={handleSubmit}>

        <h2>Login</h2>

        <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" name="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>

        <div>
            <label htmlFor="password">Senha</label>
            <br />
            <input type="password" name="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>

        <button type="submit">Entrar</button>

        {error && <p>{error}</p>}

      </form>
    </div>

  )
}

export default Login
