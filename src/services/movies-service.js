export default class MoviesService {
  async getResource(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjE1ZDdmZDVmMjc0ZDFhMWRmMmM0YTU0MWUxNjJlZSIsIm5iZiI6MTcyOTcxMjYyMy4xNDMwNiwic3ViIjoiNjcxOTRlMmNlODMzZDkyZWYwNWZjMDQwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mHs_1a35iIDK-g6YIJrs6ECpgk5mp0GYfaMicIbRKT0',
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${response.status}`);
    }

    return await response.json();
  }

  async getAllMovies(text) {
    if (!text) return [];
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${text}&include_adult=false&language=en-US&page=1`
    );

    return res.results;
  }
}
