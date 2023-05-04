<template>
    <div class="box" :style="{ width: width, left:left }">
        <router-view></router-view>
    </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore();
const width = mainStore.windowWidth - mainStore.asideWidth + 'px';
const left = mainStore.asideWidth + 'px';
</script>

<style lang='less' scoped>
.box {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
}
</style>
