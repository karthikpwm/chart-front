<template>
  <section class="charts">
    <vue-highcharts :options="pieOptions" ref="pieChart"></vue-highcharts>
    <div class="debug">
      <div></div>
    </div>
  </section>
</template>

<script>
import VueHighcharts from 'vue2-highcharts'
import axios from "axios";
import { URL } from "../helper/consts"



export default {
  components: {
    VueHighcharts
  },
  mounted() {
  this.fetchdata();
},
  props: ['score', 'show'],
  data() {
    return {
      showOverlay: false,
      pieOptions:
        {
          chart: {
            type: "pie",
            options3d: {
              enabled: true,
              alpha: 45
            }
          },
          title: {
          text: 'Industrywise Holding'
             },
             tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.2f}%</b>",
        },
             
          plotOptions: {
            pie: {
              innerSize: 100,
              depth: 4,
              dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.2f} %",
            },
            },
            series: {
              cursor: 'pointer',
              point: {
                events: {
                  click: ({point}) => {
                    this.showOverlay = !this.showOverlay;
                    this.$emit('point-click', {point});
                  }
                }
              }
            }
          },
          series: []
        }
    }
  },
  methods: {
     async fetchdata () {
     await axios
     .get(`${URL}analytic/industry`)
      .then(async(res) =>{
        // handle success
        //console.log('yhh',res.data);
        let resData = res.data.data;
        console.log('tttt',resData)

        resData.forEach(val => {
          // console.log('pppp',element.prevclose,element.quantity)
          let ab = val.prevclose * val.quantity;
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

const formattedData = resdata.reduce((previousValue, { industry, per }) => {
    if (!previousValue[industry]) {
        previousValue[industry] = { industry, perc: 0 };
    }
    previousValue[industry].perc += +per;
    return previousValue;
}, {});

console.log('haaaaai',Object.values(formattedData));

     this.data = Object.values(formattedData);
     this.setStock();
      })

    },

    setStock() {
      let perData = [];
      this.data.forEach((x) => {
        perData.push([x.industry, parseFloat(x.perc) || 0]);
      });
      let lineCharts = this.$refs.pieChart;
      lineCharts.delegateMethod("showLoading", "Loading...");
   
      lineCharts.removeSeries();
      lineCharts.addSeries({
        name: "Industry wise",
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

