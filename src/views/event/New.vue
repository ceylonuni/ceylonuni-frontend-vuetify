<template>
  <div>
    <v-row>
      <v-col
        class="
          flex-grow-1 flex-shrink-0
          d-flex
          flex-column
          justify-center
          align-center
        "
      >
        <v-card>
          <v-img
            height="100%"
            :src="
              previewImage
                ? previewImage
                : 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg'
            "
          >
            <v-row align="end" class="fill-height">
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title v-if="name" class="text-h6">
                      {{ name }}
                    </v-list-item-title>
                    <v-list-item-title v-else class="text-h6">
                      Event Name
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <span v-if="venue">{{ venue }}</span
                      ><span v-else>Venue</span> |
                      {{ startDate }} {{ startTime }} - {{ endDate }} {{ endTime }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div>
          <v-file-input
            @change="onFileChange"
            label="Cover Image"
            filled
            rounded
            prepend-icon="mdi-camera"
          ></v-file-input>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <v-text-field
            rounded
            filled
            label="Event Name"
            v-model="name"
          ></v-text-field>
        </div>
      </v-col>
      <v-col>
        <div>
          <v-text-field
            rounded
            filled
            label="Venue"
            v-model="venue"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="startDate"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
                rounded
                filled
                :min="minDate"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(startDate)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </v-col>
      <v-col>
        <div>
          <v-menu
            ref="menu4"
            v-model="menu4"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="startTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startTime"
                label="Start Time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                rounded
                filled
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="menu4" v-model="startTime" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu4 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu4.save(startTime)">
                OK
              </v-btn>
            </v-time-picker>
          </v-menu>
        </div>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col>
          <div>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="endDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  rounded
                  filled
                  :min="minDate"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(endDate)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
        </v-col>
        <v-col>
          <div>
            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="endTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="endTime"
                  label="End Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  rounded
                  filled
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="menu3" v-model="endTime" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu3 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu3.save(endTime)">
                  OK
                </v-btn>
              </v-time-picker>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </div>
    <div>
    <v-btn class="mt-3" color="primary" @click="submit()">Create Event</v-btn>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import { mapState } from "vuex";
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().add(2, "days").format("YYYY-MM-DD"),
      minDate: moment().format("YYYY-MM-DD"),
      isApiLoading: false,
      name: null,
      venue: null,
      start_at: null,
      end_at: null,
      previewImage: null,
      image: null,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      endTime: '22:00',
      startTime: '08:00',
    };
  },
  computed: mapState({
    auth: (state) => state.auth.data,
  }),
  mounted() {},
  methods: {
    setValue(val) {
      this.date = val;
    },
    onFileChange(file) {
      if (file) {
        this.previewImage = URL.createObjectURL(file);
        const reader = new FileReader();
        var i = this;
        reader.onloadend = () => {
          i.image = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = null;
      }
    },
    submit() {
      axios
        .post(
          `${this.$api.servers.event}/add`,
          {
            image: this.image,
            name : this.name,
            venue : this.venue,
            start_at : moment(this.startDate +' '+ this.startTime).toISOString(),
            end_at : moment(this.endDate +' '+ this.endTime).toISOString()
          },
          {
            headers: {
              Authorization: "Bearer " + this.auth.token,
            },
          }
        )
        .then((response) => {
          this.$router.push({name:'EventRead',params:{key: response.data.key}})
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>