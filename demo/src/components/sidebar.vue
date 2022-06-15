<template>
  <el-menu default-active="1-4-1" class="sidebar" :collapse="isCollapse" :router="true">
    <el-menu-item index="/todo" class="choice">
      <i class="el-icon-tickets"></i>
      <span slot="title">todo</span>
    </el-menu-item>
    <el-menu-item index="/timecounter" class="choice">
      <i class="el-icon-time"></i>
      <span slot="title">专注</span>
    </el-menu-item>
    <el-menu-item index="/charts" class="choice">
      <i class="el-icon-date"></i>
      <span slot="title">总结</span>
    </el-menu-item>
    <el-menu-item index="/user" class="choice">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
    <el-menu-item class="choice" @click="setFalse" :disabled="!isCollapse">
      <i class="el-icon-d-arrow-right"></i>
      <span slot="title">展开</span>
    </el-menu-item>
    <el-menu-item class="choice" @click="setTrue" :disabled="isCollapse">
      <i class="el-icon-d-arrow-left"></i>
      <span slot="title">收起</span>
    </el-menu-item>
  </el-menu>
</template>

<style>

.sidebar {
  width: 120px;
  min-height: 100%;
}

</style>

<script>
export default {
  name:"sidebar",
  data() {
    return {
      isCollapse:true
    };
  },
  methods: {
    setFalse(){
      this.isCollapse=false;
    },
    setTrue(){
      this.isCollapse=true;
    }
  }
}
</script>