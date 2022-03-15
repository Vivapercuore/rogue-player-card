<script setup lang="ts">
import _ from "lodash";
import { ref, reactive, computed, getCurrentInstance } from "vue";
import store from "src/store";
import router from "src/router";

import professions, { Profession } from "src/data/profession";
import { Rarity } from "src/data/definition"


import SkillList from "src/components/skillList.vue"
// const instance = getCurrentInstance();
const props = defineProps({ profession: String })

const currentProfession = computed((): Profession => {
    return _.find(professions, item => item.name === props.profession) as Profession
})
//打开技能池
// const openSkillPool = {}
// const count = ref(0);
</script>

<template>
    <div v-if="props.profession && currentProfession">
        <el-descriptions border :title="props.profession">
            <el-descriptions-item label="生命骰">{{ currentProfession.lifeDice }}</el-descriptions-item>
            <el-descriptions-item label="主要属性">{{ currentProfession.mainAttr }}</el-descriptions-item>
            <el-descriptions-item label="允许武器">
                <el-tag v-for="value  in currentProfession.material" :key="value">{{ value }}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
        <el-row v-if="currentProfession.material?.length">
            <div>特性</div>
            <el-alert
                v-for="characteristic in currentProfession.characteristics"
                :title="characteristic.description"
                type="info"
                :closable="false"
            />
        </el-row>
        <el-row v-if="currentProfession.skills?.length">
            <!-- <el-button size="mini" round icon="el-icon-notebook-2" @click="openSkillPool">查看技能池</el-button> -->
            <el-collapse class="collapse">
                <el-collapse-item title="查看技能池" :name="currentProfession.name">
                    <SkillList :skills="currentProfession.skills" />
                </el-collapse-item>
            </el-collapse>
        </el-row>
    </div>
</template>

<style scoped lang="less">
.collapse {
    width: 100%;
}
</style>
