<template>
  <section class="charts">
    <vue-highcharts
      :options="pieOptions"
      :updateArgs="[true, true, true]"
      ref="pieChart"
    ></vue-highcharts>
    <div class="debug">
      <div></div>
    </div>
  </section>
</template>

<script>
import VueHighcharts from "vue2-highcharts";
 import axios from "axios";
 import { URL } from "../helper/consts";

export default {
  components: {
    VueHighcharts,
  },

  mounted() {
    // api
    
    
    // this.data = [
     
    // ];
     this.fetchdata();
    //this.timer = setInterval(this.fetchData, 300000);
    // this.showLocaleTime();
  },
  props: ["score", "show"],
  data() {
    return {
      data: [],
      showOverlay: false,
      pieOptions: {
        chart: {
          type: "pie",
          options3d: {
            enabled: false,
            alpha: 45,
          },
        },
        title: {
          text: "Stockwise Holding",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.2f}%</b>",
        },
        plotOptions: {
          pie: {
            innerSize: 20,
            depth: 45,
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.2f} %",
            },
          },
          series: {
            cursor: "pointer",
            point1: {
              events: {
                click: ({ point1 }) => {
                  this.showOverlay = !this.showOverlay;
                  this.$emit("point-click", { point1 });
                },
              },
            },
          },
        },
        series: [],
      },
    };
  },

  methods: {
    async fetchdata () {
     await axios
     .get(`${URL}analytic`)
      .then(async(res) =>{
        // handle success
        //console.log('yhh',res.data);
        let resData = res.data.data;
        //console.log('tttt',resData)

        resData.forEach(val => {
          // console.log('pppp',element.prevclose,element.quantity)
          
          val.prevclose = val.prevclose || 1
          let ab = val.prevclose * val.quantity ;
          val.userholding = ab
          // this.userholding = ab
          //console.log(userholding) 
         });
         resData = resData.map(function (val) {
         val.ab = val.quantity * val.prevclose;
         //console.log('sum',val.ab)
         })
        let sum = 0;
           let resdata = res.data.data;
        resdata.forEach(val => {
          //console.log('kokok',resdata)
          sum += parseFloat(val.ab); 
        })
       let cd = sum.toFixed(2);
       resData = resdata.map(function(val){
           val.sum = cd;
           let qw = (val.ab / val.sum) * 100;
           val.per = qw.toFixed(2);
       })
         
      // console.log(resData)
         
        //this.sum = sum;
          //console.log('mmm',sum)
        //let km = resdata
         //console.log('eeee',km)
      //   let Data = [];
      // resdata.forEach((x) => {
      //   Data.push([x.stock_name, x.per]);
      // }); 
         //console.log('abbbaaa', resdata)
     this.data = resdata;
     this.setStock();
      })

    },

    setStock() {
      let perData = [];
      this.data.forEach((x) => {
        perData.push([x.stock_name, parseFloat(x.per) || 0]);
      });
      let lineCharts = this.$refs.pieChart;
      lineCharts.delegateMethod("showLoading", "Loading...");
   
      lineCharts.removeSeries();
      lineCharts.addSeries({
        name: "Stock wise",
        data: perData
      });
      lineCharts.hideLoading();
    },
    // async fetchData () {
    //      await axios
    //     .get(`${URL}chart/`)
    //     .then( async (res) => {
    //      console.log('fhyjf',res.data)
    //     })
    // }
  },
};
</script>
