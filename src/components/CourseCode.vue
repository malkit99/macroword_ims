<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    item-key="index"
    sort-by="course_fee"
    items-per-page="10"
    class="elevation-5"
  >
    <template v-slot:top>
            <v-alert type="primary" dense outlined v-if="allerror">
                  <ul v-for="(error , index) in allerror" :key="index">
                    <li>{{error[0]}}</li>  
                  </ul>
            </v-alert>
        <ValidationObserver ref="userForm" >
            <v-form @submit.prevent="save">
      <v-toolbar flat  >
              <ValidationProvider v-slot="{ errors }"  name="Course Code" rules="required|min:3|max:30">
                    <v-text-field name="course_code"  v-model="editedItem.course_code" :error-messages="errors"></v-text-field>
              </ValidationProvider>
        <v-spacer></v-spacer>
        <v-btn dark icon class="mb-2" type="submit">
          <v-icon color="primary">mdi-plus</v-icon>
        </v-btn>
        <v-btn dark icon class="mb-2" @click="close">
          <v-icon color="error">mdi-do-not-disturb</v-icon>
        </v-btn>
      </v-toolbar>
        </v-form>
        </ValidationObserver>
    </template>
    <template v-slot:item.sno="{ item }">
      {{ item.id }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="primary" small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon color="error" small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { required,  max, min } from "vee-validate/dist/rules";
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
export default {
  name:"CourseCode",
   components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    headers: [
      {
        text: "S.No.",
        align: "start",
        sortable: false,
        value: "sno"
      },

      { text: "Course Code", value: "course_code" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      course_code: ""
    },
    defaultItem: {
      course_code: ""
    },
    allerror:'',
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
      saveCourseCode:'master/saveCourseCode',
      getCourseCode:'master/getCourseCode',
      deleteCourseCode:'master/deleteCourseCode',
      updateCourseCode:'master/updateCourseCode',
      addNotification:'application/addNotification'
    }),
    initialize() {
     this.getCourseCode()
      .then((response) => {
        this.desserts = response.data.data;
      })
      .catch((error) => {
        console.log(error)
      })

    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") && this.desserts.splice(index, 1);
      this.deleteCourseCode(item)
      .then((response) => {
            this.addNotification({
                  show: true,
                  text : 'Course Code Deleted Successfully'
            });
      })
      .catch((error) => {
            this.addNotification({
                  show: true,
                  text : 'Course Code Not Deleted '
            });
      })
    },

    close() {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.allerror =""
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        this.allerror = '';
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.$refs.userForm.validate().then((success) => {
          if(!success){
            return ;
          }
          this.updateCourseCode(this.editedItem)
          .then((response) => {
             this.$nextTick(() => {
                this.$refs.userForm.reset();
              });

              this.addNotification({
                  show: true,
                  text : 'Course Code Updated Successfully'
              });
          })
          .catch((error) => {
                this.addNotification({
                show: true,
                text : 'Course Code Not Updated'
              });
             if(error.response.data.errors){
              this.allerror = error.response.data.errors
              } 
          });

        })
        this.close();
      } else {
        this.$refs.userForm.validate().then((success) => {
          if(!success){
            return ;
          }
          this.desserts.push(this.editedItem)
          this.allerror ='';
          this.saveCourseCode(this.editedItem)
          .then((response) => {
                this.$nextTick(() => {
                this.$refs.userForm.reset();
                }); 
              this.addNotification({
                  show: true,
                  text : 'Course Code Created Successfully'
              })
          })
          .catch((error) => {
            if(error.response.data.errors){
              this.allerror = error.response.data.errors
            } 
          })

        });
      } 
      this.close();
    }
  }
};
</script>

