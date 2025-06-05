// 消息页面功能
document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // 获取DOM元素
    const messageTabs = document.querySelector('.message-tabs');
    const messageContainers = document.querySelectorAll('.message-container');
    const searchInput = document.querySelector('.search-input');
    const filterButton = document.querySelector('.filter-button');

    // 模拟消息数据
    const mockMessages = {
        all: [
            {
                id: 1,
                type: 'comment',
                user: {
                    name: '张三',
                    avatar: 'https://via.placeholder.com/40',
                    verified: true
                },
                content: '你的帖子写得真好！',
                post: {
                    title: '分享一个有趣的小故事',
                    id: 123
                },
                timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
                read: false
            },
            {
                id: 2,
                type: 'like',
                user: {
                    name: '李四',
                    avatar: 'https://via.placeholder.com/40',
                    verified: false
                },
                content: '赞了你的帖子',
                post: {
                    title: '今天天气真好',
                    id: 456
                },
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
                read: true
            }
        ],
        unread: [],
        mentions: [],
        comments: [],
        likes: []
    };

    // 初始化消息数据
    mockMessages.unread = mockMessages.all.filter(msg => !msg.read);
    mockMessages.mentions = mockMessages.all.filter(msg => msg.type === 'mention');
    mockMessages.comments = mockMessages.all.filter(msg => msg.type === 'comment');
    mockMessages.likes = mockMessages.all.filter(msg => msg.type === 'like');

    // 渲染消息列表
    const renderMessages = (messages, container) => {
        container.innerHTML = messages.map(message => `
            <div class="message-item ${message.read ? '' : 'unread'}" data-id="${message.id}">
                <img src="${message.user.avatar}" alt="${message.user.name}" class="message-avatar">
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-user">
                            ${message.user.name}
                            ${message.user.verified ? '<i class="fas fa-check-circle verified-icon"></i>' : ''}
                        </span>
                        <span class="message-time">${utils.formatTime(message.timestamp)}</span>
                    </div>
                    <div class="message-text">${message.content}</div>
                    <div class="message-post">
                        <i class="fas fa-reply"></i>
                        ${message.post.title}
                    </div>
                </div>
                ${!message.read ? '<div class="unread-dot"></div>' : ''}
            </div>
        `).join('');

        // 绑定消息点击事件
        container.querySelectorAll('.message-item').forEach(item => {
            item.addEventListener('click', () => handleMessageClick(item));
        });
    };

    // 处理消息点击
    const handleMessageClick = (item) => {
        const messageId = parseInt(item.dataset.id);
        const message = mockMessages.all.find(m => m.id === messageId);

        if (message && !message.read) {
            message.read = true;
            item.classList.remove('unread');
            item.querySelector('.unread-dot')?.remove();

            // 更新未读消息列表
            mockMessages.unread = mockMessages.all.filter(msg => !msg.read);
            renderMessages(mockMessages.unread, document.querySelector('#unread-messages'));

            // 更新未读消息数量
            updateUnreadCount();
        }

        // 跳转到相关帖子
        window.location.href = `post.html?id=${message.post.id}`;
    };

    // 更新未读消息数量
    const updateUnreadCount = () => {
        const unreadCount = mockMessages.unread.length;
        const unreadBadge = document.querySelector('.unread-badge');
        
        if (unreadCount > 0) {
            unreadBadge.textContent = unreadCount;
            unreadBadge.style.display = 'block';
        } else {
            unreadBadge.style.display = 'none';
        }
    };

    // 处理标签切换
    const handleTabClick = (e) => {
        const tab = e.target.closest('.message-tab');
        if (!tab) return;

        // 移除所有标签的active类
        messageTabs.querySelectorAll('.message-tab').forEach(t => t.classList.remove('active'));
        // 添加当前标签的active类
        tab.classList.add('active');

        // 隐藏所有消息容器
        messageContainers.forEach(container => container.style.display = 'none');
        // 显示对应的消息容器
        const targetId = tab.dataset.tab;
        document.querySelector(`#${targetId}-messages`).style.display = 'block';

        // 渲染对应的消息列表
        renderMessages(mockMessages[targetId], document.querySelector(`#${targetId}-messages`));
    };

    // 处理搜索
    const handleSearch = utils.debounce((e) => {
        const keyword = e.target.value.trim().toLowerCase();
        const filteredMessages = mockMessages.all.filter(message => 
            message.user.name.toLowerCase().includes(keyword) ||
            message.content.toLowerCase().includes(keyword) ||
            message.post.title.toLowerCase().includes(keyword)
        );

        // 更新所有消息列表
        Object.keys(mockMessages).forEach(type => {
            mockMessages[type] = filteredMessages.filter(msg => {
                if (type === 'all') return true;
                if (type === 'unread') return !msg.read;
                return msg.type === type;
            });
            renderMessages(mockMessages[type], document.querySelector(`#${type}-messages`));
        });
    }, 300);

    // 处理筛选
    const handleFilter = () => {
        // 这里可以实现筛选功能
        showToast('筛选功能开发中...');
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
    messageTabs.addEventListener('click', handleTabClick);
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
        .message-item {
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .message-item:hover {
            background-color: #f5f5f5;
        }
        .message-item.unread {
            background-color: #f0f7ff;
        }
        .unread-dot {
            width: 8px;
            height: 8px;
            background-color: #1e90ff;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            right: 16px;
            transform: translateY(-50%);
        }
        .unread-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #ff4757;
            color: white;
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 10px;
            display: none;
        }
    `;
    document.head.appendChild(style);

    // 初始渲染
    Object.keys(mockMessages).forEach(type => {
        renderMessages(mockMessages[type], document.querySelector(`#${type}-messages`));
    });
    updateUnreadCount();
}); 