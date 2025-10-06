import { MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="container w-full relative">
      <nav className="p-2 sm:p-5 bg-blue-600 flex justify-between items-center w-screen ">
        <div
          className="p-2 rounded-xl items-center gap-1 flex  cursor-pointer bg-white text-blue-600"
          onClick={() => {
            navigate("/");
          }}
        >
          <MapPin />
          <button className="sm:text-2xl cursor-pointer">BloomWatch</button>
        </div>
        <center className=" sm:text-xl sm:flex items-center">
          <p>NasaSpace App Challenge-2025</p>
          <img src="./lotus.gif" alt="" className="h-14 hidden sm:block" />
        </center>

        <div className="flex space-x-4 text-xl">
          <Link to={"/map"}>
            <button className="btn btn-active btn-primary p-2 bg-yellow-300 w-36 text-black  text- ">
              View Map{" "}
            </button>
          </Link>
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
