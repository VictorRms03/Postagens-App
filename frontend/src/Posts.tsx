import { useState } from 'react'
import { useEffect } from 'react'
import api from './api';
import './App.css'

function Posts() {

  /**
   * Type Post declaration
   */
  type Post = { 
    id: number; 
    title: string; 
    content: string; 
    user: { 
      id: number; 
      name: string 
    };
  };

  /**
   * Use States
   */
  const [posts, setPosts] = useState<Post[]>([]); // List of posts
  const [title, setTitle] = useState(''); // Title of new post form
  const [content, setContent] = useState(''); // Content of new post form
  const [msg, setMsg] = useState(''); // Msg of new post form

  /**
   * Get all posts from API and set on useState 'posts'
   */
  async function getPosts() {

    try {

      const { data } = await api.get('/posts');

      setPosts(data);  

    } catch( err:any ) {

      setMsg( err?.response?.data?.message ?? "Erro ao obter posts" );
      
    }
    
  }

  /**
   * Create a new post with API and invoke function 'getPosts()'
   */
  async function createPost(e: React.FormEvent) {

    e.preventDefault();
    
    try {

        await api.post('/posts', { title, content });
        
        setTitle(''); 
        setContent('');

        setMsg("Post criado com sucesso!");
        
        getPosts();

    } catch( err: any ) {
        setMsg( err?.response?.data?.message ?? "Erro ao criar post" );
    }
    
  }

  /**
   * First posts search
   */
  useEffect(() => { getPosts(); }, []);

  return (
    <>

      {/* div to new post form */}
      <div>

        <h2>Criar Post</h2>

        <form onSubmit={createPost}>

          <div>
            <label htmlFor="title">Título</label>
            <input type="text" name="title" id="title" placeholder="Título" 
              value={title} onChange={e=>setTitle(e.target.value)} required
            />
          </div>

          <div>
            <label htmlFor="content">Conteúdo</label>
            <textarea name="content" id="content" placeholder="Conteúdo..." 
              value={content} onChange={e=>setContent(e.target.value)} required
            />
          </div>
          
          <button type="submit">Postar</button>

          {msg && <p>{msg}</p>}

        </form>

      </div>

      {/* div to posts list */}
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
    </>
  );
}

export default Posts
