<template>
  <div class="primary">
    <el-container class="container">
      <sidebar></sidebar>
      <el-main class="main">
        <el-container>
          <!--主体的头部包括搜索栏+搜索按钮和提问按钮（新建问题）-->
          <el-header class="mainHeader">
            <!--搜索条-->
<!--            待定-->
            <!--创建新的主题按钮-->
            <span style="width: 50%;visibility: hidden"></span>
            <el-button type="primary" icon="el-icon-circle-plus-outline" style="margin-top: 15px" round @click="addDialogVisible=true">创建todo</el-button>
          </el-header>
          <el-main class="mainMain">
            <todolist></todolist>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <!--添加新todo的对话框-->
    <el-dialog title="新建todo" :visible.sync="addDialogVisible" width="85%">
      <el-form ref="addformRef" :model="addForm" :rules="addFormRules">
        <!-- 题目 -->
        <el-form-item prop="title">
          <el-input v-model="addForm.title" placeholder="请输入todo主题"></el-input>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item prop="describe">
          <el-input
              v-model="addForm.des"
              placeholder="具体描述..."
              type="textarea"
              :autosize="{ minRows: 1}"
              maxlength="100"
              show-word-limit
              style="resize: none"
          ></el-input>
        </el-form-item>
        <!-- 优先级 -->
        <el-form-item prop="priority">
          <el-radio-group v-model="addForm.priority">
            <el-radio-button label="1">紧急</el-radio-button>
            <el-radio-button label="2">尽快</el-radio-button>
            <el-radio-button label="3">牢记</el-radio-button>
            <el-radio-button label="4">闲时</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!--截止时间-->
        <el-form-item prop="et">
          <el-date-picker
              v-model="addForm.et"
              type="datetime"
              format="yyyy-MM-dd H:m"
              value-format="yyyy-M-dd H:m"
              placeholder="选择截止日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
<!--      <el-button @click="test">测 试</el-button>-->
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addtodo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import todolist from "@/components/todolist";

export default {
  components:{
    sidebar,
    todolist
  },
  data() {
    var that=this;
    //新建的todo（title）验证函数
    var titleCheck=async function(rule,value,callback){
      const {data:result}=await that.$http.post('/titleCheck',{title:value});
      if(result==="success"){
        that.$message.success("可用!");
        return callback();}
      that.$message.error("这个主题已建立!");
      callback(new Error("重名啦"));
    }

    return {

      myName: "",
      input: "",
      addDialogVisible: false,
      //提交新主题的对象（题目，发起人，时间，描述）
      addForm: {
        title: "",
        des: "",
        st: "",
        et: "",
        category: "无",
        priority: "1",
        pagenum:0,
      },
      //修改信息
      updateForm:{
        username:"",
        password:"",
        name:"",
        confirm:"",
        prename:""
      },
      updateDialogVisible:false,
      //提交表单的规则
      addFormRules: {
        title: [
          { required: true, message: "输入todo主题！", trigger: "change" },
          { min: 3, max: 16, message: "请输入3-16位字符", trigger: "change" },
          { validator: titleCheck, trigger: 'blur' }
        ],
        des: [
          { required: true, message: "输入描述！", trigger: "change" },
          { min: 0, max: 100, message: "请输入描述！", trigger: "change" }
        ],
        et:[
          { required: true, message: "选择截止时间！", trigger: "change" },
        ]
      },
    };
  },
  created() {
    this.getName();
  },
  methods: {
    //返回首页
    tohome() {
      this.$router.push("/all");
    },
    //进来时使用login设置好的session获取用户名
    getName() {
      this.myName = window.sessionStorage.getItem("name");
    },
    async addtodo() {
      //在发送之前需要验证输入的内容是否符合rules中的各个规则不符合则返回，并显示提示信息
      this.$refs.addformRef.validate(async valid => {
        if (!valid){
          this.$message.error("不符合规范哦!");
          return;}
        this.addForm.st = this.getLocalTime(this.addForm.st);
        const result=await this.$http.post("/addTodo",this.addForm);
        if(result.status!==200)return this.$message.error("新建失败!");
        this.$message.success("新建成功!");
        this.addDialogVisible = false;
        //重置表单
        this.$refs.addformRef.resetFields();
        //如果不进行页面刷新则无法立即显示新加入的todo，但是新todo的问题是会加载出来但是总条数还是原来的总条数（设计有问题）
        this.$router.go(0);
      });
    },
    //获取发送的时间格式为YYYY-MM-DD HH:Minute
    getLocalTime(result) {
      result = "";
      var time = new Date();
      var year = time.getFullYear().toString();
      var month = (time.getMonth() + 1).toString();
      var date = time.getDate().toString();
      var hour = time.getHours().toString();
      var minutes = time.getMinutes().toString();
      result = year + "-" + month + "-" + date + " " + hour + ":" + minutes;
      return result;
    },
  }
};
</script>

<style lang="less" scoped>
.board{
  font-size: xx-large;
  margin: 0 10px 0 10px;
  background-color: #fcf4f3;
  font-style: revert;
  height: 240px;
}

.primary {
  //margin: 0 7.5%;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  color:#777777;

  .icon {
    height: 120px;
    font-size: 30px;
    margin-bottom: 10px;
    border: 1px solid black;
    background-color: #6e8f91;
    background-image: url('../assets/head.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .container {
    width: 100% !important;
    height: 100% !important;
    .aside {
      width: 25% !important;
      height: 100% !important;
      .asideHeader {
        margin: 0 auto;
        width: 90%;
        height: 30%;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid rgb(253, 229, 41);
        border-radius: 20px;
        h2 {
          display: inline-block;
        }
        .asideDiv {
          display: inline-block;
          height: 80%;
          width: 20%;
          img {
            width: auto;
            height: 100%;
          }
        }
      }
      .asideMain {
        width:100%;
        height: 100%;
        position: relative;
      }
      .asideMain > div {
        width: 100%;
        height: 50px;
        background-color: rgb(96, 143, 169);
        color: white;
        text-align: center;
        line-height: 50px;
        position: relative;
        overflow: hidden;
        margin-bottom: 10px;
        border-radius: 5px;
      }
      .asideMain > div::before {
        content: "";
        width: 25px;
        height: 30px;
        border-radius: 30px;
        background: rgb(212, 228, 250);
        position: absolute;
        display: block;
        right: -15px;
        top: 11px;
      }
      .asideMain > div:hover {
        color: rgb(253, 229, 41);
        cursor: pointer;
        box-shadow: -2px -2px 10px #000;
      }
    }
    .main {
      height: 100%;
      padding: 0;
      .mainHeader {
        width: 100%;
        height: 60px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .mainMain {
        width: 100%;
        height: 100%;
        border: 3px solid rgba(253, 229, 41, 0.2);
        border-radius: 20px;
        background-color: #fff;
        padding: 10px;
      }
    }
  }
}
</style>