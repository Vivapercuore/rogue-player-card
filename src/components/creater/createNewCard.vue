<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";

import { RogueCard } from "src/store/card";

import { warrior, mage, pastor, ranger, wizard } from "src/data/profession"
const currentCard = reactive(store.state.card?.currentCard || {}) as RogueCard
// const instance = getCurrentInstance();
// defineProps<{ msg: string  }>()
const professions = reactive([warrior, mage, pastor, ranger, wizard])
const cost = ref(12);
const costTagType = computed(() => {
    if (cost.value < 0) {
        return "danger"
    } else if (cost.value > 0) {
        return ""
    } else {
        return "success"
    }
})
</script>



<template>
    <el-form ref="form" :model="currentCard">
        <!-- 角色卡名称 -->
        <el-form-item label="角色卡名称">
            <el-input class="content" v-model="currentCard.name" placeholder="请输入角色卡名称"></el-input>
        </el-form-item>
        <el-form-item :label="name" v-for="(value, name)  in currentCard.baseAttr" :key="name">
            {{ name }}:{{ currentCard.baseAttr[name] }}
            <el-input-number v-model="currentCard.baseAttr[name]" :min="-1" :max="4" />
        </el-form-item>
        <el-form-item label="属性点剩余">
            <el-tag :type="costTagType">{{ cost }}</el-tag>
        </el-form-item>

        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>

        <el-form-item label="职业">
            <el-radio-group v-model="currentCard.profession" size="mini">
                <el-radio-button
                    :label="profession.name"
                    v-for="profession  in professions"
                    :key="profession.name"
                />
            </el-radio-group>
        </el-form-item>

        <!-- 初始属性调整 -->
        <el-button type="primary" plain>建卡</el-button>
    </el-form>
</template>

<style scoped lang="less">
</style>
