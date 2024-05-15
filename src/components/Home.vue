<template>
  <div class="home">
    <div class="head">
      <HeadComponent></HeadComponent>
    </div>
    <div class="main">
      <div class="side"><side></side></div>
      <div class="min">
        <MainComponent>
          <router-view></router-view>
        </MainComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeadComponent from "@/views/head.vue";
import side from "@/views/side.vue";
import MainComponent from "@/views/main.vue";
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  /* background-color: aqua; */
}
.head {
  height: 70px;
  /* background-color: rgb(255, 234, 234); */
  border-bottom: 1px black solid;
}
.main {
  display: flex;
  justify-content: flex-start;
  flex: 1;
  /* background-color: rgb(255, 127, 127); */
}
.side {
  width: 200px;
  height: 100%;
  /* background-color: rgb(255, 234, 234); */
  border-right: solid black 1px;
}
.min {
  flex: 1;
}
</style>