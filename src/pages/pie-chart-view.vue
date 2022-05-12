<template>
  <div>
    
  <PieCharts @point-click="point = $event.point"/>
  <br><br>
    <PieChartsa @point-click="point1 = $event.point1"/>
    <br><br>
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