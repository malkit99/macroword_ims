<template>
  <v-data-table :headers="headers" :items="website" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Our Website Data</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mb-2" :to="{ name: 'create-website'}">New Item</v-btn>
          </template>
        <v-dialog v-model="dialog" max-width="600px">
            <v-card
            class="mx-auto"
            max-width="600"
            outlined
            >
            <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{ editedItem.title}}</v-list-item-title>
            <v-list-item-subtitle>{{ editedItem.email }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                      <img :src="editedItem.logo"/>
            </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
              <p class="">Social Media Link</p>
            </v-list-item>
            <v-divider></v-divider>  
             <v-list-item> 
             <v-chip color="pink" label outlined dark small >{{editedItem.facebook}}</v-chip>
             <v-spacer></v-spacer>
             <v-chip color="pink" label outlined dark small >{{editedItem.insta}}</v-chip>
            </v-list-item>
            <v-list-item> 
             <v-chip color="pink" label outlined dark small >{{editedItem.twitter}}</v-chip>
             <v-spacer></v-spacer>
             <v-chip color="pink" label outlined dark small >{{editedItem.linkedin}}</v-chip>
            </v-list-item>
            <v-divider></v-divider> 
            <v-list-item>
              <v-card-text>
                <h4>Address</h4>
                <p>{{ editedItem.address_line_1 }}</p>
                <p>{{ editedItem.address_line_2 }}</p> 
                <p>{{ editedItem.city }} , {{ editedItem.district }} , {{ editedItem.state }} , {{ editedItem.pin_code }}</p>
                <p>{{ editedItem.mobile }}  {{ editedItem.mobile_2 }} </p>  
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
        <img :src="item.logo" :alt="item.service_name" />
      </v-avatar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon>
      <v-icon small color="warning" @click="showItem(item)" class="mr-2">mdi-eye</v-icon>
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
import csc from 'country-state-city'
import { mapActions } from "vuex";
export default {
name: "WebsiteHome",
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
      { text: "Website Title", value: "title" , sortable: false },
      { text: "Email", value: "email" , sortable: false},
      { text: "Actions", value: "actions", sortable: false }
    ],
    website: [],
    editedIndex: -1,
    editedItem: {
      service_name: "",
      status: "",
      description:"",
      service_image:"",
    },

    defaultItem: {
      service_name: "",
      status: "",
      description:"",
      service_image:"",
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
        getWebsite:'website/getWebsite',
        deleteWebDeatil:'website/deleteWebDeatil',
        addLoading: "loading/addLoading",
        removeloading: "loading/removeloading",
    }),
    initialize() {
    this.addLoading({ show: true , text: "Please Wait Data Uploading ..." });
      this.getWebsite()
        .then(response => {
          this.removeloading({ show: false });  
          this.website = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    showItem(item) {
      this.editedIndex = this.website.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.website.indexOf(item);
      if(confirm("Are you sure you want to delete this item?") && this.website.splice(index, 1)){
        this.deleteWebDeatil(item)
        .then((response) => {
          this.addNotification({
            show: true,
            text : 'website Deleted Successfully'
          });
        })
        .catch((error) => {
          this.addNotification({
            show: true,
            text : 'website Not Deleted'
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


  }
};
</script>
