import clientApi from "./axios";

const projectApi = {
  // api 테스트 용
  apiTestGet: async () => {
    return await clientApi.get("/profile");
  },
  apiTestPost: async () => {
    return await clientApi.post("/profile");
  },
};

export default projectApi;
