/**
 * 工具类模块
 */
export default new class Tool {
    /**
     * 是否为ie8/9
     * @returns {boolean}
     */

    isIe89 () {
        return /MSIE (8|9)\.0/.test(navigator.userAgent);
    }

    /**
     * 是否未定义
     * @param obj
     * @returns {boolean}
     */

    isUndefined (obj) {
        return obj === void 0;
    }

    /**
     * 是否定义
     * @param obj
     * @returns {boolean}
     */

    isDefined (obj) {
        return obj !== void 0;
    }

    /**
     * 是否函数
     * @param fn
     * @returns {boolean}
     */

    isFn (fn) {
        return typeof fn === 'function';
    }

    /**
     * 是否为对象（数组，对象）
     * @param obj
     * @returns {boolean}
     */

    isObj (obj) {
        return !!obj && typeof obj === 'object';
    }

    /**
     * 是否为整数(字符串数值亦可)
     * @param n
     * @returns {boolean}
     */

    isInt (n) {
        return /^[0-9]+$/.test(n);
    }

    /**
     * 是否数字
     * @param n
     * @returns {boolean}
     */

    isNumber (n) {
        return parseInt(n) === parseInt(n) && -n === -n;
    }


    /**
     * 判断两个值是否不同
     * @param a
     * @param b
     * @returns {boolean}
     */

    isDiff (a, b) {
        return typeof a === typeof b ? JSON.stringify(a) !== JSON.stringify(b) : false;
    }

    /**
     * 判断是否为 iOS
     * @returns {boolean}
     */

    iOS () {
        return (/iPhone|iPad|iPod/).test(navigator.userAgent);
    }

    /**
     * 判断是否为 Android
     * @returns {boolean}
     */

    isAndroid () {
        return (/Android/).test(navigator.userAgent);
    }

    /**
     * 重复内容
     * @param str
     * @param n
     * @returns {*}
     */

    strRepeat (str, n) {
        if (!str) return '';
        if (!this.isNumber(n) || n <= 1) {
            return str;
        }
        let _str = '';

        for (var i = n - 1; i >= 0; i--) {
            _str += str;
        }
        return _str;
    }

    /**
     * 手机号加密
     * @param phone
     * @returns {*}
     */

    encodePhone (phone) {
        if (!phone || this.isNumber(phone)) {
            return phone.toString().replace(/^(\d{3})(\d{4})(\d{4})/, function ($1, $2, $3, $4) {
                return [$2, this.strRepeat('*', $3.length), $4].join('');
            });
        } else {
            return phone || '';
        }
    }

    /**
     * 克隆
     * @param obj
     * @returns {*}
     */

    clone (obj) {
        if (this.isObj(obj)) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            return this.isFn(obj) ? new obj : obj;
        }
    }

    /**
     * 是否为邮箱
     * @param str
     * @returns {boolean}
     */

    isEmail (str) {
        return /^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,3}[a-z]{2,4}$/.test(str);
    }

    /**
     * 是否为手机(只进行以1开头的11位数验证， 防止出现问题，如发行新的手机段)
     * @param str
     * @returns {boolean}
     */

    isPhone (str) {
        return /^1\d{10}$/.test(str);
    }

    /**
     * 是否中文名称
     * @param str
     * @returns {boolean}
     */

    isChinese (str) {
        return /^[\u4e00-\u9fa5·]+$/.test(str);
    }

    /**
     * 是否英文名称
     * @param str
     * @returns {boolean}
     */

    isEnglish (str) {
        return /^[a-zA-Z\\s]+/.test(str);
    }

    /**
     * 是否为链接
     * @param str
     * @returns {boolean}
     */

    isUrl (str) {
        return /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?$/.test(str);
    }

    /**
     * 是否为护照
     * @param str
     * @returns {boolean}
     */

    isPassport (str) {
        return /^[a-zA-Z0-9]{5,17}$/.test(str);
    }

    /**
     * 是否为身份证
     * @param str
     * @returns {boolean}
     */

    isIdCard (str) {
        return /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(str);
    }

    /**
     * 拓展
     * @param target
     * @param sources
     * @returns {*}
     */

    extends (target, ...sources) {
        return Object.assign(target, ...sources);
    }

    /**
     * 获取文件路径
     * @param file
     * @returns {*}
     */

    getObjectURL (file) {
        var url = null;

        if (window.URL) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL) {
            url = window.webkitURL.createObjectURL(file);
        } else {
            file.select();
            file.blur();
            url = document.selection.createRange().text;
        }
        return url;
    }

    /**
     * 获取文件拓展名
     * @param obj
     * @returns {string}
     */

    getFileExt (obj) {
        return obj.value.substr(obj.value.lastIndexOf('.')).toLowerCase();
    }

    formatDate (date, format) {
        // 服务端返回的时间戳可能以秒的形式
        if (!date) {
            return false;
        }
        date = parseInt(date.toString().length < 11 ? date * 1000 : date);

        date = new Date(date);

        let y = date.getFullYear();
        let M = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();

        M = this.formatNum(M);
        d = this.formatNum(d);
        h = this.formatNum(h);
        m = this.formatNum(m);
        s = this.formatNum(s);

        if (format === 'time') {
            return h + ':' + m + ':' + s;
        } else if (format === 'date') {
            return y + '-' + M + '-' + d;
        } else {
            return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
        }

    }

    /**
     * 数值格式化
     * @param n
     * @returns {string}
     */

    formatNum (n) {
        return n >= 10 ? n : '0' + n;
    }
};
