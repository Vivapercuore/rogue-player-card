<script setup lang="ts">
import { ref, reactive } from "vue";
import router from "src/router";
import store from "src/store";

import PageHead from "src/components/pageHead.vue";
import PageFoot from "src/components/pageFoot.vue";

import { RogueCard } from "src/store/card";

// defineProps<{ msg: string  }>()

console.log({ card: store.state.card?.currentCard })

const cardsMap = ref(store.state.card?.cards);

const chooseCard = (card: RogueCard) => {
  store.dispatch("changeCard", card);
  router.push({ name: "card", params: { card: card.name } });
};

const createNewCard = () => {
  store.dispatch("createNewCard");
  router.push({ name: "card", params: { cardName: 'new' } });
}
</script>

<template>
  <el-container class="page">
    <el-header>
      <PageHead />
    </el-header>
    <el-main>
      <h1>选择角色卡:</h1>
      <el-row :gutter="20" v-if="cardsMap">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(card, index) in cardsMap">
          <el-card class="scenarioItem" @click="chooseCard(card)">
            <el-descriptions :title="card.name">
              <el-descriptions-item label="描述：">
                {{
                  card
                }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <el-card class="scenarioItem" @click="createNewCard()">
            <el-button type="primary" icon="el-icon-circle-plus-outline">新建一张角色卡</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <PageFoot />
    </el-footer>
  </el-container>
</template>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background-color: #fff;
}
.scenarioItem {
}

.el-descriptions__body {
  background-color: transparent;
}
</style>
