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
        <v-dialog v-model="dialog" max-width="500px" persistent >
          <v-card>
            <v-card-title>
              <span class="headline">Event Details</span>
            </v-card-title>
          
            <v-card-text>
              <v-container>
                <v-row>
                
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary"  @click="close">Cancel</v-btn>
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
      <v-switch value  color="red" :input-value="item.status == 1 ? true : false "></v-switch>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
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
      { text: "Image", value: "image" },
      { text: "Event Name", value: "title" },
      { text: "Loction", value: "loction" },
      { text: "Status", value: "status" },
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
      description: ""
    },
    defaultItem: {
      title: "",
      loction: "",
      start_date: "",
      last_date: "",
      description: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

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
      getEvents: "event/getEvents"
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

    editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.events.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.events.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.events[this.editedIndex], this.editedItem);
      } else {
        this.events.push(this.editedItem);
        this.$refs.eventForm.validate().then((success) => {
          if(!success){
            return ;
          }

        })
      }
      this.close();
      this.clear();
    },

    clear(){
      this.editedItem.title = "",
      this.editedItem.loction = "",
      this.editedItem.description = "",
      this.editedItem.start_date = "",
      this.editedItem.last_date = "",
      this.$refs.eventForm.reset()
    }
  }
};
</script>
