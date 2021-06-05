import Head from "next/head";
import { GiPopcorn } from "react-icons/gi";
import { FaClock, FaRegCalendarAlt } from "react-icons/fa";
import { BsChatQuoteFill } from "react-icons/bs";
import { StarIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import YouTube from "react-youtube";

export default function detail({ id }) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [casts, setCast] = useState(null);

  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const movieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const trailerAPI = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const castAPI = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;

  const getDetail = async () => {
    const response = await axios.get(movieAPI);
    setMovie(response.data);
    const responseTrailer = await axios.get(trailerAPI);
    setTrailer(responseTrailer.data.results[0]);
    const responseCast = await axios.get(castAPI);
    setCast(responseCast.data.cast);
  };

  useEffect(() => {
    getDetail();
  }, [movieAPI]);

  let year = "";
  if (movie) {
    let releaseDate = new Date(movie.release_date);
    year = releaseDate.getFullYear();
  }

  let castCount = "";
  if (casts) {
    castCount = casts.length;
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  if (!movie || !trailer || !casts) {
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
            className="text-xl font-semibold inline-flex items-center cursor-pointer hover:text-yellow-300"
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
        <div className="px-5 md:px-20 lg:px-32 max-w-7xl m-auto">
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
                <div className="pb-2">
                  <p className="text-2xl sm:text-3xl">{movie.title}</p>
                  <p className="italic text-sm text-gray-500">
                    "{movie.tagline}"
                  </p>
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
              <div className="flex">
                <div className="text-sm w-1/3">
                  <div className="flex items-center mb-1">
                    <FaClock className="mr-2" />
                    {movie.runtime} mins
                  </div>
                  <div className="flex items-center mb-1">
                    <FaRegCalendarAlt className="mr-2" />
                    {movie.release_date}
                  </div>
                </div>
                <div className="flex justify-end items-start w-2/3 space-x-2 flex-wrap">
                  {Object.entries(movie.genres).map(([key, { id, name }]) => (
                    <div
                      className="border border-gray-300 rounded py-1 px-2 mb-2 text-xs whitespace-nowrap"
                      key={key}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <span className="tracking-widest pl-2 border-l-4 border-yellow-300">
                  CAST
                </span>
                <div className="pt-4 relative">
                  <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
                    {Object.entries(casts.slice(0, 10)).map(([key, cast]) => (
                      <div className="" key={key}>
                        <Image
                          src={`${BASE_URL}${cast.profile_path}`}
                          layout="responsive"
                          height={390}
                          width={276}
                        />
                        <div className="truncate w-28 sm:w-32 text-xs pt-1 font-semibold">
                          {cast.name}
                        </div>
                        <div className="truncate w-28 sm:w-32 text-xs text-gray-500">
                          {cast.character}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-0 -right-1 bg-gradient-to-l from-gray-900 h-60 w-12" />
                </div>
              </div>
            </div>
          </div>
          <div className="py-4">
            <span className="tracking-widest pl-2 border-l-4 border-yellow-300">
              OVERVIEW
            </span>
            <div className="text-sm mt-2">{movie.overview}</div>
          </div>
          <div className="py-4">
            <span className="tracking-widest pl-2 border-l-4 border-yellow-300">
              TRAILER
            </span>
            <div className="pt-6 ">
              {trailer ? (
                <div className="w-full h-0 relative pb-iframe">
                  <YouTube
                    videoId={trailer.key}
                    opts={opts}
                    className="absolute w-full h-full"
                  />
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
