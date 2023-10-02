import Filter from "../Components/Filter";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Sidebar from "../Components/Sidebar";
import Tickets from "../Components/Tickets";

const Home = () => {
  return (
    <div className="md:grid md:grid-cols-12 bg-neutral-50">
      <div className="md:col-span-2">
        <Sidebar />
      </div>
      <div className="md:col-span-10">
        <Navbar />
        <div className="md:grid md:grid-cols-12 mx-8 mt-8 pb-4">
          <div className="md:col-span-2 ">
            <Filter />
          </div>
          <div className="md:col-span-10 md:ml-8">
            <Search />
            <Tickets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
