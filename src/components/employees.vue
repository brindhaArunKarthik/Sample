<template>
<b-container>
  <div>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group>
                  <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="12" md="6" lg="2" class="my-1">
        <b-form-group>
          <b-row>
            <b-col sm="5" md="6" lg="5" style="padding:0px">
          Per Page
            </b-col>
            <b-col sm="3" md="3" lg="5" style="padding:0px">
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="4" lg="4" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <div v-if="items.length==0">
    <div class="text-center mb-3 d-flex justify-content-between">
      <b-spinner
        variant="success"
        key="variant"
      ></b-spinner>
    </div> 
     <div class="text-center d-flex justify-content-between">
      <b-spinner
        variant="success"
        key="success"
        type="grow"
      ></b-spinner>
    </div>
    </div>
        <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >

    <!-- <template :slot="`HEAD_${ key1 }`" slot-scope="data">
            <b-form-group>
       <input type="checkbox" class="form-control form-control-sm" @click="addup(data)" v-model="q1salcheck" />
   </b-form-group>
   
    </template> -->
    <template #head(q1sal)="data">
        <span>{{ data.label}}</span>
         <input type="checkbox" v-model="q1salcheck" />
      </template>
      <template #head(q2sal)="data">
        <span>{{ data.label}}</span>
         <input type="checkbox" v-model="q2salcheck" />
      </template>
      <template #head(q3sal)="data">
        <span>{{ data.label}}</span>
         <input type="checkbox" v-model="q3salcheck" />
      </template>
      <template #head(q4sal)="data">
        <span>{{ data.label}}</span>
         <input type="checkbox" v-model="q4salcheck" />
      </template>
      <template #cell(totsal)="data">
        <!-- {{data}} -->
        <span>{{ sumsal(data.item.q1sal,data.item.q2sal,data.item.q3sal,data.item.q4sal,"sal")}}</span>
      </template>
      <template #cell(totwh)="data">
        <!-- {{data}} -->
        <span>{{ sumsal(data.item.q1wh,data.item.q2wh,data.item.q3wh,data.item.q4wh,"wh")}}</span>
      </template>
       <template #cell(actions)="row">
        <b-button-toolbar>
      <b-button-group class="mr-1">
        <b-button @click="info(row.item, row.index, $event.target)">
          <b-icon icon="eye" aria-hidden="true"></b-icon>
        </b-button>
        <b-button @click="editmodal(row.item, row.index, $event.target)">
          <b-icon icon="pencil" aria-hidden="true"></b-icon>
        </b-button>
        <b-button @click="removedata(row.index)">
          <b-icon icon="trash" aria-hidden="true"></b-icon>
        </b-button>
        </b-button-group>
    </b-button-toolbar>
      </template>
      </b-table>
  </div>

  <b-modal :id="'edit'+infoModal.id" :title="infoModal.title" ok-only @show="seteditdata(JSON.parse(infoModal.content))" @ok="editinfo(JSON.parse(infoModal.content))">
    <b-container fluid>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Name:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoname" placeholder="Enter new name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Job Title:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infotitle" placeholder="Enter new Job Title"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Country:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infocountry" placeholder="Enter new country"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Q1 Salary:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq1sal" placeholder="Enter Q1 salary"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Q2 Salary:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq2sal" placeholder="Enter Q2 salary"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Q3 Salary:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq3sal" placeholder="Enter Q3 salary"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Q4 Salary:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq4sal" placeholder="Enter Q4 salary"></b-form-input>
      </b-col>
    </b-row>
      <b-row class="my-1">
      <b-col sm="3">
        <label>Q1 Working Hours:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq1wh" placeholder="Enter Q1 Working Hours"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Q2 Working Hours:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq2wh" placeholder="Enter Q2 Working Hours"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Q3 Working Hours:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq3wh" placeholder="Enter Q3 Working Hours"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Q4 Working Hours:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoq4wh" placeholder="Enter Q4 Working Hour"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
  </b-modal>
  
  <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @show="setdata(JSON.parse(infoModal.content))" @hide="resetInfoModal()" @ok="updateinfo(JSON.parse(infoModal.content))">
            <b-container fluid>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Name:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infoname" placeholder="Enter new name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label>Job Title:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input v-model="infotitle" placeholder="Enter new Job Title"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
      <Mixedchart v-bind:content="infoModal.content"></Mixedchart>
    </b-modal>
  </b-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { Bar } from 'vue-chartjs'
import Mixedchart from './mixedchart.vue'
  export default {
    extends: Bar,
    data() {
      return {
        infotitle:"",
        infoname:"",
        infocountry:"",
        infoq1sal:"",
        infoq2sal:"",
        infoq3sal:"",
        infoq4sal:"",
        infoq1wh:"",
        infoq2wh:"",
        infoq3wh:"",
        infoq4wh:"",
        q1salcheck:false,
        q2salcheck:false,
        q3salcheck:false,
        q4salcheck:false,
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: ["country"],  
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        fields: [
          {
            key: 'id',
            label: 'Unique ID',
            },
            {
            key: 'name',
            label: 'Name',
            sortable: false},
            {
            key: 'jobtitle',
            label: 'Job title',
            sortable: true},
            {
            key: 'country',
            label: 'Country',
            sortable: false},
            {
            key: 'q1sal',
            label: 'Salary Q1',
            sortable: false},
            { 
            key: 'q2sal',
            label: 'Salary Q2',
            sortable: false},
            {
            key: 'q3sal',
            label: 'Salary Q3',
            sortable: false},
            {
            key: 'q4sal',
            label: 'Salary Q4',
            sortable: false},
            {
            key: 'totsal',
            label: 'Total Salary',
            sortable: false},
            {
            key: 'totwh',
            label: 'Total working hours',
            sortable: false},
            { key: 'actions', label: 'Actions' }
            ],
        items: [],
      
    }
    },
    components:{
        Mixedchart
    },
    created(){
      console.log("from emp created");
      var db = firebase.firestore();
      db.collection("Sample").doc("empdoc")
    .onSnapshot((doc) => {
       var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
       console.log(source, " data: ", doc.data());
        this.items = doc.data().employee;
     this.totalRows = this.items.length
     });
      //this.items = firebase.firestore().collection('samples').doc("empdoc").get();
     
    },
     methods: {
       sumsal(m,n,o,p,q){
         if(q=="sal"){
           var temp =0
           if(!this.q1salcheck && !this.q1salcheck && !this.q1salcheck && !this.q1salcheck) {
             temp= m+n+o+p;
           } else {
if(this.q1salcheck){
temp=temp+m
}
if(this.q2salcheck){
temp=temp+n
}
if(this.q3salcheck){
temp=temp+o
}
if(this.q4salcheck){
temp=temp+p
}
}
return temp
         }else {
return m+n+o+p;
         }

       },
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      editmodal(item, index, button) {

        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'edit'+this.infoModal.id, button)
        //this.$bvModal.show(id)
      },
      removedata(index) {
        this.items.splice(index,1);
      this.updatefirestore();
      },
      updateinfo(id) {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.items[id.id-1].name= this.infoname
        this.items[id.id-1].jobtitle= this.infotitle
        this.updatefirestore();
        this.infoname="";
this.infotitle="";
      },
    updatefirestore() {
    var db = firebase.firestore();
    db.collection("Sample").doc("empdoc").update({
    employee: this.items
    })
      },
      resetInfoModal() {
         this.infoModal.title = ''
         this.infoModal.content = ''
         this.infoname="";
this.infotitle="";
      },
      editinfo(id) {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.items[id.id-1].name= this.infoname
        this.items[id.id-1].jobtitle= this.infotitle
        this.items[id.id-1].country= this.infoountry
        this.items[id.id-1].q1sal= this.infoq1sal
        this.items[id.id-1].q2sal= this.infoq2sal
        this.items[id.id-1].q3sal= this.infoq3sal
        this.items[id.id-1].q4sal= this.infoq4sal
        this.items[id.id-1].q1wh= this.infoq1wh
        this.items[id.id-1].q2wh= this.infoq2wh
        this.items[id.id-1].q3wh= this.infoq3wh
        this.items[id.id-1].q4wh= this.infoq4wh
        this.updatefirestore();
    this.infotitle="";
        this.infoname="";
        this.infocountry="";
        this.infoq1sal="";
        this.infoq2sal="";
        this.infoq3sal="";
        this.infoq4sal="";
        this.infoq1wh="";
        this.infoq2wh="";
        this.infoq3wh="";
        this.infoq4wh="";
      },
  
      setdata(infodata){
this.infoname=infodata.name;
this.infotitle=infodata.jobtitle;
      },
      seteditdata(infodata){
this.infoname=infodata.name;
this.infotitle=infodata.jobtitle;
this.infocountry=infodata.country;
this.infoq1sal=infodata.q1sal;
this.infoq2sal=infodata.q2sal;
this.infoq3sal=infodata.q3sal;
this.infoq4sal=infodata.q4sal;
this.infoq1wh=infodata.q1wh;
this.infoq2wh=infodata.q2wh;
this.infoq3wh=infodata.q3wh;
this.infoq4wh=infodata.q4wh;
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>