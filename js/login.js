// 登录页面功能
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const loginButton = document.querySelector('.login-button');
    const socialButtons = document.querySelectorAll('.social-button');

    // 表单验证
    const validateForm = () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // 验证用户名
        if (!utils.isValidUsername(username)) {
            showError('用户名长度必须在3-20个字符之间');
            return false;
        }

        // 验证密码
        if (!utils.isValidPassword(password)) {
            showError('密码长度必须在6-20个字符之间');
            return false;
        }

        return true;
    };

    // 显示错误信息
    const showError = (message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.textAlign = 'center';

        // 移除之前的错误信息
        const oldError = document.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }

        loginForm.appendChild(errorDiv);

        // 3秒后自动移除错误信息
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    };

    // 处理登录
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            // 禁用登录按钮
            loginButton.disabled = true;
            loginButton.textContent = '登录中...';

            // 模拟登录请求
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 存储登录状态
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            // 跳转到首页
            window.location.href = 'home.html';
        } catch (error) {
            showError('登录失败，请稍后重试');
        } finally {
            // 恢复登录按钮
            loginButton.disabled = false;
            loginButton.textContent = '登录';
        }
    };

    // 处理社交登录
    const handleSocialLogin = (platform) => {
        // 模拟社交登录
        console.log(`使用${platform}登录`);
        showError(`${platform}登录功能开发中...`);
    };

    // 绑定事件监听器
    loginForm.addEventListener('submit', handleLogin);

    // 为每个社交登录按钮添加点击事件
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.getAttribute('data-platform');
            handleSocialLogin(platform);
        });
    });

    // 输入框验证
    const validateInput = (input, validator, errorMessage) => {
        const value = input.value.trim();
        if (!validator(value)) {
            input.classList.add('invalid');
            showError(errorMessage);
        } else {
            input.classList.remove('invalid');
        }
    };

    // 添加输入验证
    usernameInput.addEventListener('blur', () => {
        validateInput(
            usernameInput,
            utils.isValidUsername,
            '用户名长度必须在3-20个字符之间'
        );
    });

    passwordInput.addEventListener('blur', () => {
        validateInput(
            passwordInput,
            utils.isValidPassword,
            '密码长度必须在6-20个字符之间'
        );
    });

    // 添加输入框样式
    const style = document.createElement('style');
    style.textContent = `
        .invalid {
            border-color: red !important;
        }
        .error-message {
            color: red;
            margin-top: 10px;
            text-align: center;
            font-size: 14px;
        }
        .login-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}); 