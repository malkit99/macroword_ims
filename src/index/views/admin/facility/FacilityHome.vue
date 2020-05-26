<template>
  <v-data-table :headers="headers" :items="facility" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Our Facilities</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mb-2" :to="{ name: 'create-facility'}">New Item</v-btn>
          </template>
        <v-dialog v-model="dialog" max-width="600px" >
            <v-card
            class="mx-auto"
            max-width="600"
            outlined
            >
            <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{ editedItem.facility_name}}</v-list-item-title>
            <v-list-item-subtitle>{{ editedItem.title }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                      <img :src="editedItem.facility_image"/>
            </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
             <v-chip color="pink" dark >{{ editedItem.status == 1 ? 'Publish ': 'Close' }}</v-chip>
            </v-list-item>
            <v-list-item>
              <v-card-text>
                <h4>Service Details</h4>
                {{ editedItem.description }}
              </v-card-text>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.image="{ item }">
      <v-avatar color="indigo" size="64">
        <img :src="item.facility_image" :alt="item.facility_name" />
      </v-avatar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-switch value  color="red" v-model="item.status" @change="changeStatus(item)" :input-value="item.status == 1 ? true : false "></v-switch>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon>
      <v-icon small color="warning" @click="showItem(item)" class="mr-2">mdi-eye</v-icon>
      </v-btn>
        <v-btn icon :to="{name:'edit-facility' , params:{id: item.id}}">
      <v-icon small color="primary" class="mr-2">mdi-pencil</v-icon>
      </v-btn>
      <v-icon small color="error" @click="deleteItem(item)" >mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
import { mapActions } from "vuex";
export default {
name: "FacilityHome",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "S.No.",
        align: "start",
        sortable: false,
        value: "sno"
      },
      { text: "Image", value: "image" , sortable: false},
      { text: "Service Name", value: "facility_name" , sortable: false },
      { text: "Status", value: "status" , sortable: false},
      { text: "Actions", value: "actions", sortable: false }
    ],
    facility: [],
    editedIndex: -1,
    editedItem: {
      facility_name: "",
      status: "",
      description:"",
      facility_image:"",
    },

    defaultItem: {
     facility_name: "",
      status: "",
      description:"",
      facility_image:"",
    },
 
  }),


  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
        addNotification:'application/addNotification',
        getFacility:'facility/getFacility',
        deleteFacility:'facility/deleteFacility',
        updateStatus:'facility/updateStatus',
        addLoading: "loading/addLoading",
        removeloading: "loading/removeloading",
    }),
    initialize() {
    this.addLoading({ show: true , text: "Please Wait Data Uploading ..." });
      this.getFacility()
        .then(response => {
          this.removeloading({ show: false });  
          this.facility = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    showItem(item) {
      this.editedIndex = this.facility.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.facility.indexOf(item);
      if(confirm("Are you sure you want to delete this item?") && this.facility.splice(index, 1)){
        this.deleteFacility(item)
        .then((response) => {
          this.addNotification({
            show: true,
            text : 'facility Deleted Successfully'
          });
        })
        .catch((error) => {
          this.addNotification({
            show: true,
            text : 'facility Not Deleted'
          });
        });
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    changeStatus(item){
      const data = {id: item.id , status: item.status}
      this.updateStatus(data)
      .then((response) => {
        this.addNotification({
          show: true,
          text : 'Service Status Updated Successfully'
        });
      })
      .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Service Status Not Updated'
        });
      })
    }
  }
};
</script>
