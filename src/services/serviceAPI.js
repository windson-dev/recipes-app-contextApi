const END_POINT = 'www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

const getApiId = async () => {
  const response = await fetch(END_POINT);
  console.log(response);
  const data = await response.json();
  return data.meals;
};

export default getApiId;
