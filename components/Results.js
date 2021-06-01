import Thumbnail from "./Thumbnail";

function Results({ results }) {
  return (
    <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {results.map((result, index) => {
        return (
          <div>
            <Thumbnail
              key={result.id}
              result={result}
              index={index + 1 + "."}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Results;
