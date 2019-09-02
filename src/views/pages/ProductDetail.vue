<template>
    <div class="products-detail" ref="detail">
        <div>
            <div class="detail-close" @click="detailClose">
                <i class="iconfont icon-back"></i>
            </div>

            <div class="products-detail-img">
                <img :src="food.image" />
            </div>
            <div class="products-detail-content">
                <div class="products-detail-name">{{food.name}}</div>
                <div class="products-detail-desc">
                    <span class="products-detail-text">月售{{food.sellCount}}份</span>
                    <span class="products-detail-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="products-detail-price">
                    <span class="new-price">
                        <span class="yuan">￥</span>
                        <span>{{food.price}}</span>
                    </span>
                    <span v-if="food.oldPrice" class="old-price">
                        <span class="yuan">￥</span>
                        <span>{{food.oldPrice}}</span>
                    </span>
                    <span class="price-button">
                        <v-button v-show="food.count" :food="food"></v-button>
                        <span class="zero" v-show="!food.count" @click="add">加入购物车</span>
                    </span>
                </div>
            </div>
            <div class="section-block" v-show="food.info"></div>

            <div class="products-detail-info" v-show="food.info">
                <h2>商品介绍</h2>
                <p>{{food.info}}</p>
            </div>
            <div class="section-block"></div>
            <div class="products-detail-rating-info">
                <h2>商品评价</h2>
            </div>
            <v-rating
                :ratings="food.ratings"
                :isActive="isActive"
                :hideEmpty="hideEmpty"
                :desc="desc"
                @empty-comment="toggleEmptyComment"
                @change-ratings="changeRatings"
            ></v-rating>
            <div class="ratings-content" v-if="food">
                <ul v-if="food.ratings">
                    <li
                        v-for="item in food.ratings"
                        class="ratings-content-item border-horizontal-1px"
                        v-if="showItem(item)"
                    >
                        <div class="ratings-title">
                            <div class="ratings-user">
                                <div class="username">{{item.username}}</div>
                                <div class="ratings-img">
                                    <img :src="item.avatar" />
                                </div>
                            </div>
                            <div class="time">{{ item.rateTime | formatDate}}</div>
                        </div>
                        <div class="ratings-text">
                            <i
                                class="iconfont"
                                :class="{'icon-good':item.rateType===0,'icon-bad':item.rateType===1}"
                            ></i>
                            {{item.text}}
                        </div>
                    </li>
                </ul>
                <div class="ratings-content-item" v-if="!food.ratings || !food.ratings.length">
                    <div class="no-rating">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import VButton from "components/Button.vue";
import VRating from "components/Rating.vue";
import BScroll from "@better-scroll/core";
import { format } from "date-fns";

const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
    name: "ProductDetail",
    props: {
        food: Object,
        isProductDetail: Boolean
    },
    components: {
        VButton,
        VRating
    },
    data() {
        return {
            desc: {
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
            },
            hideEmpty: false,
            isActive: ALL
        };
    },
    methods: {
        add() {
            if (!this.food.count) {
                this.$set(this.food, "count", 1);
            }
        },
        detailClose() {
            this.$emit("detail-close");
        },
        refresh() {
            this.$nextTick(function() {
                this.productDetail.refresh();
            });
        },

        /* 当一个组件内使用了better-scroll时，每当操作引起该组件DOM的结构变化时，一定要调用better-scroll的refresh方法重新计算宽高，保证better-scroll的正确渲染*/
        changeRatings(isActive) {
            this.isActive = isActive;
            this.refresh();
        },
        toggleEmptyComment() {
            this.hideEmpty = !this.hideEmpty;
            this.refresh();
        },
        showItem(item) {
            if (this.hideEmpty && item.text.length == 0) {
                return false;
            }
            if (this.isActive === ALL) {
                return true;
            } else {
                return item.rateType === this.isActive;
            }
            this.refresh();
        },
        _initScroll() {
            this.$nextTick(function() {
                if (!this.productDetail) {
                    this.productDetail = new BScroll(this.$refs.detail, {
                        click: true
                    });
                } else {
                    this.productDetail.refresh();
                }
            });
        }
    },
    /* moment.js + 过滤器 */
    filters: {
        formatDate(time) {
            return format(time, "yyyy-MM-dd HH:mm:ss");
        }
    },
    watch: {
        isProductDetail() {
            if (this.isProductDetail) {
                /* 一定要确保在得到数据且DOM渲染完成的情况下初始化better-scroll */
                this._initScroll();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../~css/base.scss";
@import "~css/border.scss";

.products-detail {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    width: 100%;
    z-index: 1;
    background-color: #fff;
    overflow: hidden;
    .detail-close {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #fff;
        font-size: 20px;
        padding: 10px;
        z-index: 4;
        background-color: rgba(200, 200, 200, 0.5);
        border-radius: 50%;
    }

    /* 宽度自适应图片布局 */
    .products-detail-img {
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 100%; //比例自适应布局---正方形
        img {
            width: 100%;
        }
    }
    .products-detail-content {
        padding: 18px;
        text-align: left;
        .products-detail-name {
            line-height: 14px;
            font-weight: 700;
            color: $vblack;
        }
        .products-detail-desc {
            font-size: 0;
            margin: 8px 0 18px 0;
            .products-detail-text,
            .products-detail-rating {
                display: inline-block;
                color: $vgray;
                font-size: 10px;
                line-height: 10px;
            }
            .products-detail-rating {
                margin-left: 12px;
            }
        }
        .products-detail-price {
            font-size: 0;
            width: 100%;
            .new-price,
            .old-price {
                font-size: 0;

                display: inline-block;
                line-height: 24px;
            }
            .yuan {
                font-size: 10px;
                font-weight: normal;
                vertical-align: bottom;
            }
            .new-price {
                span {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                    vertical-align: bottom;
                }
            }
            .old-price {
                margin-left: 8px;

                span {
                    font-size: 10px;
                    font-weight: 700;
                    color: $vgray;
                    vertical-align: top;
                    text-decoration: line-through;
                }
            }
            .price-button {
                float: right;
            }
            .zero {
                display: inline-block;
                width: 74px;
                height: 24px;
                text-align: center;
                border-radius: 12px;
                background-color: $vblue;
                padding: 0 12px;
                line-height: 24px;
                font-size: 10px;
                color: #fff;
            }
        }
    }
    .products-detail-info {
        padding: 18px;
        text-align: left;
        h2 {
            font-size: 14px;
            line-height: 14px;
            color: $vblack;
            margin-bottom: 6px;
        }
        p {
            margin-left: 8px;
            margin-right: 8px;
            font-size: 12px;
            line-height: 24px;
            color: rgb(77, 85, 93);
        }
    }
    .products-detail-rating-info {
        padding: 18px 0 0 18px;
        text-align: left;
        h2 {
            font-size: 14px;
            line-height: 14px;
            color: $vblack;
        }
    }
    .ratings-content {
        text-align: left;
        padding: 0 18px;
        .ratings-content-item {
            padding: 16px 0;
            @include border-bottom-1px($vborder);
            &:last-child {
                @include border-none;
            }
            .ratings-title {
                color: $vgray;
                margin-bottom: 6px;
                .time {
                    font-size: 10px;
                    line-height: 12px;
                    color: $vgray;
                }
                .ratings-user {
                    float: right;
                    font-size: 0;
                    height: 12px;

                    .username {
                        display: inline-block;
                        color: $vgray;
                        line-height: 12px;
                        font-size: 10px;
                        vertical-align: top;
                    }

                    .ratings-img {
                        display: inline-block;
                        margin-left: 6px;
                        height: 12px;
                        width: 12px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                }
            }

            .ratings-text {
                font-size: 12px;
                line-height: 16px;
                color: $vblack;
                .iconfont {
                    display: inline-block;
                    font-size: 12px;
                    line-height: 16px;
                    margin-right: 4px;
                }
                .icon-good {
                    color: $vblue;
                }
                .icon-bad {
                    color: $vgray;
                }
            }
        }
    }
    .no-rating {
        font-size: 12px;
        color: rgb(147, 153, 159);
    }
}
</style>
