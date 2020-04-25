<template>
      <div>
       <v-card>
           <v-toolbar color="red" dark >
               <v-toolbar-title>
                   Get A Call Back
               </v-toolbar-title>
           </v-toolbar>
                <v-form>
            <v-card-text>
                    <v-col cols="12">
                           <v-text-field
                                label="Enter Your Name"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                label="Enter Your Email"
                                outlined
                            ></v-text-field>
                             <v-text-field
                                label="Enter Your Mobile Number"
                                outlined
                            ></v-text-field>
                            <v-select
                            label="Choose A Course"
                            outlined
                            ></v-select>
                <v-btn block color="red" dark >Talk to Our Carrer Guied</v-btn>
                    </v-col>

            </v-card-text>
            <v-card-actions>
            </v-card-actions>
                </v-form>

       </v-card>
    </div>
</template>
<script>
export default {
    name:"CourseEnquery",
}
</script>