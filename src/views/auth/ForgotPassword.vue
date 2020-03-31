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
                <v-toolbar-title>Forgot Password</v-toolbar-title>
                <v-spacer />
              
              </v-toolbar>
              <v-card-text>
                <v-form ref="forgotPasswordForm">
                  <v-text-field
                    label="Email "
                    name="email"
                    :rules="[...requiredRules , ...emailRules]"
                    v-model="email"
                    type="email"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="sendForgotPassword"> Send Email Link </v-btn>
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
    name:"ForgotPassword",
    mixins:[PasswordValidationMixin],
    data() {
      return {

       email:'',

        
      }
    },

    methods: {
      ...mapActions({
          forgotPassword:'user/forgotPassword',
           addNotification:'application/addNotification'
      }),

      sendForgotPassword(){
          if(this.$refs.forgotPasswordForm.validate()){
              this.forgotPassword({email:this.email})
              .then((response) => {
                     this.addNotification({
                        show: true,
                        text : 'Password Reset Link Sent on Email'
                    })
              })
              .catch(() => {
                    this.addNotification({
                        show: true,
                        text : 'Password Reset Failed'
                    })
            });
          }
      }
     
    },
}
</script>