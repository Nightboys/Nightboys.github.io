<template>
	<div class="table-container" :id="'uiTab' + tabId" :class="{ sticky: handleSticky }" @touchstart="handleTouchStart">
		<div class="tab-header" v-if="handleSticky">
			<div class="tab-left">
				<div class="tab-item" v-for="(d, i) in filterColumns.fixedList" :key="i" :style="d.extraStyle">
					<span>{{ d.name }}</span>
					<i
						v-if="d.sort"
						:class="[d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '']"
						@click="handleSort1(d, i)"
					></i>
				</div>
			</div>
			<div class="icon-btn icon-btn-left"><img src="./images/icon_left.png" /></div>
			<div class="tab-right" ref="tHeader" @scroll.passive="handleHorizontalScroll($event, 'tHeader')">
				<div class="tab-item" v-for="(d, i) in filterColumns.otherList" :key="i" :style="d.extraStyle">
					<span>{{ d.name }}</span>
					<i
						v-if="d.sort"
						:class="[d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '']"
						@click="handleSort2(d, i)"
					></i>
				</div>
			</div>
			<div class="icon-btn icon-btn-right"><img src="./images/icon_right.png" /></div>
		</div>

		<div class="tab-body" :class="{ wrap: isWrap }" :style="tbodyStyle">
			<div class="tab-body-content" :style="tbodyContentStyle">
				<div class="tab-left">
					<div class="tab-filed" v-if="!handleSticky">
						<div class="tab-item" v-for="(d, i) in filterColumns.fixedList" :key="i" :style="d.extraStyle">
							<span>{{ d.name }}</span>
							<i
								v-if="d.sort"
								:class="[d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '']"
								@click="handleSort1(d, i)"
							></i>
						</div>
					</div>
					<div class="tab-list-item" v-for="(item, index) in dataList" :key="index">
						<div class="tab-item" v-for="(d, i) in filterColumns.fixedList" :key="i" :style="d.extraStyle">
							<template v-if="d.template">
								<slot :name="d.template" :row="item"></slot>
							</template>
							<template v-else>
								{{ item[d.key] | isUndefined }}
							</template>
						</div>
					</div>
				</div>
				<div class="icon-btn icon-btn-left" :class="{ visable: handleSticky }">
					<img src="./images/icon_left.png" />
				</div>
				<div class="tab-right" ref="tBody" @scroll.passive="handleHorizontalScroll($event, 'tBody')">
					<div class="tab-filed" v-if="!handleSticky">
						<div class="tab-item" v-for="(d, i) in filterColumns.otherList" :key="i" :style="d.extraStyle">
							<span>{{ d.name }}</span>
							<i
								v-if="d.sort"
								:class="[d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '']"
								@click="handleSort2(d, i)"
							></i>
						</div>
					</div>
					<div class="tab-list-item" v-for="(item, index) in dataList" :key="index">
						<div class="tab-item" v-for="(d, i) in filterColumns.otherList" :key="i" :style="d.extraStyle">
							<template v-if="d.template">
								<slot :name="d.template" :row="item"></slot>
							</template>
							<template v-else>
								{{ item[d.key] | isUndefined }}
							</template>
						</div>
					</div>
				</div>
				<div class="icon-btn icon-btn-right" :class="{ visable: handleSticky }">
					<img src="./images/icon_right.png" />
				</div>
			</div>
		</div>

		<div class="table-page" v-if="isShowPage && total > minStep">
			<div class="page-collapse" v-if="isExpand" @click="handleExpand">
				<span>展开剩余{{ total - initStep }}条</span>
			</div>
			<div class="page-div" v-if="isShowPage && !isExpand">
				<span :class="{ disabled: currentPage == 1 }" @click="jump('first', $event)">
					首页
				</span>
				<span :class="{ disabled: currentPage == 1 }" @click="jump('pre', $event)">
					上一页
				</span>
				<span class="page-number">
					{{ (currentPage + "").padStart(2, 0) }}/{{ (totalPage + "").padStart(2, 0) }}
				</span>
				<span :class="{ disabled: currentPage == totalPage }" @click="jump('next', $event)">
					下一页
				</span>
				<span :class="{ disabled: currentPage == totalPage }" @click="jump('last', $event)">
					末页
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import tabIndex from "./js/index";
export default {
	components: {},
	mixins: [tabIndex],
};
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>
