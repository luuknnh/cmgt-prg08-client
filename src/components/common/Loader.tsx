import { grid } from "ldrs";

grid.register();

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <l-grid size="60" speed="1.5" color="black"></l-grid>
    </div>
  );
}

export default Loader;
