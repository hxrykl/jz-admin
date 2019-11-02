import request from '@/utils/request'

export default {
  namespaced:true,
  state:{
    categorys:[],
    visible:false,
    title:"添加栏目信息"
  },
  getters:{
    categorySize(state){
      return state.categorys.length;
    },
    orderCategory:(state)=>{
      return function(flag){
        state.categorys.sort((a,b)=>{
          if(a[flag] > b[flag]){
            return -1;
          } else {
            return 1;
          }
        })
        return state.categorys;
      }
    }
  },
  mutations:{
    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    refreshCategories(state,categorys){
      state.categorys = categorys;
    },
    // 设置模态框标题的方法
    setTitle(state,title){
      state.title = title;
    }
  },
  actions:{
    async batchDeleteCategory(context,ids){
      // 1. 批量删除
      let response = await request.post("/category/batchDelete",{ids})
      // 2. 分发
      context.dispatch("findAllCategorys");
      // 3. 返回结果
      return response;
    },
    async deleteCategoryById(context,id){
      let response = await request.get("/category/deleteById?id="+id);
      context.dispatch("findAllCategorys");
      return response;
    },
    async findAllCategorys(context){
      // 1. ajax查询
      let response = await request.get("/category/findAll");
      // 2. 将查询结果更新到state中
      context.commit("refreshCategories",response.data);
    },
    // payload 栏目信息
    async saveOrUpdateCategory({commit,dispatch},payload){
      // 1. 保存或更新
      let response = await request.post("/category/saveOrUpdate",payload)
      // 2. 刷新页面
      dispatch("findAllCategorys");
      // 3. 关闭模态框
      commit("closeModal");
      // 4. 提示
      return response;
    }
  }
}