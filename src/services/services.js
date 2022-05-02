import axiosInstance from "../../src/services/axios-instance";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";
import axios from "axios";
export async function getFabric() {
  try {
    const api = `v1/services/fabric-details?page=1&perPage=2&type=1`;
    const response = await axiosInstance.get(api);
    return response;
  } catch (error) {
    throw error;
  }
}

const addQuote = (data) =>
  axiosInstance.post(
    `https://heat-pump-backend.herokuapp.com/api/v1/services/quote?page=1&perPage=2&type=1`,
    data
  );
export const useAddQuote = (options) =>
  useMutation((data) => addQuote(data), options);

// export async function getAllQuotes() {
//   try {
//     const api = `https://heat-pump-backend.herokuapp.com/api/v1/services/all-quote`;
//     const response = await axiosInstance.get(api);
//     console.log("getaaa", response);

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
const getAllQuotes = () =>
  axiosInstance
    .get(`https://heat-pump-backend.herokuapp.com/api/v1/services/all-quote`)
    .then(({ data }) => data);

export const useGetAllQuotes = (classId, options) =>
  useQuery(["classes", classId], () => getAllQuotes(), {
    enabled: true,
    ...options,
  });
