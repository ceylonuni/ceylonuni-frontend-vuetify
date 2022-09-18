<template>
  <v-container>
    <div v-if="isValidateLink">
      <v-stepper
        v-model="step"
        vertical
        width="100%"
        elevation="0"
        style="background-color: transparent"
      >
        <Welcome direction="horizontal" />
        <v-divider class="mx-3"></v-divider>
        <div>Hello {{ email }}</div>
        <p class="font-weight-regular text-h5 teal--text mx-5 mt-5">
          Register to Ceylonuni
        </p>
        <v-stepper-step :complete="step > 1" step="1">
          Set your account password
          <!-- <small>Summarize if needed</small> -->
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card elevation="0" class="mb-3" color="transparent">
            <v-form ref="passwordform" :v-model="true" lazy-validation>
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
                    :append-icon="
                      showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="[rules.required, rules.min, rules.matchPassword]"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirm Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="showConfirmPassword = !showConfirmPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-btn color="primary" @click="validatePassword"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">
          Personal Information
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card elevation="0" class="mb-3" color="transparent">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  filled
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="mobile"
                  label="Mobile Number"
                  filled
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="address"
                  label="Address"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="primary" @click="step = 3"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3">
          University Information
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card elevation="0" class="mb-3" color="transparent">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="university"
                  label="University"
                  filled
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="course"
                  :items="data.courses"
                  filled
                  label="Course"
                  item-text="name"
                  item-value="university_course_id"
                ></v-select>
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="primary" @click="step = 4"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step step="4"> Confirmation </v-stepper-step>
        <v-stepper-content step="4">
          <v-card elevation="0" class="mb-3" color="transparent">
            <v-checkbox
              v-model="checkbox"
              label="I Agree to Privacy Policy"
            ></v-checkbox>
          </v-card>
          <v-btn color="primary" @click="register()"> Confirm </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper>
    </div>
    <div v-else-if="!isValidateLink && isError" class="text-center">
      Verification link is invalid.
    </div>
    <div v-else class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-container>
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
  data() {
    return {
      step: 1,
      showPassword: false,
      isError: false,
      showConfirmPassword: false,
      checkbox: false,
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
      address: "",
      university: "",
      email: null,
      course: null,
      confirmPassword: "",
      isValidateLink: false,
      data: [],
      rules: {
        required: (v) => !!v || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        matchPassword: (v) => this.password == v || "Password not match",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    checkToken() {
      axios
        .get("http://localhost:3000/api/auth/validate-link", {
          headers: {
            Authorization: "Bearer " + this.$route.query.token,
          },
        })
        .then((response) => {
          this.isValidateLink = true;
          this.getRegisterData();
          console.log(response);
        })
        .catch((error) => {
          this.isError = true;
          console.log(error);
        });
    },
    getRegisterData() {
      axios
        .get("http://localhost:3000/api/auth/register", {
          headers: {
            Authorization: "Bearer " + this.$route.query.token,
          },
        })
        .then((response) => {
          this.data = response.data;
          this.university = this.data.university;
          this.course = this.data.courses[0].university_course_id;
          this.email = this.data.email;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register() {
      if (this.checkbox) {
        axios
          .post(
            "http://localhost:3000/api/auth/register",
            {
              email: this.email,
              first_name: this.firstName,
              last_name: this.lastName,
              address: this.address,
              password: this.password,
              mobile: this.mobile,
              university_course_id: this.course,
            },
            {
              headers: {
                Authorization: "Bearer " + this.$route.query.token,
              },
            }
          )
          .then((response) => {
            this.$store.commit("updateAuth", response.data);
            this.$router.push({ name: "SocializingHome" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    validatePassword() {
      if (this.$refs.passwordform.validate()) {
        this.step = 2;
      }
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>
  