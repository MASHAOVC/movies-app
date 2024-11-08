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

  get validSessionId() {
    const sessionId = localStorage.getItem('guest_session_id');
    const sessionExpiry = localStorage.getItem('expires_at');
    const sessionExpiryInMilliseconds = new Date(sessionExpiry).getTime();

    if (!sessionId || !sessionExpiry || Date.now() >= sessionExpiryInMilliseconds) {
      return null;
    }

    return sessionId;
  }

  async getAllMovies(text, page) {
    if (!text) return [];
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${text}&include_adult=false&language=en-US&page=${page}`
    );

    return res;
  }

  async initGuestSession() {
    if (!this.validSessionId) {
      const res = await this.getResource('https://api.themoviedb.org/3/authentication/guest_session/new');

      localStorage.setItem('guest_session_id', res.guest_session_id);
      localStorage.setItem('expires_at', res.expires_at);
    }
  }
}
