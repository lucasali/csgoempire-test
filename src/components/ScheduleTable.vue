<template>
  <table class="schedule-table">
    <thead>
      <tr>
        <th align="left" v-if="!sm">Date/Time</th>
        <th align="left" v-if="lg">Stadium</th>
        <th align="right" class="team-home">Home Team</th>
        <th class="score-home" />
        <th class="divider" />
        <th class="score-away" />
        <th align="left">Away Team</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(match, i) in matches" :key="i">
        <td v-if="!sm" class="match-date">
          <div>{{ formatMatchDate(match.matchDate).matchDate }}</div>
          <div>{{ formatMatchDate(match.matchDate).matchTime }}</div>
        </td>
        <td v-if="lg">{{ match.stadium }}</td>
        <td>
          <div class="team-home">
            <strong>{{ match.homeTeam }} </strong>
            <img
              class="flag"
              :src="`https://flagsapi.codeaid.io/${match.homeTeam}.png`"
              alt="Home team flag"
            />
          </div>
        </td>
        <td class="score-home">
          <strong>{{ match.homeTeamScore }}</strong>
        </td>
        <td class="divider">
          <strong>:</strong>
        </td>
        <td class="score-away">
          <strong>{{ match.awayTeamScore }}</strong>
        </td>
        <td>
          <div class="team-away">
            <img
              class="flag"
              :src="`https://flagsapi.codeaid.io/${match.awayTeam}.png`"
              alt="Away team flag"
            />
            <strong> {{ match.awayTeam }}</strong>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useScreenWidth } from '../composables/screenWidth'

const props = defineProps({
  matches: Array
})

const { sm, md, lg } = useScreenWidth()

function formatMatchDate(dateString) {
  const date = new Date(dateString)

  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()

  const matchDate = `${day}.${month}.${year}`
  const matchTime = `${hours}:${minutes}`

  return { matchDate, matchTime }
}
</script>

<style scoped>
th {
  padding: 0 20px;
}

td {
  padding: 0px 20px;
}

td .team-home,
td .team-away {
  display: flex;
  align-items: center;
  font-size: var(--table-font-size-bold);
  font-weight: bold;
  gap: 10px;
}

td .team-home {
  justify-content: flex-end;
}

td .team-home img,
td .team-away img {
  width: var(--flag-width);
  height: var(--flag-height);
}

td.score-home,
td.score-away,
td.divider {
  font-variant: tabular-nums;
  text-align: center;
}

.score-home,
.score-away {
  width: var(--score-width);
}

td .match-date {
  display: flex;
  flex-direction: column;
}

.divider {
  width: var(--divider-width);
}

.score-home,
.score-away,
.divider {
  padding: 0;
}
</style>
