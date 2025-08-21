import { useState } from 'react'
import { useEffect } from 'react'
import api from './api';

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

      <div className="bg-white py-24 sm:py-32">

        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* div to header + form */}
          <div className='flex justify-between'>

            {/* header */}
            <div className="mx-auto max-w-2xl lg:mx-0">

              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Postagens</h2>

            </div>

            {/* new post form */}
            <div>

              <form onSubmit={createPost} className="space-y-2 sm:min-w-md">

                <div>

                  <input type="text" name="title" id="title" placeholder="Título" 
                    value={title} onChange={e=>setTitle(e.target.value)} required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                      outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                      focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />

                </div>

                <div>

                  <textarea name="content" id="content" placeholder="Conteúdo..." 
                    value={content} onChange={e=>setContent(e.target.value)} required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                      outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                      focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />

                </div>
                
                <button type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 
                  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Postar</button>

                {msg && <p className="mt-10 font-medium text-center text-sm/6">{msg}</p>}

              </form>

            </div>

          </div>

          {/* div to posts list */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">

            {posts.map((post) => (

              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">

                <div className="group relative grow">

                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0" />
                      {post.title}
                  </h3>

                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.content}</p>

                </div>

                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">

                  <div className="text-sm/6">

                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      Autor: {post.user?.name ?? 'Desconhecido'}
                    </p>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </div>

      {/* div to new post form */}
      

    </>
  );
}

export default Posts
