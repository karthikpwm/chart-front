<template>
<div>
  <h1> Import NSE Data excel  </h1><br>
  <div class="text-center">
    <input type="file" ref="file" @change="onChange($event)">
    
    <v-btn
      
      color="blue-grey"
      class="ma-2 white--text"
     @click="onUploadFile"
      
     
    >
      Upload
      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
    </v-btn>
    
    </div>
</div>
</template>



<script>

import * as XLSX from 'xlsx';
import axios from "axios";
import {URL} from './../helper/consts'

  export default {

    async mounted () {

      //this.fetchdata()
      
    //await this.onUploadFile();
    
    //this.timer = setInterval(this.fetchData, 300000);
    // this.showLocaleTime();
    

    },

    methods: {
      onChange(event) {
        //console.log('hiiii')
        //console.log('ooooo',this.file)
        
       

      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();
        //console.log('hgnjjyh',this.file)
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary',cellDates: true,
  cellNF: false,
  cellText: false});
  
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {  skipHeader: true });
          
         
          this.excelData = data;
          
          //console.log('pppppp',data)
          // data.forEach(val => {
          //   let zx = val.CLOSE - val.PREVCLOSE;
          //   let cv = (zx / val.PREVCLOSE * 100).toFixed(2);
          //   val.diff = cv
          //   console.log('diffff',val.diff)
          // })
         
         

        //  data.map((item) => {
        //   this.itemsList.push(item.XLSX);
        // });
        //let rsedata = data
        //rsedata.forEach(element => {
          // let ab = element.PREVCLOSE ;
          // let bc = element.CLOSE;

          // let cd = bc.toFixed(2)- ab.toFixed(2);
          // let da = cd / element.PREVCLOSE * 100;
          // console.log(da.toFixed(2))
        //});
          //console.log('pppppp',data.PREVCLOSE)

          //this.data = data;
           

             }
      reader.readAsBinaryString(this.file);
      }
      //console.log('tooo')
      },

      // async fetchdata () {
           
      //      await axios .get(`${URL}analytic/fetchmarket`,
      //      )
      //      .then (async (res) => {
             
      //        let resdata = res.data.data
      //        console.log(resdata)
             
             
      //        resdata.forEach(val => {
      //          let pi = val.capvalue;
      //          console.log('pocccc',pi)
      //        })
      //      })

            
      //    },

      onUploadFile() {
      
      axios.post(`${URL}analytic/uploadnse`, 
      { excelData : this.excelData 
          })
        .then(res => {
          console.log(res);
        })    
        .catch(err => {
          console.log(err);
        });

        // axios.post(`${URL}analytic/updatemarket`,
        // { excelData : this.excelData

        // })
        // .then(res => {
        //   console.log(res);
        // })    
        // .catch(err => {
        //   console.log(err);
        // });
    },
     
     
      data: () => {
      return {
        // itemsList : [],
        vn :0,
        loader: null,
        da : '',
        loading3: false,
        
      }
    }
   },
   
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>