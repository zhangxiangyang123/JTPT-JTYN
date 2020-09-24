<template>
  <div class="system-switch-container">
    <el-row>
      <el-col :span="24">
        <div class="bg_overspreat"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="system-switch-title">
          配置管理系统
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper" @click="handleselect('monitor')">
          <div class="system-box-img">
            <div :class="widthResize">
              运行监测与预警系统
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper" @click="handleselect('emergency')">
          <div class="system-box-img">
            <div :class="widthResize">
              应急指挥与调度系统
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper" @click="handleselect('analysis')">
          <div class="system-box-img">
            <div :class="widthResize">
              综合交通决策分析系统
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper" @click="handleselect('information')">
          <div class="system-box-img">
            <div :class="widthResize">
              综合信息服务管理系统
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper" @click="handleselect('bigdata')">
          <div class="system-box-img">
            <div :class="widthResize">
              综合交通大数据平台
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper">
          <div class="system-box-img"/>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper">
          <div class="system-box-img"/>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="system-box-wrapper" @click="handleselect('admin')">
          <div class="system-box-img">
            <div :class="widthResize">
              运维管理系统
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { debounce } from '@/utils'
export default {
  name: 'SystemSwitch',
  data() {
    return {
      widthResize: 'system-box-test',
      screenWidth: document.body.clientWidth
    }
  },
  mounted() {
    this.resizeWindow()
  },
  methods: {
    // 判断屏幕大小来决定操作列的宽度
    resizeWindow() {
      this.__resizeHandler = debounce(() => {
        this.screenWidth = document.body.clientWidth
        console.log('onresize:' + this.screenWidth)
        var onresize = this.screenWidth
        switch (true) {
          case onresize < 1448:
            this.widthResize = 'system-box-test'
            break
          case onresize > 1448 && onresize < 1680 :
            this.widthResize = 'system-box-text2'
            break
          case onresize > 1680:
            this.widthResize = 'system-box-text3'
            break
          default:
            break
        }
        /* if(this.screenWidth>1448) {
          this.widthResize=true
        }*/
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    },
    handleselect(idx) {
      this.$router.push({ path: '/test' })
      // var that = this
      // if (idx === 'monitor') {
      //   window.location.href = process.env.MONITOR_URL
      // } else if (idx === 'emergency') {
      //   that.$router.push({ path: '/emergency' })
      // } else if (idx === 'analysis') {
      //   that.$router.push({ path: '/analysis' })
      // } else if (idx === 'information') {
      //   that.$router.push({ path: '/information' })
      // } else if (idx === 'bigdata') {
      //   that.$router.push({ path: '/bigdata' })
      // } else if (idx === 'admin') {
      //   window.location.href = process.env.ADMIN_URL
      // } else {
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.system-switch-container {
  .bg_overspreat{
    position:fixed;
    width: 100%;
    height: 100%;
    top:0px;
    left:0px;
    background: url("../../assets/system_images/systems-switch/background.jpg") center center no-repeat;
    background-size: cover;
    z-index:-1
  }
  padding: 32px;
  position:relative;
  width: 100%;
  height: 100%;
  // border-top: 1px solid transparent;

  .system-switch-title {
    color: #fff;
    font-size: 42px;
    text-align: center;
    line-height: 100px;
  }

  .system-box-wrapper {
  .system-box-img {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background: url("../../assets/system_images/systems-switch/deflut_bg.png") no-repeat center;
    background-size: 98% 98%;
      &:hover {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      background: url("../../assets/system_images/systems-switch/checked_bg.png") no-repeat center;
      background-size: 98% 98%;
      cursor: pointer;
    }
  }

  .system-box-text {
      color: #fff;
      font-size: 1.4rem;
      text-align: center;
      padding-top:45%;
      padding-bottom:45%;
  }
  .system-box-text2 {
      color: #fff;
      font-size: 1.6rem !important;
      text-align: center;
      padding-top:45%;
      padding-bottom:45%;
  }
  .system-box-text3 {
      color: #fff;
      font-size: 2.2rem !important;
      text-align: center;
      padding-top:45%;
      padding-bottom:45%;
  }
  }
}
</style>
