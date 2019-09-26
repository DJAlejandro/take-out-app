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
            <div class="header-bulletin-main" :class="{android:AndroidPx}">{{seller.bulletin}}</div>
            <div class="header-bulletin-right" :class="{android:AndroidPx}">
                <i class="iconfont icon-right"></i>
            </div>
        </div>
        <div class="header-bgimg">
            <img :src="seller.avatar" />
        </div>
        <transition name="full-screen">
            <div class="full-screen" v-show="isShow">
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
        display: flex;
        padding: 24px 12px 18px 24px;
        position: relative;
        .header-content-left {
            flex: 0 0 64px;
            img {
                width: 64px;
                height: 64px;
                border-radius: 2px;
            }
        }
        .header-content-right {
            flex: 1;
            margin-left: 16px;
            text-align: left;
            .header-title {
                margin-top: 2px;
                font-size: 0;
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
                    display: inline-block;
                    @include px2px(16);
                    line-height: 18px;
                    font-weight: bold;
                    color: #fff;
                }
            }
            .header-desc {
                margin-top: 8px;
                margin-bottom: 10px;
                @include px2px(12);
                line-height: 12px;
            }
            .header-supports {
                margin-bottom: 2px;
                font-size: 0;
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
                    display: inline-block;
                    @include px2px(10);
                    line-height: 12px;
                    vertical-align: top;
                }
            }
        }
        .header-more {
            position: absolute;
            right: 12px;
            bottom: 18px;
            @include px2px(10);
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
        display: flex;
        align-items: center;
        padding: 0 12px;
        line-height: 28px;
        background-color: rgba(7, 17, 27, 0.2);
        .header-bulletin-left {
            // float: left;
            width: 22px;
            height: 12px;
            // margin-top: 10px;
            margin-right: 4px;
            @include bg-img("../assets/img/bulletin");
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .header-bulletin-main {
            flex: 1;
            @include px2px(10);
            @include ellipsis;
        }
        .header-bulletin-right {
            // float: right;
            @include px2px(10);
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
    display: flex;
    flex-flow: column;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.8);
    z-index: 6;
    backdrop-filter: blur(10px); //IOS系统的有背景模糊效果

    .full-screen-content {
        padding-left: 36px;
        padding-right: 36px;
        flex: 1;
        margin-top: 64px;
        h1 {
            @include px2px(16);
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
                // @include border-bottom-1px(rgba(255, 255, 255, 0.2));
                border-bottom: 1px solid black;
                border-image: svg(1px-border param(--color #ffffff33)) 1 stretch;
            }
            .flex-main {
                padding-left: 12px;
                padding-right: 12px;
                color: rgb(255, 255, 255);
                @include px2px(14);
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
                    @include px2px(12);
                    line-height: 16px;
                    vertical-align: top;
                }
            }
        }
        .full-screen-bulletin {
            padding: 0 12px;
            @include px2px(12);
            line-height: 24px;
            text-align: left;
            color: rgb(255, 255, 255);
        }
    }

    .footer {
        margin-top: auto;
        flex-shrink: 0;
        padding-bottom: 32px;
        width: 32px;
        height: 64px;
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
    }
}
</style>
