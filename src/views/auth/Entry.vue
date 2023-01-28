<template>
  <v-card elevation="0" width="350" class="mx-auto" color="transparent">
    <Welcome />
    <v-divider></v-divider>
    <v-card class="mx-auto" rounded="lg" outlined color="transparent">
      <v-card-title class="font-weight-regular justify-space-between teal--text pb-0">
       {{ currentTitle }}
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
            rounded
            filled
              label="University Email"
              placeholder="john@university.lk"
              v-model="email"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              This is the email you will use to login to your <span class="teal--text font-weight-medium">Ceylonuni</span>  account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <!-- <h3 class="text-h6 font-weight-light mb-2">Email not registred!</h3> -->
            <span class="text-caption grey--text">
              The email you entred is not registred in the system. Do you want
              to register?
            </span>
          </div>
        </v-window-item>
        <v-window-item :value="4">
          <div class="pa-4 text-center">
            <!-- <h3 class="text-h6 font-weight-light mb-2">Email Not Valid!</h3> -->
            <span class="text-caption grey--text">
              The email you entered is not a valid university email address.
              Please try with an valid email.
            </span>
          </div>
        </v-window-item>
        <v-window-item :value="5">
          <div class="pa-4 text-center">
            <!-- <h3 class="text-h6 font-weight-light mb-2">Email Not Valid!</h3> -->
            <span class="text-caption grey--text">
              A verification link has been sent to your mail. Click the link to
              continue your registration.
            </span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step = 1" color="teal"> Back </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="verifyEmail"
          :disabled="step === 4 || step === 5"
          color="primary"
          depressed
        >
          {{ step == 3 ? "Confirm" : "Next" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>
<script>
const axios = require("axios").default;
export default {
  components: {
    Welcome: () =>
      import(
        /* webpackChunkName: "component-socializing-welcome" */ "@/components/auth/Welcome"
      ),
  },
  data: () => ({
    email: null,
    password: null,
    step: 1,
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Login";
        case 2:
          return "Enter password";
        case 3:
          return "Confirm register";
        case 5:
          return "Verify";
        default:
          return "Invalid email";
      }
    },
  },
  methods: {
    verifyEmail() {
      if (this.step == 1) {
        // verify email
        axios
          .post(`${this.$api.servers.auth}/email/verify`, {
            email: this.email,
          })
          .then((response) => {
            console.log(response);
            if (response.data.existing) {
              this.step = 2;
            } else if (response.data.valid) {
              this.step = 3;
            } else {
              this.step = 4;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.step == 2) {
        // login email password
        axios
          .post(`${this.$api.servers.auth}/login`, {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.$store.commit("updateAuth",response.data)
            this.$router.push({name:'SocializingHome'})
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.step == 3) {
        // send verification email
        axios
          .post(`${this.$api.servers.auth}/email/send`, {
            email: this.email,
          })
          .then((response) => {
            console.log(response);
            this.step = 5;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>