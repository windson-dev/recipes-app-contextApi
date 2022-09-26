async function fetchApi(input, search) {
  const url = search === 'i'
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
    : `https://www.themealdb.com/api/json/v1/1/search.php?${search}=${input}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export default fetchApi;
