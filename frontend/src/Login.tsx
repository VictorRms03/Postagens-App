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

          <label htmlFor="email" style={{fontWeight: "500"}}>Email</label>

          <br />

          <input type="email" name="email" id="email" value={email} 
            onChange={e=>setEmail(e.target.value)} required
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}
          />

        </div>

        <div>

          <label htmlFor="password" style={{fontWeight: "500"}}>Senha</label>

          <br />

          <input type="password" name="password" id="password" value={password} 
            onChange={e=>setPassword(e.target.value)} required
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
            }}  
          />

        </div>

        <button type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            marginTop: '10px'
          }}> Entrar </button>

        {error && <p style={{color:'red'}} >{error}</p>}

      </form>
    </div>

  )
}

export default Login
