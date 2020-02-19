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
                <v-toolbar-title>Registration form</v-toolbar-title>
                <v-spacer />
              
              </v-toolbar>
              <v-card-text>
                <v-form ref="registerForm" :value="formValid">

                    <v-text-field
                    label="Name"
                    name="name"
                    v-model="form.name"
                    type="text"
                    />

                  <v-text-field
                    label="Email"
                    v-model="form.email"
                    name="email"
                    type="email"
                  />

                  <v-text-field
            
                    label="Password"
                    v-model="form.password"
                    name="password"
                    type="password"
                  />

                   <v-text-field
                    label="Confirm Password"
                    v-model="form.password_confirmation"
                    name="password_confirmation"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary"  @click.prevent="registerUser">Register</v-btn>
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
    name:"Register",
    data() {
      return {
        formValid:false,
        form:{
          name:'',
          email:'',
          password:'',
          password_confirmation:'',
        },

     
      }
    },
    methods: {
      ...mapActions({
        addNotification:'application/addNotification',
        register:'user/registerUser'
      }),
      registerUser(){
        if(this.$refs.registerForm.validate()){
          this.register(this.form)
          .then((response) => {
            if(response.data && response.data.success){
              this.addNotification({
                   show: true,
                   text : 'Ragistration successfully done'
                 }) 
            .then(() => {

              this.$router.push({name:'login'});     
            })        
            }
          })
          .catch(() => {
             this.addNotification({
                   show: true,
                   text : 'registration failed'
                 })
          });
        }
      },
    },
}
</script>