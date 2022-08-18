<template>
  <ul class="tree-list">
    <li class="tree-node" v-if="calcLastNode(cList)">
      <div
        class="label"
        :class="{ active: parentNode.selected }"
        @click="sltCurrentNode(parentNode)"
      >
        <i class="icon checkbox" :class="{ check: parentNode.selected }"></i
        >全部
      </div>
    </li>
    <li class="tree-node" v-for="(item, fx) in cList" :key="fx">
      <div
        class="label"
        :class="{ active: item.selected }"
        @click="changeNode(item, parentNode)"
      >
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
      <template
        v-if="item[treeProps.children] && item[treeProps.children].length"
      >
        <div class="content" v-show="item.expand">
          <slotList
            :cList="item[treeProps.children]"
            :parentNode="item"
            :treeProps="treeProps"
          ></slotList>
        </div>
      </template>
    </li>
  </ul>
</template>
<script>
import { Toast } from 'vant';
export default {
  name: 'slotList',
  inject: {
    maxLen: { default: () => 0 },
    selectListLen: { default: () => {} },
    maxTips: { default: () => '已选项超出最大限制' },
    changeTree: { default: () => {} },
    title: { default: () => '请选择' },
    treeProps: {
      default: () => {
        return {
          children: 'children',
          label: 'name',
          nodeKey: 'id',
          treeType: '',
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
      if (
        !parentNode.selected &&
        this.maxLen() &&
        this.maxLen() < this.selectListLen() + unCheckList.length
      ) {
        Toast({
          message: this.maxTips()
            ? this.maxTips()
            : `最多可选${this.maxLen()}条${
                this.title() != '请选择' ? this.title() : ''
              }`,
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
        if (
          !node.selected &&
          this.maxLen() &&
          this.maxLen() <= this.selectListLen()
        ) {
          Toast({
            message: this.maxTips()
              ? this.maxTips()
              : `最多可选${this.maxLen()}条${
                  this.title() != '请选择' ? this.title() : ''
                }`,
          });

          return;
        }

        node.selected = !node.selected;

        this.$nextTick(() => {
          if (parentNode[_child]) {
            parentNode.selected =
              parentNode[_child].filter((d) => d.selected).length ==
              parentNode[_child].length;
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
    content: '';
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
        content: '';
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
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAWtJREFUWEftlbFKA0EQhv/JQYIgWBl9GB9A8DlsbLWwMRyxsdDWxucQfAAfRpNKECSBy8iuOZFk92Z29ooge+3uzvzz/TNzhB37aMf0oAiSHCmECiGJgHReeuj/EDqsZ/uoRidoFq/zevwpVaY518QM9pB7yNVwAsYlCA/ULKe5orQxw4JuP06Z+RnAAAQm0OOg+Zq+18czDYnNO0f123hV7U0YfAH2v6sVEZ3Nbw5eNu92EwKufgLQkghPaBbXqaTWNt0x4xzgoSsQwH2MenTsUwOFyP3alFBY5x7aQp1gn/WtuBgtVebQFQU5K1ISWAr4a7dKkHugsUBzR5pStaCWlN9PgSb1iaqReppiwpIEddm3TpC9JpIFxezzgtzOSpjEECWToLB9gLT0pP5x52ZB2/YB1m1umrJYde1kufOc/10bP4tQG8TvKQCp/7lee0jTD5Y7vRCyJO5tD/WZvFhmoVl6SKJWCEmEvgFzEBo0xgfM5QAAAABJRU5ErkJggg==')
            left center no-repeat;
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
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAINJREFUWEft2LENgDAQA8D3WHRUvxMMADslDR1jGdHQIXfkkZzWRayTq0fvnVHooXKhk+QxAgvAHBHT/fcjRHLPzHVEodbaBmBxoTd9C6ldWshCSkDl3pCFlIDKvSELKQGVe0MWUgIq94YspARU7g1ZSAmo/B8bioha5xjF+lVe7oJ2AUPRbPSt0ebAAAAAAElFTkSuQmCC')
          left center no-repeat;
        background-size: 12px;
        &.check {
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAwJJREFUWEftl8tPE1EUh3/nlkcUWlApIGiCGCD4QjdqRDEmLnXjH+DSmGBMCAQwFeiDR3QhMWqRl0bUBS5FV25Z68Y1MdGgQC21Q0Jf9x4zUyCKhRmKaVi0qyb3zOk33++cm5RKvCHGDvpQFsgkjawhs3HNGsoaMjNgdp7ZGSLEwZgWQnxixdcYXLUeMHNABAboqRARz7yrbK7MF7osmd4DnPcnVGaAiFgwBtVSzB2479R0gBKPdglCfQCzLdNAcYDGkR9rD3Q4NbhZlItgvaScKWY+lNnIiPSYRoQQPfOuwjm43cIpbjcyaAigo6kGfJPIKATwbgB/ZWy2JWvnREyMh5wf6zbMACjv/3lEStskM3QYsgZEYGJxr1nZXY9toSYwDQOotQxiFJIe03Pk29sCHaSBmcoHgvUyYZtioHqzXqkMyTwbTs+6ij/qD5Z6w40M9YSBBstQhFGSOd0L7sIfOoyzb7ERLPzMOG7WI3VkRK9vScd1t5tUEmqpgSkxwYwTpg2JHslE4m7Qsy+s1+73BeoTbJtk0LGNYrK0ZQQ8K1Dc+sW9J6Q/4OwNn2fF4wCnjo8oDqIXKh5vNWCYqWJAq4sl1DsAh81eZPV8s3soSsRj9txi10wn/TKgvMELgNDj+1c9iXEIW1fAVfBdhyn1aecUKT8sWLVkaKUoSoRXzbLoxmp8zr6lk1BGfGtQBPillHdWY6rwRepiKvIGZNSk3KaNjFm7qQXGHDlFbWumerUmVmoMhCoifinjRS1BDyVj6tVqY6ymANRYjWkrhlZqKUKEUXuu7Jrp3GvEV+JdvAiyXUUi+iDgcc6uxHRWQQ1hKxu5jtqaoeTdEoGgiQWX/SYZNzBwoOXrrm+DB5f175X94dqo5MnkzLBIx47xK2n8DRpx5Kn2VVO6mcoBrSYq+S2Y69IFsbJlG/Q24hu25zp6ZjoQLutbPiNVzA/g1HZh0jWUjI8wTYzPDL4CUPV2YkpjqP/Hu1vrkc4MWeucZlUWyExc1lDWkJkBs/MdN0O/AYjHgehJ+H0uAAAAAElFTkSuQmCC')
            left center no-repeat;
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
