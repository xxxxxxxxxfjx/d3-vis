<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
document.addEventListener('selectstart', function (e) {
                e.preventDefault();
            });
</script>

<style lang='less' scoped>
#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px !important;
}
</style>
