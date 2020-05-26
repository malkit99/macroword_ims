<template>
   <v-container>
        <v-row 
      align="center" 
      justify="center"   
      v-for="n in 1"
      :key="n"
      :class="n === 1 ? 'mb-6' : ''"
      >
      <v-col cols="12" sm="6" md="4"  v-for="(item , index) in services " :key="index" >
          <div class="text--primary">
            <v-hover>
                <template v-slot="{ hover }">
                  <v-card
                    :elevation="hover ? 10 : 4"
                    class="mx-auto pa-6"
                    >
                    <v-toolbar flat >
                    <v-spacer></v-spacer>
                      <v-toolbar-title>
                          <v-avatar size="96" >
                            <v-img  :src="item.service_image"></v-img>
                          </v-avatar>
                      </v-toolbar-title>
                          <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-title >
                      <v-spacer></v-spacer>
                      {{item.service}}
                      <v-spacer></v-spacer>
                    </v-card-title>

                <v-card-text class="text-center">      
                     {{item.description}}
                </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                              </v-btn>
                              <v-btn icon>
                                <v-icon>mdi-bookmark</v-icon>
                              </v-btn>
                              <v-btn icon>
                                <v-icon>mdi-share-variant</v-icon>
                              </v-btn>
                            </v-card-actions>
                  </v-card>
                </template>
            </v-hover>
          </div>
      </v-col>
    </v-row>
   </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:"AcadimicWork",
    computed: {
      ...mapGetters({
        services:'website_detail/getService',
      }),
    },

}
</script>