let deviceHeight, deviceWidth, fontSize

function setRem() {
    const dpr = window.devicePixelRatio || 1;
    document.documentElement.setAttribute('data-dpr', dpr)
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    // 设置页面根节点字体大小
    // fontSize = deviceWidth / 10 < 50 ? deviceWidth / 10 : 50;
    // document.documentElement.style.fontSize = deviceWidth / 10 + 'px'
}

let deviceChange = function () {
    deviceWidth = document.documentElement.clientWidth
    deviceHeight = document.documentElement.clientHeight
    // if (deviceWidth > 640) deviceWidth = 640;

    /* 如果用户在PC端浏览，页面过宽怎么办？一般我们都会设置一个最大宽度，大于这个宽度的话页面居中，两边留白 */
    // if (window.orientation === 90 || window.orientation === -90) {
    //     // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
    //     deviceWidth = deviceHeight;
    // }
    setRem()
}
document.addEventListener('DOMContentLoaded', () => {
    deviceChange()
});

// 改变窗口大小时重新设置 rem
window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', () => {
    deviceChange()
});