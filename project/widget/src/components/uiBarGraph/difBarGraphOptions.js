
const sortMap = function(map, isUpSort) {
	let keys = new Array()
	for(let key of map.keys()) {
		keys.push(key)
	}
	if(isUpSort) {
		keys.sort((a, b) => a - b)
	}else {
		keys.sort((a, b) => b - a)
	}
	let newMap = new Map()
	keys.forEach(key => {
		newMap.set(key, map.get(key))
	})
	return newMap;
}
/**
 * @param {String} type
 * @param {Object} rootFontSize
 * @param {Object} isDownSort
 */
const getBarGraphOption = function(type, rootFontSize, isDownSort) {
	switch(type) {
		case 'ver-bar-graph':
			return getVerBarGraphOption(rootFontSize)
		case 'hor-bar-graph':
			return getHorBarGraphOption(rootFontSize, isDownSort)
		case 'line-bar-graph':
			return getlineBarGraphOption(rootFontSize)
	}
}

/**
 * @param {Number} rootFontSize 
 * @description 获取竖向柱状图配置
 */
const getVerBarGraphOption = function(rootFontSize) {
	return {
		color: ['#619CFF'],
		tooltip: {
			show: true,
			confine: true,
			trigger: 'axis',
			triggerOn: 'mousemove',
			axisPointer: {    
				type: 'shadow' 
			}
		},
		grid: {
			top: 0.88 * rootFontSize,
			right: 0.34 * rootFontSize,
			bottom: 1.8 * rootFontSize,
			left: 0.44 * rootFontSize,
		},
		legend: {
			bottom: 0.76 * rootFontSize,
			left: 0.76 * rootFontSize,
			icon: 'rect',
			padding: 0,
			itemWidth: 0.14 * rootFontSize,
			itemHeight: 0.14 * rootFontSize,
			height: 0.3 * rootFontSize,
			itemStyle: {
				borderWidth: 0
			},
			textStyle: {
				color: '#5C5C5C',
				fontSize: 0.2 * rootFontSize,
				fontFamily: 'PingFangSC',
				lineHeight: 0.3 * rootFontSize,
				padding: 0
			}
		},
		xAxis: [
			{
				type: 'category',
				axisLabel: {
					interval: 0,
					color: '#8C8C8C',
					fontSize: 0.18 * rootFontSize,
					fontFamily: 'PingFangSC',
					lineHeight: 0.28 * rootFontSize,
					height: 0.28 * rootFontSize,
					padding: [0, 0.04 * rootFontSize, 0, 0],
					margin: 0.14 * rootFontSize
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#DFDFDF'
					}
				},
				axisTick: {
					show: false
				},
				data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '余额(万亿元)',
				position: 'left',
				nameGap: 0.22 * rootFontSize,
				nameTextStyle: {
					fontSize: 0.2 * rootFontSize,
					fontFamily: 'PingFangSC',
					color: '#3C3C3C',
					lineHeight: 0.42 * rootFontSize,
					align: 'center',
					padding: [0, 0, 0, 15]
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#DFDFDF'
					}
				},
				axisTick: {
					show: true,
					length: 0.12 * rootFontSize,
					lineStyle: {
						color: '#DFDFDF',
					}
				},
				splitLine: {
					show: false
				}
			}
		],
		series: [
			{
				name: '基础货币余额',
				type: 'bar',
				barWidth: 0.24 * rootFontSize,
				data: [18, 23, 15, 12, 17, 14, 31, 12, 12, 19]
			}
		]
	}
}

/**
 * @param {Number} rootFontSize 
 * @param {Boolean} isDownSort 是否降序 
 * @description 获取横向柱状图配置
 */

const getHorBarGraphOption = function(rootFontSize, isDownSort) {
	let option = {
		color: ['#3B95F2'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 1.26 * rootFontSize,
		},
		xAxis: {
			type: 'value',
			splitLine: {
				show: false
			}
		},
		yAxis: [
			{
				type: 'category',
				data: ['建设银行', '工商银行', '交通银行', '兴业银行', '蚂蚁小微小额', '重庆蚂蚁商诚', '信达资产', '前海一方保理', '招商银行', '中国银行',
							 '建设银行', '工商银行', '交通银行', '兴业银行', '蚂蚁小微小额', '重庆蚂蚁商诚', '信达资产', '前海一方保理', '招商银行'],
				axisTick: {
					show: false
				},
				inverse: true,
				axisLine: {
					show: false
				},
				axisLabel: {
					interval: 0,
					color: '#5C5C5C',
					fontSize: 0.18 * rootFontSize,
					fontFamily: 'PingFangSC',
					lineHeight: 0.26 * rootFontSize,
					height: 0.26 * rootFontSize,
					padding: [0.06 * rootFontSize, 0, 0, 0],
					margin: 0.06 * rootFontSize
				},
			},
			{
				type: 'category',
				inverse: true,
				axisLine: 'none',
				axisTick: 'none',
				show: true,
				axisLabel: {
					color: '#3B95F2',
					fontSize: 0.16 * rootFontSize,
					fontFamily: 'Helvetica',
					lineHeight: 0.2 * rootFontSize,
					height: 0.2 * rootFontSize,
					align: 'right',
					margin: 0
				},
				data: [1234, 888, 672, 666, 492, 367, 168, 212, 168, 123, 234, 788, 632, 656, 392, 267, 68, 202, 158]
			}
		],
		series: [
			{
				name: '2011年',
				type: 'bar',
				barWidth: 0.16 * rootFontSize,
				itemStyle: {
					borderRadius: 0.1 * rootFontSize,
				}, 
				data: [1234, 888, 672, 666, 492, 367, 168, 212, 168, 123, 234, 788, 632, 656, 392, 267, 68, 202, 158]
			},
		]
	}
	if(isDownSort === true || isDownSort === false) {
		option = {
			color: ['#3B95F2'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 1.26 * rootFontSize,
			},
			xAxis: {
				type: 'value',
				splitLine: {
					show: false
				}
			},
			yAxis: [
				{
					type: 'category',
					data: ['建设银行', '工商银行', '交通银行', '兴业银行', '蚂蚁小微小额', '重庆蚂蚁商诚', '信达资产', '前海一方保理', '招商银行', '中国银行',
								 '建设银行', '工商银行', '交通银行', '兴业银行', '蚂蚁小微小额', '重庆蚂蚁商诚', '信达资产', '前海一方保理', '招商银行'],
					axisTick: {
						show: false
					},
					inverse: true,
					axisLine: {
						show: false
					},
					axisLabel: {
						interval: 0,
						color: '#5C5C5C',
						fontSize: 0.18 * rootFontSize,
						fontFamily: 'PingFangSC',
						lineHeight: 0.26 * rootFontSize,
						height: 0.26 * rootFontSize,
						padding: [0.06 * rootFontSize, 0, 0, 0],
						margin: 0.06 * rootFontSize
					},
				}
			],
			series: [
				{
					name: '2011年',
					type: 'bar',
					barWidth: 0.16 * rootFontSize,
					itemStyle: {
						borderRadius: 0.1 * rootFontSize,
					}, 
					label: {
						show: true,
						color: '#3B95F2',
						fontSize: 0.18 * rootFontSize,
						fontFamily: 'PingFangSC',
						lineHeight: 0.26 * rootFontSize,
						height: 0.26 * rootFontSize,
						position: 'right',
						distance: 0.08 * rootFontSize
					},
					data: [1234, 888, 672, 666, 492, 367, 168, 212, 168, 123, 234, 788, 632, 656, 392, 267, 68, 202, 158]
				},
			]
		}
		let map = new Map()
		option.series[0]['data'].forEach((data, index) => {
			map.set(data, option.yAxis[0]['data'][index])
		})
		let newMap = sortMap(map, !isDownSort)
		let yAxis = [], seriesData = []
		for(let key of newMap.keys()) {
			seriesData.push(key)
			yAxis.push(newMap.get(key))
		}
		option.series[0]['data'] = seriesData.slice(0)
		option.yAxis[0]['data'] = yAxis.slice(0)
		let xDataFormat = seriesData.map((v, i) => {
				let color = i > 2 ? '#BBBBBB' : '#FF7500';
				let item = {
					value: v,
					textStyle: {
						fontSize: 0.24 * rootFontSize,
						fontFamily: 'DIN',
						fontWeight: 'bold',
						rich: {
							a: {
								color: color,
								height: 0.24 * rootFontSize,
								lineHeight: 0.24 * rootFontSize,
								align: 'right',
							},
							b: {
								// padding: [0, 5]
							},
							value: {
								color: '#BBBBBB'
							}
						}
					}
				}
			return item
		})
		option.yAxis.push({
			type: "category",
			position: 'left',
			offset: 1.24 * rootFontSize,
			inverse: true,
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: false
			},
			axisLabel: {
				formatter: function(value, index) {
					let i = index + 1
					if(i < 4) {
						return '{a|' + i + '}'
					}
					return '{b|' + i + '}'
				}
			},
			data: xDataFormat
		})
		option.grid.left = 1.7 * rootFontSize
	}
	return option
}

const getlineBarGraphOption = function(rootFontSize) {
	return {
		color: ['#619CFF', '#F1D358'],
		tooltip: {
			show: true,
			confine: true,
			trigger: 'axis',
			triggerOn: 'mousemove',
			axisPointer: {    
				type: 'shadow' 
			}
		},
		grid: {
			top: 0.88 * rootFontSize,
			right: 0.44 * rootFontSize,
			bottom: 1.8 * rootFontSize,
			left: 0.44 * rootFontSize,
		},
		legend: {
			bottom: 0.76 * rootFontSize,
			left: 0.76 * rootFontSize,
			icon: 'rect',
			padding: 0,
			itemWidth: 0.14 * rootFontSize,
			itemHeight: 0.14 * rootFontSize,
			itemGap: 0.32 * rootFontSize,
			height: 0.3 * rootFontSize,
			itemStyle: {
				borderWidth: 0
			},
			textStyle: {
				color: '#5C5C5C',
				fontSize: 0.2 * rootFontSize,
				fontFamily: 'PingFangSC',
				lineHeight: 0.3 * rootFontSize,
				padding: 0
			},
			data: [
				{
				name: '基础货币余额',
				icon: 'rect'
				},
				{
					name: '同比',
					icon: 'circle'
				}
			]
		},
		xAxis: [
			{
				type: 'category',
				axisLabel: {
					interval: 0,
					color: '#8C8C8C',
					fontSize: 0.18 * rootFontSize,
					fontFamily: 'PingFangSC',
					lineHeight: 0.28 * rootFontSize,
					height: 0.28 * rootFontSize,
					padding: [0, 0.04 * rootFontSize, 0, 0],
					margin: 0.14 * rootFontSize
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#DFDFDF'
					}
				},
				axisTick: {
					show: false
				},
				data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '余额(万亿元)',
				position: 'left',
				nameGap: 0.22 * rootFontSize,
				nameTextStyle: {
					fontSize: 0.2 * rootFontSize,
					fontFamily: 'PingFangSC',
					color: '#3C3C3C',
					lineHeight: 0.42 * rootFontSize,
					align: 'center',
					padding: [0, 0, 0, 15]
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#DFDFDF'
					}
				},
				axisTick: {
					show: true,
					length: 0.12 * rootFontSize,
					lineStyle: {
						color: '#DFDFDF',
					}
				},
				splitLine: {
					show: false
				}
			},
			{
				type: 'value',
				name: '同比(%)',
				nameGap: 0.22 * rootFontSize,
				nameTextStyle: {
					fontSize: 0.2 * rootFontSize,
					fontFamily: 'PingFangSC',
					color: '#3C3C3C',
					lineHeight: 0.42 * rootFontSize,
					align: 'center',
					padding: [0, 0, 0, 15]
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#DFDFDF'
					}
				},
				axisTick: {
					show: true,
					length: 0.12 * rootFontSize,
					lineStyle: {
						color: '#DFDFDF',
					}
				},
				splitLine: {
					show: false
				}
			}
		],
		series: [
			{
				name: '基础货币余额',
				type: 'bar',
				yAxisIndex: 0,
				barWidth: 0.24 * rootFontSize,
				data: [18, 23, 15, 12, 17, 14, 31, 12, 12, 19]
			},
			{
				name: '同比',
				type: 'line',
				yAxisIndex: 1,
				barWidth: 0.24 * rootFontSize,
				data: [8, 13, 5, 10, 7, 4, 1, 2, 2, 9]
			}
		]
	}
}


export default getBarGraphOption



