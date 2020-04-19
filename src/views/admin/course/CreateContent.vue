<template>
    <ValidationObserver ref="userForm" v-slot="{ validate, reset }">
        <v-form @submit.prevent="save">
  <v-card class=" mx-auto">
      <v-toolbar color="primary">      
            <v-card-title color="primary" class="display-1 white--text" >Create Course Content</v-card-title>
      </v-toolbar>
    <v-card-text>
        <v-container>
            <v-alert type="primary" dense outlined v-if="allerror">
                  <ul v-for="(error , index) in allerror" :key="index">
                    <li>{{error[0]}}</li>  
                  </ul>
            </v-alert>
            <v-row justify="center" >
                <v-col cols="12" sm="6" md="8">
                <ValidationProvider v-slot="{ errors }"  name="Subject Name" rules="required">
                    <v-text-field
                        name="content_name"
                        label="Subject Title"
                        v-model="subject_name"
                        :error-messages="errors"  
                    >
                    </v-text-field>
                </ValidationProvider>
                </v-col>
            </v-row>
            <v-card>
                <v-card-actions>
                     <v-btn color="blue darken-1" dark class="mx-2" @click="addField" > More Field
                     <v-icon>mdi-plus</v-icon>    
                     </v-btn>
                     <v-spacer></v-spacer>
                      <p class="subtitle-1">Write Course Content in Detail</P>
                </v-card-actions>
                <v-card-text>             
                <v-row justify="center" no-gutters v-for="(content , index) in contents" :key="index">
                   
                    <v-col cols="12" sm="9" md="12" class="mb-5">
                        <span>
                            <v-btn color="error" dark class="mb-2" small @click="removeField(index)">Remove Field</v-btn>
                        </span>
                        <ValidationProvider v-slot="{ errors }"  name="Topic Name" >
                            <v-text-field
                                name="topic_name"
                                label="Enter Topic Name"
                                outlined
                                v-model="content.topic_name"
                                :error-messages="errors"
                            >
                            </v-text-field>
                        </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }"  name="Topic Description" >
                         <p class="red--text ">{{ errors[0] }}</P>
                         <p class="subtitle-1">Topic Content in Detail</P>

                        <ckeditor :editor="editor" v-model="content.topic_description" :config="editorConfig"></ckeditor>
                    </ValidationProvider>
                    </v-col>
                    <v-col cols="12" sm="9" md="12" class="mb-5">
                       
                    <v-system-bar color="primary">
                        
                    </v-system-bar>
                    </v-col>
                </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
            <v-btn color="blue darken-1" dark class="mx-5" @click="clear" >Reset</v-btn>
            <v-btn color="success" dark class="mx-5" @click="save" >Save</v-btn>
    </v-card-actions>
  </v-card>
        </v-form>
    </ValidationObserver>
</template>
<script>
import {mapActions} from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { required, max, min } from "vee-validate/dist/rules";
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


extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
export default {
  name: "CreateContent",
   components: {
        ValidationProvider,
        ValidationObserver
      },
  data() {
      return {

        editor: ClassicEditor,
        editorConfig: {
            // The configuration of the editor.
        },    
        subject_name: "",
        contents: [],
        allerror:'',
        
      }
  },

  

  methods: {
      ...mapActions({
          saveContent:'content/saveContent',
          addNotification:'application/addNotification',

      }),

      addField(){
          this.contents.push({topic_name : '' , topic_description:'' })
      },

       removeField(index){
          alert(index);
          this.contents.splice(index, 1);
      },

      clear(){
          this.subject_name = "",
          this.contents = [],
          this.$refs.userForm.reset()
      },

      save(){
          this.$refs.userForm.validate().then((success) => {
              if(!success){
                  return ;
              }
            this.allerror ='';
            const data = {subject_name: this.subject_name , contents: this.contents};
              this.saveContent(data)
              .then((response) => {
                  this.$router.push({name: 'course-content'});
                    this.addNotification({
                        show: true,
                        text : 'Course Content Created Successfully'
                    });
              })
              .catch((error) => {
                  if(error.response.data.errors){
                      this.allerror = error.response.data.errors
                  }
              })
          })
          this.allerror = ''
      }
  },
};
</script>