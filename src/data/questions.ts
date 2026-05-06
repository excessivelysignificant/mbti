export type Dim = 'EI' | 'SN' | 'TF' | 'JP'

export type QuizOption = {
  label: string
  value: 1 | -1
  /** 选完弹出的小气泡吐槽 (可选) */
  banter?: string
}

export type Question = {
  id: number
  dim: Dim
  /** 'basic' 简单/准确版都用;'extra' 仅准确版 */
  tier: 'basic' | 'extra'
  text: string
  options: [QuizOption, QuizOption]
}

export const QUESTIONS: Question[] = [
  // ─── E vs I (basic) ───────────────────────────
  { id: 1, dim: 'EI', tier: 'basic', text: '完全空闲的周末,你更想…', options: [
    { label: '约朋友热闹一整天', value: 1, banter: '社牛体质实锤了' },
    { label: '宅在家自己回血', value: -1, banter: '理解,出门是要付电费的' },
  ]},
  { id: 2, dim: 'EI', tier: 'basic', text: '参加完大型聚会,你的状态是', options: [
    { label: '兴奋上头,再来一场', value: 1 },
    { label: '累瘫,想立刻原地 disappear', value: -1, banter: '社交电量:0%' },
  ]},
  { id: 3, dim: 'EI', tier: 'basic', text: '思考复杂问题时,你习惯', options: [
    { label: '边和别人讨论边理思路', value: 1 },
    { label: '一个人想清楚再开口', value: -1, banter: '内心戏天花板' },
  ]},
  { id: 4, dim: 'EI', tier: 'basic', text: '走进陌生场合,你会', options: [
    { label: '主动找人聊天破冰', value: 1, banter: '场子从你来开始热' },
    { label: '先观察一下,等人来搭话', value: -1 },
  ]},

  // ─── S vs N (basic) ───────────────────────────
  { id: 5, dim: 'SN', tier: 'basic', text: '看一篇文章,你更容易记住', options: [
    { label: '具体的事实和数据', value: 1 },
    { label: '它带给你的感受和联想', value: -1, banter: '看完一段开始想人生' },
  ]},
  { id: 6, dim: 'SN', tier: 'basic', text: '学新技能时,你倾向于', options: [
    { label: '跟着步骤一步步来', value: 1 },
    { label: '先看懂全貌再上手', value: -1 },
  ]},
  { id: 7, dim: 'SN', tier: 'basic', text: '聊一次旅行,你更愿意说', options: [
    { label: '吃了什么、走了哪些路线', value: 1, banter: '美食地图行家' },
    { label: '当时的心境和感受', value: -1, banter: '旅行 = 给灵魂充电' },
  ]},
  { id: 8, dim: 'SN', tier: 'basic', text: '面对老问题,你倾向', options: [
    { label: '用过去验证的方法', value: 1 },
    { label: '试新思路', value: -1 },
  ]},

  // ─── T vs F (basic) ───────────────────────────
  { id: 9, dim: 'TF', tier: 'basic', text: '做重要决定时,你优先听', options: [
    { label: '逻辑推演的答案', value: 1, banter: '理性 > 一切' },
    { label: '内心和他人感受的提醒', value: -1 },
  ]},
  { id: 10, dim: 'TF', tier: 'basic', text: '朋友倾诉烦恼,你的第一反应是', options: [
    { label: '帮 ta 分析问题、给建议', value: 1, banter: '修电脑模式启动' },
    { label: '先共情陪着,让 ta 知道你懂', value: -1, banter: '抱抱模式启动' },
  ]},
  { id: 11, dim: 'TF', tier: 'basic', text: '观点不一致时,你会', options: [
    { label: '据理力争,真理越辩越明', value: 1 },
    { label: '尽量找共识,关系比输赢重要', value: -1 },
  ]},
  { id: 12, dim: 'TF', tier: 'basic', text: '评价一个不太满意的作品', options: [
    { label: '直接指出问题在哪', value: 1 },
    { label: '先肯定优点,再委婉建议', value: -1, banter: '高情商发言' },
  ]},

  // ─── J vs P (basic) ───────────────────────────
  { id: 13, dim: 'JP', tier: 'basic', text: '一次出游,你的状态是', options: [
    { label: '攻略做得明明白白', value: 1, banter: 'Excel 行程表已就绪' },
    { label: '随性出发,走到哪算哪', value: -1, banter: '人生海海,何必计划' },
  ]},
  { id: 14, dim: 'JP', tier: 'basic', text: '你的桌面/房间通常', options: [
    { label: '收拾得井井有条', value: 1 },
    { label: '看起来乱但我自己门清', value: -1, banter: '混沌中自有秩序' },
  ]},
  { id: 15, dim: 'JP', tier: 'basic', text: '面对截止日期,你', options: [
    { label: '提前完成,松一口气', value: 1 },
    { label: 'deadline 是第一生产力', value: -1, banter: '与 deadline 共舞' },
  ]},
  { id: 16, dim: 'JP', tier: 'basic', text: '面对多个选项时,你会', options: [
    { label: '尽快决定,然后执行', value: 1 },
    { label: '尽可能保留更多可能性', value: -1 },
  ]},

  // ─── 准确版增量 (12 题) ─────────
  { id: 17, dim: 'EI', tier: 'extra', text: '团队会议里,你更常', options: [
    { label: '主动发表观点,带动节奏', value: 1 },
    { label: '听完再说一两句关键的', value: -1 },
  ]},
  { id: 18, dim: 'EI', tier: 'extra', text: '一整天独处工作之后', options: [
    { label: '想出去找人聊聊天', value: 1 },
    { label: '继续享受这份安静', value: -1 },
  ]},
  { id: 19, dim: 'EI', tier: 'extra', text: '认识新朋友时,你', options: [
    { label: '很快聊到一起,广交朋友', value: 1 },
    { label: '深交几个就够了', value: -1, banter: '少而精,选我' },
  ]},

  { id: 20, dim: 'SN', tier: 'extra', text: '听别人讲一件事,你更在意', options: [
    { label: '事实经过和细节', value: 1 },
    { label: '事件背后的含义', value: -1 },
  ]},
  { id: 21, dim: 'SN', tier: 'extra', text: '聊到未来,你更想谈', options: [
    { label: '一年内能落地的计划', value: 1 },
    { label: '十年后世界的样子', value: -1, banter: '脑洞已经飞到 2055' },
  ]},
  { id: 22, dim: 'SN', tier: 'extra', text: '哪种描述更像你', options: [
    { label: '我是现实主义者', value: 1 },
    { label: '我是想象力丰富的人', value: -1 },
  ]},

  { id: 23, dim: 'TF', tier: 'extra', text: '看一段感人短片,你', options: [
    { label: '欣赏拍摄手法和叙事', value: 1, banter: '影评人灵魂' },
    { label: '会被情绪带着泪目', value: -1 },
  ]},
  { id: 24, dim: 'TF', tier: 'extra', text: '团队里有人犯错,你倾向', options: [
    { label: '先指出问题再讨论改进', value: 1 },
    { label: '先关心 ta 的状态再说事', value: -1 },
  ]},
  { id: 25, dim: 'TF', tier: 'extra', text: '理想的你想被人评价为', options: [
    { label: '理性、可靠、有判断力', value: 1 },
    { label: '善良、温暖、有同理心', value: -1 },
  ]},

  { id: 26, dim: 'JP', tier: 'extra', text: '看到日历空着,你会', options: [
    { label: '先安排好这周要做的事', value: 1 },
    { label: '保持灵活,根据状态再说', value: -1 },
  ]},
  { id: 27, dim: 'JP', tier: 'extra', text: '一件事突然变化,你', options: [
    { label: '焦虑,想回到原计划', value: 1 },
    { label: '不太介意,顺势调整', value: -1, banter: '随缘 是 我 的 道' },
  ]},
  { id: 28, dim: 'JP', tier: 'extra', text: '更接近你的口头禅是', options: [
    { label: '先把事情敲定下来吧', value: 1 },
    { label: '再看看,说不定还有更好的', value: -1 },
  ]},
]

export type QuizMode = 'simple' | 'accurate'

export function getQuestions(mode: QuizMode): Question[] {
  if (mode === 'simple') return QUESTIONS.filter((q) => q.tier === 'basic')
  return QUESTIONS
}
