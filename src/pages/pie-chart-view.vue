<template>
  <div>
    <h2>SECTORWISE HOLDING </h2>
    <br>
  <PieCharts @point-click="point = $event.point"/>
  <br>
  <br><h2>STOCKWISE HOLDING</h2><br>
    <PieChartsa @point-click="point1 = $event.point1"/>
    <br><br><h2>INDUSTRYWISE HOLDING</h2>
    
    <PieChartsb />

  </div>
</template>



<script>

import PieCharts from "../components/PieCharts.vue";
import PieChartsa from "../components/PieChartsa.vue";
import PieChartsb from "../components/PieChartsb.vue";
  export default {
    name : 'App',
    components : {
      PieCharts,PieChartsa,PieChartsb
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