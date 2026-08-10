<script setup lang="ts">

  import StudentCard from '@/components/StudentCard.vue'
  import type {Student} from '@/types'
  import StudentService from '@/services/StudentService'
  import { ref, onMounted } from 'vue'


  const students = ref<Student[] | null>(null)


  onMounted(() => {
    // fetch event (by id) and set local event data
    StudentService.getStudents()
        .then((response) => {
          students.value = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.error('There was an error!', error)
        })
  })


</script>
<template>

    <h1>Student List</h1>
    <div class="flex flex-col items-center">
      <StudentCard v-for="student in students" :key="student.id" :student="student" />
    </div>
  
</template>

<style scoped>
/* .events {
  display: flex;
  flex-direction: column;
  align-items: center;
} */
</style>

