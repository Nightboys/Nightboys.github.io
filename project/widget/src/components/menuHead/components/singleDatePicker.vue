<template>
  <div @click.stop class="menu-single" :class="[{ 'menu-has-scroll': hasScroll }, this.type]">
    <div class="menu-scroll" v-scroll-fix>
      <ul>
        <li v-for="(obj, idx) in list" :key="idx">
          <dl class="btn-group">
            <dd
              v-for="(o, i) in obj.list"
              :key="i"
              class="needsclick"
              :class="[o.extraClass, { 'menu-selected': o.selected, 'menu-disabled': o.disabled }]"
              @click="selectedItem(o, obj)"
            >
              {{ o.name }}
            </dd>
          </dl>

          <dl v-if="obj.needDatePcker">
            <dt v-if="obj.name">
              <span>{{ obj.name }}</span>
            </dt>
            <date-picker type="datePicker" :idx="idx" :extraObj="obj" @updateDate="updateDate"></date-picker>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import scrollFix from '../director/scrollFix';
import datePicker from './datePickerBtn';

export default {
  components: {
    datePicker,
  },
  props: {
    clist: Array,
    idx: Number,
    type: String,
  },
  data() {
    return {
      list: $.extend(true, [], this.clist),
      hasScroll: true,

      showtips: false,
      flag: false,
    };
  },
  directives: {
    scrollFix,
  },
  mounted() {
    this.checkHasScroll();
  },
  watch: {
    clist: {
      deep: true,
      handler() {
        this.list = $.extend(true, [], this.clist);

        this.hasScroll = true;

        this.checkHasScroll();
      },
    },
  },
  methods: {
    cancel() {
      this.$parent.cancel();
    },
    selectedItem(o, obj) {
      if (o.disabled) return;

      // !o.selected && (o.selected = !o.selected);
      o.selected = !o.selected;
      obj.customValue = ['', '']; //重置自定义日期

      if (obj.cancelable === false) {
        const isAllUnCheck = obj.list.every(item => !item.selected);
        if (isAllUnCheck) {
          o.selected = true;
        }
      }

      this.list.forEach(sub => {
        sub.list &&
          sub.list.forEach(node => {
            if (node !== o) node.selected = false;
          });
      });

      let selectList = o.selected ? [Object.assign({}, o, { params: obj.key })] : [];

      this.$emit('menuSubmit', { idx: this.idx, list: this.list, selectList }, 'singleDatePicker');
      if (obj.cancelable !== false || (obj.cancelable === false && o.selected === false)) {
        this.$emit('onChange', o, obj, 'singleDatePicker');
      }
    },
    checkHasScroll() {
      this.$nextTick(() => {
        this.hasScroll =
          document.querySelector('.menu-dialog').offsetHeight < document.querySelector('.menu-scroll ul').offsetHeight;
      });
    },

    showTip(v) {
      this.showtips = v;
      this.$emit('showTips', this.showtips);
    },

    updateDate(val, i) {
      let selectList = [];
      if (this.list[i].list) {
        this.list[i].customValue = val;
        this.list[i].list.map(d => {
          d.selected = false;
        });
      }

      selectList.push({
        customValue: val,
        name: this.list[i].name,
        params: this.list[i].key,
      });

      this.$emit('menuSubmit', { idx: this.idx, list: this.list, selectList }, 'singleDatePicker');
    },
  },
};
</script>

<style lang="less" scoped>
.ios {
  .menu-single {
    .menu-scroll {
      ul {
        li {
          dl {
            dd {
              border-width: 0.015rem !important;
            }
          }
        }
      }
    }
  }
}

.menu-single {
  background: #fff;
  /*flex: auto;*/
  flex: none;
  display: flex;
  flex-direction: column;

  &.menu-has-scroll {
    flex: auto;
    height: 100%;
  }

  .menu-scroll {
    padding: 0 0.32rem;
    flex: auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    ul {
      padding: 0.32rem 0;

      li {
        overflow: hidden;
      }
    }
  }

  dl {
    margin: 0;

    dt {
      overflow: hidden;
      font-size: 0.24rem;
      margin: 0;
      padding-bottom: 0.16rem;
      color: #8c8c8c;

      label {
        float: right;

        input {
          position: relative;
          top: 0.04rem;
          margin: 0 0.12rem 0 0;
        }
      }
    }

    dd {
      display: inline-block;
      padding: 0 0.24rem;
      margin: 0 3% 0.16rem 0;
      box-sizing: border-box;
      border: 0.015rem solid #dfdfdf;
      text-align: center;
      line-height: 0.64rem;
      height: 0.64rem;
      color: #5c5c5c;
      position: relative;
      border-radius: 0.04rem;
      overflow: hidden;

      &.menu-selected {
        border-color: #ff9347;
        color: #ff6b12;
      }

      &.menu-disabled {
        color: #ccc;
        background: #efefef;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }
    }

    &.btn-group {
      dd {
        width: 31%;
      }
    }
  }
}
</style>
