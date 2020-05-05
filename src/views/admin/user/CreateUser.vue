<template>
  <ValidationObserver ref="userForm" v-slot="{ validate, reset }">
    <v-form @submit.prevent="userSave" >
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Create User</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="error" dark class="mb-2" :to="{ name: 'users'}">Back</v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <ValidationProvider v-slot="{ errors }" name="Name" rules="required|min:3|max:30" >
                  <v-text-field
                    label="Enter Your Name"
                    v-model="name"
                    outlined
                    :error-messages="errors"
                  >
                  </v-text-field>
                </ValidationProvider>
                  <span v-if="allerror.name" class="red--text  caption ">{{allerror.name[0]}}</span>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email" >
                  <v-text-field
                    type="email"
                    label="Enter Your Email"
                    v-model="email"
                     outlined
                    :error-messages="errors"
                  >
                  </v-text-field>
                  <span v-if="allerror.email" class="red--text  caption ">{{allerror.email[0]}}</span>
                </ValidationProvider>
               
                  <ValidationProvider v-slot="{ errors }"  name="Mobile Number" rules="required|max:15">
                    <vue-tel-input v-model="mobile"  v-bind="bindProps" @onInput="onInput"></vue-tel-input>
                  <span v-if="errors" class="red--text caption ml-2 "> {{ errors[0] }}</span>
                  <span v-if="allerror.mobile" class="red--text  caption ">{{allerror.mobile[0]}}</span>
                  </ValidationProvider>
               
                <ValidationProvider v-slot="{ errors }" name="Roles" rules="required">       
                    <v-select
                        :items="getAllRoles"
                        label="Select a Role"
                        hide-details
                        v-model="roles"
                        :error-messages="errors"
                        color="primary"
                        single-line
                        outlined
                        item-text="name"
                        item-value="id" 
                        chips
                    ></v-select>
                 <p v-if="allerror.roles" class="red--text caption ">{{allerror.roles[0]}}</p>          
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
                      <ValidationProvider
                      v-slot="{ errors , validate }"
                      name="Profile Image"
                      rules="required|image"
                      >
                      <v-btn color="error" @click="onpickFile">Image Upload</v-btn>
                      <p id="error" class="red--text">{{ errors[0] }}</p>
                      <p v-if="allerror.profile_image" class="red--text ml-5 caption ">{{allerror.profile_image[0]}}</p>
                      <input
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        name="profile_image"
                        style="display:none"
                        @change="onFilePicked($event) || validate($event)"
                      />
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
          <v-btn color="success" type="submit">Save</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>
<script>
import { required, email, max, min , image } from "vee-validate/dist/rules";
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
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
      roles: "",
      imageURL:"",
      profile_image : "",

      allerror:"",
          bindProps:{
            mode: "international",
            defaultCountry: "IN",
            placeholder: "Enter a mobile number",
            onlyCountries: ["IN"],
            wrapperClasses: "heite",
            maxLen: 15,
            required:true,
          },

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
      addNotification: "application/addNotification",
      addLoading: "loading/addLoading",
      removeloading: "loading/removeloading",
      saveUser:'register/saveUser',
    }),

     onInput({ number, isValid, country }) {
            this.mobile = number.e164
      },

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
      this.$refs.userForm.validate().then((success) => {
        if(!success){
          return ;
        }
        let data = new FormData();
        data.append('profile_image', this.profile_image);
        data.append('name', this.name);
        data.append('email', this.email);
        data.append('mobile', this.mobile);
        data.append('roles', this.roles);
        this.addLoading({ show: true , text: "Please Wait Registration Submit ..." });
        this.saveUser(data)
        .then((response) => {
          this.removeloading({ show: false });
          this.$router.push({ name: "users" });
            this.addNotification({
              show: true,
              text: "User Registration Created Successfully"
            });
        })
        .catch((error) => {
          this.allerror = error.response.data.errors;
            this.addNotification({
              show: true,
              text: "User Registration Not Created"
            });
        });
      });
    },

    clear(){
        this.name = "",
        this.email = "",
        this.mobile = "",
        this.password = "",
        this.roles = null,
        this.profile_image = ""
        this.$refs.userForm.reset();
    }
  }
};
</script>

<style scoped >
    .heite{
        height: 56px;
    }
</style>