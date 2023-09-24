import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

let genreids = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
let sampleMovies = [
  {
    adult: false,
    backdrop_path: "/bc1qugrtknpjz52vc4m559q7zumkc4268kp7skrsee.jpg",
    id: 640146,
    title: "Ant-Man and the Wasp: Quantumania",
    original_language: "en",
    original_title: "Ant-Man and the Wasp: Quantumania",
    overview:
      "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
    poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 878],
    popularity: 8876.776,
    release_date: "2023-02-15",
    video: false,
    vote_average: 6.533,
    vote_count: 1983,
  },
  {
    adult: false,
    backdrop_path: "/44immBwzhDVyjn87b3x3l9mlhAD.jpg",
    id: 934433,
    title: "Scream VI",
    original_language: "en",
    original_title: "Scream VI",
    overview:
      "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
    poster_path: "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
    media_type: "movie",
    genre_ids: [27, 9648, 53],
    popularity: 1673.678,
    release_date: "2023-03-08",
    video: false,
    vote_average: 7.386,
    vote_count: 820,
  },
  {
    adult: false,
    backdrop_path: "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
    id: 502356,
    title: "The Super Mario Bros. Movie",
    original_language: "en",
    original_title: "The Super Mario Bros. Movie",
    overview:
      "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    media_type: "movie",
    genre_ids: [16, 12, 10751, 14, 35],
    popularity: 7475.651,
    release_date: "2023-04-05",
    video: false,
    vote_average: 7.507,
    vote_count: 1559,
  },
  {
    adult: false,
    backdrop_path: "/b9UCfDzwiWw7mIFsIQR9ZJUeh7q.jpg",
    id: 868759,
    title: "Ghosted",
    original_language: "en",
    original_title: "Ghosted",
    overview:
      "Salt-of-the-earth Cole falls head over heels for enigmatic Sadie — but then makes the shocking discovery that she’s a secret agent. Before they can decide on a second date, Cole and Sadie are swept away on an international adventure to save the world.",
    poster_path: "/liLN69YgoovHVgmlHJ876PKi5Yi.jpg",
    media_type: "movie",
    genre_ids: [10749, 28, 35],
    popularity: 1700.814,
    release_date: "2023-04-18",
    video: false,
    vote_average: 7.3,
    vote_count: 444,
  },
];

export default function Favourites() {
  let [genres, setGenres] = useState([]);
  let [movies, setMovies] = useState(sampleMovies);
  let [searchItem, setSearchItem] = useState("");
  let [currentGenre, setCurrentGenre] = useState("All Genres");
  let [curRatingOrder, setCurRatingOrder] = useState(0);
  let [curPopularity, setCurPopularity] = useState(0);
  let [noOfElements, setNooFElements] = useState(2);
  let [curPage, setCurPage] = useState(1);

 
  const deleteMovie = (id) => {
    const restofTheMovies = movies.filter((movie) => {
      return movie.id != id;
    });
    setMovies(restofTheMovies);
  };

  useEffect(() => {
    let temp = sampleMovies.map((movie) => genreids[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGenres(["All Genres", ...temp]);
  }, []);

  const onCurrentGenre = (genre) => {
    setCurrentGenre(genre);
  };

  let searchedMovies =
    searchItem == ""
      ? movies
      : movies.filter((movie) => {
          let movieName = movie.title || movie.name;
          let lowerCharSearch = searchItem.toLowerCase();
          return movieName.toLowerCase().includes(lowerCharSearch);
        });

  let filteredMovies =
    currentGenre == "All Genres"
      ? searchedMovies
      : searchedMovies.filter((searchedMovie) => {
          return genreids[searchedMovie.genre_ids[0]] == currentGenre;
        });

  if (curRatingOrder != 0) {
    if (curRatingOrder == 1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieA.vote_average - movieB.vote_average;
      });
    } else if (curRatingOrder == -1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieB.vote_average - movieA.vote_average;
      });
    }
  }

  if (curPopularity != 0) {
    if (curPopularity == 1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieA.popularity - movieB.popularity;
      });
    } else if (curPopularity == -1) {
      filteredMovies = filteredMovies.sort((movieA, movieB) => {
        return movieB.popularity - movieA.popularity;
      });
    }
  }

  let si = noOfElements * (curPage - 1);
  let ei = noOfElements + si;
  let maxPageNum = Math.ceil(filteredMovies.length / noOfElements);
  filteredMovies = filteredMovies.slice(si, ei);

  const onPrev = () => {
    if (curPage > 1) {
      setCurPage(Number(curPage - 1));
    }
  };

  const onNext = () => {
    if (curPage < maxPageNum && noOfElements != 0) {
      setCurPage(Number(curPage + 1));
    }
  };
  return (
    <>
      <div className="mt-6 flex space-x-2 justify-center">
        {genres.map((genre) => {
          return (
            <button
              className={
                genre == currentGenre
                  ? `py-1 px-2  rounded-lg text-lg font-bold text-white bg-blue-400`
                  : `py-1 px-2 bg-gray-400 rounded-lg text-lg font-bold text-white hover:bg-blue-400`
              }
              onClick={() => {
                onCurrentGenre(genre);
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        <input
          type="text"
          placeholder="search"
          className="border-2 py-1 px-2 text-center"
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
        <input
          type="number"
          className="border-2 py-1 px-2 text-center"
          value={noOfElements}
          onChange={(e) => {
            setNooFElements(Number(e.target.value));
          }}
        />
      </div>
      <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                <div className="flex">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    class="mr-2 cursor-pointer"
                    onClick={() => {
                      setCurRatingOrder(+1);
                    }}
                  ></img>
                  <div>Rating</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    class="ml-2 mr-2 cursor-pointer"
                    onClick={() => {
                      setCurRatingOrder(-1);
                    }}
                  ></img>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                <div className="flex">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    class="mr-2 cursor-pointer"
                    onClick={() => {
                      setCurPopularity(+1);
                    }}
                  ></img>
                  <div>Popularity</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    class="ml-2 mr-2 cursor-pointer"
                    onClick={() => {
                      setCurPopularity(-1);
                    }}
                  ></img>
                </div>
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Genre
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                Remove
              </th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {filteredMovies.map((movie) => {
              {
                console.log(movie);
              }
              return (
                <tr class="hover:bg-gray-50" key={movie.id}>
                  <th class="flex items-center px-6 py-4 font-normal text-gray-900 space-x-2">
                    <img
                      class="h-[6rem] w-[10rem] object-fit"
                      src={`https://image.tmdb.org/t/p/original/t/p/original/${movie.poster_path}`}
                      alt=""
                    />
                    <div class="font-medium text-gray-700 text-sm">
                      {movie.title || movie.name}
                    </div>
                  </th>
                  <td class="px-6 pl-12 py-4">
                    {movie.vote_average.toFixed(2)}
                  </td>
                  <td class="px-6 pl-1 py-4">{movie.popularity.toFixed(2)}</td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        {genreids[movie.genre_ids[0]]}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold text-red-600 cursor-pointer"
                      onClick={() => {
                        deleteMovie(movie.id);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        pageNum={curPage}
        onNext={onNext}
        onPrev={onPrev}
      ></Pagination>
    </>
  );
}
