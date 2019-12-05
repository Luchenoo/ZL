<template>
  <div>
    <div ref="echarts" :style="{ width: '1000px', height: '300px' }"></div>
    <div>
      <div class="sliderBox">
        <div class="block">
          <span class="demonstration">自定义初始值</span>
          <el-slider v-model="value2"></el-slider>
        </div>
      </div>
    </div>
    <div :style="{ width: widthSon + 'px' }" ref="bigBox" class="divBigBox">
      <div
        ref="box"
        :class="{ skyBlue: true, positionBox: true ,green:this.width1 === 150}"
        :style="{ width: width1 + 'px' }"
      >
        <div class="positionbOX" @mousedown="moveChange($event, 0)">red</div>
        {{ chabie }}
      </div>
      <div
        ref="box"
        :class="{ yellow: true, positionBox: true ,red:this.width2 === 150}"
        :style="{ width: width2 + 'px' }"
      >
        <div class="positionbOX" @mousedown="moveChange($event, 1)">yellow</div>
        {{ juli }}
      </div>
      <div
        ref="box"
        :class="{ pink: true, positionBox: true }"
        :style="{ width: width3 + 'px' }"
      >
        <div class="positionbOX" @mousedown="moveChange($event, 2)">pink</div>
        {{ 1123 }}
      </div>
    </div>
    <button @click="fangda" :disabled="isTop">放大</button>
    <button @click="getDomWidth" :disabled="isTop">获取元素宽度</button>
    <!-- <div style="width:300px;height:300px;background:pink" @mousedown="moveChange($event)"></div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      value2: 50,
      width: 250,
      width1: 0,
      width2: 0,
      width3: 0,
      widthSon: 750,
      juli: 0,
      chabie: 0,
      isTop: false,
      goodsInfo: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    };
  },
  mounted() {
    this.echartsDom();
  },
  methods: {
    echartsDom() {
      var myChart = this.echarts.init(this.$refs.echarts);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value",
          axisLine: {
            //y轴
            show: false
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          splitLine: {
            //网格线
            show: false
          },
          axisLabel: {
            formatter: function() {
              return "";
            }
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            itemStyle: {
              normal: {
                color: "rgba(0,191,183,1)",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      });
    },
    fangda() {
      var a = 50;
      var b = 20;
      var width = 500;
      var height = 150;
      width = this.width3 + a;
      height = this.height + b;
      this.width3 = width;
      this.height = height;
    },
    getDomWidth() {},
    moveChange(e, i) {
      let currentX = e.clientX;
      let box = document.querySelectorAll(".positionBox");
      let currentWidth = box[i].clientWidth;
      document.onmousemove = e => {
        this.juli = e.clientX - currentX;

        if (i === 0) {
          if (this.chabie > 0) {
            console.log(1);
            if (this.width1 >= 350) {
              this.width1 = 350;
              this.juli = 0;
              this.chabie = 0;
              this.width2 = 150;
                this.juli = e.clientX - currentX;
              return;
            } else {
              console.log(2);
              this.width1 = this.width1 + this.chabie;
              this.width2 = this.width2 - this.chabie;
            }
          } else {
            console.log(3);
            if (this.width2 >= 350) {
              this.width2 = 350;
              this.juli = 0;
              this.chabie = 0;
              this.width1 = 150;
              this.juli = e.clientX - currentX;
              return;
            } else {
              console.log(4);
              this.width1 = this.width1 + this.chabie;
              this.width2 = this.width2 - this.chabie;
            }
          }
        }
      };
      document.onmouseup = () => {
        this.juli = 0;
        this.chabie = 0;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  },
  watch: {
    widthSon: {
      handler(val, oldVal) {
        this.width1 = this.width2 = this.width3 = (val / 3)
      },
      immediate: true
    },
    juli: {
      handler(val, oldVal) {
        if (this.juli === 0) {
          this.chabie = 0;
        } else {
          this.chabie = val - oldVal;
        }
        // console.log(this.chabie);
      }
    },
    width1:{
      handler(val,oldVal) {
        if(val <= 150) {
          this.width1 = 150
        }
      }
    }
  },
  created() {
    this.widthSon = 750;
  }
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.box {
  background: red;
  display: flex;
}
.sliderBox {
  width: 200px;
  height: 100px;
}
.skyBlue {
  background: skyblue;
  height: 100%;
}
.divBigBox {
  height: 200px;
  display: flex;
}
.yellow {
  background: yellow;
  height: 100%;
}
.red {
  background: red;
  height: 100%;
}
.green {
  background: green;
  height: 100%;
}
.pink {
  background: pink;
  height: 100%;
}
.positionBox {
  position: relative;
}
.positionbOX {
  position: absolute;
  right: 0;
  top: 0;
  background: red;
}
</style>