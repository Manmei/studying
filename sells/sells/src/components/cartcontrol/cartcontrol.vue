<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    /* * Goods将food商品信息传递过来后，food中是没有count字段的，
    * 如果直接添加，是不会监听该字段变化的；
    * 如果想要达到效果，需要通过vue.set()方法
    * */
    import Vue from 'vue';
    // 通过该方法添加新的字段

    export default {
      props: {
        food: {
          type: Object
        }
      },
      methods: {
        addCart(event) {
          // 阻止非vue事件，判断点击事件是否是自己派发，防止pc端会点击一次触发2次
          if (!event._constructed) {
            return;
          }
          console.log('click');
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
            this.$emit('cart-add', event.target);
          }
        },
        decreaseCart(event) {
          // 判断点击事件是否是自己派发，防止pc端会点击一次触发2次
          if (!event._constructed) {
            return;
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      transition all 0.4s linear
      &.move-transition
        opacity 1
        transform translate3D(0,0,0)
      .inner
        display inline-block
        font-size 24px
        line-height 24px
        color: rgb(0, 160, 220)
        transition all 0.4s linear
        transform rotate(0)
      &.move-enter, .move-leave
        opacity 0
        transform translate3D(24px,0,0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      width 12px
      font-size 12px
      line-height 24px
      color: rgb(147,153,159)
      text-align center
      vertical-align: 6px
      padding 0
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color: rgb(0,160,220)
</style>
