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
      </v-row>

  </v-container>
</template>

<script>
import Duration from '../../../components/Duration';
import BatchSize from '../../../components/BatchSize';
import CourseFee from '../../../components/CourseFee';
import CourseCode from '../../../components/CourseCode';
import Telephone from '../../../components/Telephone';
export default {
    name:"MasterData",
    components:{ Duration , BatchSize , CourseFee , CourseCode , Telephone}
}
</script>