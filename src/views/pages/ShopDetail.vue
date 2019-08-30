<template>
    <div class="shop-detail" @click.stop>
        <div class="detail-title clearfix">
            <span class="detail-title-text">购物车</span>
            <span class="clear-all" @click="openDeleteDialog">清空</span>
        </div>
        <div class="shop-detail-list" ref="detailList">
            <ul>
                <template v-for="good in goods">
                    <li
                        class="shop-detail-item border-1px clearfix"
                        v-for="(food,index) in good.foods"
                        v-if="food.count"
                    >
                        <div class="name">{{food.name}}</div>
                        <div class="price-button">
                            <price-button :food="food" @summary="summary"></price-button>
                        </div>
                        <div class="shop-detail-price">
                            <span class="yuan">￥</span>
                            <span class="new">{{food.price*food.count}}</span>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
import PriceButton from "components/Button.vue";
import BScroll from "@better-scroll/core";
import { isAndroid } from "js/Android.js";

export default {
    props: ["goods"],
    components: {
        PriceButton
    },
    methods: {
        summary() {
            let temp = this.goods;
            let count = 0;
            let price = 0;
            for (let i = 0; i < temp.length; i++) {
                let item = temp[i].foods;
                let calCount = 0;
                for (let j = 0; j < item.length; j++) {
                    calCount = calCount + item[j]["count"];
                    count = item[j]["count"] + count;
                    price = item[j]["count"] * item[j]["price"] + price;
                }
                this.goods[i]["calCount"] = calCount;
            }

            this.$store.commit("summary", { count, price });

            if (!count) {
                this.$store.commit("toggleShow", false);
            }
            this.$nextTick(function() {
                this.DetailList.refresh(); //!!!!!!!!!!!
            });
        },
        openDeleteDialog() {
            this.$emit("confirm-show");
        },
        initScroll() {
            if (this.isShow) {
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
        }
    },
    created() {
        if (isAndroid()) {
            this.AndroidPx = true;
        }
    },
    computed: {
        isShow() {
            return this.$store.state.isShow;
        }
    },
    watch: {
        isShow() {
            this.initScroll();
        },
        goods() {
            this.initScroll();
        }
    },
    mounted() {
        this.initScroll();
    }
};
</script>

<style lang="scss" scoped>
@import "~css/mixin.scss";
@import "~css/base.scss";

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


