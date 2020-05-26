<template>
    <div>
        <v-card flat >
            <v-toolbar dark color="red" class="d-flex d-sm-none mt-2">

             <v-toolbar-title >
                    Get A Call Back
            </v-toolbar-title>
            </v-toolbar>
             <ValidationObserver ref="contactForm" >
                <v-form @submit.prevent="save">
                    <v-card-text>
                        <p class="headline text-center">Get a call Back </p>
                          <v-alert type="error" dense outlined v-if="allerror">
                                <ul v-for="(error , index) in allerror" :key="index">
                                <li>{{error[0]}}</li>
                                </ul>
                            </v-alert>
                        <v-col cols="12" offset-md="2" md="8" sm="12">
                            <ValidationProvider v-slot="{ errors }"  name="Name" rules="required|min:3|max:20">
                            <v-text-field
                                name=""
                                v-model="contact.name"
                                label="Enter Your Name"
                                outlined
                                :error-messages="errors"
                            >
                            </v-text-field>
                            </ValidationProvider>
                        </v-col>   
                        <v-col cols="12" offset-md="2" md="8"  sm="12">
                            <ValidationProvider v-slot="{ errors }"  name="Email" rules="required|email">
                            <v-text-field
                                name=""
                                label="Enter Your Email"
                                outlined
                                v-model="contact.email"
                                :error-messages="errors"
                            >
                            </v-text-field>
                            </ValidationProvider>
                        </v-col>
                        <v-col cols="12" offset-md="2" md="8"  sm="12">
                        <ValidationProvider v-slot="{ errors }"  name="Mobile Number" rules="required|max:15">
                           <vue-tel-input v-model="contact.mobile"  v-bind="bindProps" @onInput="onInput"></vue-tel-input>
                        <span v-if="errors" class="red--text caption ml-2 "> {{ errors[0] }}</span>
                        </ValidationProvider>
                        </v-col>
                        <v-col cols="12" offset-md="2" md="8"  sm="12">
                        <ValidationProvider v-slot="{ errors }"  name="Messgae" rules="required">
                           <v-textarea
                            outlined
                            name="message"
                            label="Message"
                            v-model="contact.message"
                            value="The Woodman set to work at once, and so"
                            :error-messages="errors"
                            ></v-textarea>
                        </ValidationProvider>    
                        </v-col>
                        <v-col cols="12" offset-md="2" md="8" offset-sm="3" sm="6">
                            <v-card-actions>

                                <v-btn color="blue" @click="reset">Reset</v-btn>
                                <v-btn color="success" type="submit">Get A Call Back</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-card-text>
                </v-form>
             </ValidationObserver>    
        </v-card>
    </div>
</template>
<script>
import { required,  max, min , email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import {mapActions } from 'vuex';

setInteractionMode("eager");

extend("email", {
  ...email,
  message: "{_field_} must be a email"
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
export default {
    name:"ContactPage",
      components: {
        ValidationProvider,
        ValidationObserver
    },
        data() {
      return {
          contact:{
          mobile:"",
          email:"",
          name:"",
          message:"",
          },
          bindProps:{
            mode: "international",
            defaultCountry: "IN",
            placeholder: "Enter a mobile number",
            onlyCountries: ["IN"],
            wrapperClasses: "heite",
            maxLen: 15,
            required:true,
          },

          allerror:"",
      }

    },

    methods: {

        ...mapActions({
            saveContact:'contact/saveContact',
        }),
        onInput({ number, isValid, country }) {
            this.contact.mobile = number.e164
        },

        save(){
            this.$refs.contactForm.validate().then((success) => {
                if(!success){
                    return ;
                }
                this.saveContact(this.contact)
                .then((response) => {
                   if(response.status == 201){
                        this.allerror = "";
                        this.clear();
                        this.reset();
                   }
                })
                .catch((error) => {
                    this.allerror = error.response.data.errors
                })
            });
                
        },

        reset(){
            this.$refs.contactForm.reset()
        },

        clear(){
            this.contact.name = "",
            this.contact.email = "",
            this.contact.mobile = "",
            this.contact.message = ""    
        }
    },
}
</script>
<style scoped >
    .heite{
        height: 56px;
    }
</style>