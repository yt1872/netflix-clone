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
          <div className="pt-5 md:px-20 lg:px-32 max-w-7xl m-auto">
            <div className="flex py-5 w-full overflow-y-scroll whitespace-nowrap">
              {Object.entries(requests).map(([key, { title, url }]) => (
                <h2
                  className="mr-4 cursor-pointer"
                  onClick={() => router.push(`/?genre=${key}`)}
                  key={key}
                >
                  {title}
                </h2>
              ))}
            </div>
            <Results results={results} />
          </div>
        </div>
      </body>
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchPopular.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
