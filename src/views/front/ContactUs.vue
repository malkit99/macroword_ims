<template>
  <div>
    <!-- extra page header start here  -->
  <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="200">
    <v-overlay value="true" absolute color="black darken-4">        
                  <h1 class="text-center">Contact Us</h1>
                  <h4 class="text-center">Learn From Professional</h4>
    </v-overlay>  
  </v-parallax>
  <v-container fluid>
      <v-row>
      <v-col cols="12" sm="12" xs12 md="6">
         <contact-component></contact-component>
      </v-col>
    <v-col cols="12" sm="12" xs12 md="6">
         <addvirtiesment-component></addvirtiesment-component>
    </v-col>
      </v-row>
    <v-row>
      <v-col cols="12" sm="12"  md="12">
           <v-toolbar color="red" dark>
                <v-toolbar-title>
                    Get Direction To Macroword
                </v-toolbar-title>
            </v-toolbar>
           <google-map></google-map>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>
<script>
import GoogleMap from '../../components/front/contact/GoogleMap'
import ContactComponent from '../../components/front/contact/ContactComponent'
import AddvirtiesmentComponent from '../../components/front/contact/AddvirtiesmentComponent'
export default {
  name:"Programme",
  components:{ 
      GoogleMap ,
      ContactComponent,
      AddvirtiesmentComponent,
    },
}
</script>