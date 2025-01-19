<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { data } = await useFetch("/api/hello");
console.log("data: ", data.value);
</script>
