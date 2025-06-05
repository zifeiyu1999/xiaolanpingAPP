// 首页功能
document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // 获取DOM元素
    const postList = document.querySelector('.post-list');
    const categoryList = document.querySelector('.category-list');
    const searchInput = document.querySelector('.search-input');
    const createPostButton = document.querySelector('.create-post-button');

    // 模拟帖子数据
    const mockPosts = [
        {
            id: 1,
            author: {
                name: '张三',
                avatar: 'https://via.placeholder.com/40',
                verified: true
            },
            content: '今天天气真好，出去走走~',
            images: ['https://via.placeholder.com/300x200'],
            likes: 128,
            comments: 32,
            shares: 16,
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
            liked: false
        },
        {
            id: 2,
            author: {
                name: '李四',
                avatar: 'https://via.placeholder.com/40',
                verified: false
            },
            content: '分享一个有趣的小故事...',
            images: [],
            likes: 256,
            comments: 64,
            shares: 32,
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
            liked: true
        }
    ];

    // 渲染帖子列表
    const renderPosts = (posts) => {
        postList.innerHTML = posts.map(post => `
            <div class="post-card" data-id="${post.id}">
                <div class="post-header">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="post-avatar">
                    <div class="post-info">
                        <div class="post-author">
                            ${post.author.name}
                            ${post.author.verified ? '<i class="fas fa-check-circle verified-icon"></i>' : ''}
                        </div>
                        <div class="post-time">${utils.formatTime(post.timestamp)}</div>
                    </div>
                </div>
                <div class="post-content">${post.content}</div>
                ${post.images.length > 0 ? `
                    <div class="post-images">
                        ${post.images.map(image => `
                            <img src="${image}" alt="帖子图片" class="post-image">
                        `).join('')}
                    </div>
                ` : ''}
                <div class="post-actions">
                    <button class="action-button like-button ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                        <i class="fas fa-heart"></i>
                        <span>${utils.formatNumber(post.likes)}</span>
                    </button>
                    <button class="action-button comment-button" data-id="${post.id}">
                        <i class="fas fa-comment"></i>
                        <span>${utils.formatNumber(post.comments)}</span>
                    </button>
                    <button class="action-button share-button" data-id="${post.id}">
                        <i class="fas fa-share"></i>
                        <span>${utils.formatNumber(post.shares)}</span>
                    </button>
                </div>
                <div class="post-comments">
                    <div class="comment-input-container">
                        <input type="text" class="comment-input" placeholder="写下你的评论...">
                        <button class="comment-submit">发送</button>
                    </div>
                </div>
            </div>
        `).join('');

        // 绑定点赞事件
        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', handleLike);
        });

        // 绑定评论事件
        document.querySelectorAll('.comment-button').forEach(button => {
            button.addEventListener('click', handleComment);
        });

        // 绑定分享事件
        document.querySelectorAll('.share-button').forEach(button => {
            button.addEventListener('click', handleShare);
        });

        // 绑定评论提交事件
        document.querySelectorAll('.comment-submit').forEach(button => {
            button.addEventListener('click', handleCommentSubmit);
        });
    };

    // 处理点赞
    const handleLike = (e) => {
        const button = e.currentTarget;
        const postId = button.dataset.id;
        const post = mockPosts.find(p => p.id === parseInt(postId));

        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            button.classList.toggle('liked');
            button.querySelector('span').textContent = utils.formatNumber(post.likes);
        }
    };

    // 处理评论
    const handleComment = (e) => {
        const button = e.currentTarget;
        const postId = button.dataset.id;
        const postCard = button.closest('.post-card');
        const commentInput = postCard.querySelector('.comment-input');
        commentInput.focus();
    };

    // 处理分享
    const handleShare = (e) => {
        const button = e.currentTarget;
        const postId = button.dataset.id;
        const post = mockPosts.find(p => p.id === parseInt(postId));

        if (post) {
            post.shares++;
            button.querySelector('span').textContent = utils.formatNumber(post.shares);
            showToast('分享成功！');
        }
    };

    // 处理评论提交
    const handleCommentSubmit = (e) => {
        const button = e.currentTarget;
        const postCard = button.closest('.post-card');
        const commentInput = postCard.querySelector('.comment-input');
        const comment = commentInput.value.trim();

        if (comment) {
            const postId = parseInt(postCard.dataset.id);
            const post = mockPosts.find(p => p.id === postId);

            if (post) {
                post.comments++;
                const commentButton = postCard.querySelector('.comment-button');
                commentButton.querySelector('span').textContent = utils.formatNumber(post.comments);
                commentInput.value = '';
                showToast('评论成功！');
            }
        }
    };

    // 显示提示信息
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    // 处理搜索
    const handleSearch = utils.debounce((e) => {
        const keyword = e.target.value.trim().toLowerCase();
        const filteredPosts = mockPosts.filter(post => 
            post.content.toLowerCase().includes(keyword) ||
            post.author.name.toLowerCase().includes(keyword)
        );
        renderPosts(filteredPosts);
    }, 300);

    // 处理分类点击
    const handleCategoryClick = (e) => {
        const category = e.target.dataset.category;
        if (category) {
            // 移除其他分类的active类
            document.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
            // 添加当前分类的active类
            e.target.classList.add('active');
            // 这里可以根据分类筛选帖子
            renderPosts(mockPosts);
        }
    };

    // 处理创建帖子
    const handleCreatePost = () => {
        window.location.href = 'publish.html';
    };

    // 绑定事件监听器
    searchInput.addEventListener('input', handleSearch);
    categoryList.addEventListener('click', handleCategoryClick);
    createPostButton.addEventListener('click', handleCreatePost);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            z-index: 1000;
        }
        .action-button.liked {
            color: #ff4757;
        }
        .action-button.liked i {
            animation: likeAnimation 0.3s ease;
        }
        @keyframes likeAnimation {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // 初始渲染
    renderPosts(mockPosts);
}); 