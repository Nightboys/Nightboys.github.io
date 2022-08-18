<template>
	<div class="tree-box">
		<slotList :cList="treeData"></slotList>
	</div>
</template>
<script>
import slotList from "./slot.vue";
export default {
	components: { slotList },
	props: {
		// 树节点
		treeData: [],
	},
	data() {
		return {};
	},
	mounted() {
		// console.log("treeData=====", this.treeData);
	},
	methods: {},
};
</script>
<style lang="less" scoped>
.tree-box {
	height: 100%;
	overflow: hidden auto;
	> .tree-list {
		padding: 0 0.32rem;
	}
}
</style>
