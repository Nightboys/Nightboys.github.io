<template>
  <div
    class="table-container"
    :id="'uiTab' + tabId"
    :class="{ sticky: handleSticky }"
    @touchstart="handleTouchStart"
  >
    <div class="tab-header" v-if="handleSticky">
      <div class="tab-left">
        <div
          class="tab-item"
          v-for="(d, i) in filterColumns.fixedList"
          :key="i"
          :style="d.extraStyle"
        >
          <span>{{ d.name }}</span>
          <i
            v-if="d.sort"
            :class="[
              d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '',
            ]"
            @click="handleSort1(d, i)"
          ></i>
        </div>
      </div>
      <div class="icon-btn icon-btn-left">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJNJREFUSEvN1TEOgCAMheGWlevCrDvhzDUMTTrY2KR9iR6AX74iMoGetVZvrU1GrH8WJ6LJzAMS2HvfIjKIqJcGlEVELpUpC1iW8+blActi55rewRtLWcBjKQt4LOnAF0sqEGFJBSIs/w7Aic72oUO2vpF5pL7kCFcqEOFKB5QMdtlpAH5de1xlRN7pggTgP33L9QDvHWhTfSdbowAAAABJRU5ErkJggg=="
        />
      </div>
      <div
        class="tab-right"
        ref="tHeader"
        @scroll.passive="handleHorizontalScroll($event, 'tHeader')"
      >
        <div
          class="tab-item"
          v-for="(d, i) in filterColumns.otherList"
          :key="i"
          :style="d.extraStyle"
        >
          <span>{{ d.name }}</span>
          <i
            v-if="d.sort"
            :class="[
              d.sortType == 1 ? 'sort-down' : d.sortType == 2 ? 'sort-up' : '',
            ]"
            @click="handleSort2(d, i)"
          ></i>
        </div>
      </div>
      <div class="icon-btn icon-btn-right">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJdJREFUSEvNlksOgCAMBdszE/a4ttxWtmAwMVEjn9AW5QBM3qQ/9N67GONqrQ2g8JCItpQSAYAKJAMSAAREJGOMkw5xAo5/EXGR1nUD5CTSup6AHERU1xtAVFcRIKWrBhDR1QKwdXUBOLp6AcO6fgMYbsCuBJwR0gKwu/q7RuNouY786cNuuFpKi2rawmFXSy2B7tLXPlt22JPEGRUFx4UAAAAASUVORK5CYII="
        />
      </div>
    </div>

    <div class="tab-body" :class="{ wrap: isWrap }" :style="tbodyStyle">
      <div class="tab-body-content" :style="tbodyContentStyle">
        <div class="tab-left">
          <div class="tab-filed" v-if="!handleSticky">
            <div
              class="tab-item"
              v-for="(d, i) in filterColumns.fixedList"
              :key="i"
              :style="d.extraStyle"
            >
              <span>{{ d.name }}</span>
              <i
                v-if="d.sort"
                :class="[
                  d.sortType == 1
                    ? 'sort-down'
                    : d.sortType == 2
                    ? 'sort-up'
                    : '',
                ]"
                @click="handleSort1(d, i)"
              ></i>
            </div>
          </div>
          <div
            class="tab-list-item"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div
              class="tab-item"
              v-for="(d, i) in filterColumns.fixedList"
              :key="i"
              :style="d.extraStyle"
            >
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
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJNJREFUSEvN1TEOgCAMheGWlevCrDvhzDUMTTrY2KR9iR6AX74iMoGetVZvrU1GrH8WJ6LJzAMS2HvfIjKIqJcGlEVELpUpC1iW8+blActi55rewRtLWcBjKQt4LOnAF0sqEGFJBSIs/w7Aic72oUO2vpF5pL7kCFcqEOFKB5QMdtlpAH5de1xlRN7pggTgP33L9QDvHWhTfSdbowAAAABJRU5ErkJggg=="
          />
        </div>
        <div
          class="tab-right"
          ref="tBody"
          @scroll.passive="handleHorizontalScroll($event, 'tBody')"
        >
          <div class="tab-filed" v-if="!handleSticky">
            <div
              class="tab-item"
              v-for="(d, i) in filterColumns.otherList"
              :key="i"
              :style="d.extraStyle"
            >
              <span>{{ d.name }}</span>
              <i
                v-if="d.sort"
                :class="[
                  d.sortType == 1
                    ? 'sort-down'
                    : d.sortType == 2
                    ? 'sort-up'
                    : '',
                ]"
                @click="handleSort2(d, i)"
              ></i>
            </div>
          </div>
          <div
            class="tab-list-item"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div
              class="tab-item"
              v-for="(d, i) in filterColumns.otherList"
              :key="i"
              :style="d.extraStyle"
            >
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
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJdJREFUSEvNlksOgCAMBdszE/a4ttxWtmAwMVEjn9AW5QBM3qQ/9N67GONqrQ2g8JCItpQSAYAKJAMSAAREJGOMkw5xAo5/EXGR1nUD5CTSup6AHERU1xtAVFcRIKWrBhDR1QKwdXUBOLp6AcO6fgMYbsCuBJwR0gKwu/q7RuNouY786cNuuFpKi2rawmFXSy2B7tLXPlt22JPEGRUFx4UAAAAASUVORK5CYII="
          />
        </div>
      </div>
    </div>

    <div class="table-page" v-if="isShowPage && total > minStep">
      <div class="page-collapse" v-if="isExpand" @click="handleExpand">
        <span>展开剩余{{ total - initStep }}条</span>
      </div>
      <div class="page-div" v-if="isShowPage && !isExpand">
        <span
          :class="{ disabled: currentPage == 1 }"
          @click="jump('first', $event)"
        >
          首页
        </span>
        <span
          :class="{ disabled: currentPage == 1 }"
          @click="jump('pre', $event)"
        >
          上一页
        </span>
        <span class="page-number">
          {{ (currentPage + '').padStart(2, 0) }}/{{
            (totalPage + '').padStart(2, 0)
          }}
        </span>
        <span
          :class="{ disabled: currentPage == totalPage }"
          @click="jump('next', $event)"
        >
          下一页
        </span>
        <span
          :class="{ disabled: currentPage == totalPage }"
          @click="jump('last', $event)"
        >
          末页
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import tabIndex from './js/index';
export default {
  name: 'uiTableScrollView',
  components: {},
  mixins: [tabIndex],
};
</script>

<style lang="less" scoped>
@import './css/index.less';
</style>
