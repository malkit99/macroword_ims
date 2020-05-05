<template>
  <v-data-table
    :headers="headers"
    :items="states"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>State Data</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2 ml-2" :to="{name: 'country-home'}">Back</v-btn>
            <v-btn color="primary" dark class="mb-2 ml-2" v-on="on">Create State</v-btn>
          </template>
          <ValidationObserver ref="countryForm" v-slot="{ validate, reset }">
          <v-form @submit.prevent="save">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Country Name">
                            <v-select
                            :items="allCountries"
                            label="Select a Country"
                            hide-details
                            v-model="editedItem.country_id"
                            :error-messages="errors"
                            color="primary"
                            outlined
                            single-line
                            item-text="country_name"
                            item-value="country_id" 
                            ></v-select>
                    <span v-if="allerror.country_id" class="red--text  caption ">{{allerror.country_id[0]}}</span>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">

                    <ValidationProvider v-slot="{ errors }" name="State Name">
                    <v-text-field v-model="editedItem.state_name" outlined :error-messages="errors" label="State Name"></v-text-field>
                    <span v-if="allerror.state_name" class="red--text  caption ">{{allerror.state_name[0]}}</span>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error"  @click="clear">Reset</v-btn>
              <v-btn color="primary"  @click="close">Cancel</v-btn>
              <v-btn color="success" type="submit" >Save</v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
          </ValidationObserver>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        color="primary"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="error"
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
import { mapActions } from "vuex";
import { required, max, min, alpha_spaces , image } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("image", {
  ...image,
  message: "{_field_} field must be an image"
});
extend("alpha_spaces", {
  ...alpha_spaces,
  message: "{_field_} field may only contain alphabetic characters"
});
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
      name:"State",
  components: {
    ValidationProvider,
    ValidationObserver
  },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'State Id',
          align: 'start',
          sortable: false,
          value: 'state_id',
        },
        { text: 'State Name', value: 'state_name' },
        { text: 'Country Name', value: 'country' },
        { text: 'Total City', value: 'cities' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      states: [],
      allCountries:[],
      allerror:[],
      editedIndex: -1,
      editedItem: {
        state_name: '',
        country_id: '',
      },
      defaultItem: {
        state_name: '',
        country_id: '',
      
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
        addNotification: "application/addNotification",
        getStates:'country/getStates',
        getCountries:'country/getCountries',
        getSateById:'country/getSateById',
        saveState:'country/saveState',
        updateState:'country/updateState',
        deleteState:'country/deleteState',
      }),

      initialize () {
          this.getStates()
          .then((response) => {
            this.states = response.data.data
          })

        this.getCountries()
          .then((response) => {
            this.allCountries = response.data.data
          })
      },

      editItem(item) {
        this.editedIndex = this.states.indexOf(item)
        axios.get(`api/state/${item.state_id}`)
        .then((response) => {
          if(response.status == 201){
            const item = response.data.data
            this.editedItem = Object.assign({}, item)
          }
        })
        this.dialog = true
      },

    deleteItem (item) {
        const index = this.states.indexOf(item)
        if(confirm('Are you sure you want to delete this item?')){
          this.deleteState(item)
          .then((response) => {
            const message = response.data.message
             this.states.splice(index, 1)
               this.addNotification({
                show: true,
                text: message
              });
          })
          .catch((error) => {
              this.addNotification({
              show: true,
              text: "State Not Deleted"
            });
          })
        }
      },

      clear(){
        this.$refs.countryForm.reset()
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.states[this.editedIndex], this.editedItem)
          this.$refs.countryForm.validate().then((success) => {
            if(!success){
              this.dialog = true;
            }
            this.updateState(this.editedItem)
            .then((response) => {
              this.addNotification({
                show: true,
                text: "State Updated Successfully"
              });
            })
            .catch((error) => {
              if(error.response.status == 422){
                this.allerror = error.response.data.errors
                this.dialog = true ;
              }
            })
          });
        } else {
          this.$refs.countryForm.validate().then((success) => {
            if(!success){
              this.dialog = true ;
            }
            this.saveState(this.editedItem)
            .then((response) => {
            const editedItem = response.data.data
            this.states.push(editedItem)
            this.addNotification({
                show: true,
                text: "State Created Successfully"
              });
            })
          .catch((error) => {
              if(error.response.status == 422){
                this.allerror = error.response.data.errors
                this.dialog = true ;
              }
          })
          });
        }
        this.allerror = "";
        this.close();
      },
    },
  }
</script>
