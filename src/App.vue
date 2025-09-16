<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
/* Global styles */
.q-page {
  padding: 16px;
}

.q-card {
  margin-bottom: 16px;
}

/* Custom styles for Bible app */
.bible-text {
  line-height: 1.8;
  font-family: 'Georgia', serif;
}

.verse-number {
  color: #666;
  font-weight: bold;
  margin-right: 8px;
}

.verse-text {
  margin-bottom: 12px;
}

/* Responsive design */
@media (max-width: 600px) {
  .q-page {
    padding: 8px;
  }
  
  .q-card {
    margin-bottom: 8px;
  }
}
</style>
