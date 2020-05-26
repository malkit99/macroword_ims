<template>
  <v-data-table :headers="headers" :items="testimonials" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Testimonials</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mb-2" :to="{ name: 'create-testimonial'}">New Item</v-btn>
          </template>
        <v-dialog v-model="dialog" max-width="600px" >
            <v-card
            class="mx-auto"
            max-width="600"
            outlined
            >
            <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{ editedItem.student}}</v-list-item-title>
            <v-list-item-subtitle>Designation : {{ editedItem.designation }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                      <img :src="editedItem.testi_image"/>
            </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
             <v-chip color="pink" dark >{{ editedItem.status == 1 ? 'Publish ': 'Close' }}</v-chip>
            </v-list-item>
            <v-list-item>
              <v-card-text>
                <h4>Testimonial Details</h4>
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
        <img :src="item.testi_image" :alt="item.student" />
      </v-avatar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-switch value  color="red" v-model="item.status" @change="changeStatus(item)" :input-value="item.status == 1 ? true : false "></v-switch>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon>
      <v-icon small color="warning" @click="showItem(item)" class="mr-2">mdi-eye</v-icon>
      </v-btn>
        <v-btn icon :to="{name:'edit-testimonial' , params:{id: item.id}}">
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
name: "TestimonialHome",
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
      { text: "Name", value: "student" , sortable: false },
      { text: "Designation", value: "designation" },
      { text: "Status", value: "status" , sortable: false},
      { text: "Actions", value: "actions", sortable: false }
    ],
    testimonials: [],
    editedIndex: -1,
    editedItem: {
      student: "",
      designation: "",
      description:"",
      testi_image:"",
    },
    defaultItem: {
      student: "",
      designation: "",
      description:"",
      testi_image:"",

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
      getTestimonials:'testimonial/getTestimonials',
      deleteTestimonial:'testimonial/deleteTestimonial',
      updateStatus:'testimonial/updateStatus',
    }),
    initialize() {
      this.getTestimonials()
        .then(response => {
          this.testimonials = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    showItem(item) {
      this.editedIndex = this.testimonials.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.testimonials.indexOf(item);
      if(confirm("Are you sure you want to delete this item?") && this.testimonials.splice(index, 1)){
        this.deleteTestimonial(item)
        .then((response) => {
          this.addNotification({
            show: true,
            text : 'Testimonial Deleted Successfully'
          });
        })
        .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Testimonial Not Deleted'
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
