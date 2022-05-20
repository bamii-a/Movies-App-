import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=fa20d9d439c5cf4a32a4e4d5504f83bd';

export const getPopularMovies = async () => {
  const {data} = await axios.get(`${baseURL}/movie/popular?${apiKey}`);
  return data.results;
};

// top rated tv
export const getPopularTv = async () => {
  const {data} = await axios.get(`${baseURL}/tv/top_rated?${apiKey}`);
  return data.results;
};

export const getMovieDetails = async (id: string) => {
  const {data} = await axios.get(`${baseURL}/movie/${id}?${apiKey}`);
  console.log(data);
  return data;
};
