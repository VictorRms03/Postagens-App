import { useState } from 'react'
import api from './api';
import './App.css'

function Login({ onLoggedIn}: { onLoggedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit( e: React.FormEvent ) {
    
    e.preventDefault();
    
    try {
        const res = await api.post('/login', { email, password });
        localStorage.setItem('token', res.data.token);
        onLoggedIn();
    } catch( err: any ) {
        setError( err?.response?.data?.message ?? "Falha no Login" );
    }

  }

  return (
    <>
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
    </>
  )
}

export default Login
