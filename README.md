## Vue.set( target, key, value )

为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新。

Vue 无法检测到对象属性的添加或删除,但是属性的更改不受影响,能够触发视图更新

```
// VButton.vue
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
                this.food.count++; // 属性的更改不受影响,能够触发视图更新

            }
        },
        minus(event) {
            if (this.food.count > 0) {
                this.food.count--;
            }
        }
    }
};
```


## better-scroll

1. 一定要确保在得到数据且DOM渲染完成的情况下初始化better-scroll

2. better-scroll初始化的几个时机 mounted、mounted(nextTick)、 watch watch(nextTick)、 带条件的watch 、带条件的watch(nextTick)

3. 当一个组件内使用了better-scroll时，每当操作引起该组件DOM的结构变化时，一定要调用better-scroll的refresh方法重新计算宽高，保证better-scroll的正确渲染

```
//ProductDetail.vue
export default {
    ...
    methods: {
        refresh() {
            this.$nextTick(function() {
                this.productDetail.refresh();
            });
        },

        /* 当一个组件内使用了better-scroll时，每当操作引起该组件DOM的结构变化时，一定要调用better-scroll的refresh方法重新计算宽高，保证better-scroll的正确渲染*/
        changeRatings(isActive) {
            this.isActive = isActive;
            this.refresh();
        },
        toggleEmptyComment() {
            this.hideEmpty = !this.hideEmpty;
            this.refresh();
        },
        showItem(item) {
            if (this.hideEmpty && item.text.length == 0) {
                return false;
            }
            if (this.isActive === ALL) {
                return true;
            } else {
                return item.rateType === this.isActive;
            }
            this.refresh();
        },
        _initScroll() {
            this.$nextTick(function() {
                if (!this.productDetail) {
                    this.productDetail = new BScroll(this.$refs.detail, {
                        click: true
                    });
                } else {
                    this.productDetail.refresh();
                }
            });
        }
    },
    watch: {
        isProductDetail() {
            if (this.isProductDetail) {
                /* 一定要确保在得到数据且DOM渲染完成的情况下初始化better-scroll */
                this._initScroll();
            }
        }
    }
};
```


## 日期格式化

> 过滤器可以在两种场景中使用：双花括号插值(mustache interpolation)和 v-bind 表达式


```
<!-- in mustaches -->
{{ message | capitalize }}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```


```
//ProductDetail.vue

<template>
  <div class="time">{{ item.rateTime | formatDate}}</div>
</template>


<script type="text/javascript">

import moment from "moment";
export default {
    ...
    methods: {
    ...
    /* moment.js + 过滤器 */
    filters: {
        formatDate(time) {
            return moment(time).format("YYYY-MM-DD HH:mm:ss");
        }
    }
    ...
};
</script>
```




- [Moment.js](http://momentjs.cn/)
- [moment.js的方法总结](https://www.jianshu.com/p/e5b7c0606a3f)
- [VUE 过滤器](https://vue.docschina.org/v2/guide/filters.html)


## 数据驱动


Product组件内频繁的对goods对象进行操作，有别于传统开发模式，在VUE中更关注数据的操作。

首先，Button组件为操作数据的最小和核心单位，因为组件之间的相互独立的，所以在初始化goods的时候，不要通过遍历的方式在其中添加count属性，而是通过组件独立的特性来判断传入的food是否有count属性，然后Button此组件中初始化count属性。并且所有组件的数据的更新都靠此组件count的数据变化来驱动


其次，利用computed特性，根据count属性的变化响应式更新选择列表selectFoods。将该数据作为动态属性传递给ShopCart组件


```
//Product.vue
    computed: {
        selectFoods() {
            let foods = [];
            this.goods.forEach(good => {
                good.foods.forEach(food => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
 ```
 
 
 ShopCart组件通过对selectFoods的监听和计算来来更新视图，这样就形成了对Button组件count属性的更改导致selectFoods变化，通过selectFoods的监听更新视图的数据驱动策略。
 
 
 ```
 <script type="text/javascript">
import ShopDetail from "./pages/ShopDetail";

export default {
    props: {
        seller: Object,
        selectFoods: Array,
        isAllShow: Boolean
    },
    components: {
        ShopDetail
    },
    methods: {
        ...
        clearAll(data) {
            if (data) {
                this.selectFoods.forEach(food => {
                    food.count = 0;
                });
                this.$store.commit("toggleShow", false);
            }
            this.isConfirmShow = false;
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

 ```
 
 
 相比传统开发最大的优势在于告别了对原始入口数据频繁更改，通过MVVM双向数据绑定、computed属性响应式的对视图更新
 
 




- [sticky-footer的三种解决方案](https://www.cnblogs.com/shicongbuct/p/6487122.html)
- [谷歌模拟器和手机真机适配的坑](https://www.jianshu.com/p/a3cb039633c1)
- [vue的过渡动画无法正常实现](https://blog.csdn.net/makerbeen/article/details/81324989)
- [vue.js - 过渡&动画 - 无效情况](https://blog.csdn.net/weixin_34129696/article/details/91383480)

