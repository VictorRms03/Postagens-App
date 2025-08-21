import { useState } from 'react'
import { useEffect } from 'react'
import api from './api';
import './App.css'

function Posts() {

  type Post = { 
    id: number; 
    title: string; 
    content: string; 
    user: { 
      id: number; 
      name: string 
    };
  };

  const [posts, setPosts] = useState<Post[]>([]);

  async function getPosts() {
    
    const { data } = await api.get('/posts');

    setPosts(data);
    
  }

  useEffect(() => { getPosts(); }, []);

  return (
    <div>
      <h2>Postagens</h2>
      <ul>
        {posts.map(p => (
          <li key={p.id} >
            <h3>{p.title}</h3> <span> — usuário: {p.user?.name ?? 'Desconhecido'}</span>
            <p>{p.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts
