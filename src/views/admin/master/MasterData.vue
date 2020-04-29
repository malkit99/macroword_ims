<template>
  <v-container>
     <v-row class="mb-6" no-gutters>
        <v-col cols="12" sm="12" md="12">
         <v-toolbar color="primary">
             
         </v-toolbar>
        </v-col>
      </v-row>
      <v-row class="mb-6">
        <v-col cols="12" sm="12" md="4">
          <duration></duration>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <course-code></course-code>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <course-fee></course-fee>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <batch-size></batch-size>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <telephone template="XXXXXXX"></telephone>
        </v-col>

         <v-col cols="12" sm="12" md="4">
          <vue-tel-input v-model="mobile" v-bind="bindProps"></vue-tel-input>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
import Duration from '../../../components/admin/Duration';
import BatchSize from '../../../components/admin/BatchSize';
import CourseFee from '../../../components/admin/CourseFee';
import CourseCode from '../../../components/admin/CourseCode';
import Telephone from '../../../components/admin/Telephone';
export default {
    name:"MasterData",
    components:{ Duration , BatchSize , CourseFee , CourseCode , Telephone },
    data() {
      return {
          mobile:"",
          bindProps:{
            mode: "international",
            defaultCountry: "IN",
            placeholder: "Enter a mobile number",
            onlyCountries: ["IN"],
            autocomplete: "on",
            maxLen: 15,
            required:true,
            enabledFlags: true,
          },
      }

    },
}
</script>