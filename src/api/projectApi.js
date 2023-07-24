import clientApi from "./axios";

const deviceId = 1;

const testData1 = {
  deviceId: deviceId,
  apple: 3,
  radish: 2,
};

const testData2 = {
  apple: true,
  banana: true,
};

const projectApi = {
  // api 테스트 용
  apiTestGet: async () => {
    return await clientApi.get(`/profile`);
  },
  apiTestPost: async () => {
    return await clientApi.post(`/profile`, {});
  },
  //재료저장
  saveIngredient: async () => {
    return await clientApi.post(`/ingredients`, { testData1 });
  },
  //저장된 재료 목록 들고오기
  getIngredientList: async () => {
    return await clientApi.get(`/ingredients/list/${deviceId}`, {});
  },
  //레시피 가져오기
  getRecipe: async () => {
    return await clientApi.post("/recipe/list", { testData2 });
  },
  // 전체 재료 가져오기
  getIngredients: async () => {
    return await clientApi.get(`/ingredients/list/`);
  },
};

export default projectApi;
