<template>
<v-parallax src="../../../../../public/img/student.jpg" height="700">
 <v-overlay value="true" absolute color="cyan darken-4" opacity="0.50">
<v-container>   
        <p class=" font-weight-bold display-2 text-center" >Why Choose Macroword Academy</p>    
      <v-row 
      v-for="n in 1"
      :key="n"
      :class="n === 1 ? 'mb-6' : ''"
      >
         <v-col cols="12" sm="6" md="3" v-for="( item , index) in  items.slice(0,4) " :key="index">
                    <v-card
                    color="white darken-4"
                    dark
                    min-width="250"
                    class="mr-5"
                    >
                    <v-img
                    class="white--text align-center"
                    height="200px"
                    :src="item.facility_image"
                    >
                    <div class="text-center headline ">{{ item.facility_name}}</div>
                    <div class="text-center caption ">{{ item.title}}</div>
                    </v-img>


                    <v-card-text class="text--primary">
                    <div class="text-center">{{ item.description}}</div>
                    </v-card-text>
                    </v-card>
         </v-col>
    </v-row >
        <v-row class=" font-weight-bold display-2 text-center">   
         <v-col cols="12" sm="6" md="3" >
             <p>Student</p>
             <p>       
            <animate-number
                from="1" 
                to="5000" 
                duration="10000" 
                easing="easeOutQuad"
                from-color="#067511" 
                to-color="#f7f7f7"
                :formatter="formatter"
                >
            </animate-number>
            </p >
         </v-col>
          <v-col cols="12" sm="6" md="3" >
             <p>Courses</p>
             <p>
            <animate-number
                from="1" 
                to="5000" 
                duration="10000"
                 from-color="#067511" 
                to-color="#f7f7f7" 
                easing="easeOutQuad"
                :formatter="formatter"
                >
            </animate-number>
            </p >
           
         </v-col>
          <v-col cols="12" sm="6" md="3"  >
             <p>Teacher</p>
                <p>
            <animate-number
                from="1" 
                to="5000" 
                duration="10000"
                from-color="#067511" 
                to-color="#f7f7f7" 
                easing="easeOutQuad"
                :formatter="formatter"
                >
            </animate-number>
            </p >
         </v-col>
          <v-col cols="12" sm="6" md="3" >
             <p>Placment</p>
               <p>
            <animate-number
                from="1" 
                to="5000" 
                duration="10000" 
                easing="easeOutQuad"
                 from-color="#067511" 
                to-color="#f7f7f7"
                :formatter="formatter"
                >
            </animate-number>
            </p >
         </v-col>
    </v-row>   
</v-container>
</v-overlay>
</v-parallax>
  
  
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:"WhyChooseUs",
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            items:'website_detail/getFacility',
        }),
    },

        methods: {
        formatter: function (num) {
            return num.toFixed(2)
        },

        startAnimate: function () {
            this.$refs.myNum.start()
        }
        }
 
}
</script>