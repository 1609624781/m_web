<template>
  <div class="page">
      <el-container class="contain">
        <el-aside style="width: 24%;">
          <sidebar></sidebar>
        </el-aside>
        <el-main class="userinfo">
          <img src="../assets/梵·高.jpg" alt />
          <!--        <h2 class="name">{{myName}}</h2>-->
          <br>
          <el-button @click="updateDialogVisible=true" type="warning" class="changebutton1">修改信息</el-button>
          <el-button @click="loginout" type="danger" class="changebutton2">退出登录</el-button>
        </el-main>
      </el-container>
    <!--修改信息的对话框-->
    <el-dialog title="修改信息" :visible.sync="updateDialogVisible" width="80%">
      <el-form ref="updateformRef" :model="updateForm" :rules="updateFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="updateForm.username" placeholder="请输入新用户名"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item prop="name">
          <el-input v-model="updateForm.name" placeholder="请输入新昵称"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="updateForm.password" placeholder="请输入新密码" type="password"></el-input>
        </el-form-item>
        <!-- 密码确认 -->
        <el-form-item prop="confirm">
          <el-input v-model="updateForm.confirm" placeholder="请确认新密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";

export default {
  components:{
    sidebar
  },
  name: "user",

  data(){
    var that=this;

    var usernameCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/usernameCheck',{username:value});
      if(result==="success"){
        that.$message.success("账户可用!");
        return callback();}
      that.$message.error("这个账号已经被注册啦!");
      callback(new Error("重名啦"));
    }
    //修改信息的昵称重名验证
    var nameCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/nameCheck',{name:value});
      if(result==="success")
      { that.$message.success("昵称可用!");
        return callback();}
      that.$message.error("请想一个独一无二的昵称!");
      callback(new Error("重名啦"));
    }

    return{
      myName: "",
      //修改信息
      updateForm:{
        username:"",
        password:"",
        name:"",
        confirm:"",
        prename:""
      },
      updateDialogVisible:false,
      //修改信息表单的提交规则
      updateFormRules:{
        username: [
          { required: true, message: "没号咋登？", trigger: "change" },
          {
            min: 3,
            max: 16,
            message: "账号要在3-16字符之间",
            trigger: "change"
          },
          {validator: usernameCheck, trigger:'blur'}
        ],
        name: [
          { required: true, message: "用户不能没有姓名", trigger: "change" },
          {
            min: 3,
            max: 10,
            message: "昵称只能在3-10个字符之间",
            trigger: "change"
          },
          {validator: nameCheck, trigger:'blur'}
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "密码要在6-16字符之间",
            trigger: "change"
          }
        ],
        confirm: [
          { required: true, message: "请输入密码！", trigger: "change" },
          {
            min: 6,
            max: 16,
            message: "密码要在6-16字符之间",
            trigger: "change"
          }
        ]
      }
    }

  },

  create(){
    this.getName();
  },

  methods:{
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    getName() {
      this.myName = window.sessionStorage.getItem("name");
    },
    //修改信息
    update1(){
      this.getName();
      this.$refs.updateformRef.validate(async valid => {
        if (!valid){
          this.$message.error("不符合规范哦!");
          return;}
        this.updateForm.prename=this.myName;
        const {data:resultUser}=await this.$http.post("/userUpdate",this.updateForm);
        if(resultUser==="error")return this.$message.error("修改失败");
        this.$message.success("修改成功");
        this.updateDialogVisible=false;
        await this.$router.push("/login");
      });
    }
  }
}
</script>

<style scoped>

.page {
  width: 100% !important;
  height: 100% !important;
  background-color: #a2b6b9;
}

.contain{
  width: 100%;
  height: 100%;
}

.userinfo{
  width: 100%;
  height: 100%;
  position: relative;
}
.userinfo>img{
  max-width: 75%;
  max-height: 75%;
  size: auto;
}

.changebutton1{
  position: relative;
  margin: auto;
}
.changebutton2{
  margin: auto;
  position: relative;
}

</style>