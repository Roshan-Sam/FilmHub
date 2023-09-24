import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export default function () {
  let [bannerMovie, setBanner] = useState("");

  useEffect(function () {
    (function () {
      axios
        .get(
          "https://api.themoviedb.org/3/trending/all/week?api_key=020ca254c50cd1abe7b4f3608dee2519&page=2"
        )
        .then((res) => {
          // console.table(res.data.results);
          setBanner(res.data.results[0]);
        });
    })();
  }, []);
  return (
    <>
      {bannerMovie == "" ? (
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
        <div
          className=" 
      h-[40vh]
      md:h-[60vh]
      bg-center 
      bg-cover
      flex items-end"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/original/${bannerMovie.backdrop_path})`
          }}
        >
          <div
            className="text-xl 
        text-white 
        bg-gray-900 
        p-4 
        bg-opacity-60 
        text-center 
        w-full
        md:text-3xl"
          >
            {bannerMovie.name || bannerMovie.title}
          </div>
        </div>
      )}
    </>
  );
}
