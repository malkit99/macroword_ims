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
                    :rules="[...requiredRules , ...emailRules]"
                    name="email"
                    type="email"
                  />

                  <v-text-field
                    id="password"
                    label=" New Password"
                    v-model="user.password"
                    :rules="[...requiredRules , ...passwordRules , customValidtor]"
                    name="password"
                    type="password"
                  />

                   <v-text-field
                    label="Confirm Password"
                    v-model="user.password_confirmation"
                    :rules="[...requiredRules , ...passwordRules , customValidtor]"
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
import PasswordValidationMixin from '../../mixins/PasswordValidationMixin'
export default {
    name:"ResetPassword",
    mixins:[PasswordValidationMixin],
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
      },
         customValidtor(){
              return (this.user.password_confirmation === this.user.password)||"New Password does not match";
            }
    },
} 
</script>