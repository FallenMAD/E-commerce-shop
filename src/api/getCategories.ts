import axios from 'axios';

import { BASE_URL } from '../constants';

export async function getCategories() {
  const response = await axios(`${BASE_URL}/categories`);

  return response.data;
}
