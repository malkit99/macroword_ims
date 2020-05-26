<template>
        <v-container>
        <v-row
        align="center"
        justify="center"
        >
            <h1 >Our Services</h1>
        </v-row>
        <v-row 
      align="center" 
      justify="center"   
      v-for="n in 1"
      :key="n"
      :class="n === 1 ? 'mb-6' : ''"
      >
      <v-col cols="12" sm="6" md="4"  v-for="k in n+2 " :key="k" >
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
                            <v-img  src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                          </v-avatar>
                      </v-toolbar-title>
                          <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-title>
                      Macroword Computer Academy
                    </v-card-title>

                <v-card-text class="text-center">      
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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
export default {
    name:'ServiceComponent',
}
</script>