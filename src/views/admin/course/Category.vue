<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mx-2" v-on="on">Create Category</v-btn>
            <v-btn color="primary" dark class="mx-2" :to="{name: 'course-home'}">Back</v-btn>
          </template>
           <ValidationObserver ref="observer" v-slot="{ validate, reset }">
            <v-form @submit.prevent="save">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:30|min:3">
                    <v-text-field v-model="editedItem.name" label="Category Name" :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                  </v-col>

                   <v-col cols="12" sm="12" md="12">
                   <ValidationProvider v-slot="{ errors }" name="Description" rules="required"> 
                    <p class="red--text ">{{ errors[0] }}</P>   
                    <ckeditor :editor="editor" v-model="editedItem.description" :config="editorConfig"></ckeditor>
                   </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="clear" >Reset</v-btn>
              <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
              <v-btn color="success" type="submit" >Save</v-btn>
            </v-card-actions>
          </v-card>
            </v-form>
           </ValidationObserver>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.sno="{ item }">
        {{ 1 }}
    </template>
    <template v-slot:item.name="{ item }">
      
        {{ item.name }}
    </template>
    <template v-slot:item.description="{ item }">

        <v-list>
          <v-list-item>
            <v-list-item-content> 
              <v-list-item-subtitle 
                v-html="item.description"  
                class="d-inline-block text-truncate"
                style="max-width: 150px;" 
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { mapActions } from 'vuex';
import { required, max, min } from "vee-validate/dist/rules";
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
      components: {
          ValidationProvider,
          ValidationObserver
      },
    data: () => ({
      dialog: false,

        editor: ClassicEditor,
        editorConfig: {
            // The configuration of the editor.
        },
      headers: [
        {
          text: 'S.No.',
          align: 'start',
          sortable: false,
          value: 'sno',
        },
        { text: 'Name', value: 'name' },
        { text: 'Descreption', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        description:'',
      },
      defaultItem: {
        name: '',
       description:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
        ...mapActions({
            addNotification:'application/addNotification',
            saveCategory:'category/saveCategory',
            deleteCategory:'category/deleteCategory',
            updateCategory:'category/updateCategory',
            getCategory:'category/getCategory',
        }),
      initialize () {
          this.getCategory()
          .then((response) => {
              this.desserts = response.data.data
          })
          .catch((error) => {
              console.log(error);
          })
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        this.deleteCategory(item)
        .then((response) => {
            this.addNotification({
                show: true,
                text : 'Category Deleted Successfully'
                });
        })
        .catch((error) => {
            this.addNotification({
                show: true,
                text : 'Category Not Deleted'
                });
        });
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

       clear () {
           this.editedItem.name = '',
           this.editedItem.description = '',
           this.$refs.observer.reset();
        },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.updateCategory(this.editedItem)

          .then((response) => {
               this.addNotification({
                show: true,
                text : 'Category Update Successfully'
                });
          })
          .catch((error) => {
            this.addNotification({
            show: true,
            text : 'Category Not Upadated'
            });
          });
        } else {
            this.$refs.observer.validate().then((success) => {
                if(!success){
                    this.dialog = true
                }
                this.desserts.push(this.editedItem)
                this.saveCategory(this.editedItem)
                .then((response) => {
                      this.addNotification({
                        show: true,
                        text : 'Category Create Successfully'
                        });
                    this.$refs.observer.reset();
                })
                .catch((error) => {
                      this.addNotification({
                        show: true,
                        text : 'Category Not Created'
                    });   
                });
            })
        }
        this.close()
      },
    },
  }
</script>
