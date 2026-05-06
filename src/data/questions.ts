export type Dim = 'EI' | 'SN' | 'TF' | 'JP'

export type Question = {
  id: number
  dim: Dim
  /** 'basic' 进入简单版和准确版;'extra' 仅准确版 */
  tier: 'basic' | 'extra'
  text: string
  options: [
    { label: string; value: 1 },
    { label: string; value: -1 },
  ]
}

export const QUESTIONS: Question[] = [
  // ─── E vs I (basic) ───────────────────────────
  { id: 1, dim: 'EI', tier: 'basic', text: '一个完全空闲的周末,你更想…', options: [
    { label: '约上朋友热闹一整天', value: 1 },
    { label: '在家自己宅着回血', value: -1 },
  ]},
  { id: 2, dim: 'EI', tier: 'basic', text: '参加一场大型聚会回家后,你的状态是', options: [
    { label: '兴奋上头,意犹未尽', value: 1 },
    { label: '累瘫在沙发上需要充电', value: -1 },
  ]},
  { id: 3, dim: 'EI', tier: 'basic', text: '思考一个复杂问题时,你习惯', options: [
    { label: '边和别人讨论边理思路', value: 1 },
    { label: '一个人安静地想清楚再说', value: -1 },
  ]},
  { id: 4, dim: 'EI', tier: 'basic', text: '走进一个陌生场合,你会', options: [
    { label: '主动找人聊天破冰', value: 1 },
    { label: '先观察一会儿,等别人来搭话', value: -1 },
  ]},

  // ─── S vs N (basic) ───────────────────────────
  { id: 5, dim: 'SN', tier: 'basic', text: '阅读一篇文章,你更容易记住', options: [
    { label: '具体的事实和细节数据', value: 1 },
    { label: '它带给你的整体感受和联想', value: -1 },
  ]},
  { id: 6, dim: 'SN', tier: 'basic', text: '学一个全新的技能,你倾向于', options: [
    { label: '跟着步骤一步步来', value: 1 },
    { label: '先看懂全貌再上手', value: -1 },
  ]},
  { id: 7, dim: 'SN', tier: 'basic', text: '描述一次旅行,你更愿意聊', options: [
    { label: '吃了什么、走了哪些路线', value: 1 },
    { label: '当时的心境和触动你的瞬间', value: -1 },
  ]},
  { id: 8, dim: 'SN', tier: 'basic', text: '面对一个老问题,你倾向于', options: [
    { label: '用过去验证有效的方法搞定', value: 1 },
    { label: '试试有没有更巧的新思路', value: -1 },
  ]},

  // ─── T vs F (basic) ───────────────────────────
  { id: 9, dim: 'TF', tier: 'basic', text: '做重要决定时,你优先听', options: [
    { label: '逻辑推演给出的答案', value: 1 },
    { label: '内心和他人感受的提醒', value: -1 },
  ]},
  { id: 10, dim: 'TF', tier: 'basic', text: '朋友倾诉烦恼,你的第一反应是', options: [
    { label: '帮 ta 分析问题、给出建议', value: 1 },
    { label: '先共情陪伴,让 ta 知道你懂', value: -1 },
  ]},
  { id: 11, dim: 'TF', tier: 'basic', text: '和别人观点不一致时,你', options: [
    { label: '据理力争,真理越辩越明', value: 1 },
    { label: '尽量找共识,关系比输赢重要', value: -1 },
  ]},
  { id: 12, dim: 'TF', tier: 'basic', text: '评价一个不太满意的作品时', options: [
    { label: '直接指出问题在哪', value: 1 },
    { label: '先肯定优点,再委婉提建议', value: -1 },
  ]},

  // ─── J vs P (basic) ───────────────────────────
  { id: 13, dim: 'JP', tier: 'basic', text: '一次出游你的状态是', options: [
    { label: '提前把行程攻略做得明明白白', value: 1 },
    { label: '随性出发,走到哪算哪', value: -1 },
  ]},
  { id: 14, dim: 'JP', tier: 'basic', text: '你的桌面/房间通常', options: [
    { label: '收拾得井井有条', value: 1 },
    { label: '看起来乱但我自己门清', value: -1 },
  ]},
  { id: 15, dim: 'JP', tier: 'basic', text: '面对截止日期,你', options: [
    { label: '提前完成,松一口气', value: 1 },
    { label: 'deadline 是第一生产力', value: -1 },
  ]},
  { id: 16, dim: 'JP', tier: 'basic', text: '面对多个选项时,你想', options: [
    { label: '尽快决定,然后执行', value: 1 },
    { label: '尽可能保留更多可能性', value: -1 },
  ]},

  // ─── 准确版增量 (每维度 +3 题, 共 12 题) ─────────
  { id: 17, dim: 'EI', tier: 'extra', text: '在团队会议里,你更常', options: [
    { label: '主动发表观点,带动节奏', value: 1 },
    { label: '认真听完再说一两句关键的', value: -1 },
  ]},
  { id: 18, dim: 'EI', tier: 'extra', text: '一整天独处工作之后,你想', options: [
    { label: '出去找人聊聊天', value: 1 },
    { label: '继续享受这份安静', value: -1 },
  ]},
  { id: 19, dim: 'EI', tier: 'extra', text: '认识新朋友的时候,你', options: [
    { label: '很快聊到一起,广交朋友', value: 1 },
    { label: '更喜欢深入交几个知心的', value: -1 },
  ]},

  { id: 20, dim: 'SN', tier: 'extra', text: '听别人讲一件事,你更在意', options: [
    { label: '事实经过和细节是否准确', value: 1 },
    { label: '事件背后的含义和影响', value: -1 },
  ]},
  { id: 21, dim: 'SN', tier: 'extra', text: '聊到未来,你更愿意谈', options: [
    { label: '一年内能落地的具体计划', value: 1 },
    { label: '十年后世界可能变成什么样', value: -1 },
  ]},
  { id: 22, dim: 'SN', tier: 'extra', text: '下面哪种描述更像你', options: [
    { label: '我是一个现实主义者', value: 1 },
    { label: '我是一个想象力丰富的人', value: -1 },
  ]},

  { id: 23, dim: 'TF', tier: 'extra', text: '看到一段令人感动的短片,你', options: [
    { label: '欣赏它的拍摄手法和叙事', value: 1 },
    { label: '会被情绪带着跟着泪目', value: -1 },
  ]},
  { id: 24, dim: 'TF', tier: 'extra', text: '团队里有人犯错,你倾向于', options: [
    { label: '先指出问题再讨论改进', value: 1 },
    { label: '先关心 ta 的状态再说事情', value: -1 },
  ]},
  { id: 25, dim: 'TF', tier: 'extra', text: '理想的你想被人评价为', options: [
    { label: '理性、可靠、有判断力', value: 1 },
    { label: '善良、温暖、有同理心', value: -1 },
  ]},

  { id: 26, dim: 'JP', tier: 'extra', text: '看到日历空着,你会', options: [
    { label: '提前安排好这周要做的事', value: 1 },
    { label: '保持灵活,根据状态再说', value: -1 },
  ]},
  { id: 27, dim: 'JP', tier: 'extra', text: '一件事情突然变化,你', options: [
    { label: '焦虑,想尽快回到原计划', value: 1 },
    { label: '不太介意,顺势调整就好', value: -1 },
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
