<template>
    <div class="shop-detail" @click.stop>
        <div class="detail-title clearfix">
            <span class="detail-title-text">购物车</span>
            <span class="clear-all" @click="openDeleteDialog">清空</span>
        </div>
        <div class="shop-detail-list" ref="detailList">
            <div>
                <ul v-if="selectFoods.length">
                    <li
                        class="shop-detail-item border-horizontal-1px clearfix"
                        v-for="(food,index) in selectFoods"
                    >
                        <div class="name">{{food.name}}</div>
                        <div class="price-button">
                            <v-button :food="food"></v-button>
                        </div>
                        <div class="shop-detail-price">
                            <span class="yuan">￥</span>
                            <span class="new">{{food.price*food.count}}</span>
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
@import "~css/border.scss";

.shop-detail {
    background-color: rgb(255, 255, 255);
    .detail-title {
        padding: 0 18px;
        background-color: $bggray;
        border-bottom: 1px solid $vborder;
        line-height: 40px;
        .detail-title-text {
            float: left;
            font-size: 14px;
            color: $vblack;
            text-align: left;
        }
        .clear-all {
            float: right;
            font-size: 12px;
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
            height: 48px;
            line-height: 48px;
            & > .name {
                float: left; //1
                text-align: left;
                color: $vblack;
                font-size: 14px;
            }
            @include border-bottom-1px($vborder);
            &:last-child {
                @include border-none;
            }
            & > .shop-detail-price {
                overflow: hidden; //2 触发BFC
                text-align: right;
                font-size: 0;
                .yuan {
                    display: inline-block;
                    font-size: 10px;
                    font-weight: normal;
                    color: rgb(240, 20, 20);
                }
                .new {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                    margin-right: 12px;
                }
            }
            & > .price-button {
                float: right; //3
                width: 84px;
            }
        }
    }
}
</style>


