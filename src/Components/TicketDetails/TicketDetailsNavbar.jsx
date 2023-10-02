import { PiBellLight } from "react-icons/pi";
import { Link } from "react-router-dom";

import featuredIcon from "../../assets/modalIcon.png";
import logo from "../../assets/DetailsLogo.png";

const TicketDetailsNavbar = () => {
  return (
    <nav
      className="flex justify-between bg-white px-8 py-2 items-center"
      style={{ boxShadow: "0px 0px 4px 0px #00000014" }}
    >
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="px-4" />
        </Link>
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
    </nav>
  );
};

export default TicketDetailsNavbar;
