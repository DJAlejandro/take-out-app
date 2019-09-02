<template>
    <div class="header" ref="header">
        <div class="header-content clearfix">
            <div class="header-content-left">
                <img :src="seller.avatar" />
            </div>
            <div class="header-content-right">
                <div class="header-title">
                    <span class="header-title-brand"></span>
                    <span class="header-name" :class="{android:AndroidPx}">{{seller.name}}</span>
                </div>
                <div class="header-desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
                <div v-if="seller.supports" class="header-supports" :class="{android:AndroidPx}">
                    <v-pics
                        class="header-supports-brand"
                        :index="seller.supports[0].type"
                        indexArr="1"
                    ></v-pics>
                    <span
                        class="header-text"
                        :class="{android:AndroidPx}"
                    >{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="header-more" @click="showCover">
                <span class="header-count">{{seller.supports.length}}个</span>
                <i class="iconfont icon-right" :class="{android:AndroidPx}"></i>
            </div>
        </div>
        <div class="header-bulletin clearfix" @click="showCover">
            <div class="header-bulletin-left"></div>
            <div class="header-bulletin-right" :class="{android:AndroidPx}">
                <i class="iconfont icon-right"></i>
            </div>
            <div class="header-bulletin-main" :class="{android:AndroidPx}">{{seller.bulletin}}</div>
        </div>
        <div class="header-bgimg">
            <img :src="seller.avatar" />
        </div>
        <transition name="full-screen">
            <div class="full-screen" v-show="isShow">
                <div class="wrapper clearfix">
                    <div class="full-screen-content">
                        <h1>{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <v-star size="48" :score="seller.score"></v-star>
                        </div>
                        <div class="full-screen-info">
                            <span class="flex-line"></span>
                            <span class="flex-main">优惠信息</span>
                            <span class="flex-line"></span>
                        </div>
                        <div class="full-screen-info-detail" v-if="seller.supports">
                            <ul>
                                <li v-for="item in seller.supports" class="full-screen-info-item">
                                    <v-pics
                                        class="full-screen-info-brand"
                                        :index="item.type"
                                        indexArr="2"
                                    ></v-pics>
                                    <span class="detail-text">{{item.description}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="full-screen-info">
                            <span class="flex-line"></span>
                            <span class="flex-main">商家公告</span>
                            <span class="flex-line"></span>
                        </div>
                        <div class="full-screen-bulletin">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="footer">
                    <i class="iconfont icon-close" @click="closeCover"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/javascript">
import vStar from "components/star/Star.vue";
import vPics from "components/supports/Pics.vue";
import { isAndroid } from "js/Android.js";
export default {
    name: "Header",
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        vStar,
        vPics
    },
    data() {
        return {
            isShow: false,
            AndroidPx: false
        };
    },
    methods: {
        showCover() {
            this.isShow = true;
        },
        closeCover() {
            this.isShow = false;
        }
    },
    created() {
        if (isAndroid()) {
            this.AndroidPx = true;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~css/mixin.scss";
@import "~css/base.scss";
@import "~css/border.scss";

.full-screen-enter-active,
.full-screen-leave-active {
    transition: all 0.3s ease;
}
.full-screen-enter,
.full-screen-leave-to {
    opacity: 0;
}

.header {
    background-color: rgba(7, 17, 27, 0.5);
    position: relative;
    overflow: hidden; //防止图片模糊产生的阴影超出容器
    .header-content {
        padding: 24px 12px 18px 24px;
        position: relative;
        .header-content-left {
            float: left;
            img {
                width: 64px;
                height: 64px;
                border-radius: 2px;
            }
        }
        .header-content-right {
            margin-left: 80px;
            text-align: left;
            .header-title {
                margin-top: 2px;
                .header-title-brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    @include bg-img("../assets/img/brand");
                    background-repeat: no-repeat;
                    background-size: 30px 18px;
                    vertical-align: top;
                    margin-right: 6px;
                }
                .header-name {
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                    color: #fff;
                }
            }
            .header-desc {
                margin-top: 8px;
                margin-bottom: 10px;
                font-size: 12px;
                line-height: 12px;
            }
            .header-supports {
                margin-bottom: 2px;
                .header-supports-brand {
                    display: inline-block;
                    margin-right: 4px;
                    width: 12px;
                    height: 12px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    vertical-align: top;
                }
                .header-text {
                    font-size: 10px;
                    line-height: 12px;
                    vertical-align: top;
                }
            }
        }
        .header-more {
            position: absolute;
            right: 12px;
            bottom: 18px;
            font-size: 10px;
            line-height: 24px;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 0 8px;
            border-radius: 14px;
            .header-count {
                margin-right: 2px;
                vertical-align: middle;
            }
            .iconfont {
                vertical-align: middle;
            }
        }
    }

    /* 经典的三列布局 */
    .header-bulletin {
        padding: 0 12px;
        line-height: 28px;
        background-color: rgba(7, 17, 27, 0.2);
        .header-bulletin-left {
            float: left;
            width: 22px;
            height: 12px;
            margin-top: 10px;
            margin-right: 4px;
            @include bg-img("../assets/img/bulletin");
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .header-bulletin-main {
            font-size: 10px;
            @include ellipsis;
        }
        .header-bulletin-right {
            float: right;
            font-size: 10px;
            margin-left: 4px;
        }
    }

    /* 带模糊效果的背景图 */
    .header-bgimg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        filter: blur(10px);
        img {
            width: 100%;
            height: 100%;
        }
    }
}

/* sticky footer */
.full-screen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; //step.1
    background-color: rgba(7, 17, 27, 0.8);
    z-index: 6;
    backdrop-filter: blur(10px); //IOS系统的有背景模糊效果

    .wrapper {
        height: auto; //step.2
        min-height: 100%; //step.2
        padding-left: 36px;
        padding-right: 36px;
        .full-screen-content {
            margin-top: 64px;
            padding-bottom: 64px; //step.3 必须使用和footer相同的高度
            h1 {
                font-size: 16px;
                line-height: 16px;
                font-weight: 700;
                color: rgb(255, 255, 255);
                text-align: center;
            }
            .star-wrapper {
                height: 24px;
                margin-top: 16px;
                text-align: center;
            }
            .full-screen-info {
                display: flex;
                margin-top: 28px;
                margin-bottom: 24px;
                .flex-line {
                    flex: 1;
                    top: -6px;
                    @include border-bottom-1px(rgba(255, 255, 255, 0.2));
                }
                .flex-main {
                    padding-left: 12px;
                    padding-right: 12px;
                    color: rgb(255, 255, 255);
                    font-size: 14px;
                    font-weight: 700;
                }
            }
            .full-screen-info-detail {
                padding: 0 12px;
                font-size: 0;
                .full-screen-info-item {
                    margin-bottom: 12px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .full-screen-info-brand {
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: top;
                    }
                    .detail-text {
                        display: inline-block;
                        font-size: 12px;
                        line-height: 16px;
                        vertical-align: top;
                    }
                }
            }
            .full-screen-bulletin {
                padding: 0 12px;
                font-size: 12px;
                line-height: 24px;
                text-align: left;
                color: rgb(255, 255, 255);
            }
        }
    }
    .footer {
        position: relative; //step.4
        margin-top: -64px; //step.4 footer高度的负值
        margin-left: auto;
        margin-right: auto;
        width: 32px;
        height: 32px;
        clear: both; //step.4
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
    }
}
</style>
