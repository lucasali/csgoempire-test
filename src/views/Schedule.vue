<template>
  <h2>League Schedule</h2>

  <ScheduleTable :matches="leagueService.getMatches()" />
</template>

<script setup>
import { inject } from 'vue'
import ScheduleTable from '../components/ScheduleTable.vue'

const leagueService = inject('leagueService')
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #182c62;
  text-align: center;
  margin: 0 0 20px 0;
}
</style>
