<template>
  <table class="leaderboard-table">
    <thead>
      <tr>
        <th align="left">Team Name</th>
        <th>MP</th>
        <template v-if="!sm">
          <th>GF</th>
          <th>GA</th>
        </template>
        <th v-else>GD</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(team, i) in leaderboard" :key="i" class="table-row">
        <td>
          <div class="team-name">
            <img
              class="flag"
              :src="`https://flagsapi.codeaid.io/${team.teamName}.png`"
              alt=""
            />
            <strong>{{ team.teamName }} </strong>
          </div>
        </td>
        <td align="center">{{ team.matchesPlayed }}</td>
        <template v-if="!sm">
          <td align="center">{{ team.goalsFor }}</td>
          <td align="center">{{ team.goalsAgainst }}</td>
        </template>
        <td v-else align="center">{{ team.goalsFor - team.goalsAgainst }}</td>
        <td align="center">
          <strong class="points">{{ team.points }}</strong>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useScreenWidth } from '../composables/screenWidth'

const { sm } = useScreenWidth()

const props = defineProps({
  leaderboard: Array
})
</script>

<style scoped>
strong.points {
  color: #025feb;
}

td.points {
  color: var(--points-color);
}

.team-name {
  display: flex;
  align-items: center;
  gap: 20px;
}

.flag {
  width: var(--flag-width);
  height: var(--flag-height);
}
</style>
