<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="content">
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodWrapper">
      <ul class="content">
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="name">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="title">{{food.name}}</h2>
                <p class="desc" v-show="food.description">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="nowPirce">￥{{food.price}}</span>
                  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food" :cart-add="cartAdd"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopCart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import shopCart from '@/components/shopCart/shopCart.vue';
  import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';

  var ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    created () {
      this.$http.get('/api/goods').then(response => {
        // success callback
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          // console.log(this.goods);
          // dom元素更新后执行，因此此处能正确打印出更改之后的值；
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }, response => {
        // error callback
      });
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      cartAdd(el) {
        this.$nextTick(() => {
          this.$refs['shopcart'].drop(el); // 调用shopcart组件的drop()函数
        });
      },
      _initScroll() {
        this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new Bscroll(this.$refs.foodWrapper, {
          // https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype
          probeType: 3,
          click: true
        });
        // 设置监听滚动位置
        this.foodScroll.on('scroll', (pos) => {
          // scrollY接收变量
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        // console.log(index);
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      }
    },
    computed: {
      // 当前左侧索引应该在哪
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          // 判断当currentIndex在height1和height2之间的时候显示
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          // console.log('height1:' + height1 + ',' + 'height2:' + height2);
          // 最后一个区间没有height2
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      // 购物车计算添加了几种商品
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          // good怎么来的？
        //  debugger;
          good.foods.forEach((food) => {
          //  debugger;
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    components: {
      'v-shopCart': shopCart,
      'v-cartcontrol': cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .goods
    display flex
    position absolute
    top: 170px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        line-height 14px
        padding: 0 12px
        &.current
          position relative
          z-index 10
          background #fff
          font-weight 700
          margin-top -1px
          .text
            border-none()
            font-weight 700
        .icon
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          vertical-align: top;
          margin-right 2px
          &.decrease
            bg-image(decrease_3)
          &.discount
            bg-image(discount_3)
          &.guarantee
            bg-image(guarantee_3)
          &.invoice
            bg-image(invoice_3)
          &.special
            bg-image(special_3)
        .text
          display table-cell
          font-size 12px
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
    .food-wrapper
      flex: 1
      background #fff
      .food-list
        .name
          border-left 2px solid #d9dde1
          padding-left 14px
          background: #f3f5f7
          font-size 12px
          line-height 26px
          color rgb(147,153,159)
        .food-item
          display flex
          margin: 18px 0 0 18px;
          padding-bottom: 18px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .icon
            margin-right 10px
            flex 0 0 57px
            img
              width 57px
          .content
            position relative
            flex: 1
            .title
              color rgb(17,17,27)
              line-height 14px
              font-weight 700
              font-size 14px
            .desc
              margin 8px 0
              line-height: 14px
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            .desc, .extra
              color rgb(147,153,159)
            .extra, .price
              margin-top 8px
            .extra
              span
                margin-right 12px
            .price
              line-height 24px
              span
                &.oldPrice
                  text-decoration:line-through
                  color #93999f
                  font-weight 10px
                &.nowPirce
                  color #f01414
                  margin-right 8px
                  font-weight 14px
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px
</style>
