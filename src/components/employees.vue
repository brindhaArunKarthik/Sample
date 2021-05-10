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
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="4" class="my-1">
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
        <b-button>
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
  <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
      <Mixedchart v-bind:content="infoModal.content"></Mixedchart>
    </b-modal>
  </b-container>
</template>

<script>
import { Bar } from 'vue-chartjs'
import Mixedchart from './mixedchart.vue'
  export default {
    extends: Bar,
    data() {
      return {
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
            label: 'Salary for Q1',
            sortable: false},
            { 
            key: 'q2sal',
            label: 'Salary for Q2',
            sortable: false},
            {
            key: 'q3sal',
            label: 'Salary for Q3',
            sortable: false},
            {
            key: 'q4sal',
            label: 'Salary for Q4',
            sortable: false},
            {
            key: 'totsal',
            label: 'Total Quarterly Salary',
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
      this.items = this.$parent.maindata
      this.totalRows = this.items.length
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
      removedata(index) {
        alert("index = "+index);
        this.items.splice(index,1);
        this.$parent.maindata=this.items
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>