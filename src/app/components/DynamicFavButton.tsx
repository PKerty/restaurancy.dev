"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const FavButton = ({ id }: { id: string }) => {
  const [isFavourite, setIsFavourite] = useState(
    window.localStorage.getItem("favorites")?.includes(id) || false,
  );
  const handleClick = () => {
    const favs = window.localStorage.getItem("favorites");

    if (isFavourite) {
      window.localStorage.setItem(
        "favorites",
        favs!
          .split(",")
          .filter((value) => value !== id)
          .join(","),
      );
    } else {
      window.localStorage.setItem(
        "favorites",
        favs!.length > 0 ? favs!.concat("," + id) : id,
      );
    }
    console.log(window.localStorage);
    setIsFavourite(!isFavourite);
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`text-red-500 text-xl ${isFavourite ? "opacity-100" : "opacity-20"}`}
    >
      ♥
    </button>
  );
};

const DynamicFavoriteButton = dynamic(async () => FavButton, {
  ssr: false,
});

export default DynamicFavoriteButton;
