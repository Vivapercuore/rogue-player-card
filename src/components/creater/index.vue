<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";
import { RogueCard } from "src/store/card";

import CreaterNewCard from "src/components/creater/createNewCard.vue"
import Grow from "src/components/creater/grow.vue"


const currentCard = reactive(store.state.card?.currentCard || {}) as RogueCard
// const instance = getCurrentInstance();
// defineProps<{ msg: string  }>()
// const count = ref(0);
</script>

<template>
    <!-- <h1>{{ msg }}</h1> -->
    <div>
        <el-row class="container">
            <!-- 建立新卡时选择 -->
            <CreaterNewCard v-if="router?.currentRoute?.value?.params?.cardName === 'new'" />
            <Grow v-else />
        </el-row>
    </div>
</template>

<style scoped lang="less">
</style>
