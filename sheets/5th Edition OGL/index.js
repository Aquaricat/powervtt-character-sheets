import Sheet from './sheet'

export default {
  /**
   * Sheet Component
   * @type {Component}
   */
  component: Sheet,

  /**
   * Name of the sheet
   * @type {String}
   */
  name: '5th Edition OGL',

  /**
   * Primary author of the sheet
   * @type {String}
   */
  author: 'Unicorn Heart Club LLC',

  /**
   * Contributors; an array of Power VTT user ids
   * @type {Array<Number>}
   */
  contributors: [
    1000002184,
    1000000392,
    1000000308
  ],

  /**
   * Default template; templates in this namespace will not need to be scope-referenced
   * @type {String}
   */
  template: 'default',
}
