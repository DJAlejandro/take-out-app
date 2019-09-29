<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="nav-tab" ref="tab">
            <router-link class="tab-item" active-class="active" to="/">商品</router-link>
            <router-link class="tab-item" active-class="active" to="/grade">评价</router-link>
            <router-link class="tab-item" active-class="active" to="/seller">商家</router-link>
            <div class="nav-line" ref="line"></div>
        </div>
        <div class="container">
            <transition :name="transitionName">
                <keep-alive>
                    <router-view
                        :goods="goods"
                        :ratings="ratings"
                        :seller="seller"
                        @summary="summary"
                    ></router-view>
                </keep-alive>
            </transition>
        </div>

        <transition name="fade">
            <div class="blur-bg" v-show="isAllShow"></div>
        </transition>
        <div class="shop-cart-wrapper">
            <shop-cart
                :seller="seller"
                :selectFoods="selectFoods"
                :isAllShow="isAllShow"
                @toggle-show="toggleShow"
            ></shop-cart>
        </div>
    </div>
</template>


<script type="text/javascript">
import Header from "./views/Header.vue";
import ShopCart from "./views/ShopCart.vue";

import axios from "axios";

export default {
    components: {
        vHeader: Header,
        ShopCart
    },
    data() {
        return {
            seller: {},
            goods: [],
            ratings: [],
            transitionName: "slide-left",
            routerDepth: ["products", "grade", "seller"],
            selectFoods: [],
            isAllShow: false
        };
    },
    methods: {
        getInfo() {
            axios.get("api/index.json").then(res => {
                let data = res.data;
                this.seller = data.seller;
                this.ratings = data.ratings;
                this.goods = data.goods;
            });
        },

        load() {
            window.addEventListener("load", () => {
                this.$router.push("/");
            });
        },
        summary(selectFoods) {
            this.selectFoods = selectFoods;
        },
        toggleShow(flag) {
            if (flag) {
                this.isAllShow = false;
            } else {
                this.isAllShow = !this.isAllShow;
            }
        }
    },
    created() {
        this.getInfo();
        this.load();
    },
    watch: {
        $route(to, from) {
            let toDepth = to.path.split("/")[1];
            let fromDepth = from.path.split("/")[1];
            let toIndex = this.routerDepth.indexOf(toDepth);
            let fromIndex = this.routerDepth.indexOf(fromDepth);

            this.transitionName =
                toIndex < fromIndex ? "slide-right" : "slide-left";
            if (toIndex === 1) {
                this.$refs.line.style.transform = "translate3d(100%,0,0)";
            } else if (toIndex === 2) {
                this.$refs.line.style.transform = "translate3d(200%,0,0)";
            } else {
                this.$refs.line.style.transform = "translate3d(0,0,0)";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~css/iconfont.css";
@import "~css/mixin.scss";
@import "~css/base.scss";

/* 购物车遮罩层动画 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* 路由切换动画 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.3s ease;
}
.slide-left-enter,
.slide-left-leave-active,
.slide-right-enter,
.slide-left-leave-active {
    opacity: 0;
}
.slide-left-leave-active,
.slide-right-enter {
    transform: translate3d(-100%, 0, 0);
}
.slide-left-enter,
.slide-right-leave-active {
    transform: translate3d(100%, 0, 0);
}

.router-component {
    position: absolute;
    width: 100%;
    top: 178px;
    bottom: 48px;
}

.shop-cart-wrapper {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 3;
}
// @media (min-width: 820px) {
//     .shop-cart-wrapper {
//         width: 820PX;
//         margin-left: auto;
//         margin-right: auto;
//     }
// }
.nav-tab {
    display: flex;
    flex: 0 0 40px;
    position: relative;
    align-items: center;
    border-bottom: 1px solid $vborder;
    .nav-line {
        transition: all 0.3s ease;
        transform: translate3d(0, 0, 0);
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 33.33333333333%;
        height: 1px;
        background-color: rgb(240, 20, 20);
    }
    .tab-item {
        flex: 1;
        text-align: center;
        text-decoration: none;
        color: rgb(77, 85, 93);
        @include px2px(14);

        &.active {
            color: rgb(240, 20, 20);
        }
    }
}

.blur-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.6);
    filter: blur(10px);
    z-index: 1;
}

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.container {
    position: relative;
    flex: 1;
    overflow: hidden;
}
</style>
