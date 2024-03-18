import {ErrorResponse} from '../types/MessageTypes';

const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  console.log('fetchData', url, options);
  const response = await fetch(url, options);
  console.log('response', response)
  const json = await response.json();
  if (!response.ok) {
    const errorJson = json as unknown as ErrorResponse;
    console.log('errorJson', errorJson);
    if (errorJson.message) {
      throw new Error(errorJson.message);
    }
    throw new Error(`Error ${response.status} occured`);
  }
  return json;
};

export {fetchData};
