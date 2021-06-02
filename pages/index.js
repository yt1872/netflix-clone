import Head from "next/head";
import Results from "../components/Results";
import requests from "../utils/requests";
import { useRouter } from "next/router";
import { GiPopcorn } from "react-icons/gi";

export default function Home({ results }) {
  const router = useRouter();
  return (
    <div className="">
      <Head>
        <title>Popcorn</title>
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
          <div className="relative">
            <div className="flex py-5 w-full overflow-y-scroll whitespace-nowrap space-x-8 sm:space-x-10 md:space-x-12 scrollbar-hide">
              {Object.entries(requests).map(([key, { title, url }]) => (
                <h2
                  className="cursor-pointer last:pr-12"
                  onClick={() => router.push(`/?genre=${key}`)}
                  key={key}
                >
                  {title}
                </h2>
              ))}
            </div>
            <div className="absolute top-0 right-0 bg-gradient-to-l from-gray-900 h-12 w-1/12 pt-5" />
          </div>
          <Results results={results} />
        </div>
      </body>
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
