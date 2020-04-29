<template>
<v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    <v-overlay value="true" absolute color="black darken-4">        
                
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.8533467812795!2d75.89272111430742!3d30.862780681591943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a82b23854498b%3A0x1ad77692924b66bc!2sRajeev%20Gandhi%20Computer%20Saksharta%20Mission!5e0!3m2!1sen!2sin!4v1587809389699!5m2!1sen!2sin" width="900px" height="500px" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>        
    </v-overlay>  
</v-parallax>
</template>
<script>
export default {
    name:"GoogleMap",
    data() {
        return {
         
        }
    },
}
</script>