const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default {
  fetchTrending: {
    title: "Trending",
    url: `/trending/movie/day?api_key=${API_KEY}`,
  },
  fetchTopRated: {
    title: "Top Rated",
    url: `/movie/top_rated?api_key=${API_KEY}`,
  },
  fetchPopular: {
    title: "Popular",
    url: `/movie/popular?api_key=${API_KEY}`,
  },
  fetchUpcoming: {
    title: "Upcoming",
    url: `/movie/upcoming?api_key=${API_KEY}`,
  },
  fetchAction: {
    title: "Action",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=28`,
  },
  fetchAdventure: {
    title: "Adventure",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=12`,
  },
  fetchAnimation: {
    title: "Animation",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=16`,
  },
  fetchComedy: {
    title: "Comedy",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=35`,
  },
  fetchCrime: {
    title: "Crime",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=80`,
  },
  fetchDocumentary: {
    title: "Documentary",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=99`,
  },
  fetchDrama: {
    title: "Drama",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=18`,
  },
  fetchFamily: {
    title: "Family",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=10751`,
  },
  fetchScienceFiction: {
    title: "Science Fiction",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=878`,
  },
  fetchRomance: {
    title: "Romance",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=10749`,
  },
  fetchThriller: {
    title: "Thriller",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=53`,
  },
  fetchWar: {
    title: "War",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=10752`,
  },
};
