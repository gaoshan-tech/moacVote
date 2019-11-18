export function loadPic(url, defaultPic, callback, img) {
    var localBase64 = localStorage.getItem(url);
    if (localBase64.length > 0) {
        callback(localBase64, 'base64', img);
        return;
    } else {
        callback(defaultPic, 'img', img);
    }
    const image = new Image();
    image.setAttribute("crossOrigin",'Anonymous')
    image.src = url;
    image.onload = function() {
        // 默认按比例压缩
        let w = image.width,
            h = image.height,
            scale = w / h;
        w = 200;
        h = w / scale;
        // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
        var quality = 0.7;
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(image, 0, 0, w, h);
        var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
        var base64 = canvas.toDataURL("image/" + ext, quality);
        localStorage.setItem(url, base64);
        callback(base64, 'base64', img);
    }

}