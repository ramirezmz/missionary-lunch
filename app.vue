<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component. </AppAlert>
    <pre>{{ data }}</pre>
  </div>
</template>
<script setup lang="ts">
const { data } = await useFetch("/api/hello");
console.log("data: ", data.value);
</script>
