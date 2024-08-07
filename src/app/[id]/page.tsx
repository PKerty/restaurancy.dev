import api from "@/api";
import RestaurantCard from "../components/RestaurantCard";

export default async function RestaurantPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const restaurant = await api.fetch(id);

  return <RestaurantCard restaurant={restaurant} />;
}
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const restaurant = await api.fetch(id);

  return {
    title: `${restaurant.name} - Restaurancy`,
    description: restaurant.description,
  };
}
