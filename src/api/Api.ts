import axios, { AxiosInstance } from 'axios';

const baseFootballApi = 'https://jsonmock.hackerrank.com/api/football_competitions/';
const dummyApi = 'https://dummyjson.com/carts';

const footBallApi: AxiosInstance = axios.create({
  baseURL: baseFootballApi,
});

const dummyAxiosApi: AxiosInstance = axios.create({
  baseURL: dummyApi,
});

const dummyFetchApi = async (): Promise<any> => {
  try {
    const response = await dummyAxiosApi.get('');
    const data = response.data;
    console.log(data); 
    return data;
  } catch (error) {
    console.error('Dummy API hata:', (error as Error).message);
  }
};

export const footBallFetchData = async (): Promise<void> => {
  try {
    const response = await footBallApi.get('');
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Football API hata:', (error as Error).message);
  }
};

export const dummyJsonApi = async (): Promise<void> => {
  try {
    const data = await dummyFetchApi();
    if (data) {
      console.log(data);
    }
  } catch (error) {
    console.error('Hata:', error);
  }
};

footBallFetchData();
dummyJsonApi();