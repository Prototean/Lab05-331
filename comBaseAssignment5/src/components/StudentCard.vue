<script setup lang="ts">
import type { Student } from '@/types'

defineProps<{
  student: Student
}>()
</script>

<template>
  <div class="flex justify-center">
    <div class="p-[20px] w-[250px] cursor-pointer border border-[#39495c] mb-[18px] hover:scale-[1.01] hover:shadow-sp transition-transform">
      <h3 class="text-lg font-semibold">Name: {{ student.name }}</h3>
      <h3 class="text-lg font-semibold">SurName: {{ student.surname }}</h3>
      <p>GPA: {{ student.gpa }}</p>
    </div>
  </div>
</template>

<style scoped>
  /* .event-class {
    display: flex;
    justify-content: center;
  }
  .event-card {
    padding: 20px;
    width: 250px;
    cursor: pointer;
    border: 1px solid #39495c;
    margin-bottom: 18px;
  }
  .event-card:hover {
    transform: scale(1.01);
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  } */
</style>