import { useQuery } from "@tanstack/react-query";
import customFetch from "../utilis";
import SingleItem from "./SingleItem";

const Items = ({ items }) => {
const { data, isLoading, isError, error } = useQuery("tasks", () =>
  customFetch.get("/").then((response) => {
    console.log("Response data:", response.data);
    return response.data;
  })
);

  return (
    <div className="items">
      {items.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
