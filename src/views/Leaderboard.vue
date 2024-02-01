<template>
  <h2>League Standings</h2>

  <LeaderboardTable :leaderboard="leagueService.getLeaderboard()" />
</template>

<script setup>
import { inject } from 'vue'
import LeaderboardTable from '../components/LeaderboardTable.vue'

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
