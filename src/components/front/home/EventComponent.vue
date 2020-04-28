<template>
  <v-container>
    <v-row
      align="center" 
      justify="center"   
      v-for="n in 1"
      :key="n"
      :class="n === 1 ? 'mb-6' : ''"
    >
      <v-col cols="12" sm="6" md="4"  v-for="k in n+2 " :key="k">
  <v-card
    class="mx-auto"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    >
    </v-img>
    <v-card-title>
      Top western road trips
    </v-card-title>
    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>
    <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deserunt ad architecto velit consequatur minima natus inventore perspiciatis aliquid? Officiis qui soluta ducimus, odit repudiandae adipisci placeat fugit nemo assumenda?
    </v-card-text>
     
      <v-card-actions>
          <v-btn text color="success">
            More Info
          </v-btn>
      </v-card-actions>
   
  </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
    name:"EventComponent",
}
</script>