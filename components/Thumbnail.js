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
      <div className="flex justify-between items-start pt-3">
        <div className="text-lg line-clamp-2">{result.title}</div>
        <div className="flex items-center leading-7">
          <StarIcon className="h-5 mr-1 text-yellow-300" />
          {result.vote_average}
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;
