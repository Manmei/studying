<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar"><img :src="seller.avatar" alt=""></div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click = "showPopup">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click = "showPopup">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="head-background">
      <img :src="seller.avatar" alt="" width="100%" height="134">
    </div>
    <transition name="fade">
      <div v-if="show" v-show="showToggle" class="detail-popup">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="item-supports" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="description">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hidePopup"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star/star.vue';
  export default {
    components: {
      'v-star': star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        showToggle: false,
        show: true
      };
    },
    methods: {
      showPopup() {
        this.showToggle = true;
      },
      hidePopup() {
        this.showToggle = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
    .header
      position relative
      overflow hidden
      color #fff
      background rgba(7, 17, 27, 0.5)
      .content-wrapper
        position relative
        padding 24px 12px 18px 24px
        font-size 0
        .avatar
          display inline-block
          vertical-align top;
          img
            width 64px
            height 64px
            border-radius 2px
        .content
          display inline-block
          margin-left 16px
          .title
            margin 2px 0 8px
            .brand
              display inline-block
              width 30px
              height 18px
              bg-image(brand)
              background-size 30px 17px
              background-repeat no-repeat
              vertical-align top
            .name
              line-height 18px
              font-size 18px
              font-weight bold
              margin-left 6px
          .description
            line-height 12px
            font-size 12px
            margin-bottom 10px
          .support
            .icon
              display inline-block
              width 12px
              height 12px
              margin-right 4px
              vertical-align top
              background-size 12px 12px
              background-repeat no-repeat
              &.decrease
                bg-image(decrease_1)
              &.discount
                bg-image(discount_1)
              &.guarantee
                bg-image(guarantee_1)
              &.invoice
                bg-image(invoice_1)
              &.special
                bg-image(special_1)
            .text
              font-size 10px
              line-height 12px
              font-weight 200
        .support-count
          position: absolute
          bottom: 15px
          background rgba(0,0,0,.5)
          padding 0 8px
          height 24px
          line-height 24px
          border-radius: 15px
          right: 12px
          .count
            font-size 10px
            line-height 24px
            vertical-align top
          .icon-keyboard_arrow_right
            font-size 10px
            margin-left 2px
            line-height 24px
      .bulletin-wrapper
        position relative
        height 28px
        line-height 28px
        padding 0 55px 0 12px
        background: rgba(7,17,27,0.2)
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        .bulletin-text
          display inline-block
          vertical-align top
          margin 0 4px
          font-size 10px
        .bulletin-title
          display inline-block
          width 22px
          height 12px
          bg-image(bulletin)
          background-size 22px 12px
          background-repeat no-repeat
          vertical-align: -2px
        .icon-keyboard_arrow_right
          position absolute
          right 12px
          top: 8px
          font-size 10px
          display inline-block
      .head-background
        position absolute
        left 0
        top 0
        z-index -1
        width 100%
        height 100%
        filter blur(10px)
      .fade-enter-active, .fade-leave-active
        transition: opacity 0.8s
        opacity: 1
      .fade-enter, .fade-leave-to
        opacity: 0
      .detail-popup
        position fixed
        top 0
        left 0
        z-index 100
        width 100%
        height 100%
        transition all 0.5s
        background: rgba(7, 17, 27, 0.8)
        backdrop-filter: blur(10px)
        .detail-wrapper
          min-height 100%
          width 100%
          .detail-main
            margin-top 64px
            padding-bottom 64px
            .name
              font-size 16px
              font-weight 700
              line-height 16px
              text-align center
            .title
              display flex
              width 80%
              margin 24px auto
              .line
                flex 1
                position relative
                top -6px
                border-bottom 1px solid rgba(255,255,255,0.2)
              .text
                font-size 14px
                line-height 14px
                font-weight 700
                padding 0 12px
            .star-wrapper
              margin-top 16px
            .supports
              width 80%
              margin 0 auto
              .item-supports
                font-size 0
                margin-bottom 12px
                padding 0 12px
                &:last-child
                  margin-bottom 0
                .icon
                  display inline-block
                  width 16px
                  height 16px
                  background-size 16px 16px
                  vertical-align middle
                  &.decrease
                    bg-image(decrease_2)
                  &.discount
                    bg-image(discount_2)
                  &.guarantee
                    bg-image(guarantee_2)
                  &.invoice
                    bg-image(invoice_2)
                  &.special
                    bg-image(special_2)
                .description
                  line-height 12px
                  font-size 12px
                  font-weight 200
                  vertical-align middle
                  margin-left 6px
            .bulletin
              width 80%
              margin 0 auto
              p
                line-height 24px
                font-size 12px
                font-weight 200
                padding 0 12px
        .detail-close
          position relative
          font-size 32px
          color rgba(255,255,255,0.5)
          width 32px
          height 32px
          margin: -64px auto 0 auto
          clear both
          .icon-close
            color: rgba(255,255,255,0.5)
</style>
