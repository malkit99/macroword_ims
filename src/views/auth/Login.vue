<template>
    <div>
        <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-6">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginForm" :value="formValid">
                  <v-text-field
                    label="Login"
                    name="email"
                    v-model="user.email"
                    type="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="user.password"
                    name="password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
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
import {mapActions} from 'vuex'
export default {
    name:"login",
    data() {
      return {
        user:{
          email:'',
          password:''
        },

        formValid:false,
      }
    },

    methods: {
      ...mapActions({
        loginUser : 'user/loginUser',
         addNotification:'application/addNotification'
      }),
      userLogin(){
        if(this.$refs.loginForm.validate()){
          this.loginUser(this.user)
          .then((response) => {
            this.$router.push({name: 'dashboard'});
             this.addNotification({
                  show: true,
                  text : 'You Are Login Successfully'
              })
          })
          .catch(()=>{
             this.addNotification({
                  show: true,
                  text : 'Login Failed Something Wrong'
              })
          })
        }
      }
    },
}
</script>