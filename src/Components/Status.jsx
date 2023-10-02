import { FaChevronRight } from "react-icons/fa";
import styles from "./Status.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../axios/requests";
import { useEffect } from "react";
import { setCredentials } from "../features/ticketSlice";

const Status = () => {
  const dispatch = useDispatch();
  const { allTickets } = useSelector((state) => state.ticket);
  const { data } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  const openTickets = allTickets.filter((item) => item.status === "Open");
  const openTicketsCount = openTickets.length;

  const inProgressTickets = allTickets.filter(
    (item) => item.status === "InProgress"
  );
  const inProgressTicketsCount = inProgressTickets.length;

  const closedTickets = allTickets.filter((item) => item.status === "Closed");
  const closedTicketsCount = closedTickets.length;

  return (
    <div className="hidden md:block">
      <ul>
        <li className={`${styles.listItemFilter}`}>
          <p className="caption">
            All Tickets <span>({allTickets.length})</span>
          </p>
          <FaChevronRight className="text-neutral-300" />
        </li>
        <li className={`${styles.listItemFilter}`}>
          <div>
            <p className="caption">
              Open <span>({openTicketsCount})</span>
            </p>
          </div>
          <FaChevronRight className="text-neutral-300" />
        </li>
        <li className={`${styles.listItemFilter}`}>
          <div>
            <p className="caption">
              In Progress <span>({inProgressTicketsCount})</span>
            </p>
          </div>
          <FaChevronRight className="text-neutral-300" />
        </li>
        <li className={`${styles.listItemFilter}`}>
          <div>
            <p className="caption">
              Closed <span>({closedTicketsCount})</span>
            </p>
          </div>
          <FaChevronRight className="text-neutral-300" />
        </li>
      </ul>
    </div>
  );
};

export default Status;
