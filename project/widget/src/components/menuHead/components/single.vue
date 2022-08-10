<template>
  <div @click.stop class="menu-single" :class="[{ 'menu-has-scroll': hasScroll }, this.type]">
    <div class="menu-scroll" v-scroll-fix>
      <ul>
        <li v-for="(obj, idx) in list" :key="idx">
          <dl>
            <dt v-if="obj.name">
              <span v-if="obj.name">{{ obj.name }}</span>
            </dt>

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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import scrollFix from '../director/scrollFix';

export default {
  props: {
    clist: Array,
    idx: Number,
    type: String,
  },
  data() {
    return {
      list: $.extend(true, [], this.clist),
      hasScroll: true,
    };
  },
  directives: {
    scrollFix,
  },
  methods: {
    cancel() {
      this.$parent.cancel();
    },
    selectedItem(o, obj) {
      if (o.disabled) return;

      o.selected = !o.selected;

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

      this.$emit('menuSubmit', { idx: this.idx, list: this.list, selectList });
      if (obj.cancelable !== false || (obj.cancelable === false && o.selected === false)) {
        this.$emit('onChange', o, obj);
      }
    },
    checkHasScroll() {
      this.$nextTick(() => {
        this.hasScroll =
          document.querySelector('.menu-dialog').offsetHeight < document.querySelector('.menu-scroll ul').offsetHeight;
      });
    },
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
              border-width: 0.01rem !important;
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

  &.equalSingle {
    .menu-scroll {
      padding-right: 0;
    }

    dl {
      margin: 0 0 0.22rem;

      dd {
        /*width: 2.1rem;*/
        /*margin-right: .28rem;*/
        // width: 29.25%;
        box-sizing: border-box;
        width: 29.3333%;
        height: 0.64rem;
        line-height: 0.64rem;
        margin-right: 3.9%;
        padding-left: 0.02rem;
        padding-right: 0.02rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
  }

  &.unEqualSingle {
    font-size: 0.24rem;
  }

  &.lineSingle {
    .menu-scroll {
      ul {
        padding-top: 0;

        li {
          dl {
            margin-bottom: 0.46rem;

            dd {
              width: 100%;
              display: block;
              border: none;
              text-align: left;
              border-bottom: 0.015rem solid #eee;
              margin: 0;
              line-height: 0.68rem;
              height: auto;

              &.menu-selected {
                border-color: #ff7a15;
              }
            }
          }
        }
      }
    }
  }

  .menu-scroll {
    padding: 0 0.32rem;
    flex: auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    // min-height: 2.24rem;

    ul {
      padding: 0.32rem 0 0;

      li {
        overflow: hidden;

        &:last-of-type {
          dl {
            margin-bottom: 0.4rem;
          }
        }
      }
    }
  }

  dl {
    margin: 0;

    dt {
      overflow: hidden;
      font-size: 0.24rem;
      margin: 0 0 0.22rem;
      color: #3c3c3c;

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
      width: 30.7%;
      height: 33px;
      margin: 0 3.9% 0.16rem 0;
      line-height: 33px;
      padding: 0 0.02rem;

      display: inline-block;
      box-sizing: border-box;
      border: 0.015rem solid #dfdfdf;
      text-align: center;
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

      &:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
