<template>
  <div id="app">
      <b-button v-show="empty" @click="randomdata()">Randomize Data</b-button>
<router-view></router-view>
 </div>
</template>

<script>
export default {
  name: 'App',
   data() {
      return {
        empty:true,
        maindata:[]
      }},
   methods:{
    randomdata(){
      this.empty=false
          
      for(var i=0;i<1000;i++){
               var temp = new Object();
          temp["id"]= i+1,
          temp["jobtitle"]=this.$faker().name.jobTitle();
          temp["email"]=this.$faker().internet.email();
          temp["name"]=this.$faker().name.firstName() +" "+this.$faker().name.lastName();
          temp["country"]=this.$faker().address.country();
          temp["q1sal"]=this.$faker().datatype.number();
          temp["q2sal"]=this.$faker().datatype.number();
          temp["q3sal"]=this.$faker().datatype.number();
          temp["q4sal"]=this.$faker().datatype.number();
          temp["q1wh"]=this.$faker().finance.amount();
          temp["q2wh"]=this.$faker().finance.amount();
          temp["q3wh"]=this.$faker().finance.amount();
          temp["q4wh"]=this.$faker().finance.amount()          
this.maindata.push(temp)     
      }
      this.$router.push('/employees');
  }
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
