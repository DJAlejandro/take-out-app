<template>
    <div class="ratings" v-show="ratings">
        <div class="ratings-header">
            <div class="ratings-all" @click="changeRatings(ALL)" :class="{active:isActive===ALL}">
                <span class="text">{{desc.all}}</span>
                <span class="num" v-if="ratings">{{ratings.length}}</span>
            </div>
            <div
                class="ratings-positive"
                @click="changeRatings(POSITIVE)"
                :class="{active:isActive===POSITIVE}"
            >
                <span class="text">{{desc.positive}}</span>
                <span class="num" v-if="ratings">{{positives.length}}</span>
            </div>
            <div
                class="ratings-negative"
                @click="changeRatings(NEGATIVE)"
                :class="{active:isActive===NEGATIVE}"
            >
                <span class="text">{{desc.negative}}</span>
                <span class="num" v-if="ratings">{{negatives.length}}</span>
            </div>
        </div>
        <div class="ratings-filter" @click="toggleEmptyComment">
            <i class="iconfont icon-right1" :class="{active:hideEmpty}"></i>
            只查看有评价的内容
        </div>
    </div>
</template>

<script type="text/javascript">
const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
    name: "Rating",
    props: {
        isActive: Number,
        hideEmpty: Boolean,
        desc: Object,
        ratings: Array
    },
    data() {
        return {
            ALL,
            POSITIVE,
            NEGATIVE
        };
    },
    methods: {
        changeRatings(isActive) {
            this.$emit("change-ratings", isActive);
        },
        toggleEmptyComment() {
            this.$emit("empty-comment");
        }
    },
    computed: {
        /* 将非业务组件的逻辑都集中到子组件内部 */
        positives() {
            return this.ratings.filter(rating => {
                return rating.rateType === POSITIVE;
            });
        },
        negatives() {
            return this.ratings.filter(rating => {
                return rating.rateType === NEGATIVE;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~css/base.scss";

.ratings {
    text-align: left;
    .ratings-header {
        padding: 18px 0;
        margin: 0 18px;
        font-size: 0;
        // @include border-bottom-1px(rgba(7, 17, 27, 0.1));
        border-bottom: 1px solid black;
        border-image: svg(1px-border param(--color #07111b19)) 1 stretch;
        &:last-child {
            border-bottom: none;
        }
        .ratings-all,
        .ratings-positive,
        .ratings-negative {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 2px;
            margin-right: 8px;
            .text {
                @include px2px(12);
            }
            .num {
                @include px2px(8);
                margin-left: 2px;
            }
            .num,
            .text {
                color: rgb(77, 85, 93);
                line-height: 16px;
            }
            &.active {
                .num,
                .text {
                    color: #fff;
                }
            }
        }
        .ratings-all,
        .ratings-positive {
            background-color: rgba(0, 160, 220, 0.2);
            &.active {
                background-color: $vblue;
            }
        }
        .ratings-negative {
            background-color: rgba(77, 85, 93, 0.2);
            &.active {
                background-color: rgb(77, 85, 93);
            }
        }
    }
    .ratings-filter {
        padding: 12px 18px;
        line-height: 24px;
        @include px2px(12);
        color: $vgray;
        border-bottom: 1px solid $vborder;
        vertical-align: top;
        .icon-right1 {
            display: inline-block;
            @include px2px(24);
            line-height: 24px;
            color: $vgray;
            vertical-align: top;
            margin-right: 4px;
            &.active {
                color: #00c850;
            }
        }
    }
}
</style>
