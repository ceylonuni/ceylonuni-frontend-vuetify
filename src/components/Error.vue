<template>
    <transition name="fade">
      <v-snackbar v-model="snackbar" :timeout="timeout" top right color="red">
        <v-icon> mdi-alert-circle </v-icon>
        {{error}}
  
        <template v-slot:action="{ attrs }">
          <v-icon v-bind="attrs" @click="snackbar = false"> mdi-close </v-icon>
        </template>
      </v-snackbar>
    </transition>
  </template>
  
  <script>
    export default {
      props:['error','callbackReset'],
      data: () => ({
      snackbar: true,
      timeout: 6000,
   }),
   watch: {
      snackbar: function () {
       if(this.snackbar == false){
        this.callbackReset()
       }
      },
    },
   created(){
    if(this.error){
      this.snackbar = true
    }
   }
    }
  </script>
  