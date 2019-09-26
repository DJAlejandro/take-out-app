<template>
    <div class="seller" ref="sellerScroll">
        <div>
            <div class="seller-header">
                <div class="seller-header-content">
                    <div class="seller-name">{{seller.name}}</div>
                    <div class="seller-count">
                        <div class="star-wrapper">
                            <v-star size="36" :score="seller.score"></v-star>
                        </div>
                        <div class="rating-count">({{seller.ratingCount}})</div>
                        <div class="sell-count">月售{{seller.sellCount}}单</div>
                    </div>
                    <div class="like">
                        <div class="like-iconfont" @click="toggleActive">
                            <i class="iconfont icon-like" :class="{active:isActive}"></i>
                        </div>
                        <div class="like-desc">{{likeDesc}}</div>
                    </div>
                </div>
                <div class="seller-header-info">
                    <div class="header-info-item">
                        <h4 class="seller-header-title">起送价</h4>
                        <h2 class="seller-header-desc">
                            {{seller.minPrice}}
                            <span class="seller-unit">元</span>
                        </h2>
                    </div>
                    <div class="header-info-item">
                        <h4 class="seller-header-title">商家配送</h4>
                        <h2 class="seller-header-desc">
                            {{seller.deliveryPrice}}
                            <span class="seller-unit">元</span>
                        </h2>
                    </div>
                    <div class="header-info-item">
                        <h4 class="seller-header-title">平均配送时间</h4>
                        <h2 class="seller-header-desc">
                            {{seller.deliveryTime}}
                            <span class="seller-unit">分钟</span>
                        </h2>
                    </div>
                </div>
            </div>
            <div class="section-block"></div>
            <div class="seller-bulletin">
                <h2 class="seller-bulletin-title">公告与活动</h2>
                <p class="seller-bulletin-content">{{seller.bulletin}}</p>
            </div>
            <div class="seller-list">
                <ul>
                    <li
                        class="seller-list-item"
                        v-for="item in seller.supports"
                    >
                        <v-pics class="seller-list-brand" :index="item.type" indexArr="4"></v-pics>
                        {{item.description}}
                    </li>
                </ul>
            </div>
            <div class="section-block"></div>
            <div class="seller-pics">
                <h2 class="seller-pics-title">商家实景</h2>
                <div class="seller-pics-wrapper" ref="picsScroll">
                    <ul class="seller-pics-list" ref="pics">
                        <li v-for="item in seller.pics" class="seller-pics-item">
                            <img :src="item" />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="section-block"></div>
            <div class="seller-infos">
                <h2 class="seller-infos-title">商家信息</h2>
                <div
                    v-for="item in seller.infos"
                    class="seller-infos-item"
                >{{item}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import BScroll from "@better-scroll/core";
import VPics from "components/supports/Pics.vue";
import VStar from "components/star/Star.vue";

export default {
    name: "Seller",
    props: {
        seller: Object
    },
    components: {
        VStar,
        VPics
    },
    data() {
        return {
            isActive: false
        };
    },
    methods: {
        toggleActive() {
            this.isActive = !this.isActive;
            localStorage.setItem("like", this.isActive);
        },
        initPics(data) {
            let width = 126 * data - 6;
            this.$refs.pics.style.width = width + "px";
        },
        _initScroll() {
            this.$nextTick(function() {
                if (!this.sellerScroll) {
                    this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
                        click: true
                    });
                } else {
                    this.sellerScroll.refresh();
                }
            });
        },
        _initPics() {
            if (!this.picsScroll) {
                /* better-srcoll横向滚动 */
                this.picsScroll = new BScroll(this.$refs.picsScroll, {
                    scrollX: true,
                    eventPassthrough: "vertical"
                });
            } else {
                this.picsScroll.refresh();
            }
        }
    },
    mounted() {
        if (localStorage.getItem("like")) {
            if (localStorage.getItem("like") === "true") {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        }
        if (this.seller.pics) {
            this.initPics(this.seller.pics.length);
        }
        this._initScroll();
        this._initPics();
    },
    computed: {
        likeDesc() {
            let desc = "";
            this.isActive === true ? (desc = "已收藏") : (desc = "收藏");
            return desc;
        }
    }
};
</script>


<style lang="scss" scoped>
@import "~css/mixin.scss";
@import "~css/base.scss";

.seller {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    .seller-header {
        padding: 18px;
        font-size: 0;

        .seller-header-content {
            position: relative;
            // @include border-bottom-1px($vborder);
            border-bottom: 1px solid black;
            border-image: svg(1px-border param(--color $vborder)) 1 stretch;
            text-align: left;
            .seller-name {
                @include px2px(14);
                line-height: 14px;
                color: $vblack;
            }
            .seller-count {
                display: flex;
                margin-top: 8px;
                padding-bottom: 18px;
                .star-wrapper,
                .rating-count,
                .sell-count {
                    @include px2px(10);
                    line-height: 18px;
                    color: rgb(77, 85, 93);
                }
                .rating-count {
                    margin-left: 8px;
                    margin-right: 12px;
                }
            }
            .like {
                position: absolute;
                top: 0;
                right: 0;
                .like-iconfont {
                    width: 40px; // 设置宽度固定，切换时图标的位置不会改变
                    margin-bottom: 4px;
                    text-align: center;
                    .icon-like {
                        font-size: 24px;
                        line-height: 24px;
                        color: #d4d6d9;
                        &.active {
                            color: rgb(240, 20, 20);
                        }
                    }
                }
                .like-desc {
                    width: 40px;
                    text-align: center;
                    @include px2px(10);
                    line-height: 10px;
                    color: rgb(77, 85, 93);
                }
            }
        }
        .seller-header-info {
            margin-top: 18px;
            display: flex;
            .header-info-item {
                display: inline-block;
                flex: 1;
                // @include border-right-1px($vborder);
                border-right: 1px solid black;
                border-image: svg(1px-border param(--color $vborder)) 1 stretch;
                &:last-child {
                    // @include border-none;
                    border: none;
                }
                text-align: center;
                &:last-child {
                    border: none;
                }
                .seller-header-title {
                    @include px2px(10);
                    line-height: 10px;
                    color: $vgray;
                    margin-bottom: 4px;
                }
                .seller-header-desc {
                    @include px2px(24);
                    line-height: 24px;
                    color: $vblack;
                    .seller-unit {
                        color: $vblack;
                        @include px2px(10);
                    }
                }
            }
        }
    }

    .seller-bulletin {
        padding: 18px 18px 16px 18px;
        text-align: left;
        .seller-bulletin-title {
            @include px2px(14);
            line-height: 14px;
            color: $vblack;
        }
        .seller-bulletin-content {
            margin: 8px 12px 0 12px;
            @include px2px(12);
            line-height: 24px;
            color: rgb(240, 20, 20);
        }
    }
    .seller-list {
        .seller-list-item {
            color: $vblack;
            padding: 16px 12px;
            margin: 0 18px;
            // @include border-top-1px($vborder);
            border-top: 1px solid black;
            border-image: svg(1px-border param(--color $vborder)) 1 stretch;
            @include px2px(12);
            line-height: 16px;
            text-align: left;
            .seller-list-brand {
                margin-right: 6px;
                vertical-align: top;
            }
        }
    }
    .seller-pics {
        padding: 18px;
        padding-right: 0;
        .seller-pics-title {
            @include px2px(14);
            line-height: 14px;
            color: $vblack;
            margin-bottom: 12px;
            text-align: left;
        }
        .seller-pics-wrapper {
            font-size: 0;
            white-space: nowrap; //超出宽度不换行
            overflow: hidden;
            .seller-pics-list {
                .seller-pics-item {
                    display: inline-block;
                    margin-right: 6px;
                    img {
                        width: 120px;
                        height: 90px;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }

    .seller-infos {
        padding: 18px 18px 0 18px;
        text-align: left;
        .seller-infos-title {
            margin-bottom: 12px;
            @include px2px(14);
            line-height: 14px;
            color: $vblack;
        }
        .seller-infos-item {
            // @include border-top-1px($vborder);
            border-top: 1px solid black;
            border-image: svg(1px-border param(--color $vborder)) 1 stretch;
            padding: 16px 12px;
            line-height: 16px;
            @include px2px(12);
            color: $vblack;
        }
    }
}
</style>
