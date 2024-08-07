import { Restaurant } from "@/types";
import Link from "next/link";
import DynamicFavoriteButton from "./DynamicFavButton";
import Image from "next/image";

// Creamos un componente dinámico para que no se renderice en el servidor

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <article>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex gap-2 text-lg font-bold">
        <Link href={"/" + restaurant.id}>
          <span>{restaurant.name}</span>
        </Link>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
        <DynamicFavoriteButton id={restaurant.id} />
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
    </article>
  );
}
