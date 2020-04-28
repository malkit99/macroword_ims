<template>
<div>
    <v-footer dark >
        <v-container fluid>
            <v-row class="mx-15 text-center">
                <v-col cols="12" sm="6" md="3">
                    <p class="headline"> Contact Us</p>
                    <v-list three-line dark >
                        <v-list-item>
                        <v-list-item-icon>
                            <v-icon >mdi-map-marker</v-icon>
                        </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle class="text-left">Macroword Computer Academy pvt.ltd.</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-left">Ludhiana Punjab India</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                          <v-list-item>
                        <v-list-item-icon>
                            <v-icon >mdi-email</v-icon>
                        </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle class="text-left">rgcsm.pb@gmail.com</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-left">rgcsm.pb@gmail.com</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                        <v-list-item-icon>
                            <v-icon >mdi-cellphone-iphone</v-icon>
                        </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-subtitle class="text-left">+91 99882-77100</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-left">+91 99882-77100</v-list-item-subtitle>
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
                            <v-icon  class="mr-5" large>mdi-facebook</v-icon>
                            <v-icon class="mr-5" large>mdi-twitter</v-icon>
                            <v-icon  class="mr-5" large>mdi-linkedin</v-icon>
                            <v-icon large>mdi-instagram</v-icon>

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
export default {
    name:"BottomFooter",
}
</script>