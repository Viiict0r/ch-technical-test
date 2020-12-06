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

export async function getEpisodes(anime_id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/edge/anime/${anime_id}/episodes`
  );
  const data = await response.json();

  return data;
}

export async function getNextEpisodes(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function getBySlug(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/edge/anime?filter[slug]=${slug}&include=categories`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}
