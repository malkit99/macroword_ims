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
            md="6"
          >
            <v-card class="elevation-6">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Reset Password</v-toolbar-title>
                <v-spacer />
              
              </v-toolbar>
              <v-card-text>
                <v-form ref="resetPasswordForm" :value="formValid">
                 <v-text-field
                    id="email"
                    label="Email"
                    v-model="user.email"
                    name="email"
                    type="email"
                  />

                  <v-text-field
                    id="password"
                    label=" New Password"
                    v-model="user.password"
                    name="password"
                    type="password"
                  />

                   <v-text-field
                    label="Confirm Password"
                    v-model="user.password_confirmation"
                    name="password_confirmation"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="resetPassword">Reset Password</v-btn>
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
    name:"ResetPassword",
    data() {
      return {
        formValid:false,
        user:{
          email:'',
          password:'',
          password_confirmation:''
        },

      }
    },

    methods: {
      ...mapActions({
        resetNewPassword:'user/resetNewPassword',
        addNotification:'application/addNotification'
      }),

      resetPassword(){
          if(this.$refs.resetPasswordForm.validate()){
              const token = this.$route.query.token;
              window.console.log(token);
              this.resetNewPassword({...this.user, token})
              .then(() => {
                  this.$router.push({name:'login'});
                    this.addNotification({
                        show: true,
                        text : 'Password Reset successfully'
                    })
              })
              .catch((error) => {
                    this.addNotification ({
                        show: true,
                        text : 'Password Reset Failed'
                    })
              })
              
          }
      }
    },
}
</script>