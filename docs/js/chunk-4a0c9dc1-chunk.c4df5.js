(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a0c9dc1"],{7553:function(s,e,t){},a51c:function(s,e,t){"use strict";var l=t("7553"),i=t.n(l);i.a},c77a:function(s,e,t){"use strict";t.r(e);var l=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{ref:"sellerScroll",staticClass:"seller"},[t("div",[t("div",{staticClass:"seller-header"},[t("div",{staticClass:"seller-header-content border-horizontal-1px"},[t("div",{staticClass:"seller-name"},[s._v(s._s(s.seller.name))]),t("div",{staticClass:"seller-count"},[t("div",{staticClass:"star-wrapper"},[t("v-star",{attrs:{size:"36",score:s.seller.score}})],1),t("div",{staticClass:"rating-count"},[s._v("("+s._s(s.seller.ratingCount)+")")]),t("div",{staticClass:"sell-count"},[s._v("月售"+s._s(s.seller.sellCount)+"单")])]),t("div",{staticClass:"like"},[t("div",{staticClass:"like-iconfont",on:{click:s.toggleActive}},[t("i",{staticClass:"iconfont icon-like",class:{active:s.isActive}})]),t("div",{staticClass:"like-desc"},[s._v(s._s(s.likeDesc))])])]),t("div",{staticClass:"seller-header-info"},[t("div",{staticClass:"header-info-item border-vertical-1px"},[t("h4",{staticClass:"seller-header-title"},[s._v("起送价")]),t("h2",{staticClass:"seller-header-desc"},[s._v("\n                        "+s._s(s.seller.minPrice)+"\n                        "),t("span",{staticClass:"seller-unit"},[s._v("元")])])]),t("div",{staticClass:"header-info-item border-vertical-1px"},[t("h4",{staticClass:"seller-header-title"},[s._v("商家配送")]),t("h2",{staticClass:"seller-header-desc"},[s._v("\n                        "+s._s(s.seller.deliveryPrice)+"\n                        "),t("span",{staticClass:"seller-unit"},[s._v("元")])])]),t("div",{staticClass:"header-info-item"},[t("h4",{staticClass:"seller-header-title"},[s._v("平均配送时间")]),t("h2",{staticClass:"seller-header-desc"},[s._v("\n                        "+s._s(s.seller.deliveryTime)+"\n                        "),t("span",{staticClass:"seller-unit"},[s._v("分钟")])])])])]),t("div",{staticClass:"section-block"}),t("div",{staticClass:"seller-bulletin"},[t("h2",{staticClass:"seller-bulletin-title"},[s._v("公告与活动")]),t("p",{staticClass:"seller-bulletin-content"},[s._v(s._s(s.seller.bulletin))])]),t("div",{staticClass:"seller-list"},[t("ul",s._l(s.seller.supports,function(e){return t("li",{staticClass:"seller-list-item border-horizontal-1px"},[t("v-pics",{staticClass:"seller-list-brand",attrs:{index:e.type,indexArr:"4"}}),s._v("\n                    "+s._s(e.description)+"\n                ")],1)}),0)]),t("div",{staticClass:"section-block"}),t("div",{staticClass:"seller-pics"},[t("h2",{staticClass:"seller-pics-title"},[s._v("商家实景")]),t("div",{ref:"picsScroll",staticClass:"seller-pics-wrapper"},[t("ul",{ref:"pics",staticClass:"seller-pics-list"},s._l(s.seller.pics,function(s){return t("li",{staticClass:"seller-pics-item"},[t("img",{attrs:{src:s}})])}),0)])]),t("div",{staticClass:"section-block"}),t("div",{staticClass:"seller-infos"},[t("h2",{staticClass:"seller-infos-title"},[s._v("商家信息")]),s._l(s.seller.infos,function(e){return t("div",{staticClass:"seller-infos-item border-horizontal-1px"},[s._v(s._s(e))])})],2)])])},i=[],c=t("229e"),r=t("91ca"),a=t("2b97"),n={name:"Seller",props:{seller:Object},components:{VStar:a["a"],VPics:r["a"]},data:function(){return{isActive:!1}},methods:{toggleActive:function(){this.isActive=!this.isActive,localStorage.setItem("like",this.isActive)},initPics:function(s){var e=126*s-6;this.$refs.pics.style.width=e+"px"},_initScroll:function(){this.$nextTick(function(){this.sellerScroll?this.sellerScroll.refresh():this.sellerScroll=new c["a"](this.$refs.sellerScroll,{click:!0})})},_initPics:function(){this.picsScroll?this.picsScroll.refresh():this.picsScroll=new c["a"](this.$refs.picsScroll,{scrollX:!0,eventPassthrough:"vertical"})}},mounted:function(){localStorage.getItem("like")&&("true"===localStorage.getItem("like")?this.isActive=!0:this.isActive=!1),this.seller.pics&&this.initPics(this.seller.pics.length),this._initScroll(),this._initPics()},computed:{likeDesc:function(){var s="";return s=!0===this.isActive?"已收藏":"收藏",s}}},o=n,v=(t("a51c"),t("2877")),d=Object(v["a"])(o,l,i,!1,null,"4e90a552",null);e["default"]=d.exports}}]);