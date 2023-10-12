import { useFetchTasks } from "./reactQueryCustomHooks";
import SingleItem from "./SingleItem";

const Items = () => {
  const { data, isError, isLoading } = useFetchTasks();
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
