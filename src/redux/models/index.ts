import { LocationGeocodedAddress } from "expo-location";

//Category
export interface Category {
  title: String;
  icon: String;
}

//Food model
export interface FoodModel {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  readyTime: number;
  image: [string];
}

//Restaurant Model
export interface Restaurant {
  _id: string;
  name: string;
  foodType: string;
  address: string;
  phone: string;
  images: string;
  foods: [FoodModel];
}

export interface FoodAvailability {
  categories: [Category];
  restuarants: [Restaurant];
  foods: [FoodModel];
}

export interface UserModel {
  firstName: string;
  lastName: String;
  contactNumber: String;
  token: string;
}

export interface UserState {
  user: UserModel;
  location: LocationGeocodedAddress;
  error: string | undefined;
}

export interface ShoppingState {
  availability: FoodAvailability,
}
