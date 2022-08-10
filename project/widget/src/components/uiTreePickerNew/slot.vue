<template>
	<ul class="tree-list">
		<li class="tree-node" v-if="calcLastNode(cList)">
			<div class="label" :class="{ active: parentNode.selected }" @click="sltCurrentNode(parentNode)">
				<i class="icon checkbox" :class="{ check: parentNode.selected }"></i>全部
			</div>
		</li>
		<li class="tree-node" v-for="(item, fx) in cList" :key="fx">
			<div class="label" :class="{ active: item.selected }" @click="changeNode(item, parentNode)">
				<template>
					<i
						class="icon arrow"
						:class="{ open: item.expand }"
						v-if="item[treeProps.children] && item[treeProps.children].length"
					></i>
					<i class="icon checkbox" :class="{ check: item.selected }" v-else></i>
				</template>
				{{ item[treeProps.label] }}
			</div>
			<template v-if="item[treeProps.children] && item[treeProps.children].length">
				<div class="content" v-show="item.expand">
					<slotList :cList="item[treeProps.children]" :parentNode="item" :treeProps="treeProps"></slotList>
				</div>
			</template>
		</li>
	</ul>
</template>
<script>
export default {
	name: "slotList",
	inject: {
		maxLen: { default: () => 0 },
		selectListLen: { default: () => {} },
		maxTips: { default: () => "已选项超出最大限制" },
		changeTree: { default: () => {} },
		title: { default: () => "请选择" },
		treeProps: {
			default: () => {
				return {
					children: "children",
					label: "name",
					nodeKey: "id",
					treeType: "",
				};
			},
		},
	},
	props: {
		// 树节点
		cList: {
			type: Array,
			default: [],
		},

		// 当前节点的父节点
		parentNode: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {};
	},
	mounted() {
		// console.log("====provide====", this.maxLen(), this.treeProps, this.title());
	},
	methods: {
		// 最细节点下层增加“全部”，当最细节点下只有一条数据，不需展示“全部”
		calcLastNode(list = []) {
			let _child = this.treeProps.children,
				lastList = list.filter((d) => d[_child] && d[_child].length);
			return !lastList.length && list.length > 1;
		},

		// '全选'当前节点下子节点
		sltCurrentNode(parentNode) {
			let _child = this.treeProps.children,
				unCheckList = [];
			if (parentNode) {
				unCheckList = parentNode[_child].filter((d) => !d.selected);
			}
			if (!parentNode.selected && this.maxLen() && this.maxLen() < this.selectListLen() + unCheckList.length) {
				this.$toast({
					message: this.maxTips()
						? this.maxTips()
						: `最多可选${this.maxLen()}条${this.title() != "请选择" ? this.title() : ""}`,
				});

				return;
			}

			parentNode.selected = !parentNode.selected;

			this.$nextTick(() => {
				parentNode[_child] &&
					parentNode[_child].forEach((node) => {
						node.selected = parentNode.selected;
					});

				this.changeTreeNodes();
			});
		},

		// 节点状态发生变化
		changeNode(node, parentNode = {}) {
			let _child = this.treeProps.children;
			if (node[_child] && node[_child].length) {
				node.expand = !node.expand;
			} else {
				if (!node.selected && this.maxLen() && this.maxLen() <= this.selectListLen()) {
					this.$toast({
						message: this.maxTips()
							? this.maxTips()
							: `最多可选${this.maxLen()}条${this.title() != "请选择" ? this.title() : ""}`,
					});

					return;
				}

				node.selected = !node.selected;

				this.$nextTick(() => {
					if (parentNode[_child]) {
						parentNode.selected =
							parentNode[_child].filter((d) => d.selected).length == parentNode[_child].length;
					}

					this.changeTreeNodes();
				});
			}
		},

		// 触发目录树change事件
		changeTreeNodes() {
			this.changeTree();
		},
	},
};
</script>
<style lang="less" scoped>
.border-bottom-1px(@color:#dfdfdf, @style: solid) {
	position: relative;
	&::after {
		content: "";
		width: 200vw;
		height: 0;
		border-top: 1px @style @color;
		transform: scaleY(0.5);
		position: absolute;
		bottom: 0;
		left: -50%;
	}
}

* {
	font-size: 12px;
	font-family: PingFangSC, PingFangSC-Regular;
	font-weight: 400;
	text-align: left;
	color: #333333;
	line-height: 16px;
}

.tree-list {
	// padding: 0 0.32rem;
	.tree-list {
		padding-left: 0.64rem;
	}
}

.tree-node {
	.label {
		display: block;
		padding: 10px 0 10px 0.4rem;
		.border-bottom-1px();
		&.active {
			color: #1482f0;
		}
		.icon {
			display: block;
			width: 20px;
			height: 100%;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			&::after {
				display: block;
				content: "";
				width: 12px;
				height: 12px;
				position: absolute;
				left: 0;
				top: calc(50% - 6px);
				// transform: translateY(-50%);
				transform-origin: center center;
			}
			&.arrow {
				&::after {
					background: url("./images/open.png") left center no-repeat;
					background-size: 12px;
					transform: rotate(0deg);
					transition: transform 0.2s;
				}
				&.open {
					&::after {
						transform: rotate(-180deg);
					}
				}
			}
			&.checkbox {
				background: url("./images/ico_cancel.png") left center no-repeat;
				background-size: 12px;
				&.check {
					background: url("./images/ico_xuanze.png") left center no-repeat;
					background-size: 12px;
				}
			}
		}
	}
	.content {
		/* max-height: 0;
		overflow: hidden;
		transition: all 0.5s linear;
		&.animated {
			max-height: 500px;
		} */
	}
}
</style>
