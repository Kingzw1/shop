<template>
  <div class="goods">
    <div class="goodsSearch">
      <div class="mt-4">
        <el-input
          v-model="GetGoodsList.query"
          style="max-width: 600px"
          placeholder="请输入要搜索的内容"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="butSearch"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </div>
    </div>
    <div class="goodsList">
      <el-table
        :data="goods.GoodsList"
        stripe
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="goods_name" label="商品名" />
        <el-table-column prop="goods_price" label="价格(￥)" />
        <el-table-column prop="goods_weight" label="商品重量(kg)" />
        <el-table-column prop="goods_number" label="数量" />
        <el-table-column label="商品状态">
          <template #default="prop">
            <p>{{ goods_state(prop) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否是热销品">
          <template #default="prop">
            <p>{{ is_promote(prop) }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="hot_mumber" label="热销品数量" />
      </el-table>
    </div>
    <div class="demo-pagination-block">
      <el-config-provider :locale="locale">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-config-provider>
    </div>
  </div>
</template>

<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { onMounted, ref } from "vue";
import { useGoodsList } from "@/stores/GoodsList";
const locale = ref(zhCn);
const goods = useGoodsList();
const GetGoodsList = ref({
  query: "",
  pagenum: 1,
  pagesize: 5,
});
const goods_state = (prop) => {
  if (prop.row.goods_state === 0) {
    return "未通过";
  } else if (prop.row.goods_state === 1) {
    return "审核中";
  } else {
    return "已审核";
  }
};
const is_promote = (prop) => {
  if (prop.row.is_promote === false) {
    return "不是";
  } else {
    return "是";
  }
};

onMounted(async () => {
  await goods.getGoodsList(GetGoodsList.value);
  total.value = goods.goodsPage.total;
});
// 一共多少条数据
const total = ref();
// 当前页数
const currentPage = ref(1);
// 每页显示多少条
const pageSize = ref(5);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const handleCurrentChange = async (val) => {
  GetGoodsList.value.pagenum = val;
  await goods.getGoodsList(GetGoodsList.value);
};
const handleSizeChange = async (val) => {
  GetGoodsList.value.pagesize = val;
  await goods.getGoodsList(GetGoodsList.value);
};
// 搜索
const butSearch = async () => {
  await goods.getGoodsList(GetGoodsList.value);
  total.value = goods.goodsPage.total;
};
</script>

<style scoped>
.goods {
  box-sizing: border-box;
  padding: 20px;
  max-height: calc(100vh - 74px); /* 根据需要调整高度 */
  overflow-y: auto;
}
.demo-pagination-block {
  padding-top: 10px;
}
</style>