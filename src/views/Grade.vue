<template>
    <div class="evaluate" ref="evaluate">
        <div>
            <div class="evaluate-header">
                <div class="evaluate-rank-rate border-vertical-1px">
                    <h2 class="rank-rate-score">{{seller.score}}</h2>
                    <p class="rank-rate-text">综合评分</p>
                    <p class="rank-rate-desc">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="evaluate-score">
                    <div class="evaluate-score-item">
                        <div class="evaluate-score-title">商品评分</div>
                        <div class="star-wrapper">
                            <v-star size="36" :score="seller.foodScore"></v-star>
                        </div>
                        <div class="evaluate-score-content">{{seller.foodScore}}</div>
                    </div>
                    <div class="evaluate-score-item">
                        <div class="evaluate-score-title">服务态度</div>
                        <div class="star-wrapper">
                            <v-star size="36" :score="seller.serviceScore"></v-star>
                        </div>
                        <div class="evaluate-score-content">{{seller.serviceScore}}</div>
                    </div>
                    <div class="evaluate-score-item">
                        <div class="evaluate-score-title">送货时间</div>
                        <div class="evaluate-score-delivery">{{seller.deliveryTime}}分钟</div>
                    </div>
                </div>
            </div>
            <div class="section-block"></div>
            <v-rating
                :ratings="ratings"
                :isActive="isActive"
                :hideEmpty="hideEmpty"
                :desc="desc"
                @empty-comment="toggleEmptyComment"
                @change-ratings="changeRatings"
            ></v-rating>
            <div class="evaluate-list">
                <ul>
                    <template v-for="item in ratings">
                        <li
                            class="evaluate-list-item border-horizontal-1px"
                            v-show="showItem(item)"
                        >
                            <div class="evaluate-list-img">
                                <img :src="item.avatar" />
                            </div>
                            <div class="evaluate-list-content">
                                <div class="evaluate-list-title">
                                    <div class="evaluate-rateTime">{{item.rateTime | formatDate}}</div>
                                    <div class="username">{{item.username}}</div>
                                </div>
                                <div class="evaluate-list-desc">
                                    <div class="star-wrapper2" v-if="item.score">
                                        <v-star size="24" :score="item.score"></v-star>
                                    </div>
                                    <div
                                        class="evaluate-deliveryTime"
                                        v-if="item.deliveryTime"
                                    >{{item.deliveryTime}}分钟送达</div>
                                </div>
                                <div
                                    class="evaluate-list-text"
                                    v-show="item.text.length"
                                >{{item.text}}</div>
                                <div class="evaluate-list-recommend" v-if="item.recommend.length">
                                    <div class="evaluate-recommend-left">
                                        <i
                                            class="iconfont"
                                            :class="{'icon-good':item.rateType===0,'icon-bad':item.rateType===1}"
                                        ></i>
                                    </div>
                                    <div
                                        class="evaluate-recommend-right"
                                        v-for="item in item.recommend"
                                    >{{item}}</div>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import VStar from "components/star/Star.vue";
import BScroll from "@better-scroll/core";
import VRating from "components/Rating.vue";
import { format } from "date-fns";

const ALL = 2;
const POSITIVE = 0;
const NEGATIVE = 1;
export default {
    name: "Grade",
    props: {
        seller: Object,
        ratings: Array
    },
    components: {
        VRating,
        VStar
    },
    data() {
        return {
            desc: {
                all: "全部",
                positive: "推荐",
                negative: "不推荐"
            },

            hideEmpty: false,
            isActive: ALL
        };
    },
    methods: {
        /* 每当操作引起DOM结构变化时，一定要调用better-scroll的refresh方法重新计算宽高，保证better-scroll的正确渲染*/
        refresh() {
            this.$nextTick(function() {
                this.evaluate.refresh();
            });
        },
        changeRatings(isActive) {
            this.isActive = isActive;
            this.refresh();
        },
        toggleEmptyComment() {
            this.hideEmpty = !this.hideEmpty;
            this.refresh();
        },
        showItem(item) {
            if (this.hideEmpty) {
                if (item.text.length === 0) {
                    return false;
                }
            }
            if (this.isActive === ALL) {
                return true;
            } else {
                return item.rateType === this.isActive;
            }
            this.refresh();
        }
    },
    filters: {
        formatDate(time) {
            return format(time, "yyyy-MM-dd HH:mm:ss");
        }
    },
    mounted() {
        this.$nextTick(function() {
            if (!this.evaluate) {
                this.evaluate = new BScroll(this.$refs.evaluate, {
                    click: true
                });
            } else {
                this.evaluate.refresh();
            }
        });
    }
};
</script>

<style lang="scss" scoped>
@import "~css/mixin.scss";
@import "~css/base.scss";
@import "~css/border.scss";

.evaluate {
    position: absolute;
    width: 100%;
    top: 189px;
    bottom: 48px;
    overflow: hidden;
    .evaluate-header {
        padding: 18px 0;
        .evaluate-rank-rate {
            float: left;
            width: 137px;
            text-align: center;
            @include border-right-1px($vborder);
            @media only screen and (max-width: 320px) {
                width: 115px;
            }
            .rank-rate-score {
                font-size: 24px;
                line-height: 28px;
                color: rgb(255, 153, 0);
            }
            .rank-rate-text {
                margin-top: 6px;
                margin-bottom: 8px;
                font-size: 12px;
                line-height: 12px;
                color: $vblack;
            }
            .rank-rate-desc {
                margin-bottom: 6px;
                font-size: 10px;
                line-height: 10px;
                color: $vgray;
            }
        }
        .evaluate-score {
            padding: 0 24px;
            margin-left: 137px;
            @media only screen and (max-width: 360px) {
                padding: 0 8px;
                margin-left: 115px;
            }
            .evaluate-score-item {
                margin-bottom: 8px;
                text-align: left;
                font-size: 0;
                &:last-child {
                    margin-bottom: 0;
                }
                .evaluate-score-title,
                .star-wrapper,
                .evaluate-score-content,
                .evaluate-score-delivery {
                    display: inline-block;
                    vertical-align: top;
                }
                .evaluate-score-title {
                    font-size: 12px;
                    line-height: 18px;
                    color: $vblack;
                }
                .star-wrapper {
                    height: 18px;
                    margin: 0 12px;
                }
                .evaluate-score-content {
                    font-size: 12px;
                    line-height: 18px;
                    color: rgb(255, 153, 0);
                }
                .evaluate-score-delivery {
                    font-size: 12px;
                    line-height: 18px;
                    color: $vgray;
                    margin-left: 12px;
                }
            }
        }
    }
    .evaluate-list {
        .evaluate-list-item {
            padding: 18px 0;
            margin: 0 18px;
            @include border-bottom-1px($vborder);
            &:last-child {
                @include border-none;
            }
        }
        .evaluate-list-img {
            width: 28px;
            float: left;
            img {
                width: 28px;
                height: 28px;
                border-radius: 50%;
            }
        }
        .evaluate-list-content {
            margin-left: 40px;
            text-align: left;
            .evaluate-list-title {
                .username {
                    font-size: 10px;
                    line-height: 12px;
                    color: $vblack;
                }

                .evaluate-rateTime {
                    float: right;
                    font-size: 10px;
                    line-height: 12px;
                    color: $vgray;
                }
            }
            .evaluate-list-desc {
                margin-top: 4px;
                font-size: 0;
                .star-wrapper2 {
                    display: inline-block;
                    height: 12px;
                }
                .evaluate-deliveryTime {
                    margin-left: 6px;
                    display: inline-block;
                    font-size: 10px;
                    line-height: 12px;
                    color: $vgray;
                }
            }
            .evaluate-list-text {
                margin-top: 6px;
                font-size: 12px;
                line-height: 18px;
                color: $vblack;
            }
            .evaluate-list-recommend {
                margin-top: 8px;
                font-size: 0;
                .evaluate-recommend-left {
                    display: inline-block;
                    margin: 0 8px 4px 0;
                    vertical-align: top;

                    .iconfont {
                        font-size: 12px;
                        line-height: 16px;
                    }
                    .icon-good {
                        color: $vblue;
                    }
                    .icon-bad {
                        color: $vgray;
                    }
                }
                .evaluate-recommend-right {
                    display: inline-block;
                    margin-right: 8px;
                    margin-bottom: 8px;
                    padding: 0 6px;
                    max-width: 62px;
                    line-height: 16px;
                    font-size: 9px;
                    color: $vgray;
                    border: 1px solid $vborder;
                    border-radius: 1px;
                    @include ellipsis;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
}
</style>
