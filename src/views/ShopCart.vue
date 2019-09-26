<template>
    <div>
        <div class="shop-cart clearfix">
            <div class="shop-cart-left">
                <div class="shop-calculate">
                    <div
                        class="calculate-content"
                        @click="toggleShow"
                        :class="{active:totalCount>0}"
                    >
                        <i class="iconfont icon-cart"></i>
                    </div>
                    <span class="count-all" v-show="totalCount>0">{{totalCount}}</span>
                </div>
                <span class="shop-price-all" :class="{active:totalCount>0}">￥{{totalPrice}}</span>
                <span class="delivery-price">另需配送费￥{{seller.deliveryPrice}}元</span>
            </div>
            <div class="shop-cart-right">
                <div
                    class="shop-cart-btn"
                    :class="{active:isActive}"
                    @click="openAlertDialog"
                >{{cartContent}}</div>
            </div>
            <transition name="move">
                <div class="detail-wrapper" v-show="isAllShow">
                    <shop-detail
                        :selectFoods="selectFoods"
                        :isAllShow="isAllShow"
                        @confirm-show="confirmShow"
                    ></shop-detail>
                </div>
            </transition>
        </div>

        <transition name="fade">
            <div class="dialog-bg" v-show="isConfirmShow || isAlertShow"></div>
        </transition>

        <transition name="bounce">
            <div class="dialog-confirm" v-if="isConfirmShow">
                <div class="dialog-confirm-title">清空购物车？</div>
                <div class="dialog-confirm-btns">
                    <div class="dialog-confirm-btns-item" @click="clearAll(false)">取消</div>
                    <div class="dialog-confirm-btns-item ok" @click="clearAll(true)">确定</div>
                </div>
            </div>
        </transition>
        <transition name="bounce">
            <div class="dialog-alert" v-if="isAlertShow">
                <h2 class="dialog-alert-title">支付</h2>
                <div class="dialog-alert-content">您需要支付{{totalPrice}}元</div>
                <div class="dialog-alert-btns" @click="closeAlertDialog">确定</div>
            </div>
        </transition>
    </div>
</template>

<script type="text/javascript">
import ShopDetail from "./pages/ShopDetail";

export default {
    name: "ShopCart",
    props: {
        seller: Object,
        selectFoods: Array,
        isAllShow: Boolean
    },
    data() {
        return {
            isActive: false,
            isAlertShow: false,
            isConfirmShow: false
        };
    },
    components: {
        ShopDetail
    },
    methods: {
        toggleShow() {
            if (this.totalCount > 0) {
                this.$emit("toggle-show");
            }
        },
        openAlertDialog() {
            if (this.isActive) {
                this.isAlertShow = true;
            }
        },
        alertShow() {
            this.isAlertShow = true;
        },
        confirmShow() {
            this.isConfirmShow = true;
        },
        clearAll(data) {
            if (data) {
                this.selectFoods.forEach(food => {
                    food.count = 0;
                });
            }
            this.isConfirmShow = false;
        },
        closeAlertDialog() {
            this.isAlertShow = false;
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach(food => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach(food => {
                count += food.count;
            });
            return count;
        },
        cartContent() {
            let diff = this.seller.minPrice - this.totalPrice;
            if (this.totalPrice === 0) {
                this.isActive = false;
                return `￥${this.seller.minPrice}元起送`;
            } else if (diff > 0) {
                this.isActive = false;
                return `还差￥${diff}元起送`;
            } else {
                this.isActive = true;
                return `结算`;
            }
        }
    },
    watch: {
        totalCount() {
            if (!this.totalCount) {
                this.$emit("toggle-show", true);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~css/mixin.scss";
@import "~css/base.scss";

/* 购物车详情页动画 */
.move-enter,
.move-leave-to {
    transform: translateY(
        0
    ) !important; //div的css优先级远大于动画中css属性的优先级,加上!important后，过渡才会生效
}
.move-enter-active,
.move-leave-active {
    transition: all 1s ease;
}
.shop-cart {
    background-color: #141d27;
    padding-left: 80px;
    text-align: left;
    font-size: 0;
    position: relative;
    display: flex;
    align-items: flex-start;
    .shop-cart-left {
        padding: 12px 0;
        flex: 1;
        font-size: 0;
        .shop-calculate {
            position: absolute;
            left: 12px;
            bottom: 2px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background-color: #141d27;
            .calculate-content {
                width: 44px;
                height: 44px;
                margin: 6px;
                background-color: #2b343c;
                border-radius: 50%;
                text-align: center;
                .iconfont {
                    line-height: 44px;
                    font-size: 24px;
                    color: #80858a;
                }
                &.active {
                    background-color: $vblue;
                    .iconfont {
                        color: rgb(255, 255, 255);
                    }
                }
            }
            .count-all {
                display: inline-block;
                position: absolute;
                top: 0;
                right: 0;
                width: 24px;
                line-height: 16px;
                @include px2px(9);
                font-weight: 700;
                color: rgb(255, 255, 255);
                border-radius: 16px;
                background-color: rgb(240, 20, 20);
                text-align: center;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
            }
        }
        .shop-price-all {
            display: inline-block;
            @include px2px(16);
            font-weight: 700;
            color: rgba(255, 255, 255, 0.4);
            line-height: 24px;
            padding-right: 12px;
            vertical-align: top;
            // @include border-right-1px(rgba(255, 255, 255, 0.1));
            border-right: 1px solid black;
            border-image: svg(1px-border param(--color #ffffff19)) 1 stretch;
            &.active {
                color: #fff;
            }
        }
        .delivery-price {
            display: inline-block;
            @include px2px(10);
            color: rgba(255, 255, 255, 0.4);
            line-height: 24px;
            margin-left: 12px;
            vertical-align: top;
        }
    }

    .shop-cart-right {
        flex: 0 0 105px;

        .shop-cart-btn {
            width: 105px;
            line-height: 48px;
            background-color: #2b343c;
            text-align: center;
            @include px2px(12);
            color: rgba(255, 255, 255, 0.4);
            font-weight: 700;
            &.active {
                background-color: #00b43c;
                color: rgb(255, 255, 255);
            }
        }
    }
}

.detail-wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transform: translateY(-100%); //div的css优先级远大于动画中css属性的优先级
}

.bounce-enter-active,
.bounce-leave-active {
    transition: all 0.3s ease;
}
.bounce-enter,
.bounce-leave-to {
    opacity: 0;
}
.bounce-enter-active {
    animation: bounce-in 0.3s;
}
.bounce-leave-active {
    animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
.dialog-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.6);
    filter: blur(10px);
    z-index: 4;
}
.dialog-confirm {
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -135px;
    margin-top: -50px;
    width: 270px;
    text-align: center;
    background-color: #fff;
    z-index: 5;
    .dialog-confirm-title {
        color: #666;
        @include px2px(14);
        line-height: 22px;
        margin: 16px 0;
    }
    .dialog-confirm-btns {
        font-size: 0;
        // @include border-top-1px($vborder);
        border-top: 1px solid black;
        border-image: svg(1px-border param(--color $vborder)) 1 stretch;
        .dialog-confirm-btns-item {
            display: inline-block;
            width: 50%;
            color: #999;
            @include px2px(16);
            line-height: 1;
            padding: 17px 10px;
            &.ok {
                color: #fc9153;
                // @include border-left-1px($vborder);
                border-left: 1px solid black;
                border-image: svg(1px-border param(--color $vborder)) 1 stretch;
            }
        }
    }
}

.dialog-alert {
    text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -75px;
    margin-left: -135px;
    z-index: 8;
    width: 270px;
    background-color: #fff;
    .dialog-alert-title {
        margin: 30px 16px 16px 16px;
        color: #333;
        @include px2px(16);
        line-height: 1;
    }
    .dialog-alert-content {
        color: #666;
        @include px2px(14);
        line-height: 22px;
        margin: 12px 16px 16px 16px;
    }
    .dialog-alert-btns {
        @include px2px(16);
        line-height: 1;
        padding: 17px 0;
        color: #fc9153;
        // @include border-top-1px($vborder);
        border-top: 1px solid black;
        border-image: svg(1px-border param(--color $vborder)) 1 stretch;
    }
}
</style>
