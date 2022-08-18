import { cityData } from './city';
export const menuData1 = [{
  name: '地区',
  type: 'cityPicker',
  list: cityData
}, {
  name: '履行情况',
  type: 'single',
  list: [
    {
      // name: '履行情况',
      key: 'executePerformanceCode',
      single: true,
      list: [{
        name: '全部',
        value: ''
      }, {
        name: '全部未履行',
        value: '1'
      }, {
        name: '部分未履行',
        value: '2'
      }, {
        name: '其他',
        value: '3'
      }]
    }
  ],
}, {
  name: '发布年份',
  type: 'equalMultiOption',
  list: [
    {
      name: '发布年份',
      key: 'releaseYear',
      selectAllName: '全选',
      list: [{
        name: '2022',
        value: '2022'
      }, {
        name: '2021',
        value: '2021'
      }, {
        name: '2020',
        value: '2020'
      }, {
        name: '2019',
        value: '2019'
      }, {
        name: '2018',
        value: '2018'
      }]
    }, {
      name: '违约情况',
      key: 'releaseStatus',
      selectAllName: '全选',
      list: [{
        name: '未违约',
        value: '1'
      }, {
        name: '已违约',
        value: '2'
      }]
    }
  ],
}, {
  name: '日期范围',
  type: 'singleDatePicker',
  list: [
    {
      name: '自定义',
      key: 'customYear',
      single: true,
      needDatePcker: true, //显示日期插件
      // dateRange: ['2016-10-01', '2030-10-01'], //日期选择区间
      // placeholder: ['起始日期', '结束日期'],
      // dateType: 'date', //年月日:date, 年月:month, 年:year
      // customValue: ['2022-08-01', '2022-08-08'], //默认选中日期
      // isAllowAfter: false, //是否允许选择未来日期

      list: [
        { value: ['2021-01-01', '2022-01-01'], name: '近一年', selected: true },
        { value: ['2020-01-01', '2022-01-01'], name: '近三年' },
        { value: ['2017-01-01', '2022-01-01'], name: '近五年' },
      ]
    }
  ]
}];


export const menuData2 = [{
  name: "收益率(加权)",
  type: "columnSingleWithoutBtn",
  key: "yield", //筛选列唯一性区分
  list: [
    {
      name: "收益率(加权)",
      hasSelectAll: false,
      single: true,
      key: "BD0126_044",
      list: [
        { name: "≥6%", value: "0|6" },
        { name: "≥8%", value: "0|8", selected: true },
        { name: "≥10%", value: "0|10" },
        { name: "≥15%", value: "0|15" },
        { name: "≥20%", value: "0|20" },
        { name: "≥50%", value: "0|50" },
      ],
    },
    {
      name: "收益率(收盘)",
      hasSelectAll: false,
      single: true,
      key: "BD0126_022",
      list: [
        { name: "≥6%", value: "1|6" },
        { name: "≥8%", value: "1|8" },
        { name: "≥10%", value: "1|10" },
        { name: "≥15%", value: "1|15" },
        { name: "≥20%", value: "1|20" },
        { name: "≥50%", value: "1|50" },
      ],
    },
    {
      name: '净价(加权)',
      hasSelectAll: false,
      single: true,
      key: 'BD0126_007',
      list: [
        { name: '≤95元', value: '2|95' },
        { name: '≤90元', value: '2|90' },
        { name: '≤80元', value: '2|80' },
        { name: '≤50元', value: '2|50' },
        { name: '≤30元', value: '2|30' },
        { name: '≤20元', value: '2|20' },
      ]
    },
    {
      name: '净价(收盘)',
      hasSelectAll: false,
      single: true,
      key: 'BD0126_006',
      list: [
        { name: '≤95元', value: '3|95' },
        { name: '≤90元', value: '3|90' },
        { name: '≤80元', value: '3|80' },
        { name: '≤50元', value: '3|50' },
        { name: '≤30元', value: '3|30' },
        { name: '≤20元', value: '3|20' },
      ]
    }
  ],
}, {
  name: "筛选",
  type: "equalMultiOption",//equalMultiOption
  key: "filter", //筛选列唯一性区分
  list: [
    {
      name: "日期范围",
      key: "customYear", //发送字段名称的代码在 multiOption->updateDate()
      hasSelectAll: false,
      single: true,
      needDatePcker: true, //显示日期插件
      // dateRange: ['2016-10-01', '2030-10-01'], //日期选择区间
      // placeholder: ['起始日期', '结束日期'],
      // dateType: 'date', //年月日:date, 年月:month, 年:year
      // customValue: ['2022-08-01', '2022-08-08'], //默认选中日期
      // isAllowAfter: false, //是否允许选择未来日期
      list: [
        { value: ['2021-01-01', '2022-01-01'], name: '近一年', selected: true },
        { value: ['2020-01-01', '2022-01-01'], name: '近三年' },
        { value: ['2017-01-01', '2022-01-01'], name: '近五年' }
      ]
    },
    {
      name: "市场",
      key: "Exchange",
      hasSelectAll: false,
      single: true,
      list: [
        { value: "CNIBEX", name: "银行间" },
        { value: "CNSESH", name: "上交所竞价" },
        { value: "CNSESZ", name: "深交所竞价" },
        { value: "CNETPF", name: "沪市固收" },
        { value: "CNSZCP", name: "深市综协" },
        { value: "OTHERS", name: "其他" },
      ],
    },
    {
      name: "申万行业",
      key: "BD0202_067",
      list: [
        { name: "农林牧渔", value: "110000" },
        { name: "基础化工", value: "220000" },
        { name: "钢铁", value: "230000" },
        { name: "有色金属", value: "240000" },
        { name: "电子", value: "270000" },
        { name: "汽车", value: "280000" },
        { name: "家用电器", value: "330000" },
        { name: "食品饮料", value: "340000" },
        { name: "纺织服饰", value: "350000" },
        { name: "轻工制造", value: "360000" },
        { name: "医药生物", value: "370000" },
        { name: "公用事业", value: "410000" },
        { name: "交通运输", value: "420000" },
        { name: "房地产", value: "430000" },
        { name: "商贸零售", value: "450000" },
        { name: "社会服务", value: "460000" },
      ],
    },
  ]
}, {
  name: "违约状况",
  type: "columnSingle",
  key: "scenarios", //筛选列唯一性区分
  list: [
    {
      name: "违约率",
      hasSelectAll: false,
      single: true,
      key: "defaultScenarios",
      list: [
        { name: "违约率曲线1", value: "0|1" },
        { name: "违约率曲线2", value: "0|2" },
        { name: "违约率曲线3", value: "0|3" },
        { name: "违约率曲线4", value: "0|4" },
      ],
    },
    {
      name: '早偿率',
      hasSelectAll: false,
      single: true,
      key: 'prepayScenarios',
      list: [
        { name: '早偿率曲线1', value: '1|1' },
        { name: '早偿率曲线2', value: '1|2' },
        { name: '早偿率曲线3', value: '1|3' },
      ]
    }
  ],
}, {
  name: '排序',
  key: 'sortType',
  type: 'lineSingle',
  list: [
    {
      key: 'sortRule',
      name: '',
      list: [
        {
          name: '默认排序',
          value: '0',
        },
        {
          name: '发布日期升序',
          value: '1',
        },
        {
          name: '发布日期降序',
          value: '2',
        },
        {
          name: '裁判日期升序',
          value: '3',
        },
        {
          name: '裁判日期降序',
          value: '4',
        },
      ],
    },
  ],
}]