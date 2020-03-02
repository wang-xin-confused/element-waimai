<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :select-type="selectType"
        :only-content="onlyContent"
        :ratings="ratings"
        @ratingtypeSelect="ratingtypeSelect($event)"
        @contentToggle="contentToggle($event)"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating,index) in ratings"
            :key="index"
            v-show="needShow(rating.rateType, rating.text)"
            class="rating-item"
          >
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import BScroll from "better-scroll";
import { formatDate } from "common/js/date";
import star from "components/star/star";
import ratingselect from "components/ratingselect/ratingselect";
import split from "components/split/split";

const ALL = 2;
const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  created() {
    this.ratings = [
      {
        username: "3******c",
        rateTime: 1469281964000,
        deliveryTime: 30,
        score: 5,
        rateType: 0,
        text: "不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: [
          "南瓜粥",
          "皮蛋瘦肉粥",
          "扁豆焖面",
          "娃娃菜炖豆腐",
          "牛肉馅饼"
        ]
      },
      {
        username: "2******3",
        rateTime: 1469271264000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        deliveryTime: "",
        text: "服务态度不错",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: ["扁豆焖面"]
      },
      {
        username: "3******b",
        rateTime: 1469261964000,
        score: 3,
        rateType: 1,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "1******c",
        rateTime: 1469261864000,
        deliveryTime: 20,
        score: 5,
        rateType: 0,
        text: "良心店铺",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "2******d",
        rateTime: 1469251264000,
        deliveryTime: 10,
        score: 4,
        rateType: 0,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "9******0",
        rateTime: 1469241964000,
        deliveryTime: 70,
        score: 1,
        rateType: 1,
        text: "送货速度蜗牛一样",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "d******c",
        rateTime: 1469231964000,
        deliveryTime: 30,
        score: 5,
        rateType: 0,
        text: "很喜欢的粥店",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "2******3",
        rateTime: 1469221264000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "量给的还可以",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "3******8",
        rateTime: 1469211964000,
        deliveryTime: "",
        score: 3,
        rateType: 1,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "a******a",
        rateTime: 1469201964000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "孩子喜欢吃这家",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: ["南瓜粥"]
      },
      {
        username: "3******3",
        rateTime: 1469191264000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "粥挺好吃的",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "t******b",
        rateTime: 1469181964000,
        deliveryTime: "",
        score: 3,
        rateType: 1,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "f******c",
        rateTime: 1469171964000,
        deliveryTime: 15,
        score: 5,
        rateType: 0,
        text: "送货速度很快",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "k******3",
        rateTime: 1469161264000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "u******b",
        rateTime: 1469151964000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "下雨天给快递小哥点个赞",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "s******c",
        rateTime: 1469141964000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "好",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "z******3",
        rateTime: 1469131264000,
        deliveryTime: "",
        score: 5,
        rateType: 0,
        text: "吃了还想再吃",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "n******b",
        rateTime: 1469121964000,
        deliveryTime: "",
        score: 3,
        rateType: 1,
        text: "发票开的不对",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "m******c",
        rateTime: 1469111964000,
        deliveryTime: 30,
        score: 5,
        rateType: 0,
        text: "好吃",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "l******3",
        rateTime: 1469101264000,
        deliveryTime: 40,
        score: 5,
        rateType: 0,
        text: "还不错吧",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "3******o",
        rateTime: 1469091964000,
        deliveryTime: "",
        score: 2,
        rateType: 1,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "3******p",
        rateTime: 1469081964000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "很喜欢的粥",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "o******k",
        rateTime: 1469071264000,
        deliveryTime: "",
        score: 5,
        rateType: 0,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      },
      {
        username: "k******b",
        rateTime: 1469061964000,
        deliveryTime: "",
        score: 4,
        rateType: 0,
        text: "",
        avatar:
          "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
        recommend: []
      }
    ];
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      });
    });
    // this.getInfo()
  },
  methods: {
    getInfo() {
      axios
        .get(
          "https://www.easy-mock.com/mock/5cb84730f4972d570768ac52/eleme/rating"
        )
        .then(response => {
          console.log(response.data);
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    ratingtypeSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    contentToggle(onlyContent) {
      this.onlyContent = !onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  events: {},
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  components: {
    star,
    split,
    ratingselect
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      // 兼容iphone 5 屏幕太小的问题
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;

        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      display: flex;
      padding: 18px 0;
      border-1px(rgba(7, 17, 27, 0.1));

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thumb_up, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>