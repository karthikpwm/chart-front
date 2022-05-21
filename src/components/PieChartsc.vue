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
          text: '',
             },
             tooltip: {
          pointFormat: "{point.name}: <b>{point.y}</b>",
        },
             
          plotOptions: {
            pie: {
              innerSize: 20,
              depth: 45,
              
              dataLabels: {
                alignTo: 'plotEdges',
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.2f} %",
            },
            },
            series: {
              cursor: 'pointer',
              allowPointSelect: true,
              dataSorting: {
            enabled: true
        },
              
              colors: ['#ffb3ff', '#b3ffb3', '#b3d9ff', '#ffccb3', '#ffff99', '#ffb3d9', '#e0b3ff', '#00e6e6', '#a6a6a6','#661aff','#d2ff4d','#ffdd99','#c2c2a3',
               '#df9fbf','#ff9999','#80ffdf','#666699','#ffb84d','#b3b3b3','#ff6666','#5A7247','#E94B3C','#DBB1CD','#FF6F61','#00539C','#FFD662','#8D9440','#00A591','#BFD641','#ffcc5c'
              ],
            }
          },
          series: [{
             
          }]
        }
    }
  },
  methods: {
     async fetchdata () {
       //console.log(URL)
     await axios
     .get(`${URL}analytic/market`)
      .then(async(res) =>{
        // handle success
        //console.log('yhh',res.data);
        let resData = res.data.data;
        console.log('tttt',resData)

        resData.forEach(val => {
          // console.log('pppp',element.prevclose,element.quantity)
          val.prevclose = val.close || 1
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
// console.log(resData.stock_name)
//         let labels = []; 
//       labels = resdata.sector
// let data1 = [] ;
//       data1= resdata.perc

      

// // Construct and array of objects that have 'label' and 'data'
// // We expect that labels and data1 are the same length but if there is
// // a chance that they are not, you should check for that.
// const allData = [];
// for (let i = 0; i < labels.length; ++i) {
//     allData.push({
//         label: labels[i],
//         data: data1[i]
//     });
// }

// // Sort them by the data value
// allData.sort((a, b) => a.data - b.data);

// // And split them again
// const sortedLabels = allData.map(e => e.label);
// const sortedData = allData.map(e => e.data);

// console.log(sortedLabels);   // ["B", "A", "D", "C"] 
// console.log(sortedData);     // [1, 3, 5, 10] 

const formattedData = resdata.reduce((previousValue, { marketcap, nomarketcap }) => {
    if (!previousValue[marketcap]) {
        previousValue[marketcap] = { marketcap, perc: 0 };
    }
    previousValue[marketcap].perc += +nomarketcap;
    return previousValue;
}, {});



 //console.log('haaaaai',Object.values(formattedData));
// const allData = [];
// for (let i = 0; i < Object.values(formattedData).length; ++i) {
//     allData.push({
//         label: sector,
//         data: perc
//     });
// }
// allData.sort((a, b) => a.data - b.data);
//  const sortedLabels = allData.map(e => e.label);
//  const sortedData = allData.map(e => e.data);

//   console.log(sortedLabels);   // ["B", "A", "D", "C"] 
//  console.log(sortedData);

     this.data = Object.values(formattedData);
     this.setStock();
      })
    

    },

    stockinsert() {

      axios.post(`${URL}analytic/markinsert`, { excelData : this.resData })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

    },

    setStock() {
      // let perData = [];
      // this.data.forEach((x) => {
      //   perData.push([x.sector, parseFloat(x.perc) || 0]);
      // });
      
       let labels123 = [];
     let data123 = [] 
      this.data.forEach(element => {
        
       let ab = element.marketcap
        labels123.push(ab)
        let bdc = element.perc
        data123.push(bdc)
      })
      let labels = labels123;
      let data1 = data123;
       //console.log('ssss',labels)
       //console.log('tttt',data1)

       const allData = [];
for (let i = 0; i < labels.length; ++i) {
    allData.push({
        label: labels[i],
        data: data1[i]
    });
}
  allData.sort((a, b) => b.data - a.data);
     const sortedLabels = allData.map(e => e.label);
 const sortedData = allData.map(e => e.data);

 console.log(sortedLabels);   
console.log(sortedData); 
//console.log('all',allData)    

let perData = [];
      allData.forEach((x) => {
        perData.push([x.label, parseFloat(x.data) || 0]);
      });

      let lineCharts = this.$refs.pieChart;
      lineCharts.delegateMethod("showLoading", "Loading...");
      //console.log(perData)
      //let pdata = perData.data
      //console.log(pdata)
   
      lineCharts.removeSeries();
      lineCharts.addSeries({
        name: "Sector wise",
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

