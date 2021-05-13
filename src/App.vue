<template>
  <div id="app">
      <b-button v-show="empty" @click="randomdata()">Randomize Data</b-button>
<router-view></router-view>
 </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
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
                var db = firebase.firestore();
      db.collection("Sample").doc("empdoc")
    .onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
       var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
       console.log(source, " data: ", doc.data());
        this.maindata = doc.data().employee;
    });
    if(this.maindata.length==0) {
for(var i=0;i<100000;i++){
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
    db.collection("Sample").doc("empdoc").set({
    employee: this.maindata
    }).then(
    this.$router.push('/employees')
)
.catch((error) => {
    console.error("Error adding document: ", error);
});
}
else{
  this.$router.push('/employees')
}          
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
