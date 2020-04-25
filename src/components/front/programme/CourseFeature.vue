<template>
    <div>
       <v-card>
           <v-toolbar color="red" dark>
               <v-toolbar-title>
                   Course Feature
               </v-toolbar-title>
           </v-toolbar>
        <v-list >
            <v-list-item>
                <v-list-item-icon>
                <v-icon color="error" large >mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="headline red--text">Max-Student-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="headline red--text">30 Seats</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset color="red"></v-divider>
                    <v-list-item>
                <v-list-item-icon>
                <v-icon color="error" large >mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="headline red--text">Max-Student-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="headline red--text">30 Seats</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset  color="red"></v-divider>
       <v-card-actions>
           <v-btn block color="red mt-5" dark >Enroll Now</v-btn>
       </v-card-actions>
        </v-list>
       </v-card>
    </div>
</template>
<script>
export default {
    name:"CourseFeature",
}
</script>