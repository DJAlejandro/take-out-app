<template>
    <div class="products clearfix">
        <div class="menu-list" ref="menu">
            <ul>
                <li
                    class="menu-list-item"
                    v-for="(item,index) in goods"
                    :class="{active:activeIndex===index}"
                    @click="changMenu(index)"
                    :key="index"
                >
                    <div class="menu-list-text border-1px">
                        <v-pics
                            v-if="item.type>0"
                            class="menu-list-brand"
                            :index="item.type"
                            indexArr="3"
                        ></v-pics>
                        {{item.name}}
                        <div class="cal-count" v-show="item.calCount">
                            <span class="cal-count-text">{{item.calCount}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="products-list" ref="wrapper">
            <ul>
                <li v-for="(good,index) in goods" class="products-list-item" :key="index">
                    <div class="products-title" :class="{android:AndroidPx}">{{good.name}}</div>
                    <div class="products-content">
                        <ul>
                            <li
                                class="products-content-item border-1px"
                                v-for="(food,index) in good.foods"
                                :key="index"
                            >
                                <div class="products-content-img">
                                    <img :src="food.icon" />
                                </div>
                                <div class="products-content-box" @click="ProductDetailOpen(food)">
                                    <div class="products-content-name">{{food.name}}</div>
                                    <div v-if="food.description" class="products-desc">
                                        <span class="products-text">{{food.description}}</span>
                                    </div>
                                    <div class="products-desc">
                                        <span class="products-text">月售{{food.sellCount}}份</span>
                                        <span class="products-rating">好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="products-price-box">
                                        <span class="new-price">
                                            <span class="yuan">￥</span>
                                            <span>{{food.price}}</span>
                                        </span>
                                        <span
                                            v-if="food.oldPrice"
                                            class="old-price"
                                        >￥{{food.oldPrice}}</span>
                                        <span class="price-button">
                                            <v-button :food="food"></v-button>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <transition name="slide-fade">
            <product-detail
                :food="food"
                @detail-close="ProductDetailClose"
                v-show="isProductDetail"
                :isProductDetail="isProductDetail"
            ></product-detail>
        </transition>
    </div>
</template>


<script type="text/javascript">
import BScroll from "@better-scroll/core";
import VButton from "components/Button.vue";
import ProductDetail from "./pages/ProductDetail.vue";
import VPics from "components/supports/Pics.vue";
import { isAndroid } from "js/Android.js";

export default {
    props: {
        goods: Array
    },
    components: {
        VButton,
        ProductDetail,
        VPics
    },
    data() {
        return {
            activeIndex: 0,
            computedHeightArr: [],
            isProductDetail: false,
            food: {},
            AndroidPx: false
        };
    },
    methods: {
        /* -------- 左右联动效果 -------- */
        changMenu(index) {
            console.log(index);

            this.activeIndex = index;
            let element = document.getElementsByClassName("products-list-item")[
                index
            ];
            this.scrollRight.scrollToElement(element, 200); // better-scroll插件方法
        },
        computedHeight() {
            let element = document.getElementsByClassName("products-list-item");
            let initHeight = 0;
            let arr = [];
            for (let i = 0; i < element.length; i++) {
                initHeight += element[i].clientHeight; //clientHeight获得元素高度
                arr.push(initHeight);
            }
            this.computedHeightArr = arr;
        },
        changeIndex(scrollTop) {
            for (var i = 0; i <= this.computedHeightArr.length - 1; i++) {
                if (scrollTop < this.computedHeightArr[0]) {
                    this.activeIndex = 0;
                } else if (
                    scrollTop >
                    this.computedHeightArr[this.computedHeightArr.length - 1]
                ) {
                    this.activeIndex = this.computedHeightArr.length - 1;
                } else if (
                    this.computedHeightArr[i] < scrollTop &&
                    this.computedHeightArr[i + 1] > scrollTop
                ) {
                    this.activeIndex = i + 1;
                }
            }
        },

        initScroll() {
            if (!this.scrollLeft) {
                this.scrollLeft = new BScroll(this.$refs.menu, {
                    click: true
                });
            } else {
                this.scrollLeft.refresh();
            }
            if (!this.scrollRight) {
                this.scrollRight = new BScroll(this.$refs.wrapper, {
                    click: true,
                    probeType: 3
                });
                // probeType:如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
                this.scrollRight.on("scroll", pos => {
                    console.log(11111111);

                    let scrollTop = 0;
                    scrollTop = Math.abs(Math.round(pos.y));
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(() => {
                        this.changeIndex(scrollTop);
                    }, 16);
                });
            } else {
                this.scrollRight.refresh();
            }
        },
        /* -------- 左右联动效果 -------- */

        ProductDetailOpen(data) {
            this.isProductDetail = true;
            this.food = data;
        },
        ProductDetailClose() {
            this.isProductDetail = false;
        }
    },
    computed: {
        /* 利用computed特性，和VButton组件组成数据驱动的核心 */
        selectFoods() {
            let foods = [];
            this.goods.forEach(good => {
                good.foods.forEach(food => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    created() {
        if (isAndroid()) {
            this.AndroidPx = true;
        }
    },
    watch: {
        goods() {
            this.$nextTick(function() {
                this.computedHeight();
                this.initScroll();
            });
        },

        /* 利用computed特性，和VButton组件组成数据驱动的核心 */
        selectFoods() {
            this.$emit("summary", this.selectFoods);
        }
    }
};
</script>




<style lang="scss" scoped>
@import "~css/base.scss";
@import "~css/border.scss";

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-active {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
}

.products {
    position: absolute;
    width: 100%;
    top: 189px;
    bottom: 48px;
    overflow: hidden;
    .menu-list {
        width: 80px;
        float: left;
        height: 100%;

        /* 多列垂直居中 display: table */
        .menu-list-item {
            display: table;
            width: 100%;
            height: 54px;
            padding: 0 12px;
            background-color: $bggray;
            &.active {
                background-color: #fff;
                font-weight: 700;
            }
            &:first-child,
            &.active,
            &.active + .menu-list-item {
                .menu-list-text {
                    @include border-none;
                }
            }

            /* 多列居中 display: table-cell  vertical-align: middle*/
            .menu-list-text {
                position: relative;
                display: table-cell;
                width: 56px;
                line-height: 14px;
                font-size: 12px;
                color: rgb(20, 20, 20);
                vertical-align: middle;
                text-align: center;
                @include border-top-1px($vborder);
                .menu-list-brand {
                    vertical-align: top;
                }
            }
            .cal-count {
                display: table;
                position: absolute;
                top: 3px;
                right: -8px;
                .cal-count-text {
                    display: table-cell;
                    padding: 0 5px;
                    min-width: 16px;
                    height: 16px;
                    line-height: 16px;
                    font-size: 10px;
                    font-weight: 700;
                    color: rgb(255, 255, 255);
                    border-radius: 50%;
                    background: linear-gradient(90deg, #fc9153, #f01414);
                    text-align: center;
                    vertical-align: middle;
                }
            }
        }
    }
    .products-list {
        margin-left: 80px;
        height: 100%;
        .products-title {
            border-left: 2px solid #d9dde1;
            background-color: $bggray;
            padding-left: 14px;
            text-align: left;
            font-size: 12px;
            line-height: 26px;
            height: 26px;
            color: $vgray;
        }

        .products-content {
            .products-content-item {
                padding: 18px 0;
                margin: 0 18px;
                & + .products-content-item {
                    @include border-top-1px($vborder);
                }
            }
            .products-content-img {
                width: 57px;
                height: 57px;
                float: left;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .products-content-box {
                margin-left: 67px;
                text-align: left;
                .products-content-name {
                    margin-top: 2px;
                    font-size: 14px;
                    line-height: 14px;
                    height: 14px;
                    color: $vblack;
                }
                .products-desc {
                    margin-top: 8px;
                    font-size: 0;
                    .products-text,
                    .products-rating {
                        display: inline-block;
                        font-size: 10px;
                        line-height: 10px;
                        color: $vgray;
                    }
                    .products-rating {
                        margin-left: 12px;
                    }
                }

                .products-price-box {
                    font-size: 0;
                    width: 100%;
                    .new-price,
                    .old-price {
                        display: inline-block;
                        font-size: 0;
                        line-height: 24px;
                    }

                    .new-price {
                        & > span {
                            display: inline-block;
                            font-size: 14px;
                            font-weight: 700;
                            color: rgb(240, 20, 20);
                            vertical-align: bottom;
                        }
                        & > .yuan {
                            font-size: 10px;
                            font-weight: normal;
                        }
                    }

                    .old-price {
                        margin-left: 8px;
                        font-size: 10px;
                        font-weight: 700;
                        color: $vgray;
                        vertical-align: top;
                        text-decoration: line-through;
                    }
                    .price-button {
                        float: right;
                    }
                }
            }
        }
    }
}
</style>
