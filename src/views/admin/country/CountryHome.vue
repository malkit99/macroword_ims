<template>
  <v-data-table
    :headers="headers"
    :items="countries"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Country State City Data</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" persistent >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2 ml-2" :to="{name: 'city-home'}">City</v-btn>
            <v-btn color="primary" dark class="mb-2 ml-2" :to="{name: 'state-home'}">State</v-btn>
            <v-btn color="primary" dark class="mb-2 ml-2" v-on="on">Add Country</v-btn>
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
                    <ValidationProvider v-slot="{ errors }" name="Country Name" rules="required|min:3|max:30">
                    <v-text-field v-model="editedItem.country_name" :error-messages="errors" label="Country Name" ></v-text-field>
                    <span v-if="allerror.country_name" class="red--text  caption ">{{allerror.country_name[0]}}</span>
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
        <!-- excel component import here  -->
            <bulk-excel-import></bulk-excel-import>
        <!-- excel component import here  -->
    
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
import { mapActions } from "vuex";
import BulkExcelImport from '../../../components/admin/BulkExcelImport'
import { required, max, min, alpha_spaces , image  } from "vee-validate/dist/rules";
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
      name:"CountryHome",
  components: {
    ValidationProvider,
    ValidationObserver,
    BulkExcelImport,
  },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Country Id',
          align: 'start',
          sortable: false,
          value: 'country_id',
        },
        { text: 'Country Name', value: 'country_name' },
        { text: 'Total State', value: 'states' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      countries: [],
      allerror:[],
      editedIndex: -1,
      editedItem: {
        country_name: '',
      },
      defaultItem: {
        country_name: '',
      
      },

      file:"",
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
        getCountries:'country/getCountries',
        saveCountries:'country/saveCountries',
        updateCountries:'country/updateCountries',
        deleteCountry:'country/deleteCountry',
      }),

      initialize () {
          this.getCountries()
          .then((response) => {
            this.countries = response.data.data
          })
      },


      editItem (item) {
        this.editedIndex = this.countries.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.countries.indexOf(item)
        if(confirm('Are you sure you want to delete this item?')){
          this.deleteCountry(item)
          .then((response) => {
             const message = response.data.message
             this.countries.splice(index, 1)
               this.addNotification({
                show: true,
                text: message
              });
          })
          .catch((error) => {
              this.addNotification({
              show: true,
              text: "Country Not Deleted"
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
          Object.assign(this.countries[this.editedIndex], this.editedItem)
          this.$refs.countryForm.validate().then((success) => {
            if(!success){
              this.dialog = true ;
            }
            this.updateCountries(this.editedItem)
            .then((response) => {
              this.addNotification({
              show: true,
              text: "Country Updated Successfully"
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
            this.saveCountries(this.editedItem)
            .then((response) => {
              const item = response.data.data
              this.countries.push(item)
              this.addNotification({
              show: true,
              text: "Country Created Successfully"
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
