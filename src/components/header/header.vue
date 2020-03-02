<!-- 
  布局结构：
    header
      content-wrapper
        avator
        content
        support-count
      bulletin-wrapper
      background
-->
<template>
  <div class="header">
    <div class="content-wrapper">
      <!-- 头像  start -->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <!-- 头像  end -->
      <!-- 内容文本 start -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!-- 内容文本  end -->
      <!-- 数量角标 start -->
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!-- 数量角标 end -->
    </div>
    <!-- 公告 start -->
    <div class="bulletin-wrapper" @click="showDetail">
      <!-- 清除行内元素的留白的骚操作  直接在后面写 就没有留白的问题 -->
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 公告  end -->
    <!-- 背景 start  技巧 ：通过z-index=-1 将图片用作背景 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 背景  end -->
    <!-- 遮罩背景 start -->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <!-- 这里的clearfix 是因为 detail main设置margin-top  会影响父元素  margintop的塌陷现象 -->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <!-- 组件不应该包含一些margin padding之类的 应该在组件外包一层 进行布局 start-->
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!-- 组件不应该包含一些margin padding之类的 应该在组件外包一层 进行布局 end -->
            <!-- 线的这个要考虑线的自适应 和 与字之间的间隔 start -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!-- 线的这个要考虑线的自适应 和 与字之间的间隔 end -->
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
    <!-- 遮罩背景 end -->
  </div>
</template>

<script type="text/ecmascript-6">
import star from "components/star/star";

export default {
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  created() {
    console.log(this.seller); //this指向vue实例之后  对象的每个属性都会有get set 方法 从而实现了数据的双向绑定
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  components: { star }
};
</script>

<style scoped lang="stylus">
@import '~common/stylus/mixin';

// .fade-enter-active, .fade-leave-active {
// transition: opacity 5s;
// }

// .fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
// opacity: 0;
// }
.header {
  position: relative;
  overflow: hidden; // 是因为背景添加了模糊的效果 ，边1边有一些东西透出来
  color: #fff;
  background: rgba(7, 17, 27, 0.5);

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0; // 为了清除行内 行内块 元素的的留白问题  后面的子元素会继承，所以要单独设置font size

    .avatar {
      display: inline-block;
      vertical-align: top;

      img {
        border-radius: 2px;
      }
    }

    .content {
      display: inline-block;
      margin-left: 16px;

      .title {
        margin: 2px 0 8px 0;

        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }

        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }

      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }

      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;

          &.decrease {
            bg-image('decrease_1');
          }

          &.discount {
            bg-image('discount_1');
          }

          &.guarantee {
            bg-image('guarantee_1');
          }

          &.invoice {
            bg-image('invoice_1');
          }

          &.special {
            bg-image('special_1');
          }
        }

        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        vertical-align: top;
        font-size: 10px;
      }

      .icon-keyboard_arrow_right {
        margin-left: 2px;
        line-height: 24px;
        font-size: 10px;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }

    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }

    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px); // 滤镜的效果
  }

  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    backdrop-filter: blur(10px);
    background: rgba(7, 17, 27, 0.8);

    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
    }

    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }

    &.fade-enter-to, &.fade-leave {
      opacity: 1;
    }

    .detail-wrapper {
      width: 100%;
      min-height: 100%; // 保证最小高度是充满整个屏幕

      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px; // 这个是一定需要的  将底下撑起给x使用

        .name {
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }

        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }

        .title { //这个布局值得记忆
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;

          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .text {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }

        .supports {
          width: 80%;
          margin: 0 auto;

          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;

            &:last-child {
              margin-bottom: 0;
            }

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;

              &.decrease {
                bg-image('decrease_2');
              }

              &.discount {
                bg-image('discount_2');
              }

              &.guarantee {
                bg-image('guarantee_2');
              }

              &.invoice {
                bg-image('invoice_2');
              }

              &.special {
                bg-image('special_2');
              }
            }

            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }

        .bulletin {
          width: 80%;
          margin: 0 auto;

          .content {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
    }

    .detail-close {
      position: relative; // 好像没什么用
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto; // 向上偏移  水平居中 向上偏移之后不会占原来的位置
      clear: both; // 好像没什么用
      font-size: 32px;
    }
  }
}
</style>
