// 发布页面功能
document.addEventListener('DOMContentLoaded', () => {
    // 检查登录状态
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // 获取DOM元素
    const publishForm = document.querySelector('.publish-form');
    const titleInput = document.querySelector('input[name="title"]');
    const contentEditor = document.querySelector('.content-editor');
    const imageUpload = document.querySelector('.image-upload');
    const tagInput = document.querySelector('input[name="tags"]');
    const publishButton = document.querySelector('.publish-button');
    const toolbarButtons = document.querySelectorAll('.toolbar-button');

    // 编辑器状态
    let editorState = {
        bold: false,
        italic: false,
        underline: false,
        list: false,
        link: false
    };

    // 处理工具栏按钮点击
    const handleToolbarClick = (e) => {
        const button = e.currentTarget;
        const action = button.dataset.action;

        // 更新按钮状态
        button.classList.toggle('active');
        editorState[action] = !editorState[action];

        // 应用格式
        switch (action) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'underline':
                document.execCommand('underline', false, null);
                break;
            case 'list':
                document.execCommand('insertUnorderedList', false, null);
                break;
            case 'link':
                const url = prompt('请输入链接地址：');
                if (url) {
                    document.execCommand('createLink', false, url);
                }
                break;
        }
    };

    // 处理图片上传
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                showToast('请上传图片文件');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'uploaded-image';
                imageUpload.appendChild(img);

                // 添加删除按钮
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-image';
                deleteButton.innerHTML = '&times;';
                deleteButton.onclick = () => {
                    img.remove();
                    deleteButton.remove();
                };
                imageUpload.appendChild(deleteButton);
            };
            reader.readAsDataURL(file);
        }
    };

    // 处理标签输入
    const handleTagInput = (e) => {
        const input = e.target;
        const value = input.value.trim();
        
        if (value && (e.key === 'Enter' || e.key === ',')) {
            e.preventDefault();
            
            // 创建标签
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = value;
            
            // 添加删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-tag';
            deleteButton.innerHTML = '&times;';
            deleteButton.onclick = () => tag.remove();
            tag.appendChild(deleteButton);
            
            // 添加到标签容器
            const tagContainer = document.querySelector('.tag-container');
            tagContainer.insertBefore(tag, input);
            
            // 清空输入框
            input.value = '';
        }
    };

    // 处理发布
    const handlePublish = async (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const content = contentEditor.innerHTML.trim();
        const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.replace('×', '').trim());

        // 验证表单
        if (!title) {
            showToast('请输入标题');
            return;
        }

        if (!content) {
            showToast('请输入内容');
            return;
        }

        try {
            // 禁用发布按钮
            publishButton.disabled = true;
            publishButton.textContent = '发布中...';

            // 模拟发布请求
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 发布成功
            showToast('发布成功！');
            
            // 延迟跳转到首页
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        } catch (error) {
            showToast('发布失败，请稍后重试');
        } finally {
            // 恢复发布按钮
            publishButton.disabled = false;
            publishButton.textContent = '发布';
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

    // 绑定事件监听器
    toolbarButtons.forEach(button => {
        button.addEventListener('click', handleToolbarClick);
    });

    imageUpload.addEventListener('change', handleImageUpload);
    tagInput.addEventListener('keydown', handleTagInput);
    publishForm.addEventListener('submit', handlePublish);

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
        .toolbar-button.active {
            background-color: #e8e8e8;
        }
        .uploaded-image {
            max-width: 200px;
            max-height: 200px;
            margin: 10px;
            border-radius: 4px;
        }
        .delete-image {
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .tag {
            display: inline-flex;
            align-items: center;
            background-color: #e8e8e8;
            padding: 4px 8px;
            border-radius: 16px;
            margin: 4px;
            font-size: 14px;
        }
        .delete-tag {
            background: none;
            border: none;
            color: #666;
            margin-left: 4px;
            cursor: pointer;
            padding: 0 4px;
        }
        .delete-tag:hover {
            color: #ff4757;
        }
        .publish-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}); 