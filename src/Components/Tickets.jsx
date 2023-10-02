import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import NotFound from "./NotFound";
import { getTickets } from "../axios/requests";
import Spinner from "./Spinner";
import styles from "./Tickets.module.css";

const Tickets = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    refetchInterval: 500,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white shadow-lg rounded-lg">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white shadow-lg rounded-lg">
        Something Want Wrong
      </div>
    );
  }

  const onBorderHandler = (type) => {
    switch (type) {
      case "Open":
        return "border-l-4 border-l-[#5FD971]";
      case "InProgress":
        return "border-l-4 border-l-[#5B8DEF]";
      case "Closed":
        return "border-l-4 border-l-[#B9BCBC]";
      default:
        break;
    }
  };

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

  console.log({ data });

  return (
    <div className="bg-white rounded-lg w-full overflow-y-scroll h-[69vh]">
      {data && (
        <div>
          <table className={`${styles.table} w-full`}>
            {
              <thead
                className={`${data.length === 0 && "hidden"} bg-neutral-50`}
              >
                <tr>
                  <th className="min-w-[8rem]">Subject</th>
                  <th className="min-w-[8rem]">From</th>
                  <th className="min-w-[8rem]">To</th>
                  <th className="min-w-[8rem]">Date</th>
                  <th className="min-w-[8rem]">Description</th>
                  <th className="min-w-[10rem]">Status</th>
                </tr>
              </thead>
            }
            <tbody>
              {data.map((row) => {
                return (
                  <tr
                    key={row.id}
                    onClick={() => navigate(`/${row.id}`)}
                    className={`cursor-pointer ${onBorderHandler(row.status)}`}
                  >
                    <td>{row.subject}</td>
                    <td>{row.from}</td>
                    <td>{row.to}</td>
                    <td>
                      {new Date(row.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-ellipsis max-w-[8rem] overflow-hidden whitespace-nowrap">
                      {row.description}
                    </td>
                    <td>
                      <div
                        className={`${onStatusHandler(
                          row.status
                        )} text-center p-2 rounded font-semibold text-sm w-2/3`}
                      >
                        {row.status}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {data.length === 0 && <NotFound />}
    </div>
  );
};

export default Tickets;
