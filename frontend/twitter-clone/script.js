const API_URL = 'http://localhost:8080/api/posts';

        document.addEventListener('DOMContentLoaded', () => {
            const postInput = document.querySelector('.post-input');
            const charCounter = document.querySelector('.char-counter');
            const postButton = document.querySelector('.post-button');
            const feed = document.getElementById('feed');

            
            loadPosts();

            
            postInput.addEventListener('input', () => {
                const remaining = 280 - postInput.value.length;
                charCounter.textContent = remaining;
                
                if (remaining <= 0) {
                    charCounter.classList.add('danger');
                    alert('Atingiu o limite!');
                } else if (remaining <= 20) {
                    charCounter.classList.add('warning');
                    charCounter.classList.remove('danger');
                } else {
                    charCounter.classList.remove('warning', 'danger');
                }

                postButton.classList.toggle('active', postInput.value.length > 0);
            });

            
            postButton.addEventListener('click', async () => {
                if (postInput.value.trim()) {
                    await createPost({
                        username: 'Usuário',
                        content: postInput.value,
                        likes: 0,
                        comments: 0,
                        retweets: 0
                    });
                    postInput.value = '';
                    charCounter.textContent = '280';
                    postButton.classList.remove('active');
                }
            });

            async function loadPosts() {
                try {
                    const response = await fetch(API_URL);
                    const posts = await response.json();
                    feed.innerHTML = ''; // Limpa o feed
                    posts.reverse().forEach(post => {
                        displayPost(post);
                    });
                } catch (error) {
                    console.error('Erro ao carregar posts:', error);
                }
            }

            async function createPost(postData) {
                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postData)
                    });
                    const newPost = await response.json();
                    displayPost(newPost);
                } catch (error) {
                    console.error('Erro ao criar post:', error);
                }
            }

            async function updateLikes(postId, liked) {
                const endpoint = `${API_URL}/${postId}/${liked ? 'like' : 'unlike'}`;
                try {
                    const response = await fetch(endpoint, {
                        method: 'PUT'
                    });
                    return await response.json();
                } catch (error) {
                    console.error('Erro ao atualizar likes:', error);
                }
            }

            function formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }

            function displayPost(post) {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <div class="post-header">
                        <div class="avatar"></div>
                        <div class="user-info">
                            <span class="username">${post.username}</span>
                            <span class="handle">@${post.username.toLowerCase()}</span>
                            <span class="date">${formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                    <div class="post-content">${post.content}</div>
                    <div class="post-actions">
                        <button class="action-button like-button ${post.liked ? 'active' : ''}">
                            ❤️ <span class="like-count">${post.likes}</span>
                        </button>
                        <button class="action-button">
                            💬 <span class="comment-count">${post.comments}</span>
                        </button>
                        <button class="action-button">
                            🔄 <span class="retweet-count">${post.retweets}</span>
                        </button>
                    </div>
                `;

                const likeButton = postElement.querySelector('.like-button');
                const likeCount = postElement.querySelector('.like-count');
                let liked = post.liked || false;

                likeButton.addEventListener('click', async () => {
                    liked = !liked;
                    const updatedPost = await updateLikes(post.id, liked);
                    if (updatedPost) {
                        likeCount.textContent = updatedPost.likes;
                        likeButton.classList.toggle('active');
                        likeButton.style.animation = 'likeAnimation 0.3s ease';
                        setTimeout(() => {
                            likeButton.style.animation = '';
                        }, 300);
                    }
                });

                feed.insertBefore(postElement, feed.firstChild);
            }
        });