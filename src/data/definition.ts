
export enum Rarity {
    normal = "普通",
    rare = "稀有",
    epic = "史诗",
    legend = "传说",
}

export enum Materials {
    军用武器 = '军用武器',
    重型武器 = '重型武器',
    轻型武器 = '轻型武器',
    远程武器 = '远程武器',
    简易武器 = '简易武器',
    法器 = '法器',
}

export const defaultCardData = {
    name: "",
    profession: "",
    baseAttr: {
        力量: 0,
        敏捷: 0,
        体质: 0,
        智力: 0,
        感知: 0,
        魅力: 0,
    },
    deriveAttr: {
        AC: 8,
        移动距离: 5,
        格挡: 0,
        招架: 0,
        敏感范围: '常规'
    }
}