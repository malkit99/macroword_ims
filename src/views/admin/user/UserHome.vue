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
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mx-2" v-on="on">Create User</v-btn>
            <v-btn color="primary" dark class="mx-2" :to="{name:'create-permission'}">Manage Permission</v-btn>
            <v-btn color="primary" dark class="mx-2" :to="{name:'create-user-role'}">Manage Role</v-btn>
          </template>
      <ValidationObserver ref="userForm">    
        <v-form @submit.prevent="save">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
              
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:30|min:3">
                    <v-text-field v-model="editedItem.name" label="Name" :error-messages="errors" >
                    <v-icon slot="prepend" color="primary" >mdi-account-circle</v-icon>
                    </v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-text-field v-model="editedItem.email" label="Email" :error-messages="errors">
                    <v-icon slot="prepend" color="primary">mdi-email</v-icon>
                    </v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Mobile" rules="required">
                    <v-text-field v-model="editedItem.mobile" label="Mobile" :error-messages="errors" >
                      <v-icon slot="prepend" color="primary">mdi-cellphone-android</v-icon>
                    </v-text-field>
                    </ValidationProvider>
                  </v-col>
               
                  <v-col cols="12" sm="6" md="12">
                     <ValidationProvider v-slot="{ errors }" name="Roles" rules="required">
                  
                        <v-select
                          v-model="editedItem.role"
                          :items="allRoles"
                          label="Roles"
                          item-text="name"
                          item-value="id"
                          return-object
                          chips
                        ></v-select>
                 
                </ValidationProvider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1"  @click="close" >Cancel</v-btn>
              <v-btn color="blue darken-1" type="submit">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </ValidationObserver>    
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.image="{ item }">
       <v-avatar color="indigo" size="36">
        <img :src="item.profile_image" :alt="item.name" />
      </v-avatar>
    </template>
    <template v-slot:item.name="{ item }">
         <v-btn :to="{ name: 'show-user' , params:{id:item.id}}" text color="success">{{item.name}}</v-btn> 
    </template>
    <template v-slot:item.email="{ item }">
          {{ item.email }}
    </template>

    <template v-slot:item.roles="{ item }">
     {{ item.role.name}}
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
import { mapState, mapGetters, mapActions } from "vuex";
import axios from 'axios';
import { required, email, max, min } from "vee-validate/dist/rules";
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
extend("email", {
  ...email,
  message: "{_field_}  must be valid"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

  export default {
    name:"UserHome",
  components: {
    ValidationProvider,
    ValidationObserver
  },
    data: () => ({
      dialog: false,
      valid:true,
      headers: [
        {
          text: 'S.No.',
          align: 'start',
          sortable: false,
          value: 'sno',
        },
        { text: 'Image', value: 'image' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Roles', value: 'roles' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts:[],
      allRoles:[],
      editedIndex: -1,
      editedItem: {
        name: '',
        email:'',
        mobile:'',
        roles:{},
      },
      defaultItem: {
        name: '',
        email:'',
        mobile:'',
        roles:{},
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
        saveUser:'register/saveUser',
        addNotification:'application/addNotification',
        userDelete: "register/userDelete",
        editUser: "register/editUser",
      }),


      initialize () {
        axios.get('api/register')
        .then((response) => {
          this.desserts = response.data.data
        });

        axios.get('api/roles')
        .then((response) => {
          this.allRoles = response.data.data
        })
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if(confirm("Are you sure you want to delete this item?") && this.desserts.splice(index, 1)){

        this.userDelete(item)
          .then(response => {
             this.addNotification({
                    show: true,
                    text : 'User Delete Succssfully'
                })
          })
          .catch(error => {
             this.addNotification({
                    show: true,
                    text : 'User not Deleted'
                })
          });
      }
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.editUser(this.editedItem)
          .then((response) => {

          })
          .catch((error) => {

          })

        } else {
          this.$refs.userForm.validate().then((success) =>{
            if(!success){
              return this.dialog = true;
            }
            this.saveUser(this.item)
            .then((response) => {
              this.addNotification({
                show: true,
                text : 'User Registration Successfully Submited'
              });
              this.$refs.userForm.reset();
            })
            .catch((error) => {
              this.addNotification({
                show: true,
                text : 'User Registration not Submited'
              })
            })
          })
          
        }
        this.close()
      },
    },
  }
</script>
