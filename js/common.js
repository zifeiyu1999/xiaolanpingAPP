// 通用工具函数
const utils = {
    // 格式化时间
    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        
        // 小于1分钟
        if (diff < 60 * 1000) {
            return '刚刚';
        }
        // 小于1小时
        if (diff < 60 * 60 * 1000) {
            return Math.floor(diff / (60 * 1000)) + '分钟前';
        }
        // 小于24小时
        if (diff < 24 * 60 * 60 * 1000) {
            return Math.floor(diff / (60 * 60 * 1000)) + '小时前';
        }
        // 小于30天
        if (diff < 30 * 24 * 60 * 60 * 1000) {
            return Math.floor(diff / (24 * 60 * 60 * 1000)) + '天前';
        }
        // 大于30天
        return date.toLocaleDateString();
    },

    // 格式化数字
    formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + 'w';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    },

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 检查是否在视口中
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // 滚动到顶部
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // 复制文本到剪贴板
    copyToClipboard(text) {
        return navigator.clipboard.writeText(text);
    },

    // 获取URL参数
    getUrlParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    // 设置URL参数
    setUrlParam(name, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(name, value);
        window.history.pushState({}, '', url);
    },

    // 移除URL参数
    removeUrlParam(name) {
        const url = new URL(window.location.href);
        url.searchParams.delete(name);
        window.history.pushState({}, '', url);
    },

    // 检查设备类型
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // 检查是否支持触摸
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // 生成随机ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // 深拷贝对象
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // 检查对象是否为空
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },

    // 检查数组是否为空
    isArrayEmpty(arr) {
        return !Array.isArray(arr) || arr.length === 0;
    },

    // 检查字符串是否为空
    isStringEmpty(str) {
        return !str || str.trim().length === 0;
    },

    // 检查是否为有效邮箱
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // 检查是否为有效手机号
    isValidPhone(phone) {
        return /^1[3-9]\d{9}$/.test(phone);
    },

    // 检查是否为有效密码
    isValidPassword(password) {
        return password.length >= 6 && password.length <= 20;
    },

    // 检查是否为有效用户名
    isValidUsername(username) {
        return username.length >= 3 && username.length <= 20;
    },

    // 检查是否为有效URL
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // 检查是否为有效日期
    isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    },

    // 检查是否为有效数字
    isValidNumber(num) {
        return typeof num === 'number' && !isNaN(num);
    },

    // 检查是否为有效整数
    isValidInteger(num) {
        return Number.isInteger(num);
    },

    // 检查是否为有效浮点数
    isValidFloat(num) {
        return typeof num === 'number' && !isNaN(num) && !Number.isInteger(num);
    },

    // 检查是否为有效布尔值
    isValidBoolean(bool) {
        return typeof bool === 'boolean';
    },

    // 检查是否为有效对象
    isValidObject(obj) {
        return typeof obj === 'object' && obj !== null;
    },

    // 检查是否为有效数组
    isValidArray(arr) {
        return Array.isArray(arr);
    },

    // 检查是否为有效函数
    isValidFunction(func) {
        return typeof func === 'function';
    },

    // 检查是否为有效Promise
    isValidPromise(promise) {
        return promise instanceof Promise;
    },

    // 检查是否为有效正则表达式
    isValidRegExp(regexp) {
        return regexp instanceof RegExp;
    },

    // 检查是否为有效Symbol
    isValidSymbol(symbol) {
        return typeof symbol === 'symbol';
    },

    // 检查是否为有效Map
    isValidMap(map) {
        return map instanceof Map;
    },

    // 检查是否为有效Set
    isValidSet(set) {
        return set instanceof Set;
    },

    // 检查是否为有效WeakMap
    isValidWeakMap(weakMap) {
        return weakMap instanceof WeakMap;
    },

    // 检查是否为有效WeakSet
    isValidWeakSet(weakSet) {
        return weakSet instanceof WeakSet;
    },

    // 检查是否为有效ArrayBuffer
    isValidArrayBuffer(arrayBuffer) {
        return arrayBuffer instanceof ArrayBuffer;
    },

    // 检查是否为有效DataView
    isValidDataView(dataView) {
        return dataView instanceof DataView;
    },

    // 检查是否为有效TypedArray
    isValidTypedArray(typedArray) {
        return ArrayBuffer.isView(typedArray);
    },

    // 检查是否为有效Error
    isValidError(error) {
        return error instanceof Error;
    },

    // 检查是否为有效Date
    isValidDate(date) {
        return date instanceof Date;
    },

    // 检查是否为有效RegExp
    isValidRegExp(regexp) {
        return regexp instanceof RegExp;
    },

    // 检查是否为有效Promise
    isValidPromise(promise) {
        return promise instanceof Promise;
    },

    // 检查是否为有效Proxy
    isValidProxy(proxy) {
        return proxy instanceof Proxy;
    },

    // 检查是否为有效Reflect
    isValidReflect(reflect) {
        return reflect instanceof Reflect;
    },

    // 检查是否为有效Symbol
    isValidSymbol(symbol) {
        return typeof symbol === 'symbol';
    },

    // 检查是否为有效Map
    isValidMap(map) {
        return map instanceof Map;
    },

    // 检查是否为有效Set
    isValidSet(set) {
        return set instanceof Set;
    },

    // 检查是否为有效WeakMap
    isValidWeakMap(weakMap) {
        return weakMap instanceof WeakMap;
    },

    // 检查是否为有效WeakSet
    isValidWeakSet(weakSet) {
        return weakSet instanceof WeakSet;
    },

    // 检查是否为有效ArrayBuffer
    isValidArrayBuffer(arrayBuffer) {
        return arrayBuffer instanceof ArrayBuffer;
    },

    // 检查是否为有效DataView
    isValidDataView(dataView) {
        return dataView instanceof DataView;
    },

    // 检查是否为有效TypedArray
    isValidTypedArray(typedArray) {
        return ArrayBuffer.isView(typedArray);
    },

    // 检查是否为有效Error
    isValidError(error) {
        return error instanceof Error;
    },

    // 检查是否为有效Date
    isValidDate(date) {
        return date instanceof Date;
    },

    // 检查是否为有效RegExp
    isValidRegExp(regexp) {
        return regexp instanceof RegExp;
    },

    // 检查是否为有效Promise
    isValidPromise(promise) {
        return promise instanceof Promise;
    },

    // 检查是否为有效Proxy
    isValidProxy(proxy) {
        return proxy instanceof Proxy;
    },

    // 检查是否为有效Reflect
    isValidReflect(reflect) {
        return reflect instanceof Reflect;
    }
};

// 导出工具函数
window.utils = utils; 