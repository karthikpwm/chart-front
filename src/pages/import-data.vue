<template>
 <div><br><br><br> Import the Excel file of Stock quantity here.<br>
 <br>
 <br>
 <br>
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
          //const minrow = 23;
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {  skipHeader: true });
          //data = data.slice(minrow <= 23 ? 0 : minrow -23)
          this.excelData = data;
        //  data.map((item) => {
        //   this.itemsList.push(item.XLSX);
        // });
          console.log('pppppp',data)

          //this.data = data;
        }
      reader.readAsBinaryString(this.file);
      }
      //console.log('tooo')
      },

      onUploadFile() {
    
      
      axios.post(`${URL}analytic/upload`, { excelData : this.excelData })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

       window.location.reload();
    },
     
     
      data: () => {
      return {
        // itemsList : [],
        vn :0,
        loader: null,
        
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