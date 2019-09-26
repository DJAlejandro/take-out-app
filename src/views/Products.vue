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
                    <div class="menu-list-text">
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
                                class="products-content-item"
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
    name: "Product",
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
            AndroidPx: false,
            scrollY: 0
        };
    },
    methods: {
        /* -------- 左右联动效果 -------- */
        changMenu(index) {
            this.activeIndex = index;
            let element = document.getElementsByClassName("products-list-item")[
                index
            ];
            this.scrollRight.scrollToElement(element); // better-scroll插件方法
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
        changeIndex() {
            for (var i = 0; i <= this.computedHeightArr.length - 1; i++) {
                if (this.scrollY < this.computedHeightArr[0]) {
                    this.activeIndex = 0;
                } else if (
                    this.scrollY >
                    this.computedHeightArr[this.computedHeightArr.length - 1]
                ) {
                    this.activeIndex = this.computedHeightArr.length - 1;
                } else if (
                    this.computedHeightArr[i] < this.scrollY &&
                    this.computedHeightArr[i + 1] > this.scrollY
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
                    this.scrollY = Math.abs(Math.round(pos.y));
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(() => {
                        this.changeIndex();
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
        },
        initCount() {
            this.goods.forEach(good => {
                let count = 0;
                good.foods.forEach(food => {
                    if (food.count) {
                        count = count + food.count;
                    }
                });
                if (!good.calCount) {
                    this.$set(good, "calCount", count);
                } else {
                    good.calCount = count;
                }
            });
        }
    },
    computed: {
        /* 利用computed特性，根据count属性的变化响应式更新选择列表selectFoods。将该数据作为动态属性传递给ShopCart组件 */
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
            this.initCount();
            this.$emit("summary", this.selectFoods);
        }
    }
};
</script>




<style lang="scss" scoped>
@import "~css/base.scss";

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
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
    .menu-list {
        flex: 0 0 80px;
        height: 100%;
        background-color: $bggray;

        /* 多列垂直居中 display: table */
        .menu-list-item {
            // @include border-top-1px($vborder);
            border-top: 1px solid black;
            border-image: svg(1px-border param(--color $vborder)) 1 stretch;

            // display: table;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 54px;
            &.active {
                background-color: #fff;
                font-weight: 700;
            }
            &:first-child,
            &.active,
            &.active + .menu-list-item {
                // @include border-none;
                border-top: none;
            }

            /* 多列居中 display: table-cell  vertical-align: middle*/
            .menu-list-text {
                position: relative;
                // display: table-cell;
                // vertical-align: middle;
                text-align: center;
                width: 56px;
                @include px2px(12);
                color: rgb(20, 20, 20);
                .menu-list-brand {
                    vertical-align: top;
                }
            }
            .cal-count {
                position: absolute;
                top: -8px;
                right: -8px;
                .cal-count-text {
                    padding: 0 4px;
                    min-width: 16px;
                    height: 16px;
                    line-height: 16px;
                    @include px2px(10);
                    font-weight: 700;
                    color: rgb(255, 255, 255);
                    border-radius: 50%;
                    background: linear-gradient(90deg, #fc9153, #f01414);
                    text-align: center;
                }
            }
        }
    }
    .products-list {
        flex: 1;
        height: 100%;
        .products-title {
            border-left: 2px solid #d9dde1;
            background-color: $bggray;
            padding-left: 14px;
            text-align: left;
            @include px2px(12);
            line-height: 26px;
            height: 26px;
            color: $vgray;
        }

        .products-content {
            .products-content-item {
                display: flex;
                padding: 18px 0;
                margin: 0 18px;
                & + .products-content-item {
                    // @include border-top-1px($vborder);
                    border-top: 1px solid black;
                    border-image: svg(1px-border param(--color $vborder)) 1
                        stretch;
                }
            }
            .products-content-img {
                flex: 0 0 57px;
                height: 57px;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .products-content-box {
                flex: 1;
                text-align: left;
                .products-content-name {
                    margin-top: 2px;
                    @include px2px(14);
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
                        @include px2px(10);
                        line-height: 10px;
                        color: $vgray;
                    }
                    .products-rating {
                        margin-left: 12px;
                    }
                }

                .products-price-box {
                    display: flex;
                    align-items: flex-start;
                    .new-price,
                    .old-price {
                        font-size: 0;
                        line-height: 24px;
                    }

                    .new-price {
                        & > span {
                            display: inline-block;
                            @include px2px(14);
                            font-weight: 700;
                            color: rgb(240, 20, 20);
                        }
                        & > .yuan {
                            @include px2px(10);
                            font-weight: normal;
                        }
                    }

                    .old-price {
                        margin-left: 8px;
                        @include px2px(10);
                        font-weight: 700;
                        color: $vgray;
                        text-decoration: line-through;
                    }
                    .price-button {
                        margin-left: auto;
                    }
                }
            }
        }
    }
}
</style>
