export const roll1 = [
  {
    advantage: false,
    bonus: false,
    crit: false,
    die: '1d20',
    mod: 3,
    pb: {
      base: 2,
      multiplier: 1,
    },
    range: false,
  },
]

export const roll2 = [
  {
    advantage: 1,
    bonus: false,
    crit: {
      fail: [ 1, ],
      success: [ 20, 19, 18, ],
    },
    die: '1d20',
    mod: -1,
    pb: {
      base: 2,
      multiplier: 2,
    },
    range: false,
  },
]

export const roll3 = [
  {
    advantage: -1,
    bonus: [
      { label: 'Fighting Style: Archery', bonus: 2, roll: false },
    ],
    crit: {
      fail: [ 1, ],
      success: [ 20, ],
    },
    die: '1d20',
    mod: -1,
    pb: {
      base: 2,
      multiplier: 2,
    },
    range: false,
  },
]

export const roll4 = [
  {
    advantage: false,
    bonus: [
      {label: 'Bless', bonus: 1, roll: '1d4'},
      {label: 'Bane', bonus: -1, roll: '1d4'},
    ],
    crit: {
      fail: false,
      success: [ 20, ],
    },
    die: '1d20',
    mod: 4,
    pb: {
      base: 2,
      multiplier: 0.5,
    },
    range: false,
  },
]

export const roll5 = [
  {
    advantage: false,
    bonus: false,
    crit: {
      fail: [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, ],
      success: false,
    },
    die: '1d20',
    mod: 4,
    pb: {
      base: 2,
      multiplier: -1,
    },
    range: false,
  },
]

export const roll6 = [
  {
    advantage: false,
    bonus: false,
    crit: false,
    die: '1d20',
    mod: 3,
    pb: {
      base: 3,
      multiplier: 1,
    },
    range: {
      max: 17,
      min: false
    },
  },
]

export const roll7 = [
  {
    advantage: false,
    bonus: false,
    crit: {
      fail: [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, ],
      success: false,
    },
    die: '1d20',
    mod: 6,
    pb: {
      base: 5,
      multiplier: 2,
    },
    range: {
      max: 17,
      min: false
    },
  },
]
