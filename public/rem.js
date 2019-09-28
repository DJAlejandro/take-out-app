// 基准大小
// 设置 rem 函数
let deviceHeight, deviceWidth

function setRem() {
    const dpr = window.devicePixelRatio || 1;
    document.documentElement.setAttribute('data-dpr', dpr)
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = deviceWidth / 10 + 'px'


}

let deviceChange = function () {
    deviceWidth = document.documentElement.clientWidth
    deviceHeight = document.documentElement.clientHeight
    if (window.orientation === 90 || window.orientation === -90) {
        // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
        deviceWidth = deviceHeight;
    }
    setRem()
}

deviceChange()
// 改变窗口大小时重新设置 rem

window.addEventListener("resize", () => {
    deviceChange()

});

