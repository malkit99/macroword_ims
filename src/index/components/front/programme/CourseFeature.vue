<template :course="items">
    <div>
       <v-card>
           <v-toolbar color="red" dark>
               <v-toolbar-title class="text-uppercase">
                   {{course.course_name}} Course Feature
               </v-toolbar-title>
           </v-toolbar>
        <v-list >
            <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Course Name-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.course_name}}</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset color="red"></v-divider>
             <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Course Code-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.code}}</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset  color="red"></v-divider>
            <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Duration-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.duration}}</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset  color="red"></v-divider>
                    <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Course Fee-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.fee}} INR </v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset  color="red"></v-divider>
                    <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Practical Training-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.training}}</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset  color="red"></v-divider>
                    <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Certificate-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.certificate}}</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset  color="red"></v-divider>
                    <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Certified Instructor-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.instructor}}</v-list-item-title>
                </v-list-item-content>         
            </v-list-item>
        <v-divider inset  color="red"></v-divider>
                    <v-list-item>
                <v-list-item-icon>
                <v-icon color="error">mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">Skill Level-:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                <v-list-item-title class="subtitle-2 red--text">{{ course.level}}</v-list-item-title>
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
    props:['course']
}
</script>