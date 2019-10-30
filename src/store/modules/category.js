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
  // 突变，修改state唯一方式
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
  // 动作，封装异步代码，进而提交突变
  actions:{
    //
    async batchDeleteCategory(context,ids){
      // 1. 批量删除
      let response = await request.post("/category/batchDelete",{ids})
      // 2. 分发
      context.dispatch("findAllCategorys");
      // 3. 返回结果
      return response;
    },
    // 
    async deleteCategoryById(context,id){
      let response = await request.get("/category/deleteById?id="+id);
      context.dispatch("findAllCategorys");
      return response;
    },
    // 刷新页面数据的方法
    async findAllCategorys(context){
      // 1. ajax查询
      let response = await request.get("/category/findAll");
      // 2. 将查询结果更新到state中
      context.commit("refreshCategories",response.data);
    },
    // 提交栏目信息的方法,第一个参数是context,用于访问方法，第二个才是我们传的参数
    async saveOrUpdateCategory({commit,dispatch},payload){
      // 1. 保存或更新，拿到一个承诺
      let response = await request.post("/category/saveOrUpdate",payload)
      console.log("payload",payload);
      // 2. 刷新页面，访问action的方法
      dispatch("findAllCategorys");
      // 3. 关闭模态框，访问mutations方法
      commit("closeModal");
      // 4. 提示，返回承诺
      return response;
    }
  }
}