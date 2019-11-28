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
      <div class="box" :style="{ width: width3 + 'px', height: height + 'px' }">
        <div
          ref="box1"
          v-for="(item, index) in goodsInfo"
          :key="item.id"
          :class="{ skyBlue: item.id === 1, yellow: item.id === 2 }"
          :style="{ flexGrow:'1',width:'0' }"
        >
          {{ index }}
        </div>
      </div>
    </div>
    <button @click="fangda" :disabled="isTop">放大</button>
    <button @click="getDomWidth" :disabled="isTop">获取元素宽度</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value2: 50,
      width: 250,
      width2: 0,
      width3: 500,
      Num: 2,
      isOne: 0,
      height: 150,
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
    getDomWidth() {
      console.log(this.$refs.box1);
    }
  },
  watch: {
    value2: {
      handler(val, oldVal) {
        if (this.isOne === 1) {
          var a = val - 50;
          // console.log(this.width + a);
          console.log(this.width);
          console.log(a);
          this.$refs.box1[0].style.width = this.width + a + "px"; 
        }else {
          this.isOne = 1
          this.$nextTick(() => {
            this.width = this.$refs.box1[0].offsetWidth;
          })
        }
      },
      immediate: true
    },
    width3: {
      handler(val, oldVal) {
        this.width = this.width2 = val / this.Num;
      },
      immediate: true
    }
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
.yellow {
  background: yellow;
  height: 100%;
}
</style>