<template>
        <v-card>
            <v-toolbar color="primary" dark >
                <v-card-title>
                    Edit Team Member Detail
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn color="primary"  class="mb-2" :to="{name:'team-home'}">Back</v-btn>
            </v-toolbar>

            <v-card-text>
            <ValidationObserver ref="teamForm" v-slot="{ validate, reset }">
            <v-form @submit.prevent="save">
                <v-card-text>
                <v-alert type="primary" dense outlined v-if="allerror">
                    <ul v-for="(error , index) in allerror" :key="index">
                    <li>{{error[0]}}</li>
                    </ul>
                </v-alert>
                    <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required|alpha_spaces|min:3|max:30" >
                        <v-text-field v-model="team.name" label="Enter Name" :error-messages="errors" ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <ValidationProvider v-slot="{ errors }" name="Designation" rules="required|alpha_spaces|min:3|max:30" >
                            <v-text-field v-model="team.post" name="post" label="Designation" :error-messages="errors" ></v-text-field>
                      </ValidationProvider>
                  </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider v-slot="{ errors }" name="Facebook" >
                            <v-text-field v-model="team.facebook" label="Facebook Url" :error-messages="errors" ></v-text-field>
                      </ValidationProvider>
                  </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider v-slot="{ errors }" name="Post" >
                            <v-text-field v-model="team.insta" label="InstaGram Url" :error-messages="errors" ></v-text-field>
                      </ValidationProvider>
                  </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider v-slot="{ errors }" name="Post" >
                            <v-text-field v-model="team.twitter" label="Twitter" :error-messages="errors" ></v-text-field>
                      </ValidationProvider>
                  </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider v-slot="{ errors }" name="Post" >
                            <v-text-field v-model="team.linkedin" label="Linkedin url" :error-messages="errors" ></v-text-field>
                      </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row>
                <v-col cols="12" sm="6" md="12">
                    <ValidationProvider v-slot="{ errors }" name="Description" rules="required" >
                           <v-textarea
                            label="Description"
                            auto-grow
                            outlined
                            v-model="team.description"
                            rows="2"
                            :error-messages="errors"
                            row-height="15"
                            clearable
                            ></v-textarea>
                    </ValidationProvider>
                </v-col>
                </v-row>

                <v-row>
                <v-col cols="12" sm="6" md="6">
                <v-list-item-avatar tile size="200" color="grey">
                        <v-img :src="imageURL ? imageURL : team.team_image"></v-img>
                </v-list-item-avatar>
                    <ValidationProvider v-slot="{ errors , validate }" name="Team Member Image" rules="required">
                        <v-btn color="error" @click="onpickFile">Image Upload</v-btn>
                        <p id="error" class="red--text">{{ errors[0] }}</p>
                            <input
                            type="file"
                            ref="fileInput"
                            accept="image/*"
                            name="profile_image"
                            :error-messages="errors"
                            style="display:none"
                            @change="onFilePicked($event) || validate($event)"
                            />
                    </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="6" md="6" >
                    <v-btn color="error" class="mr-2"  @click="clear">Reset</v-btn>
                    <v-btn color="success"  @click="save">Save</v-btn>  
                </v-col>
                </v-row>
                    </v-container>
                </v-card-text>
            </v-form>
            </ValidationObserver> 
            </v-card-text>
        </v-card>
</template>

<script>
import axios from 'axios';
import {mapActions} from 'vuex';
import { required, max, min , alpha_spaces } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "{_field_} field may only contain alphabetic characters"
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
    name:"CreateTeam",
        components: {
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            imageURL:"",
            team:{
                name:"",
                description:"",
                post:"",
                facebook:"",
                insta:"",
                twitter:"",
                linkedin:"",
            },
            links:[],
            team_image:"",
            allerror:"",
        }
    },

        created() {
            this.initialize();
        },

    methods: {
        ...mapActions({
            addNotification:'application/addNotification',
            saveTeam:'team/saveTeam',
            getTeamById:'team/getTeamById',
        }),
        initialize(){
            this.getTeamById(this.$route.params.id).then(response => {
            this.team = response.data.data;
            });
        },
        onpickFile(){
            this.$refs.fileInput.click();
        },

        onFilePicked(event){   
            const files = event.target.files;
            this.readFile(files);
            this.team_image = files[0];   
        },

        readFile(files){
            const fileName = files[0].name;  
            if (fileName.lastIndexOf(".") <= 0) {
            return alert("Please add a valid file");
            }
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
            this.imageURL = fileReader.result; 
            });
            fileReader.readAsDataURL(files[0]);
        },

        save(){
            this.$refs.teamForm.validate().then((success) => {
                if(!success){
                    return ;
                }
                this.allerror = "";
                let data = new FormData();
                data.append('name' , this.team.name);
                data.append('post' , this.team.post);
                data.append('description' , this.team.description);
                data.append('linkedin' , this.team.linkedin);
                data.append('twitter' , this.team.twitter);
                data.append('insta' , this.team.insta);
                data.append('facebook' , this.team.facebook);
                data.append('team_image' , this.team_image);
                axios.post(`api/team/${this.$route.params.id}`, data)
                .then((response) => {
                    if(response.status == 201){
                        const data = response.data.data
                        this.$store.commit('UPDATE_TEAM' , data);
                    }
                    this.$router.push({name: 'team-home'});
                    this.addNotification({
                        show: true,
                        text : 'Our Team Member Created Successfully'
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.allerror = error.response.data.errors;
                })
            })
                this.allerror = "";
        },
        clear(){
            this.team.name = "",
            this.team.post = "",
            this.team.description = "",
            this.team.facebook = "",
            this.team.insta = "",
            this.team.twitter = "",
            this.team.linkedin = "",
            this.team_image = "",
            this.$refs.teamForm.reset()
        }
    },

}
</script>