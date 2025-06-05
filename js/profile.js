// 标签页切换
document.querySelectorAll('.profile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有标签页的active类
        document.querySelectorAll('.profile-tab').forEach(t => {
            t.classList.remove('active');
        });
        // 添加当前标签页的active类
        tab.classList.add('active');

        // 隐藏所有内容容器
        document.querySelectorAll('.profile-container').forEach(container => {
            container.classList.remove('active');
        });
        // 显示目标内容容器
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// 编辑资料按钮点击事件
document.querySelector('.profile-action.primary').addEventListener('click', () => {
    // TODO: 实现编辑资料功能
    console.log('编辑资料');
});

// 分享按钮点击事件
document.querySelector('.profile-action.secondary').addEventListener('click', () => {
    // TODO: 实现分享功能
    console.log('分享个人资料');
});

// 动态图片点击事件
document.querySelectorAll('.post-item').forEach(item => {
    item.addEventListener('click', () => {
        // TODO: 实现动态详情查看功能
        console.log('查看动态详情');
    });
});

// 成就项点击事件
document.querySelectorAll('.achievement-item').forEach(item => {
    item.addEventListener('click', () => {
        // TODO: 实现成就详情查看功能
        console.log('查看成就详情');
    });
});

// 设置按钮点击事件
document.querySelector('.navbar-content button').addEventListener('click', () => {
    // TODO: 实现设置功能
    console.log('打开设置');
});

// 加载用户数据
function loadUserData() {
    // TODO: 从服务器获取用户数据
    const userData = {
        name: '张三',
        school: '清华大学',
        major: '计算机科学',
        following: 128,
        followers: 256,
        likes: 512,
        posts: [
            { id: 1, image: 'https://via.placeholder.com/300' },
            { id: 2, image: 'https://via.placeholder.com/300' },
            { id: 3, image: 'https://via.placeholder.com/300' },
            { id: 4, image: 'https://via.placeholder.com/300' },
            { id: 5, image: 'https://via.placeholder.com/300' },
            { id: 6, image: 'https://via.placeholder.com/300' }
        ],
        achievements: [
            { id: 1, name: '优质创作者', icon: 'star' },
            { id: 2, name: '热门作者', icon: 'fire' },
            { id: 3, name: '学术达人', icon: 'award' },
            { id: 4, name: '爱心使者', icon: 'heart' }
        ]
    };

    // 更新用户信息
    document.querySelector('.profile-name h2').textContent = userData.name;
    document.querySelector('.profile-name p').textContent = `${userData.major} | ${userData.school}`;

    // 更新统计数据
    document.querySelector('.stat-item:nth-child(1) .stat-value').textContent = userData.following;
    document.querySelector('.stat-item:nth-child(2) .stat-value').textContent = userData.followers;
    document.querySelector('.stat-item:nth-child(3) .stat-value').textContent = userData.likes;

    // 更新动态列表
    const postGrid = document.querySelector('.post-grid');
    postGrid.innerHTML = userData.posts.map(post => `
        <div class="post-item" data-id="${post.id}">
            <img src="${post.image}" alt="动态图片">
        </div>
    `).join('');

    // 更新成就列表
    const achievementList = document.querySelector('.achievement-list');
    achievementList.innerHTML = userData.achievements.map(achievement => `
        <div class="achievement-item" data-id="${achievement.id}">
            <div class="achievement-icon">
                <i class="fas fa-${achievement.icon}"></i>
            </div>
            <div class="achievement-name">${achievement.name}</div>
        </div>
    `).join('');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // 获取DOM元素
    const profileTabs = document.querySelector('.profile-tabs');
    const tabContents = document.querySelectorAll('.tab-content');
    const editProfileButton = document.querySelector('.edit-profile-button');
    const shareProfileButton = document.querySelector('.share-profile-button');

    // 模拟用户数据
    const mockUser = {
        id: 1,
        name: '张三',
        avatar: 'https://via.placeholder.com/100',
        bio: '热爱生活，分享快乐',
        verified: true,
        stats: {
            posts: 128,
            followers: 1024,
            following: 256
        },
        achievements: [
            {
                id: 1,
                title: '创作达人',
                description: '发布超过100篇优质内容',
                icon: 'fas fa-pen-fancy',
                unlocked: true
            },
            {
                id: 2,
                title: '社交之星',
                description: '获得超过1000个关注者',
                icon: 'fas fa-star',
                unlocked: true
            },
            {
                id: 3,
                title: '互动王',
                description: '评论获得超过500个赞',
                icon: 'fas fa-comments',
                unlocked: false
            }
        ],
        posts: [
            {
                id: 1,
                title: '分享一个有趣的小故事',
                content: '今天遇到了一件有趣的事情...',
                images: ['https://via.placeholder.com/300x200'],
                likes: 128,
                comments: 32,
                timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30分钟前
            },
            {
                id: 2,
                title: '美食探店',
                content: '发现了一家超级好吃的餐厅...',
                images: ['https://via.placeholder.com/300x200'],
                likes: 256,
                comments: 64,
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2小时前
            }
        ]
    };

    // 渲染帖子列表
    const renderPosts = (posts) => {
        const postContainer = document.querySelector('#posts-content');
        postContainer.innerHTML = posts.map(post => `
            <div class="post-card" data-id="${post.id}">
                <div class="post-header">
                    <div class="post-info">
                        <h3 class="post-title">${post.title}</h3>
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
                <div class="post-stats">
                    <span class="stat-item">
                        <i class="fas fa-heart"></i>
                        ${utils.formatNumber(post.likes)}
                    </span>
                    <span class="stat-item">
                        <i class="fas fa-comment"></i>
                        ${utils.formatNumber(post.comments)}
                    </span>
                </div>
            </div>
        `).join('');

        // 绑定帖子点击事件
        postContainer.querySelectorAll('.post-card').forEach(card => {
            card.addEventListener('click', () => handlePostClick(card));
        });
    };

    // 渲染成就列表
    const renderAchievements = (achievements) => {
        const achievementContainer = document.querySelector('#achievements-content');
        achievementContainer.innerHTML = achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h3 class="achievement-title">${achievement.title}</h3>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
                ${achievement.unlocked ? 
                    '<i class="fas fa-check-circle achievement-status"></i>' :
                    '<i class="fas fa-lock achievement-status"></i>'
                }
            </div>
        `).join('');
    };

    // 处理帖子点击
    const handlePostClick = (card) => {
        const postId = card.dataset.id;
        window.location.href = `post.html?id=${postId}`;
    };

    // 处理标签切换
    const handleTabClick = (e) => {
        const tab = e.target.closest('.profile-tab');
        if (!tab) return;

        // 移除所有标签的active类
        profileTabs.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        // 添加当前标签的active类
        tab.classList.add('active');

        // 隐藏所有内容
        tabContents.forEach(content => content.style.display = 'none');
        // 显示对应的内容
        const targetId = tab.dataset.tab;
        document.querySelector(`#${targetId}-content`).style.display = 'block';
    };

    // 处理编辑资料
    const handleEditProfile = () => {
        showToast('编辑资料功能开发中...');
    };

    // 处理分享资料
    const handleShareProfile = () => {
        const profileUrl = window.location.href;
        utils.copyToClipboard(profileUrl)
            .then(() => showToast('个人主页链接已复制到剪贴板'))
            .catch(() => showToast('复制失败，请手动复制'));
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

    // 绑定事件监听器
    profileTabs.addEventListener('click', handleTabClick);
    editProfileButton.addEventListener('click', handleEditProfile);
    shareProfileButton.addEventListener('click', handleShareProfile);

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
        .post-card {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .post-card:hover {
            transform: translateY(-2px);
        }
        .achievement-card {
            display: flex;
            align-items: center;
            padding: 16px;
            background-color: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 12px;
        }
        .achievement-card.locked {
            opacity: 0.6;
        }
        .achievement-icon {
            width: 48px;
            height: 48px;
            background-color: #e8e8e8;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
        }
        .achievement-icon i {
            font-size: 24px;
            color: #666;
        }
        .achievement-info {
            flex: 1;
        }
        .achievement-title {
            margin: 0 0 4px;
            font-size: 16px;
            font-weight: 600;
        }
        .achievement-description {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
        .achievement-status {
            font-size: 24px;
            color: #1e90ff;
        }
        .achievement-card.locked .achievement-status {
            color: #999;
        }
    `;
    document.head.appendChild(style);

    // 初始渲染
    renderPosts(mockUser.posts);
    renderAchievements(mockUser.achievements);
}); 