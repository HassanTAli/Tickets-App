import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { HiOutlineClock, HiOutlineTicket } from "react-icons/hi";
import { MdAttachment } from "react-icons/md";

import { getTicket, getTickets } from "../../axios/requests";
import TicketDetailsNavbar from "./TicketDetailsNavbar";
import modalIcon from "../../assets/modalIcon.png";
import Spinner from "../Spinner";
import TicketCard from "./TicketCard";

const TicketDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  const {
    data: ticketData,
    error,
    isError,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white shadow-lg rounded-lg">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    console.log({ error });
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
        <p>
          {error && error?.response?.status === 404
            ? "Ticket Not Found"
            : error.message}
          <Link to="/" className="ml-4 text-indigo-600">
            Go Back
          </Link>
        </p>
      </div>
    );
  }

  const onStatusHandler = (type) => {
    switch (type) {
      case "Open":
        return "bg-opacity-10 bg-[#5FD971] text-[#5FD971]";
      case "InProgress":
        return "bg-opacity-10 bg-[#5B8DEF] text-[#5B8DEF]";
      case "Closed":
        return "bg-opacity-10 bg-[#B9BCBC] text-[#B9BCBC]";
      default:
        break;
    }
  };

  return (
    <div className="h-screen bg-neutral-50">
      <TicketDetailsNavbar />
      <div className="flex justify-start">
        {data && (
          <div className="w-1/4 mr-2 p-4 overflow-y-scroll h-[90vh] bg-white hidden md:block">
            {data.map((ticket) => (
              <div key={ticket.id} className="my-4">
                <div className="flex justify-between items-start ">
                  <p className="small-text-regular">{ticket.subject}</p>
                  <div>
                    <p
                      className={`${onStatusHandler(ticket.status)} px-4 py-1`}
                    >
                      {ticket.status}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="caption text-[#616363]">From: {ticket.from}</p>
                </div>
                <div>
                  <p className="caption text-[#616363]">To: {ticket.to}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <TicketCard />
        <div className="w-1/4 md:flex flex-col my-8 mr-4 px-2 hidden">
          <div
            className="mb-4 w-full rounded-2xl"
            style={{ boxShadow: "0px 0px 4px 0px #00000014" }}
          >
            <select
              name="status"
              id="status"
              className="w-full p-2 rounded-2xl"
            >
              <option value="open">open</option>
            </select>
          </div>
          <div
            className="bg-white rounded-2xl p-2"
            style={{ boxShadow: "0px 0px 4px 0px #00000014" }}
          >
            <div className="flex items-center justify-around mt-4 mb-8">
              <div>
                <HiOutlineTicket size={24} color="#B9BCBC" />
              </div>
              <div>
                <HiOutlineClock size={24} color="#B9BCBC" />
              </div>
              <div>
                <MdAttachment size={24} color="#B9BCBC" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mx-auto px-8 my-4">
                <p className="w-1/3 small-text-medium text-[#616363]">
                  Send by
                </p>
                <div className="flex items-center w-2/3 ml-4">
                  <img src={modalIcon} alt="avatar" className="w-8 mr-2 " />
                  <p className="small-body">Yara Ayad</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mx-auto px-8 my-4">
                <p className="w-1/3 small-text-medium text-[#616363]">
                  Department
                </p>
                <div className="flex items-center w-2/3 ml-4">
                  <p className="small-body">Assigned to </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mx-auto px-8 my-4">
                <p className="w-1/3 small-text-medium text-[#616363]">
                  Assigned to
                </p>
                <div className="flex items-center w-2/3 ml-4">
                  <p className="small-body">Marketing</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mx-auto px-8 my-4">
                <p className="w-1/3 small-text-medium text-[#616363]">Status</p>
                <div className="flex items-center w-2/3 ml-4">
                  {ticketData && (
                    <p className="small-body">{ticketData?.status}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mx-auto px-8 my-4">
                <p className="w-1/3 small-text-medium text-[#616363]">
                  Created time
                </p>
                <div className="flex items-center w-2/3 ml-4">
                  <p className="small-body">05 Jul 2023, 08:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
