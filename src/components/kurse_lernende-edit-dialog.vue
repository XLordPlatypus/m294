<template>
  <v-card>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Update Course-Student Relation"
            variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Edit Course-Student Relation">
          <v-container>
            <v-combobox
                v-model="selectedItem"
                :items="tableItems"
                label="Select Relation"
                item-title="displayText"
            ></v-combobox>

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
            <v-btn text="Update" @click="onUpdateClicked"></v-btn>
            <v-btn text="Delete" @click="onDeleteClicked"></v-btn>
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
const selectedItem = ref<any>();

const url = "http://api.test:8080/kurse_lernende";
const studentUrl = "http://api.test:8080/lernende";
const courseUrl = "http://api.test:8080/kurse";

const tableItems = ref<any[]>([]);
const studentItems = ref<any[]>([]);
const courseItems = ref<any[]>([]);

// Fetch existing relations
const { data } = useFetch(url).get().json();
watch(data, (newData) => {
  if (newData?.data) {
    tableItems.value = newData.data.map((entry: any) => ({
      ...entry,
      displayText: `${entry.student_name} - ${entry.course_name}`
    }));
  }
});

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

watch(selectedItem, (newItem) => {
  if (newItem) {
    role.value = newItem.role || "";
    selectedStudent.value = studentItems.value.find(
        student => student.id === newItem.fk_lernende
    );
    selectedCourse.value = courseItems.value.find(
        course => course.id === newItem.fk_kurs
    );
  }
});

const onUpdateClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for update.");
    return;
  }

  const payload = {
    fk_lernende: selectedStudent.value?.id.toString(),
    fk_kurs: selectedCourse.value?.id.toString(),
    role: role.value
  };

  useFetch(`${url}/${selectedItem.value.id_kurs_lernende}`)
      .put(payload)
      .json()
      .then((response) => {
        console.log("Update successful:", response);
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
};

const onDeleteClicked = () => {
  if (!selectedItem.value) {
    console.error("No item selected for deletion.");
    return;
  }

  useFetch(`${url}/${selectedItem.value.id_kurs_lernende}`)
      .delete()
      .json()
      .then((response) => {
        console.log("Deletion successful:", response);
        tableItems.value = tableItems.value.filter(
            (item) => item.id_kurs_lernende !== selectedItem.value.id_kurs_lernende
        );
        selectedItem.value = null;
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
};
</script>