import { useQuery } from "@tanstack/react-query";
import customFetch from "../utilis";
import SingleItem from "./SingleItem";

const Items = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}> Loading...</p>;
  }
  if (isError) {
    return <p style={{ marginTop: "1rem" }}> There are error ...</p>;
  }
  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
