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



- [sticky-footer的三种解决方案](https://www.cnblogs.com/shicongbuct/p/6487122.html)



- [谷歌模拟器和手机真机适配的坑](https://www.jianshu.com/p/a3cb039633c1)
- [vue的过渡动画无法正常实现](https://blog.csdn.net/makerbeen/article/details/81324989)
- [vue.js - 过渡&动画 - 无效情况](https://blog.csdn.net/weixin_34129696/article/details/91383480)
- [Vue 简单状态管理Store模式下无法 watch 到改变后的数据](https://segmentfault.com/q/1010000019453777/)

- []()
