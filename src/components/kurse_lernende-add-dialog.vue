<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Add Course-Student Relation"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Add Course-Student Relation">
          <v-container>
            <v-combobox
                v-model="selectedStudent"
                label="Student"
                :items="studentItems"
                item-title="fullName"
                item-value="id"
            ></v-combobox>
            <v-combobox
                v-model="selectedCourse"
                label="Course"
                :items="courseItems"
                item-title="courseInfo"
                item-value="id"
            ></v-combobox>
            <v-text-field v-model="role" label="Role"></v-text-field>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Add" @click="onAddClicked"></v-btn>
            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from "@vueuse/core";

const role = ref<string>("");
const selectedStudent = ref<any>();
const selectedCourse = ref<any>();

const url = ref("http://api.test:8080/kurse_lernende");
const studentUrl = "http://api.test:8080/lernende";
const courseUrl = "http://api.test:8080/kurse";

const studentItems = ref<any[]>([]);
const courseItems = ref<any[]>([]);

// Fetch students
const { data: studentData } = useFetch(studentUrl).get().json();
watch(studentData, (newData) => {
  if (newData?.data) {
    studentItems.value = newData.data.map((entry: any) => ({
      id: entry.id_lernende,
      fullName: `${entry.vorname} ${entry.nachname}`,
      ...entry
    }));
  }
});

// Fetch courses
const { data: courseData } = useFetch(courseUrl).get().json();
watch(courseData, (newData) => {
  if (newData?.data) {
    courseItems.value = newData.data.map((entry: any) => ({
      id: entry.id_kurs,
      courseInfo: `${entry.kursnummer} - ${entry.kursthema}`,
      ...entry
    }));
  }
});

const onAddClicked = () => {
  if (!selectedStudent.value || !selectedCourse.value) {
    console.error("Please select both student and course.");
    return;
  }

  const payload = {
    fk_lernende: selectedStudent.value.id.toString(),
    fk_kurs: selectedCourse.value.id.toString(),
    role: role.value
  };

  useFetch(url.value)
      .post(payload)
      .json()
      .then(response => {
        console.log("Response from server:", response);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });
};
</script>