<template>
  <div class="waiter">
     <el-row>
      <!-- 搜索 -->
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchInput"
            size="small"
            style="display: inline-block;width: 20%;"
            clearable>
          </el-input>
          <el-button @click="toSearch" size="small" type="primary">搜索</el-button>
        </div>
      </el-col>
      
    </el-row>
    <!-- 表格 -->
    <div v-loading="loading">
      <el-table :data="waiters" size="mini" height="275" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="realname" label="姓名" />
        <el-table-column prop="telephone" label="电话" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="record">
            <!-- <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp; -->
            <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <!-- <span class="demonstration">大于 7 页时的效果</span> -->
      <el-pagination
        layout="prev, pager, next"
        :current-page="paging.page+1"
        :page-size="paging.pageSize"
        :total="paging.total">
      </el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="waiterForm" :model="waiter" :rules="rules">
        <el-form-item label="姓名" label-width="100px" prop="realname">
          <el-input v-model="waiter.realname" auto-complete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="100px" prop="telephone">
          <el-input v-model="waiter.telephone" auto-complete="off" />
        </el-form-item>
        <el-form-item label="地址" label-width="100px" prop="addressId">
          <el-input v-model="waiter.addressId" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      // 分页
      paging:{
        total:5,
        page:0,
        pageSize:7
      },
      // 搜索输入值
      searchInput:'',
      waiter: {},
      ids: [],
      rules: {
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('waiter', ['waiters', 'visible', 'title', 'loading']),
    ...mapGetters('waiter', ['orderWaiter', 'waiterSize'])
  },
  created() {
    this.findAllWaiters()
  },
  methods: {
    ...mapMutations('waiter', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('waiter', ['findAllWaiters', 'saveOrUpdateWaiter', 'deleteWaiterById', 'batchDeleteWaiter']),
    // 普通方法
    toDetailsHandler(waiter) {
      // 跳转到详情页面
      // this.$router.push("/waiterDetails")
      this.$router.push({
        path: '/waiter/details',
        query: { waiter: waiter }
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    toSearch() {

    },
    toAddHandler() {
      // 1. 重置表单
      this.waiter = {}
      this.setTitle('添加员工信息')
      // 2. 显示模态框
      this.showModal()
    },
    submitHandler() {
      // 校验
      this.$refs.waiterForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateWaiter(this.waiter)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
          })
        } else {
          return false
        }
      })
    },
    dialogCloseHandler() {
      this.$refs.waiterForm.resetFields()
    },
    editHandler(row) {
      this.waiter = row
      this.setTitle('修改员工信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteWaiterById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    batchDeleteHandler() {
      this.batchDeleteWaiter(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    }

  }

}
</script>
<style scoped>
 .el-pagination {
   text-align: center;
 }
 
</style>
