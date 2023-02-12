<script setup lang="ts">
import { ref } from 'vue'
import { ClockCircleOutlined } from '@ant-design/icons-vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <clock-circle-outlined></clock-circle-outlined>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
