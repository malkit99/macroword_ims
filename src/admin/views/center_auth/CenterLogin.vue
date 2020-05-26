<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
              <ValidationObserver ref="loginForm">
              <v-form  @submit.prevent="userLogin">
          <v-card class="elevation-6">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title> Center Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-alert type="error" dense outlined v-if="allerror">
                <ul v-for="(error , index) in allerror" :key="index">
                  <li>{{error[0]}}</li>
                </ul>
              </v-alert>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required"> 
                <v-text-field
                  label="Login"
                  name="email"
                  :error-messages="errors"
                  v-model="user.email"
                  type="email"
                /> 
                </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="Password" rules="required"> 
                <v-text-field
                  id="password"
                  label="Password"
                  v-model="user.password"
                  :error-messages="errors"
                  name="password"
                  type="password"
                />
              </ValidationProvider>  
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary" :to="{name: 'forgot-password'}">Forgot Password</v-btn>
              <v-spacer />
              <v-btn color="primary" @click="clear">Reset</v-btn>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </ValidationObserver>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email, max, min  } from "vee-validate/dist/rules";
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
  name: "Centerlogin",
  
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      allerror: ""
    };
  },

  methods: {
    ...mapActions({
      loginUser: "user/loginUser",
      signIn: "auth/signIn",
      addNotification: "application/addNotification",
      addLoading: "loading/addLoading",
      removeloading: "loading/removeloading",
    }),

    userLogin(){
      this.$refs.loginForm.validate().then((success) => {
        if(!success){
          return ;
        }
        this.addLoading({ show: true , text: "Please Wait your requset proceding..." });
        this.signIn(this.user)
        .then((response) => {
          this.removeloading({ show: false });
          this.$router.push({ name: "dashboard-home" });
            this.addNotification({
              show: true,
              text: "You Are Login Successfully"
            });
        })
        .catch((error) => {
          if(error.response.status == 422){
            this.removeloading({ show: false });
            this.allerror = error.response.data.errors;
          }
            this.addNotification({
            show: true,
            text: "Login Failed Something Wrong"
            });
        })
      });
      this.allerror = "";
    },

    clear(){
        this.user.email = "",
        this.user.password = "",
        this.$refs.loginForm.reset();
    }

  }
};
</script>