<template>
<v-col cols="12" md="12" sm="12">
    <v-card>
    <ValidationObserver ref="contactForm" >
    <v-form @submit.prevent="save">
        <v-card-title primary-title>
            Get a Call Back
        </v-card-title>
        <v-alert type="error" dense outlined v-if="allerror">
            <ul v-for="(error , index) in allerror" :key="index">
            <li>{{error[0]}}</li>
            </ul>
        </v-alert>
            <v-col cols="12" offset-md="2" offset-sm="2" sm="8" md="8">
                <ValidationProvider v-slot="{ errors }"  name="Name" rules="required|min:3|max:20">
                <v-text-field
                    name="name"
                    label="Enter Your Name"
                    outlined
                    v-model="contact.name"
                    :error-messages="errors"
                ></v-text-field>
                </ValidationProvider>
            </v-col>
              <v-col cols="12" offset-md="2" offset-sm="2" sm="8" md="8">
            <ValidationProvider v-slot="{ errors }"  name="Email" rules="required">      
                <v-text-field
                    name="name"
                    label="Enter Your Email"
                    outlined
                    v-model="contact.email"
                    :error-messages="errors"
                ></v-text-field>
            </ValidationProvider>
            </v-col>
              <v-col cols="12" offset-md="2" offset-sm="2" sm="8" md="8">
                <ValidationProvider v-slot="{ errors }"  name="Mobile Number" rules="required|max:15">
                    <vue-tel-input v-model="contact.mobile"  v-bind="bindProps" @onInput="onInput" ></vue-tel-input>
                    <span v-if="errors" class="red--text caption ml-2 "> {{ errors[0] }}</span>
                </ValidationProvider>  
            </v-col>
              <v-col cols="12" offset-md="2" offset-sm="2" sm="8" md="8">
            <ValidationProvider v-slot="{ errors }"  name="Course" rules="required">      
                 <v-select
                label="Choose A Course"
                outlined
                :items="courses"
                item-text="course_name"
                item-value="course_id"
                v-model="contact.course_id"
                :error-messages="errors"
                ></v-select>
            </ValidationProvider>    
            </v-col>
            <v-col cols="12" offset-md="2" offset-sm="2" sm="8" md="8">
                <v-card-actions>
              <v-btn color="red" dark @click="reset">Reset</v-btn>
              <v-btn color="success" dark  type="submit">Get a Call Back</v-btn>
                </v-card-actions>
            </v-col>
        </v-form>
    </ValidationObserver>
    </v-card>
    </v-col>
</template>
<script>
import { required,  max, min , email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import {mapActions, mapGetters } from 'vuex';

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
    name:"CourseEnquery",
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
          course_id:"",
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

    computed: {
        ...mapGetters({
            courses:'website_detail/getCourseName',
        }),
    },

    methods: {

        ...mapActions({
            saveCalBack:'contact/saveCalBack',
        }),

        save(){
            this.$refs.contactForm.validate().then((success) => {
                if(!success){
                    return ;
                }
                this.saveCalBack(this.contact)
                .then((response) => {
                if(response.status == 201){
                        this.allerror = "";
                        this.clear();
                        this.reset();
                   }
                })
                .catch((error) =>{
                    this.allerror = error.response.data.errors
                });
            });
        },

        onInput({ number, isValid, country }) {
          this.contact.mobile = number.e164
        },
        reset(){
            this.$refs.contactForm.reset()
        },

        clear(){
            this.contact.name = "",
            this.contact.email = "",
            this.contact.mobile = "",
            this.contact.course_id = ""    
        }
    },
}
</script>

<style scoped >
    .heite{
        height: 56px;
    }
</style>