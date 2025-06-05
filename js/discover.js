// 发现页面功能
document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // 获取DOM元素
    const topicList = document.querySelector('.topic-list');
    const searchInput = document.querySelector('.search-input');
    const filterButton = document.querySelector('.filter-button');

    // 模拟话题数据
    const mockTopics = [
        {
            id: 1,
            title: '美食探店',
            description: '分享美食，发现美味',
            posts: 1234,
            followers: 5678,
            image: 'https://via.placeholder.com/300x200',
            hot: true
        },
        {
            id: 2,
            title: '旅行日记',
            description: '记录旅途中的美好瞬间',
            posts: 2345,
            followers: 6789,
            image: 'https://via.placeholder.com/300x200',
            hot: true
        },
        {
            id: 3,
            title: '生活小技巧',
            description: '让生活更简单',
            posts: 3456,
            followers: 7890,
            image: 'https://via.placeholder.com/300x200',
            hot: false
        }
    ];

    // 渲染话题列表
    const renderTopics = (topics) => {
        topicList.innerHTML = topics.map(topic => `
            <div class="topic-card" data-id="${topic.id}">
                <div class="topic-image">
                    <img src="${topic.image}" alt="${topic.title}">
                    ${topic.hot ? '<span class="hot-tag">热门</span>' : ''}
                </div>
                <div class="topic-info">
                    <h3 class="topic-title">${topic.title}</h3>
                    <p class="topic-description">${topic.description}</p>
                    <div class="topic-stats">
                        <span class="stat-item">
                            <i class="fas fa-file-alt"></i>
                            ${utils.formatNumber(topic.posts)} 帖子
                        </span>
                        <span class="stat-item">
                            <i class="fas fa-users"></i>
                            ${utils.formatNumber(topic.followers)} 关注
                        </span>
                    </div>
                </div>
                <button class="follow-button ${topic.followed ? 'followed' : ''}" data-id="${topic.id}">
                    ${topic.followed ? '已关注' : '关注'}
                </button>
            </div>
        `).join('');

        // 绑定关注事件
        document.querySelectorAll('.follow-button').forEach(button => {
            button.addEventListener('click', handleFollow);
        });

        // 绑定话题卡片点击事件
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', handleTopicClick);
        });
    };

    // 处理关注
    const handleFollow = (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        const button = e.currentTarget;
        const topicId = button.dataset.id;
        const topic = mockTopics.find(t => t.id === parseInt(topicId));

        if (topic) {
            topic.followed = !topic.followed;
            button.classList.toggle('followed');
            button.textContent = topic.followed ? '已关注' : '关注';
            showToast(topic.followed ? '关注成功' : '已取消关注');
        }
    };

    // 处理话题点击
    const handleTopicClick = (e) => {
        const card = e.currentTarget;
        const topicId = card.dataset.id;
        // 这里可以跳转到话题详情页
        showToast('话题详情页开发中...');
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
        const filteredTopics = mockTopics.filter(topic => 
            topic.title.toLowerCase().includes(keyword) ||
            topic.description.toLowerCase().includes(keyword)
        );
        renderTopics(filteredTopics);
    }, 300);

    // 处理筛选
    const handleFilter = () => {
        // 这里可以实现筛选功能
        showToast('筛选功能开发中...');
    };

    // 绑定事件监听器
    searchInput.addEventListener('input', handleSearch);
    filterButton.addEventListener('click', handleFilter);

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
        .hot-tag {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #ff4757;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
        }
        .follow-button {
            padding: 6px 16px;
            border-radius: 20px;
            border: 1px solid #1e90ff;
            background-color: transparent;
            color: #1e90ff;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .follow-button.followed {
            background-color: #1e90ff;
            color: white;
        }
        .follow-button:hover {
            opacity: 0.8;
        }
        .topic-card {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .topic-card:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

    // 初始渲染
    renderTopics(mockTopics);
}); 