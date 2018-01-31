export default class Compress {
    /**
     * opts
     *
     * @param width   获取的图像大小
     * @param type    指定图片格式
     * @param quality 图片质量 0～1 ， 0.92 为默认值
     */
    constructor () {
        this.opts = {
            width: 300,
            type: 'image/jpeg',
            quality: 0.92,
            success () {},
            error (err) {
                alert(err)
            }
        }
    };

    /**
     * 图片压缩
     * @param file
     * @param option
     */
    image (file, option) {
        if (typeof file !== 'object' || typeof file.name !== 'string') {
            this.opts.error('请传入fileList对象');
            return false
        }

        let ext = this.getFileExt(file.name);

        if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
            this.opts.error('只支持 jpg, png');
            return false
        }

        this.opts = Object.assign(this.opts, option);
        this.base64(this.getObjectURL(file), this.opts.success);
    };

    /**
     * 图片转base64
     * @param fileUrl
     * @param fn
     */
    base64 (fileUrl, fn) {
        let img = new Image();
        img.src = fileUrl;

        img.onload = () => {
            let canvas = document.createElement('canvas');
            let ctx    = canvas.getContext('2d');

            let width = this.opts.width;
            let height = width * img.height / img.width;

            ctx.fillStyle = 'none';
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            fn(canvas.toDataURL(this.opts.type, this.opts.quality));
        }
    };

    /**
     * 获取file对象链接
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
    };

    /**
     * 获取文件拓展名
     * @param str
     * @returns {string}
     */
    getFileExt (str) {
        return str.substr(str.lastIndexOf('.') + 1).toLowerCase();
    };
}