const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default {
  //   fetchTrending: {
  //     title: "Trending",
  //     url: `/trending/all/day?api_key=${API_KEY}`,
  //   },
  fetchTopRated: {
    title: "Top Rated",
    url: `/movie/top_rated?api_key=${API_KEY}`,
  },
  fetchPopular: {
    title: "Popular",
    url: `/movie/popular?api_key=${API_KEY}`,
  },
  fetchAction: {
    title: "Action",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=28`,
  },
  fetchComedy: {
    title: "Comedy",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=35`,
  },
  fetchScienceFiction: {
    title: "Science Fiction",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=878`,
  },
  fetchThriller: {
    title: "Thriller",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=53`,
  },
  fetchAnimation: {
    title: "Animation",
    url: `/discover/movie/?api_key=${API_KEY}&with_genres=16`,
  },
};
