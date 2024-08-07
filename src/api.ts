import { cache } from "react";
import { Restaurant } from "@/types";

const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Golden Spoon",
    description:
      "A fine dining experience with a menu that changes daily based on the freshest ingredients available.",
    address: "123 Main St. Anytown USA",
    score: 4.5,
    ratings: 100,
    image: "https://source.unsplash.com/480x300/?restaurant&random=1",
  },
  {
    id: "2",
    name: "La Piazza",
    description:
      "Authentic Italian cuisine in a cozy atmosphere with outdoor seating available.",
    address: "456 Oak Ave. Anytown USA",
    score: 4.2,
    ratings: 80,
    image: "https://source.unsplash.com/480x300/?restaurant&random=2",
  },
  {
    id: "3",
    name: "The Sizzling Skillet",
    description:
      "A family-friendly restaurant with a wide variety of dishes. including vegetarian and gluten-free options.",
    address: "789 Elm St. Anytown USA",
    score: 4.8,
    ratings: 120,
    image: "https://source.unsplash.com/480x300/?restaurant&random=3",
  },
  {
    id: "4",
    name: "The Hungry Bear",
    description:
      "A rustic cabin-style restaurant serving hearty portions of comfort food.",
    address: "101 Forest Rd. Anytown USA",
    score: 4.0,
    ratings: 60,
    image: "https://source.unsplash.com/480x300/?restaurant&random=4",
  },
  {
    id: "5",
    name: "The Spice Route",
    description:
      "A fusion restaurant that combines the flavors of India. Thailand. and China.",
    address: "246 Main St. Anytown USA",
    score: 4.6,
    ratings: 90,
    image: "https://source.unsplash.com/480x300/?restaurant&random=5",
  },
  {
    id: "6",
    name: "The Catch of the Day",
    description:
      "A seafood restaurant with a focus on locally-sourced. sustainable ingredients.",
    address: "369 Beach Blvd. Anytown USA",
    score: 4.3,
    ratings: 70,
    image: "https://source.unsplash.com/480x300/?restaurant&random=6",
  },
  {
    id: "7",
    name: "The Garden Cafe",
    description:
      "A vegetarian restaurant with a beautiful outdoor garden seating area.",
    address: "753 Maple St. Anytown USA",
    score: 4.9,
    ratings: 150,
    image: "https://source.unsplash.com/480x300/?restaurant&random=7",
  },
  {
    id: "8",
    name: "The Burger Joint",
    description:
      "A classic American diner with a wide variety of burgers. fries. and milkshakes.",
    address: "852 Oak Ave. Anytown USA",
    score: 3.9,
    ratings: 50,
    image: "https://source.unsplash.com/480x300/?restaurant&random=8",
  },
  {
    id: "9",
    name: "The Cozy Corner",
    description:
      "A small cafe with a warm and inviting atmosphere. serving breakfast and lunch dishes.",
    address: "963 Main St. Anytown USA",
    score: 4.7,
    ratings: 110,
    image: "https://source.unsplash.com/480x300/?restaurant&random=9",
  },
  {
    id: "10",
    name: "The Steakhouse",
    description:
      "A high-end restaurant specializing in premium cuts of beef and fine wines.",
    address: "1479 Elm St. Anytown USA",
    score: 4.1,
    ratings: 75,
    image: "https://source.unsplash.com/480x300/?restaurant&random=10",
  },
  {
    id: "11",
    name: "The Taco Truck",
    description: "A casual Mexican restaurant serving authentic street tacos.",
    address: "753 Main St. Anytown USA",
    score: 4.4,
    ratings: 65,
    image: "https://source.unsplash.com/480x300/?restaurant&random=11",
  },
  {
    id: "12",
    name: "The Ice Cream Parlor",
    description:
      "A family-friendly restaurant with a wide variety of ice cream flavors.",
    address: "852 Oak Ave. Anytown USA",
    score: 4.9,
    ratings: 150,
    image: "https://source.unsplash.com/480x300/?restaurant&random=12",
  },
];

const api = {
  list: async (): Promise<Restaurant[]> => {
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHLDA5D3Kol92Qe28b-4mXeD-mJlWYJSdR2T13Z5m_q5cKXa97rGTu0uC_ND2EKdAACvMpMAf0ChN8/pub?output=csv",
      { next: { tags: ["restaurants"] } },
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] =
        row.split(",");
      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image: image.slice(0, image.length - 1),
      };
    });
    // Lo retornamos
    return restaurants;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHLDA5D3Kol92Qe28b-4mXeD-mJlWYJSdR2T13Z5m_q5cKXa97rGTu0uC_ND2EKdAACvMpMAf0ChN8/pub?output=csv",
      { next: { tags: ["restaurants"] } },
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    const row = data.find((row) => {
      const [data_id, name, description, address, score, ratings, image] =
        row.split(",");
      const candidate: Restaurant = {
        id: data_id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image,
      };
      if (candidate.id === id) {
        return true;
      }
      return false;
    });

    if (!row) throw new Error(`Restaurant with id ${id} not found`);
    const [data_id, name, description, address, score, ratings, image] =
      row.split(",");
    return {
      id: data_id,
      name,
      description,
      address,
      score: Number(score),
      ratings: Number(ratings),
      image,
    };
  },
  search: async (query: string): Promise<Restaurant[]> => {
    // Obtenemos los restaurantes
    const results = await api.list().then((restaurants: Restaurant[]) => {
      // Los filtramos por nombre
      return restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()),
      );
    });

    // Los retornamos
    return results;
  },
};

export default api;
