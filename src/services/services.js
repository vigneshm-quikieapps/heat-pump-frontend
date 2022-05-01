import axiosInstance from "../../src/services/axios-instance";
import { useMutation } from "react-query";
import { queryClient } from "../App";
// export async function getFabric() {
//   try {
//     const api = `v1/services/fabric-details?page=1&perPage=2&type=1`;
//     const response = await axiosInstance.get(api);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

const addQuote = (data) =>
  axiosInstance.post(
    `https://heat-pump-backend.herokuapp.com/api/v1/services/quote`,
    data
  );
export const useAddQuote = (options) =>
  useMutation((data) => addQuote(data), options);

// const getFabricDetails = (data) =>
//   axiosInstance.get(
//     `https://heat-pump-backend.herokuapp.com/api/v1/services/quote`,
//     data
//   );
// export const useGetFabricDetails = (options) =>
//   useMutation((data) => getFabricDetails(data), options);

export async function getFabricDetails(type) {
  try {
    const api = `https://heat-pump-backend.herokuapp.com/api/v1/services/fabric-details?page=1&perPage=2&type=${type}`;
    const response = await axiosInstance.get(api);
    return response.data;
  } catch (error) {
    throw error;
  }
}
