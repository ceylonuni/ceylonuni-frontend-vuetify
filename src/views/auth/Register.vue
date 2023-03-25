<template>
  <v-stepper
    v-model="e6"
    vertical
    width="100%"
    elevation="0"
    style="background-color: transparent"
  >
    <Welcome direction="horizontal" />
    <v-divider class="mx-3"></v-divider>
    <p
      class="font-weight-regular text-h5 teal--text mx-5 mt-5"
    >
      Register to Ceylonuni
    </p>
    <v-stepper-step :complete="e6 > 1" step="1">
      Set your account password
      <!-- <small>Summarize if needed</small> -->
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card elevation="0" class="mb-3" color="transparent">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="password"
              filled
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Account Password"
              hint="At least 8 characters"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="confirmPassword"
              filled
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showConfirmPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm Password"
              hint="At least 8 characters"
              counter
              @click:append="showConfirmPassword = !showConfirmPassword"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      Personal Information
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card elevation="0" class="mb-3" color="transparent">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="first"
              label="First Name"
              filled
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="last"
              label="Last Name"
              filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      University Information
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card elevation="0" class="mb-3" color="transparent"></v-card>
      <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4"> Confirmation </v-stepper-step>
    <v-stepper-content step="4">
      <v-card elevation="0" class="mb-3" color="transparent"></v-card>
      <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
      <v-btn text> Cancel </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>
  
  <script>
export default {
  components: {
    Welcome: () =>
      import(
        /* webpackChunkName: "component-socializing-welcome" */ "@/components/auth/Welcome"
      ),
  },
  data() {
    return {
      e6: 1,
      showPassword: false,
      showConfirmPassword: false,
      password: "",
      confirmPassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
};
</script>
  