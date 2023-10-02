import { PiBellLight } from "react-icons/pi";
import featuredIcon from "../assets/modalIcon.png";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-white px-8 py-2 items-center">
      <div>
        <p className="big-subtitles">Hello!</p>
        <p className="small-text-regular">Welcome Back</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="p-1 bg-neutral-50 rounded-sm mx-4">EN</div>
        <div className="p-1 bg-neutral-50 rounded-sm mx-4">
          <PiBellLight size={24} />
        </div>
        <div className="ml-4 justify-center items-center flex flex-col">
          <div>
            <img src={featuredIcon} alt="avatar" className="w-10" />
          </div>
          <div>Employee</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
