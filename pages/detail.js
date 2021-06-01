import Head from "next/head";
import { GiPopcorn } from "react-icons/gi";
import { FaClock, FaRegCalendarAlt } from "react-icons/fa";
import { BsChatQuoteFill } from "react-icons/bs";
import { StarIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function detail({ id }) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  //   const [tv, setTV] = useState(null);

  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const movieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const trailerAPI = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  //   const tvAPI = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;

  const getMovie = async () => {
    const response = await axios.get(movieAPI);
    setMovie(response.data);
    const responseTrailer = await axios.get(trailerAPI);
    setTrailer(responseTrailer.data.results[0]);
  };

  useEffect(() => {
    getMovie();
  }, [movieAPI]);

  let year = "";
  if (movie) {
    let releaseDate = new Date(movie.release_date);
    year = releaseDate.getFullYear();
  }

  if (!movie || !trailer) {
    return null;
  }
  return (
    <div>
      <Head>
        <title>{movie.title}</title>
        <link rel="icon" href="/popcorn.svg" />
      </Head>
      <body>
        <div className="p-5 max-w-7xl m-auto">
          <div
            className="text-xl pb-5 font-semibold inline-flex items-center cursor-pointer hover:text-yellow-300"
            onClick={() => {
              router.push({
                pathname: "/",
              });
            }}
          >
            <GiPopcorn />
            <div className="tracking-widest font-normal pl-1">Popcorn</div>
          </div>
        </div>
        <div className="pt-5 md:px-20 lg:px-32 max-w-7xl m-auto">
          <div className="mb-2 sm:hidden">
            <Image
              src={`${BASE_URL}${movie.backdrop_path}`}
              layout="responsive"
              height={1080}
              width={1920}
            />
          </div>
          <div className="flex">
            <div className="w-1/4 hidden sm:block">
              <Image
                src={`${BASE_URL}${movie.poster_path}`}
                layout="responsive"
                height={1200}
                width={800}
              />
            </div>
            <div className="w-full sm:w-3/4 sm:pl-6">
              <div className="flex justify-between w-full">
                <div className="flex items-baseline pb-2">
                  <span className="text-2xl sm:text-3xl">
                    {movie.title}
                    <mark className="ml-1 text-sm sm:text-lg bg-gray-900 text-gray-300">
                      ({year})
                    </mark>{" "}
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <StarIcon className="h-8 mr-1 text-yellow-300" />
                    <span className="text-xl sm:text-2xl">
                      {movie.vote_average}
                      <mark className="bg-gray-900 text-gray-300 text-xs">
                        /10
                      </mark>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex pb-2">
                {Object.entries(movie.genres).map(([key, { id, name }]) => (
                  <p
                    className="mr-2 border border-gray-300 rounded py-1 px-2 text-sm"
                    key={key}
                  >
                    {name}
                  </p>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center mb-1">
                  <FaClock className="mr-2" />
                  {movie.runtime} mins
                </div>
                <div className="flex items-center mb-1">
                  <FaRegCalendarAlt className="mr-2" />
                  {movie.release_date}
                </div>
                <div className="flex items-center mb-1">
                  <BsChatQuoteFill className="mr-2" />"{movie.tagline}"
                </div>
              </div>
              <div className="py-4 hidden md:block">
                <span className="tracking-widest pl-2 border-l-4 border-yellow-300">
                  OVERVIEW
                </span>
                <div className="text-sm mt-2">{movie.overview}</div>
              </div>
            </div>
          </div>
          <div className="py-4 md:hidden">
            <span className="tracking-widest pl-2 border-l-4 border-yellow-300">
              OVERVIEW
            </span>
            <div className="text-sm mt-2">{movie.overview}</div>
          </div>
          <div className="py-8">
            <span className="tracking-widest pl-2 border-l-4 border-yellow-300">
              TRAILER
            </span>
            <div className="pt-6 sm:px-12 md:px-20 lg:px-28">
              {trailer ? (
                <div className="w-full h-0 relative pb-iframe">
                  <iframe
                    className="absolute w-full h-full"
                    id="player"
                    type="text/html"
                    width="100%"
                    height="100%"
                    src={`http://www.youtube.com/embed/${trailer.key}?enablejsapi=1&origin=http://example.com`}
                    frameborder="0"
                  ></iframe>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

detail.getInitialProps = ({ query: { id } }) => {
  return { id };
};
