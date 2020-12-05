export async function getDiverse(next_page = null) {
  const baseURL =
    next_page || `${process.env.NEXT_PUBLIC_API_URL}/edge/anime?page[limit]=18`;
  const response = await fetch(baseURL);
  const data = await response.json();

  return data;
}

export async function getTrending() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/edge/trending/anime`
  );
  const data = await response.json();

  return data;
}
