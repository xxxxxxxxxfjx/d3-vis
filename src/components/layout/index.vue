<template>
    <div class="container">
        <f-head></f-head>
        <f-aside></f-aside>
        <f-main></f-main>
    </div>
</template>

<script setup>
import FHead from './head.vue';
import FAside from './aside.vue'
import FMain from './main.vue'
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore()
mainStore.windowWidth = window.innerWidth || document.body.clientWidth;
</script>

<style lang='less' scoped>
.container {
    width: 100vw;
    height: 100vh;
}
</style>
