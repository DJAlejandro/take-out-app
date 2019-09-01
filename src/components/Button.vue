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
/* 此组件为操作数据的最小和核心单位，因为组件之间的相互独立的，所以在初始化goods的时候，不要通过遍历的方式在其中添加count属性，而是通过组件独立的特性来判断传入的food是否有count属性，然后在此组件中初始化count属性。并且所有组件的数据的更新都靠此组件count的数据变化来驱动 */
export default {
    props: {
        food: Object
    },
    methods: {
        plus(event) {
            if (!this.food.count) {
                // this.food.count = 1; 引用类型的属性赋值操作不会触发视图的更新，使用$set
                this.$set(this.food, "count", 1);
            } else {
                this.food.count++;
            }
        },
        minus(event) {
            if (this.food.count > 0) {
                this.food.count--;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
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
