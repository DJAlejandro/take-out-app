export function isAndroid (){
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/android/i) == "android") {
        return true;
    } else {
        return false;
    }
 }