<template>
  <div class="home">
    <div class="head">
      <head></head>
    </div>
    <div class="main">
      <div class="side"><side></side></div>
      <div class="min">
        <main>
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import head from "@/views/head.vue";
import side from "@/views/side.vue";
import main from "@/views/main.vue";
</script>

<style scope>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  background-color: aqua;
}
.head {
  height: 150px;
  background-color: rgb(228, 149, 45);
}
.main {
  display: flex;
  justify-content: flex-start;
  flex: 1;
  background-color: rgb(255, 127, 127);
}
.side {
  width: 200px;
  background-color: bisque;
}
</style>