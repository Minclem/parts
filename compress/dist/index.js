(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Compress = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Compress = function () {
    /**
     * opts
     *
     * @param width   获取的图像大小
     * @param type    指定图片格式
     * @param quality 图片质量 0～1 ， 0.92 为默认值
     */
    function Compress() {
        classCallCheck(this, Compress);

        this.opts = {
            width: 300,
            type: 'image/jpeg',
            quality: 0.92,
            success: function success() {},
            error: function error(err) {
                alert(err);
            }
        };
    }

    createClass(Compress, [{
        key: 'image',


        /**
         * 图片压缩
         * @param file
         * @param option
         */
        value: function image(file, option) {
            if ((typeof file === 'undefined' ? 'undefined' : _typeof(file)) !== 'object' || typeof file.name !== 'string') {
                this.opts.error('请传入fileList对象');
                return false;
            }

            var ext = this.getFileExt(file.name);

            if (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png') {
                this.opts.error('只支持 jpg, png');
                return false;
            }

            this.opts = Object.assign(this.opts, option);
            this.base64(this.getObjectURL(file), this.opts.success);
        }
    }, {
        key: 'base64',


        /**
         * 图片转base64
         * @param fileUrl
         * @param fn
         */
        value: function base64(fileUrl, fn) {
            var _this = this;

            var img = new Image();
            img.src = fileUrl;

            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                var width = _this.opts.width;
                var height = width * img.height / img.width;

                ctx.fillStyle = 'none';
                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                fn(canvas.toDataURL(_this.opts.type, _this.opts.quality));
            };
        }
    }, {
        key: 'getObjectURL',


        /**
         * 获取file对象链接
         * @param file
         * @returns {*}
         */
        value: function getObjectURL(file) {
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
    }, {
        key: 'getFileExt',


        /**
         * 获取文件拓展名
         * @param str
         * @returns {string}
         */
        value: function getFileExt(str) {
            return str.substr(str.lastIndexOf('.') + 1).toLowerCase();
        }
    }]);
    return Compress;
}();

return Compress;

})));
//# sourceMappingURL=index.js.map
