import { defineStore } from "pinia";
import { goodList } from "@/api/GoodsApi";
import { ref } from "vue";
export const useGoodsList = defineStore("goodsList", () => {
  const GoodsList = ref([]);
  const goodsPage = ref({});
  const getGoodsList = async (goodsList) => {
    try {
      const res = await goodList(goodsList);
      GoodsList.value = res.data.data.goods;
      goodsPage.value = res.data.data;
    } catch (error) {
      console.log("获取商品列表失败");
    }
  };
  return { getGoodsList, GoodsList, goodsPage };
});
