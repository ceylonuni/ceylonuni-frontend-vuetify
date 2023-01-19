<template>
    <v-card class="py-2" outlined rounded="lg" max-width="600">
        <v-list-item>
          <v-list-item-avatar
            size="100"
            rounded="circle"
            color="grey"
          ></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{data.name}}
            </v-list-item-title>
            <v-list-item-subtitle class="mt-1 ml-1">
                {{data.university}} |  {{data.faculty}}
            </v-list-item-subtitle>
            <v-btn
              outlined
              rounded
              text
              max-width="150"
              small
              class="mt-3 ml-1"
              v-if=" data.isFriend"
            >
              <v-icon small class="mr-3">mdi-account-plus</v-icon> Add Friend
            </v-btn>
            <v-chip v-else small class="mt-3 ml-1 text-center" style="max-width: 100px">
              <v-icon small class="mr-3">mdi-account-check</v-icon>Friend
            </v-chip>
          </v-list-item-content>
        </v-list-item>
      </v-card>
</template>
<script>
export default {
  props:["data"]
};
</script>