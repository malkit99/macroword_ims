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
                    v-model="name"
                    :error-messages="errors"
                  >
                    <v-icon slot="prepend" color="primary">mdi-account-circle</v-icon>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                  <v-text-field
                    type="email"
                    label="Enter Your Email"
                    v-model="email"
                    :error-messages="errors"
                  >
                    <v-icon slot="prepend" color="primary">mdi-email</v-icon>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Mobile" rules="required">
                  <v-text-field
                    label="Enter Your Mobile"
                    v-model="mobile"
                    :error-messages="errors"
                  >
                    <v-icon slot="prepend" color="primary">mdi-cellphone-android</v-icon>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Password" rules="required|max:15">
                  <v-text-field
                    type="password"
                    label="Password"
                    v-model="password"
                    :error-messages="errors"
                  >
                    <v-icon slot="prepend" color="primary">mdi-lock</v-icon>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Roles" rules="required">
                  
                    <v-select
                        :items="getAllRoles"
                        label="Select a Role"
                        hide-details
                        v-model="roles"
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
              <v-col cols="12" sm="6" md="4" align="center" justify="center">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-list-item-avatar tile size="200" color="grey">
                        <v-img :src="imageURL"></v-img>
                      </v-list-item-avatar>
                    </v-col>
                    <v-col cols="12">
                      <v-btn color="error" @click="onpickFile">Image Upload</v-btn>
                      <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        name="profile_image"
                        style="display:none"
                        @change="onFilePicked"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="clear" >Reset</v-btn>
          <v-btn color="success" @click="userSave" :disabled="!valid">Save</v-btn>
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
  name: "CreateUser",

  components: {
    ValidationProvider,
    ValidationObserver
  },

  data() {
    return {
      valid: true,
      name: "",
      email: "",
      mobile: "",
      password: "",
      roles: null,
      imageURL:"",
      profile_image : "",
    };
  },
computed: {
  ...mapGetters({
    getAllRoles:'role/getAllRoles'
  }),
},

  mounted() {
      this.$store.dispatch('role/allRoles');
  },

  methods: {
    ...mapActions({
      saveUser:'register/saveUser',
    }),

    onpickFile(){
          this.$refs.fileInput.click();
    },

  onFilePicked(event){   
    const files = event.target.files;
        this.readFile(files);
        this.profile_image = files[0];   
  },

    readFile(files){
        const fileName = files[0].name;  
        if (fileName.lastIndexOf(".") <= 0) {
            return alert("Please add a valid file");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            this.imageURL = fileReader.result; 
        });
        fileReader.readAsDataURL(files[0]);
    },

  
    userSave() {
      this.$refs.observer.validate();
      let data = new FormData();
      data.append('profile_image', this.profile_image);
      data.append('name', this.name);
      data.append('email', this.email);
      data.append('mobile', this.mobile);
      data.append('password', this.password);
      data.append('roles', this.roles);
      axios.post('api/register' , data )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    },

    clear(){
        this.user.name = "",
        this.user.email = "",
        this.user.mobile = "",
        this.user.password = "",
        this.user.roles = null,
        this.profile_image = ""
        this.$refs.observer.reset();
    }
  }
};
</script>