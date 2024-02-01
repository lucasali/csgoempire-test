<template>
  <div>
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, reactive, provide } from 'vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import LeagueService from './services/LeagueService';

const leagueService = reactive(new LeagueService())

provide('leagueService', leagueService)

async function fetchToken() {
  const response = await fetch('http://localhost:3001/api/v1/getAccessToken')
  const data = await response.json()

  setToken(data.access_token)
}

function setToken(token) {
  localStorage.setItem('token', token)
}

onMounted(async () => {
  await fetchToken()
  await leagueService.fetchData()
})
</script>

<style scoped>
main {
  width: 90%;
  margin: 0 auto;
  padding: 60px 0 0 0;
  height: calc(100dvh - 100px);
}
</style>
