<template>
    <div class="shop-detail" @click.stop>
        <div class="detail-title clearfix">
            <span class="detail-title-text">购物车</span>
            <span class="clear-all" @click="openDeleteDialog">清空</span>
        </div>
        <div class="shop-detail-list" ref="detailList">
            <div>
                <ul v-if="selectFoods.length">
                    <li class="shop-detail-item clearfix" v-for="(food,index) in selectFoods">
                        <div class="name">{{food.name}}</div>

                        <div class="shop-detail-price">
                            <span class="yuan">￥</span>
                            <span class="new">{{food.price*food.count}}</span>
                        </div>
                        <div class="price-button">
                            <v-button :food="food"></v-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import VButton from "components/Button.vue";
import BScroll from "@better-scroll/core";
import { isAndroid } from "js/Android.js";

export default {
    name: "ShopDetail",
    props: {
        selectFoods: Array,
        isAllShow: Boolean
    },
    components: {
        VButton
    },
    methods: {
        openDeleteDialog() {
            this.$emit("confirm-show");
        },
        initScroll() {
            this.$nextTick(function() {
                if (!this.DetailList) {
                    this.DetailList = new BScroll(this.$refs.detailList, {
                        click: true
                    });
                } else {
                    this.DetailList.refresh();
                }
            });
        }
    },
    created() {
        if (isAndroid()) {
            this.AndroidPx = true;
        }
    },
    watch: {
        /* 每当操作引起DOM结构变化时，一定要调用better-scroll的refresh方法重新计算宽高，保证better-scroll的正确渲染*/
        isAllShow() {
            this.initScroll();
        },
        selectFoods() {
            this.initScroll();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~css/base.scss";

.shop-detail {
    background-color: rgb(255, 255, 255);
    .detail-title {
        display: flex;
        padding: 0 18px;
        background-color: $bggray;
        border-bottom: 1px solid $vborder;
        line-height: 40px;
        .detail-title-text {
            @include px2px(14);
            color: $vblack;
            text-align: left;
        }
        .clear-all {
            margin-left: auto;
            @include px2px(12);
            color: $vblue;
        }
    }

    /* 经典三列布局 */
    .shop-detail-list {
        max-height: 217px;
        width: 100%;
        overflow: hidden;
        padding: 0 18px;
        .shop-detail-item {
            display: flex;
            height: 48px;
            line-height: 48px;
            & > .name {
                text-align: left;
                color: $vblack;
                @include px2px(14);
            }
            // @include border-bottom-1px($vborder);
            border-bottom: 1px solid black;
            border-image: svg(1px-border param(--color $vborder)) 1 stretch;
            &:last-child {
                // @include border-none;
                border: none;
            }
            & > .shop-detail-price {
                flex: 1;
                text-align: right;
                font-size: 0;
                .yuan {
                    display: inline-block;
                    @include px2px(10);
                    font-weight: normal;
                    color: rgb(240, 20, 20);
                }
                .new {
                    @include px2px(14);
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                    margin-right: 12px;
                }
            }
            & > .price-button {
                flex: 0 0 84px;
                padding-top: 12px;
            }
        }
    }
}
</style>


