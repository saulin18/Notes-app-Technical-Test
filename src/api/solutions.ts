
import { authAxios } from "./useAxios";


export const createSolutionRequest = async (quiz_id: number, content: string) => {
  const response = await authAxios.post(`/quizes/solutions/${quiz_id}/`, { content });
  return response.data;
};
