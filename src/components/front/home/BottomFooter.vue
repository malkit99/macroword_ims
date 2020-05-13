<template>
<div>
    <v-footer dark >
        <v-container fluid >
            <v-row class="mx-15 text-center" v-for="(item , index) in footer" :key="index" >
                <v-col cols="12" sm="6" md="3">
                    <p class="headline"> Contact Us</p>
                    <v-list three-line dark >
                        <v-list-item>
                        <v-list-item-icon>
                            <v-icon >mdi-map-marker</v-icon>
                        </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle class="text-left">{{item.address_line_1}}</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-left" v-if="item.address_line_2">{{item.address_line_2}}, {{item.city ? item.city : ""}}</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-left">{{item.district}} {{item.state}} {{item.country}} , {{ item.pin_code ? item.pin_code : ""}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                          <v-list-item>
                        <v-list-item-icon>
                            <v-icon >mdi-email</v-icon>
                        </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle class="text-left">{{item.email}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-icon>
                            <v-icon >mdi-cellphone-iphone</v-icon>
                        </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle class="text-left">{{item.mobile}}</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-left" v-if="item.mobile_2">{{ item.mobile_2 ? item.mobile_2 : ""}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
                 <v-col cols="12" sm="6" md="6">
                    <p class="headline"> Contact Us </p>
                </v-col>
                 <v-col cols="12" sm="6" md="3">
                    <p class="headline text-left">Subcribers Us</p>
                    <v-row>
                        <v-form >
                            <v-col cols="12" sm="6" md="12">
                                <v-text-field
                                    name="name"
                                    label="Enter Yor Email"
                                    outlined
                                    solo
                                    id="id"
                                ></v-text-field>
                            </v-col>
                        <v-col cols="12" sm="6" md="12">
                            <v-btn x-large color="success" dark>Extra large Button</v-btn>
                        </v-col>
                        </v-form>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="12">
                            <v-btn icon class="mr-5" :href="item.facebook" target="_blank">
                            <v-icon  large>mdi-facebook</v-icon>
                            </v-btn>
                             <v-btn icon class="mr-5" :href="item.twitter" target="_blank">
                            <v-icon  large>mdi-twitter</v-icon>
                            </v-btn >
                             <v-btn icon class="mr-5" :href="item.linkedin" target="_blank" >
                            <v-icon  large>mdi-linkedin</v-icon>
                            </v-btn> 
                            <v-btn icon  class="mr-5" :href="item.insta" target="_blank">
                            <v-icon large>mdi-instagram</v-icon>
                            </v-btn>
                            
                            
                            

                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="12">
                    <p class="text-center"> This is copyright website 2020</p>
                </v-col>
            </v-row>
        </v-container>   
        </v-footer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:"BottomFooter",

    computed: {
        ...mapGetters({
            footer:'website_detail/getWebsiteDetails',
        }),
    },
}
</script>