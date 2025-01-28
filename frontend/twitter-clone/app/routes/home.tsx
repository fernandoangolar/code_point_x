import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Search, Bell, Mail, Users, User,
  Image, Film, List, Smile, MapPin,
  Heart, MessageCircle,
  Globe, MoreHorizontal,
  Bookmark,
  Share2,
  BarChart2
} from "lucide-react";

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "John Doe",
      handle: "@johndoe",
      time: "2h",
      content: "Loving the React ecosystem! ❤️",
      likes: 5,
      comments: 2,
      liked: false,
      reposts: 45,
      views: 100,
      avatar: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      user: "BEXEE SZN",
      handle: "@bexee",
      time: "1h",
      content: "Praxis that went too far",
      likes: 10,
      comments: 3,
      liked: false,
      reposts: 45,
      views: 100,
      avatar: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      user: "Oguiláce",
      handle: "@oguila",
      time: "30m",
      content: "A hilarious Thread [Don’t open! you will laugh too much]",
      likes: 15,
      comments: 5,
      liked: false,
      reposts: 10,
      avatar: "https://via.placeholder.com/150"
    }
  ]);
  const [newPost, setNewPost] = useState("");
  const [charCount, setCharCount] = useState(280);
  const maxChars = 280;
  const [activeTab, setActiveTab] = useState("para-voce"); // Estado para controlar a guia ativa

  useEffect(() => {
    setCharCount(maxChars - newPost.length);
  }, [newPost]);

  const handleLike = (id: number) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (newPost.trim() === "" || newPost.length > maxChars) return;

    const newPostObj = {
      id: Date.now(),
      user: "Você",
      handle: "@voce",
      time: "Agora",
      content: newPost,
      likes: 0,
      comments: 0,
      liked: false,
      reposts: 40,
      views: 100,
      avatar: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    };

    setPosts([newPostObj, ...posts]);
    setNewPost("");
  };

  const FollowSuggestion = ({ user, handle, avatar }: { user: string, handle: string, avatar: string }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
      <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer">
        <div className="flex items-center gap-3">
          <img src={avatar} alt={user} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-bold text-sm">{user}</div>
            <div className="text-gray-500 text-sm">{handle}</div>
          </div>
        </div>
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-4 py-2 rounded-full text-sm font-bold ${isFollowing
            ? 'bg-transparent border border-gray-600 hover:border-red-600 hover:text-red-600'
            : 'bg-white text-black hover:bg-gray-200'
            }`}
        >
          {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="fixed bottom-0 md:bottom-auto left-0 right-0 md:right-auto z-50 md:z-auto bg-black md:bg-transparent border-t md:border-t-0 border-gray-800 md:w-16 lg:w-64 md:border-r md:h-screen">
          <div className="flex md:flex-col justify-around md:justify-start md:space-y-4 p-2 md:p-4">
            <div className="hidden md:block p-3 hover:bg-gray-800 rounded-full w-min">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
              </svg>
            </div>
            <SidebarItem icon={<Home />} text="Página Inicial" active />
            <SidebarItem icon={<Search />} text="Explorar" />
            <SidebarItem icon={<Bell />} text="Notificações" />
            <SidebarItem icon={<Mail />} text="Mensagens" />
            <SidebarItem icon={<Users />} text="Comunidades" />
            <SidebarItem icon={<User />} text="Perfil" />
            <SidebarItem icon={<MoreHorizontal />} text="Mais" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 mb-16 md:mb-0 md:ml-16 lg:ml-64 border-r border-gray-800 bg-black min-h-screen">
          <header className="border-b border-gray-800 p-4 sticky top-0 bg-black/80 backdrop-blur-sm z-40">
            <div className="flex space-x-12"> {/* Espaço maior entre os botões */}
              <button
                onClick={() => setActiveTab("para-voce")}
                className={`text-sm font-medium relative ${activeTab === "para-voce" ? "text-white" : "text-gray-400"
                  }`}
              >
                Para você
                {activeTab === "para-voce" && (
                  <motion.div
                    className="h-1 w-full bg-blue-500 mt-1"
                    layoutId="underline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("seguindo")}
                className={`text-sm font-medium relative ${activeTab === "seguindo" ? "text-white" : "text-gray-400"
                  }`}
              >
                Seguindo
                {activeTab === "seguindo" && (
                  <motion.div
                    className="h-1 w-full bg-blue-500 mt-1"
                    layoutId="underline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </header>


          {/* Post Input */}
          <div className="border-b border-gray-800 p-4 bg-black">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Profile" className="rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-4">
                  <button className="text-blue-400 text-sm font-bold px-3 py-1 rounded-full border border-gray-600 hover:bg-blue-400/10 transition-colors flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    Qualquer pessoa pode responder
                  </button>
                </div>
                <textarea
                  className="w-full bg-transparent text-xl resize-none outline-none min-h-[100px] overflow-hidden"
                  placeholder="O que está acontecendo?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  maxLength={maxChars}
                  style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2 text-blue-400">
                    <button className="hover:bg-blue-500/20 p-2 rounded-full">
                      <Image className="w-5 h-5" />
                    </button>
                    <button className="hover:bg-blue-500/20 p-2 rounded-full">
                      <Film className="w-5 h-5" />
                    </button>
                    <button className="hover:bg-blue-500/20 p-2 rounded-full">
                      <List className="w-5 h-5" />
                    </button>
                    <button className="hover:bg-blue-500/20 p-2 rounded-full">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button className="hover:bg-blue-500/20 p-2 rounded-full">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${charCount <= 20 ? 'text-red-500' :
                      charCount <= 60 ? 'text-yellow-500' :
                        'text-gray-500'}`}>
                      {charCount}
                    </span>
                    <button
                      className={`px-4 py-1.5 rounded-full font-bold transition-colors ${newPost.trim() === "" || newPost.length > maxChars
                        ? 'bg-blue-400/50 cursor-not-allowed'
                        : 'bg-blue-400 hover:bg-blue-500'}`}
                      onClick={handlePost}
                      disabled={newPost.trim() === "" || newPost.length > maxChars}
                    >
                      Postar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="divide-y divide-gray-800 bg-black">
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 hover:bg-gray-900/50"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex-shrink-0">
                      <img src={post.avatar} alt="Profile" className="rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold">{post.user}</span>
                        <span className="text-gray-500">{post.handle}</span>
                        <span className="text-gray-500">· {post.time}</span>
                      </div>
                      <div className="mt-2 w-full overflow-hidden">
                        <p style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'pre-wrap',
                          overflowWrap: 'break-word',
                          width: '100%',
                          display: 'block'
                        }}
                          className="text-gray-100">
                          {post.content}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 max-w-md">
                        {/* Reply button */}
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <span>{post.comments || 0}</span>
                        </button>

                        {/* Repost button */}
                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-green-500/10">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
                            </svg>
                          </div>
                          <span>{post.reposts || 0}</span>
                        </button>

                        {/* Like button */}
                        <motion.button
                          className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors group"
                          onClick={() => handleLike(post.id)}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            className="p-2 rounded-full group-hover:bg-pink-500/10"
                            animate={{ scale: post.liked ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Heart
                              className={`w-5 h-5 ${post.liked ? "fill-pink-500 text-pink-500" : ""}`}
                            />
                          </motion.div>
                          <span>{post.likes}</span>
                        </motion.button>

                        {/* Views button */}
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                            <BarChart2 className="w-5 h-5" />
                          </div>
                          <span>{post.views || 0}</span>
                        </button>

                        {/* Bookmark button */}
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                            <Bookmark className="w-5 h-5" />
                          </div>
                        </button>

                        {/* Share button */}
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                            <Share2 className="w-5 h-5" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:block w-80 p-4 sticky top-0 h-screen overflow-y-auto bg-black">
          <div className="bg-gray-900 rounded-2xl p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Assine o Premium</h2>
            <p className="text-sm mb-4">
              Assine para desbloquear novos recursos e, se elegível, receba uma parte da receita.
            </p>
            <button className="bg-blue-400 text-white font-bold w-full py-2 rounded-full hover:bg-blue-500 transition-colors">
              Inscrever-se
            </button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">O que está acontecendo</h2>
            <div className="space-y-4">
              <TrendingTopic name="zelena" posts="500 ml posts" />
              <TrendingTopic name="Osasco" posts="3.0% posts" />
              <TrendingTopic name="Camila Pitanga" posts="1.550 posts" />
              <TrendingTopic name="Sincerão" posts="21,2 ml posts" />
              <div className="pt-4">
                <div className="text-sm text-gray-500 mb-2">Música · Assunto do Momento</div>
                <div className="font-bold">Katy Perry</div>
                <div className="text-sm text-gray-500">27,9 mil posts</div>
                <button className="text-blue-400 hover:text-blue-500 w-full text-left mt-2">
                  Mostrar mais
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-4 mb-4">
            <h3 className="text-xl font-bold mb-4">Quem seguir</h3>
            <FollowSuggestion
              user="Zenday Morais"
              handle="@zendaymorais"
              avatar="https://via.placeholder.com/150"
            />
            <FollowSuggestion
              user="stella"
              handle="@jessica_stellaa"
              avatar="https://via.placeholder.com/150"
            />
            <FollowSuggestion
              user="non aesthetic thi..."
              handle="@PicturesFolder"
              avatar="https://via.placeholder.com/150"
            />
            <button className="text-blue-400 hover:text-blue-500 w-full text-left mt-2">
              Mostrar mais
            </button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-4">
            <div className="pt-6 text-gray-500 text-sm">
              <div className="flex flex-wrap gap-2">
                {['Termos de Serviço', 'Política de Privacidade', 'Política de cookies',
                  'Acessibilidade', 'Informações de anúncios', 'Mais ...'].map((item) => (
                    <a key={item} href="#" className="hover:text-gray-300">{item}</a>
                  ))}
              </div>
              <div className="mt-4">© 2025 X Corp.</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`flex items-center gap-4 p-3 hover:bg-gray-800 rounded-full cursor-pointer
        ${active ? "font-bold" : ""}`}>
        <div className="w-6 h-6">{icon}</div>
        <span className="hidden lg:inline text-xl">{text}</span>
      </div>

      {/* Tooltip */}
      {showTooltip && !window.matchMedia('(min-width: 1024px)').matches && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-sm rounded whitespace-nowrap z-50 hidden md:block">
          {text}
        </div>
      )}
    </div>
  );
};

const TrendingTopic = ({ name, posts }: any) => (
  <div className="hover:bg-gray-800 p-2 rounded-lg cursor-pointer">
    <div className="text-sm text-gray-500">{name}</div>
    <div className="text-xs text-gray-400">{posts}</div>
  </div>
);

export default App;