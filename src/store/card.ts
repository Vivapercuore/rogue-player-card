
import _ from "lodash";
import { Commit, Dispatch } from 'vuex'
import { isOwnKey, NonNeverState, GetState, GetMutationKeyParamMap, GetActionKeyParamMap } from "vuex-with-type"

export interface RogueCard {
    name: string,
    profession?: string,
    baseAttr: {
        力量: number,
        敏捷: number,
        体质: number,
        智力: number,
        感知: number,
        魅力: number,
    }
}

export enum BaseAttr {

    力量 = '力量',
    敏捷 = '敏捷',
    体质 = '体质',
    智力 = '智力',
    感知 = '感知',
    魅力 = '魅力',
}

// localStorage.setItem("cards", JSON.stringify({}))

//单独的state才能推断类型
const state: { currentCard: RogueCard | null, cards: Array<RogueCard> } = {
    currentCard: null,
    cards: getAllCardsFromLocalStorage(),
}

// store.dispatch  触发 actions ->
// store.commit    触发 mutations -> 

const store = {
    state,
    // getters: {
    //     currentScenario: state => {
    //         return { ...scenario[state.scenarioName] }
    //     }
    // },
    mutations: { //信号
        getCard(s: NonNeverState<typeof state>) {
        },
        saveCard(s: NonNeverState<typeof state>, cardData: RogueCard) {
            localStorage.setItem(`card:${cardData.name}`, JSON.stringify(cardData))
            const i = _.findIndex(s.cards, c => c.name === cardData.name)
            if (i >= 0) {
                s.cards.splice(i, 1, cardData)
            } else {
                s.cards.push(cardData)
            }
        },
        changeCard(s: NonNeverState<typeof state>, cardData: RogueCard) {
            s.currentCard = cardData
        },
        createNewCard(s: NonNeverState<typeof state>) {
            s.currentCard = getDefaultCardData()
        }
    },
    actions: { //动作
        getCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardName: string) {

        },
        //保存卡
        saveCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardData: RogueCard) {
            commit("saveCard", cardData)
        },
        createNewCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardData: RogueCard) {
            commit("createNewCard")
        },
        changeCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardData: RogueCard) {
            commit("changeCard", cardData)
        },
        loadCard({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, cardName: string) {
            console.log("loadCard", cardName)
            if (cardName === "new") {
                commit("createNewCard")
            }
            return true
        },
    }
}

export default store



function getDefaultCardData(): RogueCard {
    return {
        name: "",
        profession: "",
        baseAttr: {
            力量: 0,
            敏捷: 0,
            体质: 0,
            智力: 0,
            感知: 0,
            魅力: 0,
        }
    }
}

function getAllCardsFromLocalStorage(): Array<RogueCard> {
    let cards = []
    for (var i = 0; i < localStorage.length; i++) {
        const cardNamestr = localStorage.key(i)
        const matchReg = /(?<=card:).*/;
        const cardName = cardNamestr?.match(matchReg)?.[0]
        if (cardName) {
            try {
                const cardData = JSON.parse(localStorage.getItem(cardNamestr) as string)
                cards.push(cardData)
            } catch (error) { }
        }
    }
    return cards
}