<template>
  <div>
    <div class="main" v-for="item in todoArr" :key="item.endtime">
      <div class="item" :style="{'background':color[item.priority-1]}">
        <h2 v-if="item.done===true" style="text-decoration: line-through">{{item.title}}</h2>
        <h2 v-else>{{item.title}}</h2>
        <span class="el-icon-tickets">描述</span>:{{item.description}}
        <br>
        <span class="el-icon-time">开始时间</span>:{{item.starttime}}
        <br>
        <span class="el-icon-bell">结束时间</span>:{{item.endtime}}
        <br>
        <el-button :disabled=item.done type="success" plain style="margin-top:5px;margin-bottom: 5px" @click="setSuccess(item.title)">完成</el-button>
        <el-button :disabled=!item.done type="danger" plain style="margin-top:5px;margin-bottom: 5px" @click="setFailed(item.title)">未完成</el-button>
        <el-button type="warning" plain style="margin-top:5px;margin-bottom: 5px" @click="deltodo(item.title)">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "todolist",

  data(){
    return{
      todoArr:[],
      color:['rgba(255,46,53,0.82)','#ffd544','#6dd3ff','#3DFF2DFF']
    }
  },

  created(){
    this.gettodos();
  },

  methods:{
    async gettodos(){
      const result = await this.$http.post("/getTodos");
      this.todoArr = result.data;
      console.log(this.todoArr)
    },

    todo(title){
      window.sessionStorage.setItem("title",title);
      this.$router.push("/todo");
    },

    async setSuccess(title){
      const result=await this.$http.post("/upsTodo", {title});
      if(result.status!==200)return this.$message.error("失败!");
      this.$message.success("成功!");
      this.$router.go(0);
    },

    async setFailed(title){
      const result=await this.$http.post("/upfTodo", {title});
      if(result.status!==200)return this.$message.error("失败!");
      this.$message.success("成功!");
      this.$router.go(0);
    },

    async deltodo(title){
      const result=await this.$http.post("/delTodo",{title});
      if(result.status!==200)return this.$message.error("失败!");
      this.$message.success("成功!");
      this.$router.go(0);
    }
  }

}
</script>

<style lang="less" scoped>
.item {
  border: 2px solid rgb(105, 199, 160);
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 10px;
  color:rgba(0,0,0,.7);
  font-size: large;
}
.item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  cursor: pointer;
  box-shadow: -2px -2px 7px -2px #000;
}
</style>