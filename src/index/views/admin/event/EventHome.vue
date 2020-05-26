<template>
  <v-data-table :headers="headers" :items="events" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Events</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mb-2" :to="{ name: 'create-event'}">New Item</v-btn>
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
            <v-list-item-subtitle>Start Date : {{ editedItem.start_date }} | Last Date : {{ editedItem.last_date }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                      <img :src="editedItem.event_image"/>
            </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
             <v-chip color="pink" dark >{{ editedItem.loction }}</v-chip>
            </v-list-item>
            <v-list-item>
              <v-card-text>
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
        <img :src="item.event_image" :alt="item.loction" />
      </v-avatar>
    </template>
     <template v-slot:item.title="{ item }">
      <h4  class="d-inline-block text-truncate" style="max-width: 150px;">{{ item.title}}</h4>
    </template>
    <template v-slot:item.status="{ item }">
      <v-switch value  color="red" v-model="item.status" @change="changeStatus(item)" :input-value="item.status == 1 ? true : false "></v-switch>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon>
      <v-icon small color="warning" @click="showItem(item)" class="mr-2">mdi-eye</v-icon>
      </v-btn>
        <v-btn icon :to="{name:'edit-event' , params:{id: item.id}}">
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
name: "Event",

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
      { text: "Event Name", value: "title" , sortable: false },
      { text: "Loction", value: "loction" },
      { text: "Status", value: "status" , sortable: false},
      { text: "Start Date", value: "start_date" },
      { text: "Last Date", value: "last_date" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    events: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      loction: "",
      start_date: "",
      last_date: "",
      description: "",
    },
    defaultItem: {
      title: "",
      loction: "",
      start_date: "",
      last_date: "",
      description: "",
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
      getEvents: "event/getEvents",
      deleteEvents: "event/deleteEvents",
      updateStatus: "event/updateStatus",
      addNotification:'application/addNotification',
    }),
    initialize() {
      this.getEvents()
        .then(response => {
          this.events = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    showItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.events.indexOf(item);
      if(confirm("Are you sure you want to delete this item?") && this.events.splice(index, 1)){

        this.deleteEvents(item)
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
          text : 'Event Status Updated Successfully'
        });
      })
      .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Event Status Not Updated'
        });
      })
    }
  }
};
</script>
