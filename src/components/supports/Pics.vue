<template>
    <span :class="picClass"></span>
</template>

<script>
export default {
    name: "Pics",
    props: {
        indexArr: String,
        index: Number
    },
    data() {
        return {
            type: ["decrease", "discount", "special", "invoice", "guarantee"]
        };
    },
    computed: {
        picClass() {
            return `type${this.indexArr} ${this.type[this.index]}`;
        }
    }
};
</script>
<style lang="scss">
@import "~css/mixin.scss";
@import "~css/base.scss";

.type1 {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("./decrease_1");
    }
    &.discount {
        @include bg-img("./discount_1");
    }
    &.guarantee {
        @include bg-img("./guarantee_1");
    }
    &.invoice {
        @include bg-img("./invoice_1");
    }
    &.special {
        @include bg-img("./special_1");
    }
}
.type2 {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("./decrease_2");
    }
    &.discount {
        @include bg-img("./discount_2");
    }
    &.guarantee {
        @include bg-img("./guarantee_2");
    }
    &.invoice {
        @include bg-img("./invoice_2");
    }
    &.special {
        @include bg-img("./special_2");
    }
}

.type3 {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("./decrease_3");
    }
    &.discount {
        @include bg-img("./discount_3");
    }
    &.guarantee {
        @include bg-img("./guarantee_3");
    }
    &.invoice {
        @include bg-img("./invoice_3");
    }
    &.special {
        @include bg-img("./special_3");
    }
}
.type4 {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    &.decrease {
        @include bg-img("./decrease_4");
    }
    &.discount {
        @include bg-img("./discount_4");
    }
    &.guarantee {
        @include bg-img("./guarantee_4");
    }
    &.invoice {
        @include bg-img("./invoice_4");
    }
    &.special {
        @include bg-img("./special_4");
    }
}
</style>
