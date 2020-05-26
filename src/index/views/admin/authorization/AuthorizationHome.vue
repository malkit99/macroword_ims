<template>
  <v-data-table :headers="headers" :items="authorization" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Our Authorizations</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mb-2" :to="{ name: 'create-authorization'}">New Item</v-btn>
          </template>
        <v-dialog v-model="dialog" max-width="600px" >
            <v-card
            class="mx-auto"
            max-width="600"
            outlined
            >
            <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{ editedItem.authorization_name}}</v-list-item-title>
            <v-list-item-subtitle>Publish : {{ editedItem.publish_at }} | Authorization Type : {{ editedItem.auth_type}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                      <img :src="editedItem.auth_image"/>
            </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
             <v-chip color="pink" dark >{{ editedItem.status == 1 ? 'Publish ': 'Close' }}</v-chip>
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
        <img :src="item.auth_image" :alt="item.authorization_name" />
      </v-avatar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-switch value  color="red" v-model="item.status" @change="changeStatus(item)" :input-value="item.status == 1 ? true : false "></v-switch>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon>
      <v-icon small color="warning" @click="showItem(item)" class="mr-2">mdi-eye</v-icon>
      </v-btn>
        <v-btn icon :to="{name:'edit-authorization' , params:{id: item.id}}">
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
name: "AuthorizationHome",
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
      { text: "Authorization Name", value: "authorization_name" , sortable: false },
      { text: "Authorization Type", value: "auth_type" , sortable: false },
      { text: "Status", value: "status" , sortable: false},
      { text: "Actions", value: "actions", sortable: false }
    ],
    authorization: [],
    editedIndex: -1,
    editedItem: {
      authorization_name: "",
      auth_type: "",
      publish_at: "",
      auth_image:"",
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
      getAuthorization:'authorization/getAuthorization',
      deleteAuthorization:'authorization/deleteAuthorization',
      updateStatus:'authorization/updateStatus',
    }),
    initialize() {
      this.getAuthorization()
        .then(response => {
          this.authorization = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    showItem(item) {
      this.editedIndex = this.authorization.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.authorization.indexOf(item);
      if(confirm("Are you sure you want to delete this item?") && this.authorization.splice(index, 1)){
        this.deleteAuthorization(item)
        .then((response) => {
          this.addNotification({
            show: true,
            text : 'Job authorization Deleted Successfully'
          });
        })
        .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Job authorization Not Deleted'
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
          text : 'Authorization Status Updated Successfully'
        });
      })
      .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Authorization Status Not Updated'
        });
      })
    }
  }
};
</script>
