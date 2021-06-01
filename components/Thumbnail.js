import Image from "next/image";
import Trailer from "./Trailer";
import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/router";

function Thumbnail({ result, index }) {
  let releaseDate =
    result.media_type == "tv"
      ? new Date(result.first_air_date)
      : new Date(result.release_date);

  let year = releaseDate.getFullYear();

  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const router = useRouter();

  return (
    <div
      className="bg-gray-800 p-3 rounded h-full cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
      onClick={() => {
        router.push({
          pathname: "/detail",
          query: { id: result.id },
        });
      }}
    >
      <div className="">
        {/* <p>{index}</p> */}
        <Image
          src={
            `${BASE_URL}${result.poster_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}`
          }
          layout="responsive"
          height={1800}
          width={1200}
        />
        <FaPlayCircle className="hidden h-10 w-10" />
      </div>
      {/* <div className="hidden line-clamp-3">{result.overview}</div> */}
      <div className="flex">
        <div className="flex items-center pt-2">
          <StarIcon className="h-5 mr-1 text-yellow-300" />
          {result.vote_average}
        </div>
        {/* <div className="flex items-center mr-4 bg-gray-800 px-2 py-1 rounded">
          <UserGroupIcon className="h-5 mr-1" />
          {result.vote_count}
        </div>
        <div className="flex items-center mr-4 bg-gray-800 px-2 py-1 rounded">
          <CalendarIcon className="h-5 mr-1" />
          {year}
        </div> */}
      </div>
      <div className="text-lg line-clamp-2">{result.title || result.name}</div>
      {/* <div onClick={getTrailer}>Trailer</div> */}
    </div>
  );
}

export default Thumbnail;
