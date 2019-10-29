module.exports = {
  title: '家政服务平台',

  /**
   * @type {boolean} true | false
   * @description 是否显示设置右侧面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否修复页眉
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏显示logo
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示err日志组件。
   * 默认值仅在生产环境中使用
   * 如果你也想在开发中使用它，你可以通过['production'， 'development']
   */
  errorLog: 'production'
}
