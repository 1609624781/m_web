<template>
  <el-container class="page">
    <el-aside width="24%">
      <sidebar></sidebar>
    </el-aside>
    <el-main>
      <el-time-select
          v-model="times"
          :picker-options="{
            start:'00:00',
            step:'00:15',
            end:'12:0',
          }"
          style="margin-top: 80px"
          placeholder="专注时长">
      </el-time-select>
      <div :style="{'visibility':switchs}">
<!--        <el-progress :percentage="(thours/60*100).toFixed(2)" :text-inside="true" :color="'#6DD3FFFF'" :stroke-width="30" style="margin: 15px 30px 5px auto">时</el-progress>-->
        <span>还剩{{thours}}小时{{tmins}}分钟{{tsecs}}秒</span>
        <el-progress :percentage="Number((tmins/60*100).toFixed(2))" :text-inside="true" :color="'#3DFF2DFF'" :stroke-width="30" style="margin: 5px 30px 5px auto">分</el-progress>
        <el-progress :percentage="Number((tsecs/60*100).toFixed(2))" :text-inside="true" :color="'rgba(245,142,84,0.82)'" :stroke-width="30" style="margin: 5px 30px 5px auto">秒</el-progress>
      </div>
<!--      <p>倒计时：{{hour}}:{{minute}}:{{second}}</p>-->
      <el-button type="success" round @click="starttime" style="margin: 25px auto 5px 15px" :disabled="!startuse">开始计时</el-button>
<!--      <br>-->
<!--      <el-button type="warning" round @click="pausetime" style="margin: 5px auto 5px 15px" :disabled="!pauseuse">暂停计时</el-button>-->
      <br>
      <el-button type="danger" round @click="endtime" style="margin: 5px auto 5px 15px" :disabled="!enduse">结束计时</el-button>
    </el-main>
  </el-container>
</template>

<script>
import sidebar from "@/components/sidebar";

export default {
  name: "timecounter",
  components:{
    sidebar
  },
  data(){
    return{
      firststart:true,
      startuse:true,
      pauseuse:false,
      enduse:false,
      flag:false,
      timetrack:"",
      times:'',
      thours:0,
      tmins:0,
      tsecs:0,
      switchs:"hidden",
    }
  },
  methods:{
    on(){
        this.switchs="unset";
    },

    off(){
        this.switchs="hidden";
    },

    getDate(result){
      result = "";
      var time = new Date();
      var year = time.getFullYear().toString();
      var month = (time.getMonth() + 1).toString();
      var date = time.getDate().toString();
      var hour = time.getHours().toString();
      var minutes = time.getMinutes().toString();
      result = year + "-" + month + "-" + date;
      return result;
    },

    async addach(){
      let date=this.getDate(date);
      const result=await this.$http.post("/addAch", {settime:this.timetrack, date:date});
      if(result.status!==200)return this.$message.error("上传失败!");
      await this.$message.success("上传成功!");
    },

    inittime(){
      this.firststart=true;
      this.startuse=true;
      this.pauseuse=false;
      this.enduse=false;
      this.flag=false;
      this.timetrack="";
      this.times='';
      this.thours=0;
      this.tmins=0;
      this.tsecs=0;
      this.switchs="hidden";
    },

    async starttime(){
      if(this.firststart===true){
        this.timetrack=this.times;
        this.thours=Number(this.times.slice(0,2));
        this.tmins=Number(this.times.slice(3,5));
        this.tsecs=0;
      }
      this.startuse=false;
      this.pauseuse=true;
      this.enduse=true;
      await this.on();

      let tc=window.setInterval(async () => {
        if (this.flag === true) {
          await window.clearInterval(tc);
        }
        if (this.thours > 0 && this.tmins === 0 && this.tsecs === 0) {
          this.thours -= 1;
          this.tmins = 59;
          this.tsecs = 59;
        } else if (this.tmins > 0 && this.tsecs === 0) {
          this.tmins -= 1;
          this.tsecs = 59;
        } else if (this.thours === 0 && this.tmins === 0 && this.tsecs === 1) {
          this.tsecs = 0;
          await window.clearInterval(tc);
          await this.endtime();
        } else if (this.thours === 0 && this.tmins === 0 && this.tsecs === 0) {
          this.tsecs = 0;
          // window.clearInterval(tc);
          // this.endtime();
        } else {
          this.tsecs -= 1;
        }
      }, 1000)
    },

    pausetime(){
      this.firststart=false;
      this.flag=true;
      this.startuse=true;
      this.pauseuse=false;
      this.enduse=true;
    },

    async endtime(){
      await this.addach();
      await this.$router.go(0);
    }

  }
}
</script>

<style scoped>
.page {
  width: 100% !important;
  height: 100% !important;
  background-color: #c6e0e5;
}

</style>