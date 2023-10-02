import { useState } from "react";
import { RiHome3Line } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { BsGear } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import styles from "./Sidebar.module.css";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className={`${styles.sidebar} md:h-screen md:pl-4 py-2`}>
      <div className="flex items-center justify-between mx-8 md:justify-center">
        <img
          src={logo}
          alt="logo"
          className="md:px-8 md:pb-8 md:border-b md:border-b-neutral-50"
        />
        <GiHamburgerMenu
          size={24}
          color={"white"}
          onClick={() => setToggle(!toggle)}
          className="md:hidden"
        />
      </div>
      <div className={`${toggle ? "block" : "hidden"} md:block`}>
        <ul className="my-10 mt-8">
          <li
            className={`${styles.listItem} small-text-regular bg-neutral-50 text-[#1B6792] md:rounded-s-3xl md:rounded-e-none rounded-e-3xl rounded-s-3xl  mr-2 md:mr-0`}
          >
            <RiHome3Line size={24} />
            <p className="ml-4">Home</p>
          </li>
          <li className={`${styles.listItem} small-text-regular`}>
            <IoPersonOutline size={24} />
            <p className="ml-4">Profile</p>
          </li>
          <li className={`${styles.listItem} small-text-regular`}>
            <BsGear size={24} />
            <p className="ml-4">Settings</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
