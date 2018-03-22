<template>
  <div class="shopcart">
    <div class="content clearfix">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}"><i class="icon-shopping_cart"></i></div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{paydesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
        <div class="ball" v-for="ball in balls" v-show="ball.show">
          <transition-group name="drop">
            <div class="inner"></div>
          </transition-group>
        </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ]
        };
      },
      props: {
        seller: {
          type: Object
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        },
        selectFoods: {
          type: Array,
          default() {
            return [
              {
                price: 0,
                count: 0
              }
            ];
          }
        }
      },
      methods: {
        drop(el) {
          console.log(el);
        }
      },
      computed: {
        totalCount() {
          let count = 0;
          this.selectFoods.forEach((foods) => {
            //  debugger;
            count += foods.count;
          });
          return count;
        },
        totalPrice() {
         // debugger;
          let total = 0;
          // alert(typeof this.selectFoods);
          this.selectFoods.forEach((food) => {
          //  debugger;
            total += food.price * food.count;
          });
          return total;
        },
        paydesc() {
          if (this.totalPrice === 0) {
            return '￥' + this.minPrice + '元起送';
          } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice;
            return '还差' + diff + '元起送';
          } else {
            return '去结算';
          }
        },
        payClass() {
          if (this.totalPrice < this.minPrice) {
            return 'not-enought';
          } else {
            return 'enought';
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    z-index 10
    width 100%
    height: 48px
    background #141d27
    bottom: 0;
    color: rgba(255,255,255,.4)
    .content
      display flex
      color rgba(255,255,255,0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          z-index -10
          top: -12px
          width 56px
          height 56px
          margin 0 12px
          padding 6px
          box-sizing border-box
          background #141d27
          border-radius 50%
          font-size 0
          .logo
            display inline-block
            background #2b343c
            border-radius: 50%
            width 100%
            height 100%
            text-align center
            color #80858a
            &.highlight
              color: #fff
              background #00a0dc
            .icon-shopping_cart
              font-size: 24px
              line-height 44px
          .num
            position absolute
            top: 0
            right 0
            z-index 100
            background #f01414
            border-radius 20px
            padding 4px 7px
            font-size 9px
            font-weight 700
            color #fff
            box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
        .price ,.desc
          display inline-block
        .price
          vertical-align top
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .desc
          font-size 10px
          padding-left 12px
          margin-top: 19px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          background #2b333b
          text-align center
          line-height 48px
          font-size 12px
          font-weight 700
          &.enought
            background #00b43c
            color: #fff
          &.not-enought
            background #2b333b
            color: rgba(255,255,255,.4)
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 20
        &.drop-transition
          transition all 0.4s
          .inner
            width 16px
            height 16px
            border-radius 50%
            background-color #00a0dc
            transition all 0.4s
</style>
