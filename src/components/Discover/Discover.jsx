import { useContext } from "react";
import Peoples from "./Peoples";
import { GlobalVar } from "../../context/global/GlobalVariable";

function Discover() {
  const { isPeoples, setIsPeoples } = useContext(GlobalVar);

  return (
    isPeoples ? (
      <div className="
      outline fixed backdrop-blur-md flex 
      justify-center w-screen h-screen"
      onClick={()=>setIsPeoples(false)}
      >
        <div className="outline outline-1 bg-white w-[300px]"
        onClick={(e)=>e.stopPropagation()}
        >
          <Peoples />
        </div>
      </div>
    ) : null
  );
}

export default Discover;
