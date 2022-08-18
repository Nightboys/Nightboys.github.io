// https://github.com/vant-ui/vant/blob/dev/packages/vant-cli/docs/config.zh-CN.md
module.exports = {
  name: 'nightboys-ui',
  build: {
    css: {
      preprocessor: 'less',
      base: 'styles/commons.less',
    },
    site: {
      publicPath: '/nightboys-ui/site',
    },
    // namedExport: true,  //是否通过 Named Export 对组件进行导出
  },
  site: {
    title: 'nightboys-ui',
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    description: '简单的公用组件库',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          // {
          //   path: 'demo-button',
          //   title: 'DemoButton 按钮',
          // },
          {
            path: 'ui-city-picker',
            title: '地区组件 uiCityPicker',
          },
          {
            path: 'ui-date-picker',
            title: '日期选择组件 uiDatePicker',
          },
          {
            path: 'ui-loading',
            title: '页面加载状态组件 uiLoading',
          },
          {
            path: 'ui-menu-head',
            title: '筛选组件 uiMenuHead',
          },
          {
            path: 'ui-not-found',
            title: '页面缺省组件 uiNotFound',
          },
          {
            path: 'ui-picker',
            title: '下拉选择组件 uiPicker',
          },
          {
            path: 'ui-table-scroll-view',
            title: '表格滚动 uiTableScrollView',
          },
          {
            path: 'ui-table-view',
            title: '列表分页组件 uiTableView',
          },
          {
            path: 'ui-tree-picker-new',
            title: '目录树Tree uiTreePickerNew',
          }
        ],
      },
    ],
    enableVConsole: true,//是否在dev时开启vConsole调试，用于移动端debug
    // hideSimulator: true, //是否隐藏所有页面右侧的手机模拟器，默认不隐藏
  },
};
