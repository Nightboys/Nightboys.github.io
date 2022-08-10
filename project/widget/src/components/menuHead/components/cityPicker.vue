<template>
  <form class="menu-columns-third" id="city-picker-view" @click.stop @submit.prevent="onSubmit">
    <div class="menu-content">
      <div class="menu-main" v-scroll-fix>
        <ul>
          <li
            :class="[
              o.extraClass,
              {
                'menu-active': i === index,
                'menu-has-selected': o.hasSelected,
                'menu-lines': o.line > 1,
              },
            ]"
            @click="index = i"
            v-for="(o, i) in areaList"
            :key="i"
          >
            {{ o.name }}
          </li>
        </ul>
      </div>

      <div class="menu-second" v-scroll-fix>
        <ul class="second-ul">
          <li :class="{ 'menu-selected-item': areaList[index].selectAll }">
            <div>
              <label :class="{ 'justify-right': cityType == 'v3' }">
                <input
                  class="needsclick"
                  type="checkbox"
                  v-model="areaList[index].selectAll"
                  @change="clickAll(areaList[index])"
                />
                {{ areaList[index].selectAllName }}
              </label>
            </div>
          </li>
          <li
            v-for="(item, idx) in areaList[index].list"
            :key="idx"
            :class="[item.extraClass, { 'menu-selected-item': item.selected, 'menu-lines': item.line > 1 }]"
          >
            <div :class="{ 'justify-text': cityType == 'v3' }">
              <a
                v-if="item.list && item.list.length && cityType == 'v3'"
                @click="item.expand = !item.expand"
                class="menu-arrow"
                :class="{ 'menu-open': item.expand, 'justify-left': cityType == 'v3' }"
              >
                <span></span>
              </a>
              <label
                :class="{
                  'justify-right': cityType == 'v3',
                  'spc-left': cityType == 'v3' && !item.list,
                }"
              >
                <input
                  class="needsclick"
                  type="checkbox"
                  v-model="item.selected"
                  @change="checkList(areaList[index], item)"
                />
                {{ item.name }}

                <span
                  class="badge"
                  v-if="item.list && item.list.length && cityType == 'v3'"
                  :id="item.name + idx + index"
                >
                  市本级
                </span>
              </label>
              <a
                v-if="item.list && item.list.length && cityType != 'v3'"
                @click="item.expand = !item.expand"
                class="menu-arrow"
                :class="{ 'menu-open': item.expand }"
              >
                <span></span>
              </a>
            </div>

            <ul class="third-ul" v-if="item.expand">
              <li :class="{ 'menu-selected-item': item.selectAll }" v-if="cityType != 'v1'">
                <label>
                  <input class="needsclick" type="checkbox" v-model="item.selectAll" @change="clickAll(item)" />
                  {{ item.selectAllName }}
                </label>
              </li>

              <li
                v-for="(node, k) in item.list"
                :key="k"
                :class="[node.extraClass, { 'menu-selected-item': node.selected, 'menu-lines': node.line > 1 }]"
              >
                <label>
                  <input
                    class="needsclick"
                    type="checkbox"
                    v-model="node.selected"
                    @change="checkList(areaList[index], node, item)"
                  />
                  {{ node.name }}
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="menu-btns">
      <span class="btn" @click="onReset">重置</span>
      <span class="btn btn-ok" @click="onSubmit">
        确认
      </span>
    </div>
  </form>
</template>

<script>
import scrollFix from '../director/scrollFix';

export default {
  props: {
    clist: Array,
    idx: Number,
    defaultCheckCitys: [], //默认选中城市
    /*
     *	https://app.mockplus.cn/app/PHIsG8_Yb-/develop/design/1_XHgHUMpdXm
     *	@v1：一、筛选-多层级多选（勾选选中下面层级,无'全部'选项）
     *	@v2：二、筛选-多层级多选（勾选只选中本身）
     *	@v3：三、筛选-多层级多选（勾选只选中本身，省本级概念）
     */
    cityType: {
      type: String,
      default: 'v1',
    },
  },
  directives: {
    scrollFix,
  },
  data() {
    return {
      areaList: [],
      index: 0,
    };
  },
  watch: {
    clist: {
      deep: true,
      immediate: true,
      handler(val) {
        let value = $.extend(true, [], val),
          list = this.handleAreaList(value);
        this.areaList = $.extend(true, [], list);
        this.initList = $.extend(true, [], this.initAreaList(val));
      },
    },
  },
  mounted() {},
  methods: {
    /**
     * 切换节点选中状态
     * @root: 根节点
     * @parent: 父节点
     * @node: 子节点
     */
    checkList(root, node, parent) {
      if (this.cityType == 'v1') {
        this.$nextTick(() => {
          this.changeNodeStatus(root, node, parent);
        });
      } else {
        this.$nextTick(() => {
          this.calcCheckAll(root);
        });
      }

      this.$nextTick(() => {
        this.calcCountryList(node);
      });
    },

    // 切换当前节点状态
    changeNodeStatus(root, node, parent) {
      if (node) {
        this.$nextTick(() => {
          node.selectAll = node.selected;
          node.list &&
            node.list.forEach(d => {
              d.selected = node.selected;
            });
        });
      }
      if (parent && parent.list) {
        let sltList = parent.list.filter(d => d.selected);
        parent.selected = sltList.length == parent.list.length;
        parent.selectAll = parent.selected;
      }
      this.$nextTick(() => {
        this.calcCheckAll(root);
      });
    },

    // 点击全选
    clickAll(obj) {
      this.$nextTick(() => {
        obj.list &&
          obj.list.forEach(o => {
            o.selected = obj.selectAll;
            if (o.list) {
              o.list.forEach(val => {
                val.selected = obj.selectAll;
              });
            }
          });

        this.calcCheckAll(this.areaList[this.index]);

        this.$nextTick(() => {
          this.calcCountryList(obj);
        });
      });
    },

    // 处理父子节点全选半选状态
    calcCheckAll(o) {
      let selectAll = true,
        hasSelected = false;

      o.list &&
        o.list.forEach(obj => {
          if (!obj.selected) {
            selectAll = false;
          } else {
            hasSelected = true;
          }

          if (obj.list) {
            let sSelectAll = true;

            obj.list.forEach(v => {
              if (!v.selected) {
                sSelectAll = false;
                selectAll = false;
              } else {
                hasSelected = true;
              }
            });

            obj.selectAll = sSelectAll;
          }
        });

      o.hasSelected = hasSelected;
      o.selectAll = selectAll;
    },

    // 全国-省市区联动
    calcCountryList(node) {
      // console.log('node====', node);

      // if (this.cityType != 'v1') return;  //禁止（全国-省市区联动）

      if (this.areaList[0].name == '全国') {
        //全国存在的情况下
        let ourCountry = this.areaList[0]; //全国下面数据
        if (this.index) {
          // 直接选中省份中市区
          ourCountry.list.forEach((province, idx) => {
            if (province.value == this.areaList[this.index].value) {
              this.$nextTick(() => {
                province.selected = this.areaList[this.index].selectAll;
                province.selectAll = this.areaList[this.index].selectAll;
              });
            }
          });

          this.$nextTick(() => {
            ourCountry.hasSelected = ourCountry.list.filter(d => d.selected).length > 0;
            ourCountry.selectAll = ourCountry.list.filter(d => d.selected).length == ourCountry.list.length;
          });
        } else {
          if (node.name == '全国') {
            // 选中全国中的'全部'
            if (node.selectAll) {
              this.areaList.forEach((province, idx) => {
                if (province.name != '全国') {
                  province.hasSelected = true;
                  province.selectAll = true;
                  province.selected = true;
                  this.handleSelectAll(province);
                }
              });
            } else {
              this.onReset();
            }
          } else {
            // 选中全国中的省份
            this.areaList.forEach((province, idx) => {
              if (province.value == node.value) {
                province.selected = node.selected;
                province.selectAll = node.selected;
                province.hasSelected = node.selected;

                province.list &&
                  province.list.forEach(o => {
                    o.selected = province.selectAll;
                    o.selectAll = province.selectAll;
                    if (o.list) {
                      o.list.forEach(val => {
                        val.selected = province.selectAll;
                      });
                    }
                  });
              }
            });
          }
        }
      }
    },
    // 执行‘全国’全部操作
    handleSelectAll(obj) {
      obj.list &&
        obj.list.forEach(o => {
          o.selected = obj.selectAll;
          o.selectAll = obj.selectAll;
          if (o.list) {
            this.handleSelectAll(o);
          }
        });
    },

    // 初始化数据
    handleAreaList(list, parent) {
      if (!list) return;
      list.forEach(item => {
        item.selected = item.selected ? item.selected : false;
        item.expand = item.expand ? item.expand : false;
        item.hasSelected = item.hasSelected ? item.hasSelected : false;
        item.selectAll = item.selectAll ? item.selectAll : false;
        item.selectAllName = item.selectAllName ? item.selectAllName : '全部';

        if (this.defaultCheckCitys && this.defaultCheckCitys.includes(item.value)) {
          //默认选中项处理
          item.selected = true;
          if (item.key == 'ProvinceCode') {
            item.selectAll = true;
            item.hasSelected = true;
            item.list &&
              item.list.forEach(o => {
                o.selected = true;
                o.selectAll = true;
                if (o.list) {
                  o.list.forEach(val => {
                    val.selected = true;
                  });
                }
              });
          }
          if (parent) {
            parent.hasSelected = true;
            if (parent.list) {
              let childSlt = parent.list.filter(d => d.selected);
              parent.selectAll = parent.list.length == childSlt.length;
            }
          }
        }

        if (item.list) {
          this.handleAreaList(item.list, item);
        }
      });
      return list;
    },

    // 清空整个地区已选数据
    initAreaList(list, parent) {
      if (!list) return;
      list.forEach(item => {
        item.selected = false;
        item.expand = false;
        item.hasSelected = false;
        item.selectAll = false;
        item.selectAllName = item.selectAllName ? item.selectAllName : '全部';

        if (item.list) {
          this.initAreaList(item.list, item);
        }
      });
      return list;
    },

    // 确定选中
    onSubmit() {
      let selectList = [];
      // console.log("areaList", this.areaList);
      this.areaList.forEach(d => {
        if (this.cityType != 'v1') {
          // if (d.selectAll && d.value) {
          //   selectList.push(d);
          // }

          d.list &&
            d.list.forEach(o => {
              o.list &&
                o.list.forEach(obj => {
                  obj.selected && selectList.push(obj);
                });

              o.selected && selectList.push(o);
            });
        } else {
          if (d.selectAll && d.value) {
            selectList.push(d);
          } else {
            d.list &&
              d.list.forEach(o => {
                if (o.list && o.selectAll && o.value) {
                  selectList.push(o);
                } else {
                  o.list &&
                    o.list.forEach(obj => {
                      if (obj.selectAll && obj.value) {
                        selectList.push(obj);
                      } else {
                        obj.selected && selectList.push(obj);
                      }
                    });
                }

                o.selected && selectList.push(o);
              });
          }
        }
      });
      this.$nextTick(() => {
        let ary = [];

        this.$emit(
          'menuSubmit',
          {
            idx: this.idx,
            list: this.areaList,
            selectList: selectList.filter(d => {
              return !ary.includes(d.value) && ary.push(d.value); //数组过滤并去重
            }),
          },
          'cityPicker'
        );
      });
    },

    // 重置数据
    onReset() {
      this.areaList = $.extend(true, [], this.initList);
    },
  },
};
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
#city-picker-view {
  &.menu-columns-third {
    background: #fff;
    flex: 1;
    min-height: 65vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    font-size: 0.24rem;
    color: #333;
    border-top: 1px solid #dfdfdf;

    .menu-content {
      flex: auto;
      display: flex;
      height: 1px;

      .menu-main {
        flex: none;
        width: 2.66rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        ul {
          li {
            line-height: 0.7rem;
            padding: 0 0.1rem 0 0.28rem;
            border-bottom: 0.01rem solid #dfdfdf;
            height: 0.7rem;

            &.menu-lines {
              line-height: 0.35rem;
            }

            &.menu-active {
              background: #f6f6f6;
            }

            &.menu-has-selected {
              color: #1482f0;
            }
          }
        }
      }

      .menu-second {
        flex: auto;
        background: #f6f6f6;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        @keyframes max-height {
          0% {
            max-height: 0;
          }
          100% {
            max-height: 8rem;
          }
        }

        .third-enter-active {
          animation: max-height 0.2s;
          overflow: hidden;
        }

        .third-leave-active {
          animation: max-height 0.2s reverse;
          overflow: hidden;
        }

        .second-ul {
          li {
            border-bottom: 0.01rem solid #dfdfdf;
            min-height: 0.7rem;

            > div {
              display: flex;
              padding: 0rem 0.24rem 0rem 0rem;
              position: relative;
              > label {
                .badge {
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
              > a {
                display: block;
                position: relative;
                flex: none;
                width: 0.36rem;
                span {
                  display: block;
                  position: absolute;
                  width: 0.8rem;
                  height: 100%;
                  top: 0;
                  left: 0;
                  z-index: 10;
                }

                &:after {
                  content: '';
                  position: absolute;
                  top: 40%;
                  // left: 42%;
                  right: 0;
                  width: 0.24rem;
                  height: 0.24rem;
                  transform: rotate(0deg);
                  transform-origin: center center;
                  // border-left: 1px solid #1482f0;
                  // border-bottom: 1px solid #1482f0;
                  transition: all 0.3s;
                  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKtJREFUSEtjZKAxYKSx+QyjFhAM4WEYRDxtn0VB/v5SxfuaoP+RFODShxJEIEXsf//uA+n7yczsRKwl+PRhtYDxP4POf0aGK8RYAjMclx6MSCakATnYiFGLNRURo5EYNSDH4Eym+Awg1nC8FoAksRkEEgclBGLjiWBGQ7cE7CoSEgFBC9B9AuITm8IIBhG2FENqHiHKBzCLyMnlJFlAStEBUztqAcFQG/pBBADN3qcZotEC5QAAAABJRU5ErkJggg==')
                    no-repeat center center;
                  background-size: 100%;
                  border: none;
                }

                &.menu-open {
                  &:after {
                    // top: 45%;
                    transform: rotate(180deg);
                  }
                }
              }
            }

            &.menu-lines {
              label {
                line-height: 0.35rem;
              }
            }

            label {
              display: block;
              line-height: 0.38rem;
              flex: auto;
              overflow: hidden;
              position: relative;
              padding: 0.16rem 0.24rem 0.16rem 0.64rem;

              input {
                width: 0.24rem;
                height: 0.24rem;
                border: none;
                position: absolute;
                top: 50%;
                left: 0.24rem;
                z-index: 2;
                transform: translateY(-50%);
                appearance: none;
                -webkit-appearance: none;
                background: #f6f6f6;
                &:after {
                  display: block;
                  content: '';
                  width: 100%;
                  height: 100%;
                  // 灰色复选框
                  // background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAGRJREFUSEvtlcEJgEAQA5Mi7MQaDrRghd0W7MQiIohfycM7X7vvwJAhsMxMYeDxAZySjp4ckjOA6QZI2ltra09ARGwklwK8Wi1FdnClqBRZAzZQKypF1oAN/LsiAGOfvu37IXABdb/2mRnERcEAAAAASUVORK5CYII=")
                  // 	no-repeat #f6f6f6;

                  // 蓝色复选框
                  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAGVJREFUSEtjrN/15T8DDQEjyIL/DAyvGRkYzlDTnv8MDCaMDAyiYAsYGBi2N7rxeFHTgvpdX7YxMDB4jlqAM1RHg4hgghsNotEgIhgCBBWMpqLRICIYAgQV0DcV0aPSJ+hlchUAAPE+uDk/yLLuAAAAAElFTkSuQmCC')
                    no-repeat #f6f6f6;
                  background-size: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
            }

            .third-ul {
              border-top: 0.015rem solid #dfdfdf;

              li {
                padding: 0 0.24rem 0 0.88rem;

                &:last-of-type {
                  border-bottom: none;
                }

                label {
                  padding-left: 0.1rem;

                  input {
                    left: auto;
                    right: 0;
                  }
                }
              }
            }

            &.menu-selected-item {
              > div,
              > label {
                color: #1482f0;
                input {
                  &:after {
                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYxJREFUSEvtlLtOAkEUhv8za2MEVgwL72ElXgp4ABvfwNpLhyYEIpONoLHy0hqfwNLLE/gEoj6BworuboHGxDlmBzUEZNcCCxOmmpkz83/n/HOhlHQZf9hoBIhyd2RRl0NUJ8GSGQUwpr8CQ7KIrg0l8o2teDMlvQrA5SECqC5eX/PN7UzDkv4CQ50BiIUBXgCMR92OTpzqwjDyzWKsYdn+PKv3c4C+xfWK7odGoBOnlFi2pFdlwkY4hG6EYeQ64k/zzOIMjHjvnh4ATp3y5FKwyJJulYHNnyF0S8rIOVuxh7T05xTUOdAv3leBniA6ckrmioZU3Fp/JV3idntWqbeLQeI/AvQk6NApm6tBPyXdHQCFT8/vYIzlHosT92nbn1VKhYoPBAQBJjpolcw1Dam4uxC0CPEpLttZBZ15IuoyhL4DJj5olZIakqw9mc+bU15a+lkFnXmkeGgFX5kxeL9VTq4H44ztzbwrvvyt+K8A2i6BY1LiClB7AMwoW7rjQ/oqBiNHgMjj+P8WfQBzk8ORpvzSWAAAAABJRU5ErkJggg==')
                      no-repeat #fff;
                    background-size: 100%;
                  }
                }
              }
            }
          }
        }

        .justify-right {
          padding-left: 0.24rem !important;
          .needsclick {
            left: unset;
            right: 0;
          }
        }

        .justify-left {
          width: 0.6rem !important;
          &::after {
            right: unset !important;
            left: 40%;
            top: calc(50% - 0.12rem) !important;
          }
        }

        .justify-text {
          .justify-right {
            padding-left: 0 !important;
            &.spc-left {
              padding-left: 0.24rem !important;
            }
          }
          .badge {
            right: 0.36rem !important;
          }
        }
      }
    }
  }

  .menu-btns {
    width: 100%;
    background: #ffffff;
    display: flex;
    align-items: center;
    .btn {
      display: block;
      flex: 1;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.28rem;
      font-weight: 400;
      border-top: 1px solid #dfdfdf;
      &.btn-ok {
        color: #ffffff;
        background: #1482f0;
        border-color: #1482f0;
      }
    }
  }
}
</style>
