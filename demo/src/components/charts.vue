<template>
  <div class="page">
    <el-container class="contain">
      <el-aside style="width: 24%">
        <sidebar></sidebar>
      </el-aside>
      <el-main class="charts">
        <el-tabs v-model="datetype" type="card" class="tabsx">
<!--          <el-tab-pane label="按年统计" name="year">-->
<!--            <br>-->
<!--            <el-date-picker-->
<!--                v-model="date"-->
<!--                type="year"-->
<!--                placeholder="选择年">-->
<!--            </el-date-picker>-->
<!--          </el-tab-pane>-->
          <el-tab-pane label="按月统计" name="month">
            <br>
            <el-date-picker
                v-model="date"
                type="month"
                placeholder="选择月">
            </el-date-picker>
          </el-tab-pane>
          <el-tab-pane label="按周统计" name="week">
            <br>
            <el-date-picker
                v-model="date"
                type="week"
                placeholder="选择周">
            </el-date-picker>
          </el-tab-pane>
        </el-tabs>
        <br>
        <el-button type="success" @click="getach">切换视图</el-button>
        <br>
        <div id="echart" class="chartclass"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import * as echarts from "echarts";

export default {
  components:{
    sidebar
  },
  name: "charts",
  data(){
    return{
      datetype:"month",
      date:"",
      chartarr:[],
      xdate:[],
      ycount:[],
      echartsOption:{
        grid:{
          x:"15%",
          y:'10%',
          x2:'18%',
          y2:'10%'
        },
        xAxis:{
          type:'value',
          name:'日期',
          scale:true,
          minInterval:1,
          axisTick:{
            alignWithLabel:true,
          },
          nameTextStyle:{
            fontTextStyle:400,
            fontsize:18
          },
          boundaryGap:false,
          data:this.xdate,
        },
        yAxis:{
          type:'value',
          name:'专注次数',
          minInterval:1,
          nameTextStyle:{
            fontTextStyle:400,
            fontsize:18
          },
          scale:true,
          boundaryGap: false,
          axisLabel: {
            formatter: '{value}次',
            align:'right'
          },
        },
        tooltip:{
          trigger:'axis',
          // axisPointer:{type:'cross'}
        },
        series:[{
            name:'专注次数',
            type:'line',
            smooth:false,
            data:this.ycount,
          }]
      }
    }
  },
  mounted() {
    this.echart = echarts.init(document.getElementById('echart'),'light');
    this.echart.setOption(this.echartsOption);
  },

  methods:{
    async getach(){
      if(this.datetype==="year"){
        let d=new Date(this.date);
        let startdate=d.toISOString();
        let xenddate=(d.getFullYear()+1)+'-'+(d.getMonth() + 1)+'-'+d.getDate()+' '+ d.getHours()+':'+d.getMinutes();
        let enddate=new Date(xenddate).toISOString();

        const result = await this.$http.post("/getAchbytime",{startdate:startdate,enddate:enddate});
      }
      else if(this.datetype==="month"){
        let d=new Date(this.date);
        let startdate=this.date.toISOString();
        let xenddate=(d.getFullYear())+'-'+(d.getMonth() + 2)+'-'+d.getDate()+' '+ d.getHours()+':'+d.getMinutes();
        let enddate=new Date(xenddate).toISOString();

        const result = await this.$http.post("/getAchbytime",{startdate:startdate,enddate:enddate});

        for(let key in result.data){
          let sdate=new Date(result.data[key]._id).getDate();
          this.xdate.push(sdate);
          this.ycount.push([sdate,result.data[key].count]);
        }
        this.ycount.sort(function (a,b){return a[0]-b[0]});
        this.echartsOption.xAxis.data=this.xdate;
        this.echartsOption.series[0].data=this.ycount;
        this.echart.setOption(this.echartsOption);
      }
      else if(this.datetype==="week"){
        let d=new Date(this.date);
        let startdate=this.date.toISOString();
        let xenddate=(d.getFullYear())+'-'+(d.getMonth() + 1)+'-'+(d.getDate()+7)+' '+ d.getHours()+':'+d.getMinutes();
        let enddate=new Date(xenddate).toISOString();

        const result = await this.$http.post("/getAchbytime",{startdate:startdate,enddate:enddate});

        this.ycount=[];
        this.xdate=[];
        for(let key in result.data){
          let sdate=new Date(result.data[key]._id).getDate();
          this.xdate.push(sdate);
          this.ycount.push([sdate,result.data[key].count]);
        }
        this.ycount.sort(function (a,b){return a[0]-b[0]});
        this.echartsOption.xAxis.data=this.xdate;
        this.echartsOption.series[0].data=this.ycount;
        this.echart.setOption(this.echartsOption);
      }
    },
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
.charts{
  width: 100%;
}
.tabsx{
  width: 100%;
}
.chartclass{
  max-width: 80%;
}
#echart{
  width: 85%;
  height: 50%;
  margin: 5% 5% 5% 5%;
  background-color: white;
}

</style>