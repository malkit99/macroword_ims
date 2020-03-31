<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="6"  md="4">
          <v-card
          max-width="375"
          class="mx-auto"
        >

     <v-img
      :src="imageURL ? imageURL :getUserById.profile_image"
      height="300px"
      dark
    >

      <v-row >
        <v-card-title class="white--text pl-12 pt-12">
              <v-btn dark icon class="mr-4"  @click="onpickFile" >
              <v-icon color="error">mdi-pencil</v-icon>
              </v-btn>
              <input
              type="file"
              ref="fileInput"
              accept="image/*"
              name="profile_image"
              style="display:none"
              @change="onFilePicked"
              />
        </v-card-title>
        <v-spacer></v-spacer>
         <v-card-title class="white--text pl-12 pt-12" v-if="imageURL">
              <v-btn class="mr-4" color="pink" @click="saveFile" >
                upload
              </v-btn>
        </v-card-title>
      </v-row>
    </v-img>

    <v-list two-line>
    <v-list-item >
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ getUserById.name }}</v-list-item-title>
        </v-list-item-content>
         <v-list-item-icon>
          <v-icon color="indigo" >mdi-pencil</v-icon>
        </v-list-item-icon>
      </v-list-item>  
      <v-list-item >
        <v-list-item-icon>
          <v-icon color="indigo">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{getUserById.mobile}}</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon color="indigo" >mdi-pencil</v-icon>
        </v-list-item-icon>
      </v-list-item>

 

      <v-divider inset></v-divider>

      <v-list-item >
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ getUserById.email}}</v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>



      <v-divider inset></v-divider>

      <v-list-item >
        <v-list-item-icon>
          <v-icon color="indigo">mdi-map-marker</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="8">
       
  <div>
    <v-expansion-panels
      multiple
      focusable
      flat
      hover
    >
      <v-expansion-panel>
        <v-expansion-panel-header 
          dark 
          v-for=" role in getUserById.roles"
          :key="role.id"
          color="primary"
          class="white--text , text-uppercase"
          >

         {{ role }}
         </v-expansion-panel-header>
        <v-expansion-panel-content>
              <v-chip
              class="ma-2"
              color="primary"
              v-for="(permission , i) in getUserById.permissions"
              :key="i"
              >
              {{ permission }}
              </v-chip>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters , mapActions } from 'vuex';
import axios from 'axios';
  export default {
    data: () => ({
      imageURL:"",
      image:"https://cdn.vuetifyjs.com/images/lists/ali.png",
      profile_image : "",
    }),

  mounted() {
    this.$store.dispatch('register/userById', this.$route.params.id  );
  },

  computed: {
    ...mapGetters({
      getUserById:'register/getUserById'
    }),
  },

  methods: {


    ...mapActions({
    addNotification:'application/addNotification',
    }),
        onpickFile(){
          this.$refs.fileInput.click();
    },

  onFilePicked(event){   
    const files = event.target.files;
        this.readFile(files);
        this.profile_image = files[0];   
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

    saveFile() {
      let data = new FormData();
      data.append('profile_image', this.profile_image);
      axios.post(`api/upload/${this.getUserById.id}/image-update` , data )
      .then((response) => {
        console.log(response.data.data.profile_image)
          this.addNotification({
                show: true,
                text : 'Profile Image Upload Successfully'
            })
      })
      .catch((error) => {
          this.addNotification({
            show: true,
            text : 'Profile Image Not Upload'
          })
      })
    },
  },

  }
</script>