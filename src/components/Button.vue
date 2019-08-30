<template>
    <div class="price-btn-group">
        <transition name="slide-fade">
            <span class="price-btn" v-show="food.count>0">
                <i class="iconfont icon-minus" @click.stop="minus"></i>
            </span>
        </transition>
        <transition name="slide-fade">
            <span class="price-btn-text" v-show="food.count>0">{{food.count}}</span>
        </transition>
        <span class="price-btn">
            <i class="iconfont icon-add" @click.stop="plus"></i>
        </span>
    </div>
</template>

<script>
export default {
    props: ["food"],
    methods: {
        plus(event) {
            let count = this.food.count + 1;
            this.$set(this.food, "count", count);
            // this.food["count"] = count;
            this.$emit("summary");
        },
        minus(event) {
            if (this.food.count > 0) {
                let count = this.food.count - 1;
                this.$set(this.food, "count", count);

                // this.food["count"] = count;
                this.$emit("summary");
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~css/mixin.scss";
@import "~css/base.scss";

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
    .icon-minus {
        transition: all 0.3s ease;
    }
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translate3d(100%, 0, 0);
    opacity: 0;
    .icon-minus {
        transform: rotate(180deg);
    }
}
.price-btn-group {
    font-size: 0;
    .price-btn,
    .price-btn-text {
        display: inline-block;
        line-height: 24px;
        height: 24px;
        text-align: center;
        vertical-align: middle;
    }
    .price-btn-text {
        width: 24px;
        font-size: 10px;
        line-height: 24px;

        color: $vgray;
    }
    .price-btn {
        width: 24px;
        font-size: 24px;
    }
    .iconfont {
        display: inline-block;
        color: $vblue;
    }
}
</style>
