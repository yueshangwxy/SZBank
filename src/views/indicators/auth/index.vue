<template>
  <el-row :gutter="20" style="height:100%">
    <div class="content" style="height:650px !important">
      <el-col :span="10">
        <el-tabs v-model="authActiveName" @tab-click="authHandleClick">

          <el-tab-pane label="角色" name="role">
            <el-row>
              <el-col>
                <el-input
                    v-model="roleTab.query.blurry"
                    clearable
                    placeholder="输入名称或描述搜索"
                    style="width: 200px;"
                    class="filter-item"
                    @keyup.enter.native="toQueryRole"
                />
                <el-button class="filter-item" type="success" icon="el-icon-search" @click="toQueryRole">搜索
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-table
                    v-loading="roleTab.loading"
                    :data="roleTab.data"
                    row-key="id"
                    border
                    height="450"
                    highlight-current-row
                    style="width: 100%;margin-top: 10px;"
                    @current-change="onSelectRole"
                >
                  <el-table-column :show-overflow-tooltip="true" prop="name" label="角色名称" width="150px"/>
                  <el-table-column prop="level" label="角色级别" width="100px">
                    <template slot-scope="scope">
                      {{ scope.row.level }}级
                    </template>
                  </el-table-column>
                  <el-table-column :show-overflow-tooltip="true" prop="remark" label="描述"/>
                </el-table>
                <el-pagination
                    background
                    :total="roleTab.total"
                    :current-page="roleTab.page + 1"
                    style="margin-top: 8px;"
                    layout="total, prev, pager, next, sizes"
                    @size-change="roleSizeChange"
                    @current-change="rolePageChange"
                />
              </el-col>
            </el-row>

          </el-tab-pane>
          <el-tab-pane v-if="false" label="用户权限管理" name="user">
            <el-input
                v-model="userTab.query.blurry"
                clearable
                placeholder="输入名称或邮箱搜索"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="toQueryUser"
            />
            <el-button class="filter-item" type="success" icon="el-icon-search" @click="toQueryUser">搜索
            </el-button>
            <el-table
                v-loading="userTab.loading"
                :data="userTab.data"
                row-key="id"
                border
                height="398"
                highlight-current-row
                style="width: 100%;margin-top: 10px;"
                @current-change="onSelectUser"
            >

              <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名" width="100px"/>
              <el-table-column :show-overflow-tooltip="true" prop="nickName" label="姓名" width="120px"/>
              <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" width="150px"/>
              <el-table-column :show-overflow-tooltip="true" label="部门">
                <template slot-scope="scope">
                  <div>{{ scope.row.dept.name }}</div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                background
                :total="userTab.total"
                :current-page="userTab.page + 1"
                style="margin-top: 8px;"
                layout="total, prev, pager, next, sizes"
                @size-change="userSizeChange"
                @current-change="userPageChange"
            />
          </el-tab-pane>
          <el-tab-pane v-if="false" label="机构权限管理" name="dept">
            <el-input
                v-model="deptTab.query.name"
                clearable
                placeholder="输入机构名称搜索"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="toQueryDept"
            />
            <el-input
                v-model="deptTab.query.id"
                clearable
                placeholder="输入机构编号搜索"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="toQueryDept"
            />
            <el-button class="filter-item" type="success" icon="el-icon-search" @click="toQueryDept">搜索
            </el-button>

            <el-table
                v-loading="deptTab.loading"
                :data="deptTab.data"
                :expand-row-keys="['1']"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                border
                height="430"
                highlight-current-row
                style="width: 100%;margin-top: 10px;"
                @current-change="onSelectDept"
            >
              <el-table-column prop="name" label="机构名称"/>
              <el-table-column prop="id" label="机构编号" width="200px"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="14">
        <el-tabs v-model="menuActiveName">
          <el-tab-pane label="功能权限" name="admin">
            <el-row>
              <el-col>
                <el-button
                    class="filter-item"
                    :loading="adminTab.menuLoading"
                    type="primary"
                    icon="el-icon-check"
                    @click="doSaveAdminMenus"
                >保存
                </el-button>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col>
                <!--                <div class="line">-->
                <!--                  <el-scrollbar class="el-tree treeScroll">-->
                <div style="height: 450px;overflow: scroll;background-color: white;">
                  <el-tree
                      ref="adminMenuTree"
                      v-loading="adminTab.loading"
                      :data="adminTab.data"
                      :check-strictly="adminTab.strictly"
                      :default-checked-keys="adminTab.operators"
                      :props="menuTreeDefaultProps"
                      accordion
                      show-checkbox
                      style="width: 100%;height: max-content;border: none"
                      node-key="id"
                  >
                      <span slot-scope="{ node, data }" class="custom-tree-node">
                        <span>{{ node.label }}</span>
                        <!--<span v-show="data.type==1" style="align:right">
                          <el-radio-group v-model="data.dataAuthType">
                            <el-radio v-for="item in dict['DATA_AUTH_TYPE']" v-if="isNaN(item.value) || currentRoleLevel>item.value" :label="item.value" style="width:60px;overflow: auto;">{{ item.label }}</el-radio>
                          </el-radio-group>
                        </span>-->
                      </span>
                  </el-tree>

                </div>
                <!--                  </el-scrollbar>-->
                <!--                </div>-->

              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="指标数据权限" name="index">
            <el-row>
              <el-col>
                <el-button
                    class="filter-item"
                    :loading="indexTab.menuLoading"
                    type="primary"
                    icon="el-icon-check"
                    @click="doSaveAdminIndexs"
                >保存
                </el-button>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col>
<!--                <div class="line">-->
                  <el-row>
                    <el-col :span="12">
                      <!--                      <el-scrollbar class="el-tree treeScroll">-->
                      <div style="overflow: scroll;background-color: white;height: 450px">
                        <el-tree
                            ref="adminIndexTree"
                            v-loading="adminTab.loading"
                            :data="indexTab.data"
                            :check-strictly="true"
                            :default-checked-keys="indexTab.operators"
                            :default-expand-all="true"
                            :props="menuTreeDefaultProps"
                            @check="choiceIndChildrenNode"
                            show-checkbox
                            style="width: max-content;height: max-content;border: none"
                            node-key="id"
                        >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <!-- <span v-show="data.type==1" style="align:right">
                     <el-radio-group v-model="data.dataAuthType">
                       <el-radio v-for="item in dict['DATA_AUTH_TYPE']" v-if="isNaN(item.value) || currentRoleLevel>item.value" :label="item.value" style="width:60px;overflow: auto;">{{ item.label }}</el-radio>
                     </el-radio-group>
                   </span>-->
                </span>
                        </el-tree>
                      </div>
                      <!--                      </el-scrollbar>-->
                    </el-col>

                    <el-col :span="12">
<!--                      <el-scrollbar class="el-tree treeScroll">-->
                      <div style="overflow: scroll;height: 450px;background-color: white;">
                        <el-tree
                            ref="adminIndexOrgTree"
                            v-loading="indexOrgTab.loading"
                            :data="indexOrgTab.data"
                            :check-strictly="true"
                            :default-checked-keys="indexOrgTab.operators"
                            :default-expand-all="true"
                            :props="menuTreeDefaultProps"
                            @check="choiceChildrenNode"
                            show-checkbox
                            style="width: max-content;height: max-content;border: none"
                            node-key="id"
                        >
                    <span slot-scope="{ node, data }" class="custom-tree-node">
                      <span>{{ node.label }}</span>
                    </span>
                        </el-tree>
<!--                      </el-scrollbar>-->
                      </div>
                    </el-col>
                  </el-row>
<!--                </div>-->
              </el-col>
            </el-row>


          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
  </el-row>
</template>

<script>
  import request from '@/utils/request'
  import qs from 'qs'

  export default {
    name: 'Auth',
    dicts: ['DATA_AUTH_TYPE'],
    data() {
      return {
        authActiveName: 'role',
        menuActiveName: 'admin',

        currentType: 'role',
        currentId: '',
        currentRoleLevel: null,
        menuTreeDefaultProps: {
          children: 'children',
          label: 'name'
        },
        deptTab: {
          query: {
            name: '',
            id: ''
          },
          data: [],
          loading: false
        },
        roleTab: {
          query: {
            blurry: ''
          },
          data: [],
          loading: true,
          total: 0, page: 0, size: 10
        },
        userTab: {
          query: {
            blurry: ''
          },
          data: [],
          loading: true,
          total: 0, page: 0, size: 10
        },
        adminTab: {
          menuLoading: false,
          data: [],
          loading: false,
          operators: [],
          strictly: true
        },
        indexTab: {
          menuLoading: false,
          data: [],
          loading: false,
          operators: [],
          strictly: true
        },
        indexOrgTab: {
          menuLoading: false,
          data: [],
          loading: false,
          operators: [],
          strictly: true
        }
      }
    },
    mounted() {
      this.toQueryRole()
      // this.getAdminmenus()
    },
    methods: {
      authHandleClick(tab, event) {
        if (tab.name === 'dept') {
          this.currentType = 'dept'
          this.$refs.adminMenuTree.setCheckedKeys([])
          this.toQueryDept()
        } else if (tab.name === 'role') {
          this.currentType = 'role'
          this.$refs.adminMenuTree.setCheckedKeys([])
          this.toQueryRole()
        } else if (tab.name === 'user') {
          this.currentType = 'user'
          this.$refs.adminMenuTree.setCheckedKeys([])
          this.toQueryUser()
        }
      },

      menuHandleClick(tab, event) {
        // this.getAdminmenus()
      },

      // 机构权限配置
      toQueryDept() {
        var _this = this
        _this.deptTab.loading = true
        // _this.deptTab.data = [];
        request({
          url: '/api/dept' + '?' + qs.stringify(_this.deptTab.query, { indices: false }),
          method: 'get'
        }).then(res => {
          _this.deptTab.data = res.content
          _this.deptTab.loading = false
          //  console.log(_this.deptTab.data)
        })
      },
      onSelectDept(currentRow, oldCurrentRow) {
        // console.log(currentRow,oldCurrentRow)
        if (currentRow) {
          this.adminTab.strictly = true
          this.currentId = currentRow.id
          this.$refs.adminMenuTree.setCheckedKeys([])
          request({
            url: '/auths/menus' + '?' + qs.stringify({ type: 'dept', id: currentRow.id }, { indices: false }),
            method: 'get'
          }).then(res => {
            this.adminTab.data = res
            this.adminTab.loading = false
            this.adminTab.strictly = false
          })
        }
      },

    // 角色权限配置
    toQueryRole() {
      var _this = this
      _this.roleTab.loading = true
      const sort = 'level,asc'
      this.params = {page: this.roleTab.page, size: this.roleTab.size, sort: sort}
      this.params['blurry'] = _this.roleTab.query.blurry
      request({
        url: '/api/roles' + '?' + qs.stringify(_this.params, {indices: false}),
        method: 'get'
      }).then(res => {
        // console.log(res.content)
        _this.roleTab.data = res.content
        _this.roleTab.total = res.totalElements
        _this.roleTab.loading = false
      })
    },
    onSelectRole(currentRow, oldCurrentRow) {
      if (currentRow) {
        this.currentId = currentRow.id
        this.adminTab.strictly = true
        this.indexOrgTab.strictly = true
        // this.adminTab.loading = true
        this.currentRoleLevel = currentRow.level
        this.$refs.adminMenuTree.setCheckedKeys([])
        request({
          url: '/auths/menus/role/' + currentRow.id,
          method: 'get'
        }).then(res => {
          console.log('======get role auths::', res)
          this.adminTab.data = res.auths
          this.adminTab.operators = res.operators
          this.adminTab.strictly = false
          // this.adminTab.loading = false
        })
        request({
          url: '/auths/roleIndexs/' + currentRow.id,
          method: 'get'
        }).then(res => {
          console.log('======get role auths::', res)
          this.indexTab.data = res.ind.auths
          this.indexTab.operators = res.ind.authorizes
          this.indexTab.strictly = false

          this.indexOrgTab.data = res.org.auths
          this.indexOrgTab.operators = res.org.authorizes
          this.indexOrgTab.strictly = false

          // this.adminTab.loading = false
        })
      }
    },
    rolePageChange(e) {
      this.roleTab.page = e - 1
      this.toQueryRole()
    },
    roleSizeChange(e) {
      this.roleTab.page = 0
      this.roleTab.size = e
      this.toQueryRole()
    },

    // 用户权限配置
    toQueryUser() {
      var _this = this
      _this.userTab.loading = true
      const sort = 'id,desc'
      this.params = {page: this.userTab.page, size: this.userTab.size, sort: sort}
      this.params['blurry'] = _this.userTab.query.blurry
      request({
        url: '/api/users' + '?' + qs.stringify(_this.params, {indices: false}),
        method: 'get'
      }).then(res => {
        // console.log(res.content)
        _this.userTab.data = res.content
        _this.userTab.total = res.totalElements
        _this.userTab.loading = false
      })
    },
    onSelectUser(currentRow, oldCurrentRow) {
      // console.log(currentRow,oldCurrentRow)
      if (currentRow) {
        this.adminTab.strictly = true
        this.currentId = currentRow.id
        this.$refs.adminMenuTree.setCheckedKeys([])
        request({
          url: '/auth/menus' + '?' + qs.stringify({type: 'user', id: currentRow.id}, {indices: false}),
          method: 'get'
        }).then(res => {
          this.adminTab.data = res.auths
          this.adminTab.this.adminTab.strictly = false
        })
      }
    },
    userPageChange(e) {
      this.userTab.page = e - 1
      this.toQueryUser()
    },
    userSizeChange(e) {
      this.userTab.page = 0
      this.userTab.size = e
      this.toQueryUser()
    },

    // 加载admin菜单
    /* getAdminmenus() {
      var _this = this
      request({
        url: '/api/menus/tree',
        method: 'get'
      }).then(res => {
        _this.adminTab.data = res
        _this.adminTab.loading = false
      })
    },*/
    doSaveAdminMenus() {
      this.adminTab.menuLoading = true
      // var _this = this
      const menus = []
      /* this.$refs.adminMenuTree.getHalfCheckedNodes().forEach(function(data, index) {
        menus.push({id:data.id,auth:data.dataAuthType})
      })*/
      // 得到已选中的 key 值
      console.log('=====getCheckedKeys========', menus, this.$refs.adminMenuTree.getCheckedNodes(false, true))
      this.$refs.adminMenuTree.getCheckedNodes(false, true).forEach(function (data, index) {
        menus.push({resourceId: data.id, authorizeType: '03', dataAuthType: data.dataAuthType})
      })
      request({
        url: '/auths/menus/' + this.currentType + '/' + this.currentId,
        method: 'post',
        data: menus
      }).then(res => {
        this.adminTab.menuLoading = false
        this.$notify({
          title: '保存成功',
          type: 'success',
          duration: 2500
        })
      })
    },
    doSaveAdminIndexs() {
      this.indexTab.menuLoading = true
      // var _this = this
      const indexs = []
      // 得到已选中的 key 值
      console.log('=====getCheckedKeys========', indexs, this.$refs.adminIndexTree.getCheckedNodes(false, true))
      this.$refs.adminIndexTree.getCheckedNodes(false, true).forEach(function (data, index) {
        indexs.push({objCode: data.id, objType: '1'})
      })

      this.$refs.adminIndexOrgTree.getCheckedNodes(false, true).forEach(function (data, index) {
        indexs.push({objCode: data.id, objType: '2'})
      })

        request({
          url: '/auths/roleIndexs/' + this.currentId,
          method: 'post',
          data: indexs
        }).then(res => {
          this.indexTab.menuLoading = false
          this.$notify({
            title: '保存成功',
            type: 'success',
            duration: 2500
          })
        })
      },
      choiceChildrenNode(data, selected){
        var isChecked = selected.checkedKeys.includes(data.id);
        if (isChecked) {
          if (data.children) {
              var allChildrens = this.getAllChildren(data);
              allChildrens.forEach(item => {
                this.$refs.adminIndexOrgTree.setChecked(item.id,true);
              })
          }
        } else {
          if (data.children) {
            var allChildrens = this.getAllChildren(data);
            allChildrens.forEach(item => {
              this.$refs.adminIndexOrgTree.setChecked(item.id,false);
            })
          }
        }
      },

      choiceIndChildrenNode(data, selected){
        var isChecked = selected.checkedKeys.includes(data.id);
        if (isChecked) {
          if (data.children) {
            var allChildrens = this.getAllChildren(data);
            allChildrens.forEach(item => {
              this.$refs.adminIndexTree.setChecked(item.id,true);
            })
          }
        } else {
          if (data.children) {
            var allChildrens = this.getAllChildren(data);
            allChildrens.forEach(item => {
              this.$refs.adminIndexTree.setChecked(item.id,false);
            })
          }
        }
      },
      getAllChildren(node){
        var res = [];
        var nodes = node.children;
        if (nodes != null) {
          for (var i = 0; i < nodes.length; i++) {
              var childNode = nodes[i];
              res.push(childNode);
              var temp = this.getAllChildren(childNode);
              res = res.concat(temp);
          }
        }
        return res;
      }
    }
  }
</script>

<style scoped>
.content {
  padding: 20px;
}

.line {
  border: 1px solid #dfe6ec;
  overflow: auto;
  height: 430px;
  width: 100%;
  margin-top: 10px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: revert;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 30px;
}
</style>
