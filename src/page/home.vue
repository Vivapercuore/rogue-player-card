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
  router.push({ name: "card", params: { cardName: card.name } });
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
      <el-alert title="注意,所有数据都保存在你的设备本地,更换设备/清空浏览器缓存,都可能导致数据丢失" type="warning" />
      <h1>选择角色卡:</h1>
      <el-row :gutter="20" v-if="cardsMap">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(card, index) in cardsMap">
          <el-card @click="chooseCard(card)">
            <el-descriptions :cloumn="1" :title="card.name" direction="vertical" border>
              <el-descriptions-item label="职业：" :min-width="80">
                {{
                  card.profession
                }}
              </el-descriptions-item>
              <el-descriptions-item label="基础属性：">
                {{
                  card.baseAttr
                }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <el-card @click="createNewCard()">
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
</style>
