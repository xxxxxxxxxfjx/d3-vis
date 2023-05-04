<template>
    <div class="header">
        <span class="logo">
            <el-icon style="margin-right: 10px;">
                <Collection />
            </el-icon>
             D3练习汇总
        </span>
        <div class="box">
            <el-icon class="icon_btn" @click="">
                <Fold />
            </el-icon>
            <el-icon class="icon_btn" @click="refresh">
                <Refresh />
            </el-icon>
        </div>
        <div class="avatar">
            <el-icon class="icon_btn" v-if="!isFullscreen" @click="toggle">
                <FullScreen />
            </el-icon>
            <el-icon class="icon_btn" v-if="isFullscreen" @click="toggle">
                <Aim />
            </el-icon>
            <a @click="logout">退出登录</a>
        </div>
    </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import { useRouter } from 'vue-router';
import { notification } from '@/hooks/notification'
import {removeToken} from '@/hooks/cookies'

const { isFullscreen, toggle } = useFullscreen()
const refresh = () => {
    location.reload()
}
const router = useRouter()
const logout = () => {
    removeToken()
    router.push('/login')
    notification('退出成功')
}
</script>

<style lang='less' scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #ccc;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;


    .logo {
        display: flex;
        align-items: center;
        margin: 0 50px;
    }

    .avatar {
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 50px;

        .el-button {
            margin-right: 20px;
        }

        a {
            color: #aaa;
            cursor: default;
        }

        a:hover {
            color: #000;
        }
    }

    .box {
        display: flex;
        align-items: center;
    }
}

.icon_btn {
    height: 60px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    cursor: pointer;
}

.icon_btn:hover {
    color: #000;
}
</style>
