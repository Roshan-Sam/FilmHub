import React from "react";
import Logo from "../imdb mov logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <div
        className="border 
        flex 
        space-x-8 
        pl-3 
        py-4 
        items-center"
      >
        <img src={Logo} className="w-[50px]" />
        <Link
          to="/"
          className="font-bold
        text-black-400"
          style={{ fontSize: "25px" }}
        >
          FilmHub
        </Link>
        <Link
          to="/"
          className="font-bold
        text-xl
        text-blue-400"
        >
          Movies
        </Link>
        <Link
          to="/fav"
          className="font-bold
        text-xl
        text-blue-400"
        >
          Favourites
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
