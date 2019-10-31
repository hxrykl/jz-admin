<template>
  <div class="order">
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
    <!--  -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="待派单" name="dp">
          <div v-loading="loading">
            <el-table :data="ordersdp" size="mini" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="编号" />
              <el-table-column prop="customerId" label="顾客" />
              <el-table-column prop="total" label="订单数量" />
              <el-table-column prop="orderTime" label="下单时间" />
              <el-table-column prop="addressId" label="地址" />
              <el-table-column prop="status" label="状态" />
              <el-table-column label="操作">
                <template #default="record">
                  <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
                  <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
                  <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="dj">
        <div v-loading="loading">
            <el-table :data="ordersdj" size="mini" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="编号" />
              <el-table-column prop="customerId" label="顾客" />
              <el-table-column prop="total" label="订单数量" />
              <el-table-column prop="orderTime" label="下单时间" />
              <el-table-column prop="addressId" label="地址" />
              <el-table-column prop="status" label="状态" />
              <el-table-column label="操作">
                <template #default="record">
                  <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
                  <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
                  <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </el-tab-pane>
      <el-tab-pane label="未服务" name="df">
        <div v-loading="loading">
            <el-table :data="ordersdf" size="mini" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="编号" />
              <el-table-column prop="customerId" label="顾客" />
              <el-table-column prop="total" label="订单数量" />
              <el-table-column prop="orderTime" label="下单时间" />
              <el-table-column prop="addressId" label="地址" />
              <el-table-column prop="status" label="状态" />
              <el-table-column label="操作">
                <template #default="record">
                  <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
                  <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
                  <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="wp">
        <div v-loading="loading">
            <el-table :data="orderswp" size="mini" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="id" label="编号" />
              <el-table-column prop="customerId" label="顾客" />
              <el-table-column prop="total" label="订单数量" />
              <el-table-column prop="orderTime" label="下单时间" />
              <el-table-column prop="addressId" label="地址" />
              <el-table-column prop="status" label="状态" />
              <el-table-column label="操作">
                <template #default="record">
                  <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
                  <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
                  <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <!-- <div v-loading="loading">
      <el-table :data="orders" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="customerId" label="顾客" />
        <el-table-column prop="total" label="订单数量" />
        <el-table-column prop="orderTime" label="下单时间" />
        <el-table-column prop="addressId" label="地址" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="record">
            <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)" /> &nbsp;
            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)" /> &nbsp;
            <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form ref="orderForm" :model="order" :rules="rules">
        <el-form-item label="顾客" label-width="100px" prop="customerId">
          <el-input v-model="order.customerId" auto-complete="off" />
        </el-form-item>
        <el-form-item label="数量" label-width="100px" prop="total">
          <el-input v-model="order.total" auto-complete="off" />
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
      activeName:'dp',
      searchInput:'',
      order: {},
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
    ...mapState('order', ['orders','ordersdp','ordersdj','ordersdf','orderswp', 'visible', 'title', 'loading']),
    ...mapGetters('order', ['orderOrder', 'orderSize'])
  },
  created() {
    this.findAllOrders()
  },
  methods: {
    ...mapMutations('order', ['showModal', 'closeModal', 'setTitle']),
    ...mapActions('order', ['findAllOrders', 'saveOrUpdateOrder', 'deleteOrderById', 'batchDeleteOrder']),
    toSearch() {
      alert(1);
    },
    // 普通方法
    toDetailsHandler(order) {
      // 跳转到详情页面
      // this.$router.push("/orderDetails")
      this.$router.push({
        path: '/order/details',
        query: { id: order.id }
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    toAddHandler() {
      // 1. 重置表单
      this.order = {}
      this.setTitle('添加订单信息')
      // 2. 显示模态框
      this.showModal()
    },
    submitHandler() {
      // 校验
      this.$refs.orderForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateOrder(this.order)
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
      this.$refs.orderForm.resetFields()
    },
    editHandler(row) {
      this.order = row
      this.setTitle('修改订单信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteOrderById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    batchDeleteHandler() {
      this.batchDeleteOrder(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    }

  }

}
</script>
<style scoped>

</style>
