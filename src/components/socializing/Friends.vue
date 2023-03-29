<template>
  <v-list
    three-line
    max-width="300"
    class="me-3"
    style="overflow-y: auto; max-height: calc(100vh - 100px)"
  >
    <v-subheader class="teal--text text-h6">
      <v-badge :content="items.length" inline>
        {{ title }}
      </v-badge>
    </v-subheader>
    <div v-for="item in items" :key="item.id">
      <v-list-item
        :to="{
          name: 'AuthMyAccount',
          params: { username: item.students.accounts[0].username },
        }"
      >
        <v-list-item-avatar>
          <v-avatar color="teal">
            <img
              v-if="item.students.image_url"
              :src="item.students.image_url"
              :alt="item.students.first_name"
            />
            <span v-else class="white--text text-h6"
              >{{ item.students.first_name[0]
              }}{{ item.students.last_name[0] }}</span
            >
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ item.students.first_name }}
            {{ item.students.last_name }}</v-list-item-title
          >
          <v-list-item-subtitle>
            {{ item.students.university_courses.universities.name }} |
            {{
              item.students.university_courses.courses.name
            }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <!-- <v-divider></v-divider> -->
    </div>
  </v-list>
</template>
<script>
export default {
  props: ["items", "title"],
  data: () => ({}),
};
</script>