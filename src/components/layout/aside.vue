<template>
    <div class="aside">
        <el-menu default-active="2" background-color="#ccc" @select="select">
            <template v-for="(item, index) in menus" :key="index">
                <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <template v-for="(item2, index) in item.child" :key="index">
                        <el-menu-item :index="item2.path">
                            <template #title>
                                <el-icon>
                                    <component :is="item2.icon"></component>
                                </el-icon>
                                <span>{{ item2.name }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </el-sub-menu>
                <el-menu-item :index="item.path" v-else>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { menus } from '@/assets/data/menu';
import { useRouter } from 'vue-router';
const router = useRouter()
const select = (e) => {
    router.push(e)
}
</script>

<style lang='less' scoped>
.aside {
    width: 200px;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    box-shadow: 5px 0 10px rgba(0, 0, 0, .1);
    background-color: #ccc;
}
</style>
