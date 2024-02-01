<template>
  <header class="header">
    <img src="/images/logo.svg" alt="">

    <nav>
      <ul>
        <li>
          <img src="/images/schedule.png" alt="Schedule">
          <RouterLink :to="{ name: 'Schedule' }">Schedule</RouterLink>
        </li>
        <li>
          <img src="/images/leaderboard.png" alt="Leaderboard">
          <RouterLink :to="{ name: 'Leaderboard' }">Leaderboard</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>

</script>

<style>
.header {
  background-color: #025FEB;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header img {
  height: 40px;
  width: 110px;
}

.header nav ul {
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header nav ul li {
  display: flex;
  align-items: center;
}

.header nav ul li a {
  font-size: 16px;
  color: #FFFFFF;
  text-decoration: none;
}

.header nav ul li img {
  height: 25px;
  width: 25px;
  margin-right: 8px;
}
</style>
