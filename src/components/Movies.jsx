import React from "react";
// import Image from "../image.jpg";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

export default function Movies() {
  let [movies, setMovies] = useState("");
  let [pageNum, setPage] = useState(1);
  let [hovered, setHovered] = useState("");
  let [favourites, setFavourites] = useState([]);

  // pagination handlers
  const onPrev = () => {
    if (pageNum > 1) {
      setPage(pageNum - 1);
    }
  };
  const onNext = () => {
    setPage(pageNum + 1);
  };
  // emojis show and hide on hover
  const showEmoji = (id) => {
    setHovered(id);
  };

  const hideEmoji = () => {
    setHovered("");
  };
  // adding / removing emojis to favourites
  const addEmoji = (id) => {
    const newFav = [...favourites, id];
    setFavourites(newFav);
  };

  const removeEmoji = (id) => {
    // whichever elem -> not equal to my id shud added to new array
    const filteredFav = favourites.filter((elem) => {
      return elem != id;
    });
    setFavourites(filteredFav);
  };

  // making api request
  useEffect(
    function () {
      (function () {
        axios
          .get(
            "https://api.themoviedb.org/3/trending/all/week?api_key=020ca254c50cd1abe7b4f3608dee2519&page=" +
              pageNum
          )
          .then((res) => {
            // console.table(res.data.results);
            setMovies(res.data.results);
          });
      })();
    },
    [pageNum]
  );

  return (
    <>
      <div className="mt-8">
        <div
          className="mb-8 
        font-bold 
        text-2xl 
        text-center"
        >
          Trending Movies
        </div>

        <div
          className="flex 
        justify-center
        flex-wrap"
        >
          {movies.length == 0 ? (
            <div className="flex justify-center">
              <Oval
                height="80"
                width="80"
                radius="9"
                color="gray"
                secondaryColor="gray"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />{" "}
            </div>
          ) : (
            movies.map((movie) => {
              console.log(movie);
              return (
                <div
                  onMouseOver={() => {
                    showEmoji(movie.id);
                  }}
                  onMouseLeave={() => {
                    hideEmoji();
                  }}
                  key={movie.id}
                  className="
              bg-center
              bg-cover  
              w-[170px] 
              h-[30vh]
              md:h-[40vh]
              md:w-[180px] 
              m-4
              rounded-xl
              hover:scale-110
              duration-300
              flex items-end
              relative"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/original/${movie.backdrop_path})`,
                  }}
                >
                  <div
                    className="p-2 bg-gray-900 absolute top-2 right-2 rounded-xl"
                    style={{
                      display: hovered == movie.id ? "block" : "none",
                    }}
                  >
                    {favourites.includes(movie.id) == false ? (
                      <div
                        className="text-2xl"
                        onClick={() => {
                          addEmoji(movie.id);
                        }}
                      >
                        😍
                      </div>
                    ) : (
                      <div
                        className="text-2xl"
                        onClick={() => {
                          removeEmoji(movie.id);
                        }}
                      >
                        ❌
                      </div>
                    )}
                  </div>
                  <div
                    className="font-bold  
                text-white 
                bg-gray-900 
                  p-2 
                  bg-opacity-60 
                  text-center 
                  w-full  
                  rounded-b-xl  
                  md:text-xl"
                  >
                    {movie.name || movie.title}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <Pagination
          pageNum={pageNum}
          onPrev={onPrev}
          onNext={onNext}
        ></Pagination>
      </div>
    </>
  );
}
