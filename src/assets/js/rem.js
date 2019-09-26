// 基准大小
// 设置 rem 函数
function setRem() {
    const dpr = window.devicePixelRatio || 1;
    document.documentElement.setAttribute('data-dpr', dpr)
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const baseSize = document.documentElement.clientWidth / 10
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = baseSize + 'px'
    console.log(1);

}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}