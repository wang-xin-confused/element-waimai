<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" :key="index" class="star-item" ></span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5; //定义星星的个数
const CLS_ON = "on";//全星状态
const CLS_HALF = "half";//半星状态
const CLS_OFF = "off";//没星状态

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    //控制星星的尺寸样式
    starType() {
      return "star-" + this.size;
    },
    //控制每个星星的样式  全星 半星 没星
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;//小算法 向下取整0.5的倍数
      let hasDecimal = score % 1 !== 0; //获取是不是有小数 判断是否有半星
      let integer = Math.floor(score); //获取有几个全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) { //当星星个数不足五个的时候  往后面添加没有星星的样式
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin.styl';

.star {
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('star48_on');
      }

      &.half {
        bg-image('star48_half');
      }

      &.off {
        bg-image('star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('star36_on');
      }

      &.half {
        bg-image('star36_half');
      }

      &.off {
        bg-image('star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('star24_on');
      }

      &.half {
        bg-image('star24_half');
      }

      &.off {
        bg-image('star24_off');
      }
    }
  }
}
</style>