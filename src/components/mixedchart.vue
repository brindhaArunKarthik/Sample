<template>
  <div>
    <canvas id="mixed-chart">
    </canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'MixedChart',
  props:{
    content:{
    type: String
  }},
  data() {
    return {
      mixedchartdata:  {
    type: "line",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Salary",
          type: "line",
          data: [],
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3,
          yAxisID: 'first-y-axis'
        },
        {

          label: "Working Hours",
          type: "bar",
          data: [],
          backgroundColor: "rgba(71, 183,132,.5)",
          borderColor: "#47b784",
          borderWidth: 3,
          yAxisID: 'first-y1-axis'
        }
      ]
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes:[
          {
            id: 'first-y-axis',
            position:"left"
          }
        ,
         {
            id: 'first-y1-axis',
            position:"right"
          }
        ]
      }
    }
  }
  }},
  created(){
    console.log("content");
    console.log(this.content);
    var temp =JSON.parse(this.content)
        this.mixedchartdata.data.datasets[0].data.push(temp.q1sal); 
    this.mixedchartdata.data.datasets[0].data.push(temp.q2sal);
    this.mixedchartdata.data.datasets[0].data.push(temp.q3sal);
    this.mixedchartdata.data.datasets[0].data.push(temp.q4sal);
    console.log("mixedchartdata");
    console.log(this.mixedchartdata);
     this.mixedchartdata.data.datasets[1].data.push(temp.q1wh); 
    this.mixedchartdata.data.datasets[1].data.push(temp.q2wh);
    this.mixedchartdata.data.datasets[1].data.push(temp.q3wh);
    this.mixedchartdata.data.datasets[1].data.push(temp.q4wh);
   },
  watch: { 
      content: function(val) { 
      //  var temp=JSON.parse(val)
      var temp =val
        this.mixedchartdata.data.datasets[0].data.push(temp.q1sal); 
    this.mixedchartdata.data.datasets[0].data.push(temp.q2sal);
    this.mixedchartdata.data.datasets[0].data.push(temp.q3sal);
    this.mixedchartdata.data.datasets[0].data.push(temp.q4sal);
    console.log("mixedchartdata");
    console.log(this.mixedchartdata);
    this.mixedchartdata.data.datasets[1].data= [this.content.q1wh, this.content.q2wh, this.content.q3wh, this.content.q4wh];
      }
    },
  mounted() {
    const ctx = document.getElementById('mixed-chart');
    new Chart(ctx, this.mixedchartdata);
  }
}
</script>