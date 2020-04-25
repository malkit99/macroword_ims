<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-6">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-alert type="error" dense outlined v-if="allerror">
                <ul v-for="(error , index) in allerror" :key="index">
                  <li>{{error[0]}}</li>
                </ul>
              </v-alert>
              <v-form ref="loginForm" v-model="valid">
                <v-text-field
                  label="Login"
                  name="email"
                  :rules="[...requiredRules , ...emailRules]"
                  v-model="user.email"
                  type="email"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  v-model="user.password"
                  :rules="[...requiredRules , ...passwordRules]"
                  name="password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="primary" :to="{name: 'forgot-password'}">Forgot Password</v-btn>
              <v-spacer />
              <v-btn color="primary" @click="userLogin">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PasswordValidationMixin from "../../mixins/PasswordValidationMixin";

export default {
  name: "login",
  mixins: [PasswordValidationMixin],
  data() {
    return {
      valid: true,
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
      addNotification: "application/addNotification"
    }),
    userLogin() {
      if (this.$refs.loginForm.validate()) {
        this.loginUser(this.user)
          .then(response => {
            this.$router.push({ name: "dashboard" });
            this.addNotification({
              show: true,
              text: "You Are Login Successfully"
            });
          })
          .catch(error => {
            console.log(error);
            this.addNotification({
              show: true,
              text: "Login Failed Something Wrong"
            });

            this.allerror = error.response.data.errors;
          });
      }
    }
  }
};
</script>