<template>
  <ValidationObserver ref="observer" v-slot="{ validate, reset }">
    <form>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="error" dark class="mb-2" :to="{ name: 'users'}">Back</v-btn>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:30|min:3">
                  <v-text-field
                    label="Enter Your Name"
                    v-model="user.name"
                    :error-messages="errors"
                  >
                    <v-icon slot="prepend" color="primary">mdi-account-circle</v-icon>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                  <v-text-field
                    type="email"
                    label="Enter Your Email"
                    v-model="user.email"
                    :error-messages="errors"
                  >
                    <v-icon slot="prepend" color="primary">mdi-email</v-icon>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Mobile" rules="required">
                  <v-text-field
                    label="Enter Your Mobile"
                    v-model="user.mobile"
                    :error-messages="errors"
                  >
                    <v-icon slot="prepend" color="primary">mdi-cellphone-android</v-icon>
                  </v-text-field>
                </ValidationProvider>
             
                <ValidationProvider v-slot="{ errors }" name="Roles" rules="required">
                  
                    <v-select
                        :items="getAllRoles"
                        label="Select a Role"
                        hide-details
                        v-model="user.roles"
                        prepend-icon="mdi-crown"
                        :error-messages="errors"
                        color="primary"
                        single-line
                        item-text="name"
                        item-value="id" 
                        chips
                    ></v-select>  
                </ValidationProvider>     
              </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="clear" >Reset</v-btn>
          <v-btn color="success" @click="userUpdate" :disabled="!valid">Save</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </ValidationObserver>
</template>
<script>
import { required, email, max, min } from "vee-validate/dist/rules";
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
extend("email", {
  ...email,
  message: "{_field_}  must be valid"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
export default {
  name: "EditUser",

  components: {
    ValidationProvider,
    ValidationObserver
  },

  data() {
    return {
      valid: true,
   
    };
  },
computed: {
  ...mapGetters({
    getAllRoles:'role/getAllRoles',
    getUsers:'register/getUsers'
  }),

  user(){
    return this.getUsers.find(u => u.id == this.$route.params.id);
  }
},

  mounted() {
      this.$store.dispatch('role/allRoles');

  },

  methods: {
    ...mapActions({
      saveUser:'register/saveUser',
    }),

    userUpdate() {
      this.$refs.observer.validate();
      axios.put('api/register' , this.user )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    clear(){
        this.name = "",
        this.email = "",
        this.mobile = "",
        this.password = "",
        this.roles = null,
        this.profile_image = ""
        this.$refs.observer.reset();
    }
  }
};
</script>