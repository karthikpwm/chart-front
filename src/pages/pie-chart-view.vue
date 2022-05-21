<template>
  <div>
    <h2>SECTORWISE HOLDING </h2>
    <br><br>
  <PieCharts @point-click="point = $event.point"/>
  <br><br>
  <br><h2>STOCKWISE HOLDING</h2><br>
    <PieChartsa @point-click="point1 = $event.point1"/>
    <br><br><h2>INDUSTRYWISE HOLDING</h2>
    
    <PieChartsb />
     <br><br><h2>Market Cap</h2>
     <PieChartsc />
  </div>
</template>



<script>

import PieCharts from "../components/PieCharts.vue";
import PieChartsa from "../components/PieChartsa.vue";
import PieChartsb from "../components/PieChartsb.vue";
import PieChartsc from "../components/PieChartsc.vue";
  export default {
    name : 'App',
    components : {
      PieCharts,PieChartsa,PieChartsb,PieChartsc
    },
    data () {
      return {
        drawer : false
      }
    },
    methods : {
      drawerChange () {
        console.log(this.drawer, !this.drawer)
        this.drawer = !this.drawer
      }
    }
  }
</script>