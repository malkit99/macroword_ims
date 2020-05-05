<template>
  <v-data-table
    :headers="headers"
    :items="cities"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cities Data</v-toolbar-title>
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
                    <ValidationProvider v-slot="{ errors }" name="State Name">
                            <v-select
                            :items="allStates"
                            label="Select a State"
                            hide-details
                            v-model="editedItem.state_id"
                            :error-messages="errors"
                            color="primary"
                            outlined
                            single-line
                            item-text="state_name"
                            item-value="state_id" 
                            ></v-select>
                    <span v-if="allerror.state_id" class="red--text  caption ">{{allerror.state_id[0]}}</span>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">

                    <ValidationProvider v-slot="{ errors }" name="City Name">
                    <v-text-field v-model="editedItem.city_name" outlined :error-messages="errors" label="City Name"></v-text-field>
                    <span v-if="allerror.city_name" class="red--text  caption ">{{allerror.city_name[0]}}</span>
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
    
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios';
import { mapActions } from "vuex";
import { required, max, min, alpha_spaces  } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");


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
      name:"City",
  components: {
    ValidationProvider,
    ValidationObserver
  },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'City Id',
          align: 'start',
          sortable: false,
          value: 'city_id',
        },
        { text: 'City Name', value: 'city_name' },
        { text: 'State Name', value: 'state_name' },
        { text: 'Country Name', value: 'country_name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      cities: [],
      allStates:[],
      allerror:[],
      editedIndex: -1,
      editedItem: {
        city_name: '',
        state_id: '',
      },
      defaultItem: {
        city_name: '',
        state_id: '',
      
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
        saveCities:'country/saveCities',
        getCities:'country/getCities',
        updateCity:'country/updateCity',
      }),

      initialize () {
          this.getStates()
          .then((response) => {
            this.allStates = response.data.data
          })

        this.getCities()
          .then((response) => {
            this.cities = response.data.data
          })
      },

      editItem(item) {
        this.editedIndex = this.cities.indexOf(item)
        axios.get(`api/city/${item.city_id}`)
        .then((response) => {
          if(response.status == 201){
            const item = response.data.data
            this.editedItem = Object.assign({}, item)
          }
        })
        this.dialog = true
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
          Object.assign(this.cities[this.editedIndex], this.editedItem)
          this.$refs.countryForm.validate().then((success) => {
            if(!success){
              this.dialog = true ;
            }
            this.updateCity(this.editedItem)
            .then((response) => {
              this.addNotification({
                show: true,
                text: "City Updated Successfully"
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
            this.saveCities(this.editedItem)
            .then((response) => {
            const editedItem = response.data.data
            this.cities.push(editedItem)
              this.addNotification({
                show: true,
                text: "City Created Successfully"
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
