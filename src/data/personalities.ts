export type MBTICode =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

export type Personality = {
  code: MBTICode
  name: string
  emoji: string
  tagline: string
  description: string
  strengths: string[]
  weaknesses: string[]
  bestMatch: MBTICode[]
  /** 主题渐变 [from, to] */
  gradient: [string, string]
}

export const PERSONALITIES: Record<MBTICode, Personality> = {
  INTJ: {
    code: 'INTJ', name: '建筑师', emoji: '♟️',
    tagline: '运筹帷幄,决胜千里之外',
    description: '极少数把战略思维玩到极致的人。看待世界像在下一盘很大的棋,目标长远、路径清晰,讨厌低效和无谓的客套。独立、理性、对自己也对世界保持高标准。',
    strengths: ['战略眼光长远', '独立思考能力极强', '决断果敢', '自驱力惊人'],
    weaknesses: ['有时显得冷漠难亲近', '对情感表达不耐烦', '容易低估他人感受'],
    bestMatch: ['ENFP', 'ENTP'],
    gradient: ['#1e3c72', '#6a82fb'],
  },
  INTP: {
    code: 'INTP', name: '逻辑学家', emoji: '🔬',
    tagline: '思考,是最快乐的运动',
    description: '行走的"为什么"机器。沉迷探究世界运行的逻辑,对概念反复推敲。不爱社交场上的客套,但和懂你的人聊深度话题能聊到天亮。',
    strengths: ['逻辑分析能力卓越', '客观且勇于挑战权威', '创造性思维丰富', '学习能力极强'],
    weaknesses: ['容易陷入空想忽略执行', '对琐事缺乏耐心', '情感表达较为笨拙'],
    bestMatch: ['ENTJ', 'ENFJ'],
    gradient: ['#4b6cb7', '#182848'],
  },
  ENTJ: {
    code: 'ENTJ', name: '指挥官', emoji: '👑',
    tagline: '我即规则,我即效率',
    description: '天生的领导者。看到一件事没做好,本能反应是"那让我来"。目标明确、执行力凶猛,擅长把混乱变成秩序、把愿景变成现实。',
    strengths: ['果敢的决策力', '卓越的组织和领导力', '战略性思考', '高效执行力'],
    weaknesses: ['有时过于强势', '缺乏耐心', '可能忽视他人情绪'],
    bestMatch: ['INTP', 'INFP'],
    gradient: ['#8e2de2', '#4a00e0'],
  },
  ENTP: {
    code: 'ENTP', name: '辩论家', emoji: '💡',
    tagline: '有意思的想法,接招吧',
    description: '思维永远跳跃的点子王。喜欢在辩论中找乐趣,在挑战常规中找成就感。对新鲜事物来者不拒,讨厌一成不变的套路。',
    strengths: ['思维敏捷创意爆棚', '善于辩论和表达', '适应能力极强', '对挑战充满热情'],
    weaknesses: ['容易半途而废', '可能为辩论而辩论', '不擅处理琐碎事务'],
    bestMatch: ['INFJ', 'INTJ'],
    gradient: ['#f12711', '#f5af19'],
  },
  INFJ: {
    code: 'INFJ', name: '提倡者', emoji: '🌌',
    tagline: '安静的理想主义者',
    description: '世界上最稀有的类型之一。表面安静,内心却涌动着对世界的深切关怀。看人很准,常一眼看穿别人没说出口的情绪。坚信一切努力都该指向更好的未来。',
    strengths: ['深刻的洞察力', '极富同理心', '坚定的理想主义', '创造力丰富'],
    weaknesses: ['容易过度自我消耗', '对批评高度敏感', '完美主义带来焦虑'],
    bestMatch: ['ENTP', 'ENFP'],
    gradient: ['#5f2c82', '#49a09d'],
  },
  INFP: {
    code: 'INFP', name: '调停者', emoji: '🌸',
    tagline: '心里住着一整个宇宙',
    description: '柔软又坚定的理想主义者。在意每一份情感、每一个被忽视的角落。不擅长争抢,但你的内心世界比看上去丰富一千倍。',
    strengths: ['富有同理心和共情力', '想象力丰富', '忠于自己的价值观', '善于倾听他人'],
    weaknesses: ['容易理想化', '回避冲突', '有时过于自责'],
    bestMatch: ['ENFJ', 'ENTJ'],
    gradient: ['#fbc2eb', '#a18cd1'],
  },
  ENFJ: {
    code: 'ENFJ', name: '主人公', emoji: '🌟',
    tagline: '让世界变得更好的那种人',
    description: '天生的影响者。能精准捕捉到人群的情绪,知道怎么把每个人放到合适的位置。你在,大家就有方向感。',
    strengths: ['强大的领导魅力', '极高情商', '热情且鼓舞人心', '善于协调团队'],
    weaknesses: ['过度负责导致疲惫', '可能忽视自身需求', '对批评较为敏感'],
    bestMatch: ['INFP', 'ISFP'],
    gradient: ['#ff6e7f', '#bfe9ff'],
  },
  ENFP: {
    code: 'ENFP', name: '竞选者', emoji: '🎈',
    tagline: '人间值得,所以热情活着',
    description: '行走的烟花。对世界保持永远的好奇和热情,擅长把一群陌生人变成朋友、把无聊的话题聊出火花。坚信生活就该尽兴。',
    strengths: ['热情有感染力', '创造力丰富', '人际能力出众', '适应力强'],
    weaknesses: ['注意力容易分散', '讨厌单调重复', '情绪波动较大'],
    bestMatch: ['INTJ', 'INFJ'],
    gradient: ['#fc466b', '#3f5efb'],
  },
  ISTJ: {
    code: 'ISTJ', name: '物流师', emoji: '📋',
    tagline: '靠谱,是一种被低估的浪漫',
    description: '务实可靠的"压舱石"。答应了的事一定办到,而且会做得有条理、有据可查。讨厌空话,相信只有踏踏实实做出来的东西才作数。',
    strengths: ['极度可靠负责', '注重细节和秩序', '逻辑清晰', '坚毅且有耐心'],
    weaknesses: ['对变化适应较慢', '可能过于守旧', '不擅长情感表达'],
    bestMatch: ['ESFP', 'ESTP'],
    gradient: ['#373b44', '#4286f4'],
  },
  ISFJ: {
    code: 'ISFJ', name: '守卫者', emoji: '🌿',
    tagline: '默默把一切打理妥当',
    description: '温柔又坚韧的守护者。会记得每个人的喜好、生日、忌口,在所有人不经意时把事情都安排好。爱得安静,但深沉如海。',
    strengths: ['温暖体贴极富同理心', '极度可靠负责', '勤恳细致', '忠诚长情'],
    weaknesses: ['容易压抑自我需求', '对变化感到不安', '过度操心'],
    bestMatch: ['ESTP', 'ESFP'],
    gradient: ['#a8edea', '#fed6e3'],
  },
  ESTJ: {
    code: 'ESTJ', name: '总经理', emoji: '🏛️',
    tagline: '把事做成,本身就是答案',
    description: '组织里最让人安心的那个人。规则清晰、执行到位、对就是对错就是错。在你眼里,把事做好就是对所有人最大的尊重。',
    strengths: ['组织和管理能力强', '果断且实事求是', '可靠负责任', '执行力极佳'],
    weaknesses: ['有时过于刻板', '难以接受非传统观点', '可能忽视他人情感'],
    bestMatch: ['ISFP', 'ISTP'],
    gradient: ['#c31432', '#240b36'],
  },
  ESFJ: {
    code: 'ESFJ', name: '执政官', emoji: '🌷',
    tagline: '让所有人都被照顾到',
    description: '聚会里那个让大家都感到温暖的人。擅长察言观色、协调关系,把人和人之间的连结放在首位。你的存在让群体有家的感觉。',
    strengths: ['热情善良乐于助人', '优秀的合作精神', '责任感强', '社交能力出众'],
    weaknesses: ['过于在意他人评价', '回避冲突', '可能压抑自我需求'],
    bestMatch: ['ISTP', 'ISFP'],
    gradient: ['#f7971e', '#ffd200'],
  },
  ISTP: {
    code: 'ISTP', name: '鉴赏家', emoji: '🛠️',
    tagline: '动手,才是真理',
    description: '冷静的实干派。话不多,但啥都能拆开看看再装回去。崇尚效率和实用,讨厌假大空。关键时刻最靠得住的就是你。',
    strengths: ['冷静理性', '极强的动手能力', '逻辑实用主义', '危机处理能力强'],
    weaknesses: ['情感表达较为冷淡', '不擅长长期规划', '容易厌倦常规'],
    bestMatch: ['ESTJ', 'ESFJ'],
    gradient: ['#283048', '#859398'],
  },
  ISFP: {
    code: 'ISFP', name: '探险家', emoji: '🎨',
    tagline: '美,就是我相信的事',
    description: '安静的艺术灵魂。不爱争抢,但对色彩、声音、感受异常敏锐。活在当下,用自己的方式表达对世界的爱。',
    strengths: ['富有审美和创造力', '温柔体贴', '灵活适应', '忠于内心'],
    weaknesses: ['回避冲突', '容易自我怀疑', '长期规划较弱'],
    bestMatch: ['ESFJ', 'ENFJ'],
    gradient: ['#ee9ca7', '#ffdde1'],
  },
  ESTP: {
    code: 'ESTP', name: '企业家', emoji: '⚡',
    tagline: '世界是用来玩的',
    description: '行动派。看到机会先冲再说,讨厌纸上谈兵。能在最混乱的局面里抓住机会,享受冒险和速度带来的快感。',
    strengths: ['行动力极强', '善于把握机会', '灵活变通', '社交能力出众'],
    weaknesses: ['容易冲动冒险', '缺乏耐心', '不擅长长期规划'],
    bestMatch: ['ISFJ', 'ISTJ'],
    gradient: ['#FF512F', '#F09819'],
  },
  ESFP: {
    code: 'ESFP', name: '表演者', emoji: '🎉',
    tagline: '生活就是用来嗨的',
    description: '人群里的小太阳。哪里都能成为焦点,但不是为了出风头,只是因为你真心在享受当下。你让别人的生活也跟着发亮。',
    strengths: ['热情有感染力', '享受当下', '社交能力出众', '灵活适应'],
    weaknesses: ['不擅长长期规划', '容易冲动消费', '回避严肃问题'],
    bestMatch: ['ISTJ', 'ISFJ'],
    gradient: ['#ff9a9e', '#fad0c4'],
  },
}
