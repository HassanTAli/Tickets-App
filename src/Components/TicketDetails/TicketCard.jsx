import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

import modalIcon from "../../assets/modalIcon.png";
import { getDepartments, getStatus, getTicket } from "../../axios/requests";
import Spinner from "../Spinner";
import FileInfo from "../FileInfo";
import { deleteTicket, editTicket } from "../../features/actions";
import featuredIcon from "../../assets/modalIcon.png";

const TicketCard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data: ticketData, isLoading: ticketLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
    refetchOnMount: "always",
  });

  const [subject, setSubject] = useState("");
  const [errorSubject, setErrorSubject] = useState("");
  const [from, setFrom] = useState("select");
  const [errorFrom, setErrorFrom] = useState("");
  const [to, setTo] = useState("select");
  const [errorTo, setErrorTo] = useState("");
  const [description, setDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [status, setStatus] = useState("select");
  const [errorStatus, setErrorStatus] = useState("");

  const { data } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const { data: statusData } = useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTicket(id)).then((res) => {
      console.log({ res });
      if (res.payload === 200) {
        navigate("/");
        setModalIsOpen(false);
        console.log("first");
      }
    });
  };

  const obj = { subject, from, to, status, description };
  console.log(obj);

  const onEditSubmit = (e) => {
    e.preventDefault();
    if (subject === "") {
      setErrorSubject("Please Fill this Input");
    }
    if (from === "select") {
      setErrorFrom("Please Select Option");
    }
    if (to === "select") {
      setErrorTo("Please Select Option");
    }
    if (description === "") {
      setErrorDescription("Please Fill this input");
    }
    if (status === "select") {
      setErrorStatus("Please Select Option");
    }
    if (
      status !== "select" ||
      subject !== "" ||
      description !== "" ||
      to !== "select" ||
      from !== "select"
    )
      dispatch(editTicket({ obj, id })).then((res) => {
        if (res.payload.code === 200) {
          setEditModalIsOpen(false);
        }
      });
  };

  if (ticketLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white shadow-lg rounded-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="w-full md:w-1/2 m-8 p-4 bg-white rounded-2xl"
      style={{ boxShadow: "0px 0px 4px 0px #00000014" }}
    >
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#616363",
          },
          content: {
            display: "flex",
            width: "480px",
            height: "fit-content",
            background: "#fff",
            WebkitOverflowScrolling: "touch",
            borderRadius: "12px",
            outline: "none",
            padding: "20px",
            border: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="flex flex-col items-center w-full">
          <p className="my-4 text-lg font-semibold">Are you Sure?</p>
          <form onSubmit={onSubmit}>
            <div className="flex justify-around">
              <button
                className="border-2 font-medium border-neutral-500 rounded-md px-8 py-2 my-2 mr-2 text-neutral-500"
                onClick={closeModal}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white font-medium border-2 border-red-500 rounded-md px-8 py-2 my-2"
                type="submit"
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#616363",
          },
          content: {
            display: "flex",
            width: "480px",
            height: "fit-content",
            background: "#fff",
            WebkitOverflowScrolling: "touch",
            borderRadius: "12px",
            outline: "none",
            padding: "20px",
            border: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {ticketLoading && (
          <>
            <Spinner />
          </>
        )}

        {data && (
          <div className="w-full">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img src={modalIcon} alt="plus-sign" />
                  <div className="flex flex-col ml-2">
                    <p className="font-semibold text-lg text-[#101828]">
                      Create Company Ticket
                    </p>
                    <p className="font-normal text-sm text-[#475467]">
                      Creating a new ticket to be sent between company
                      departments
                    </p>
                  </div>
                </div>
                <div>
                  <button onClick={closeModal}>X</button>
                </div>
              </div>
              <form
                className="mt-4 max-h-96 md:h-auto overflow-y-auto"
                onSubmit={onEditSubmit}
              >
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="subject"
                    className="font-medium text-sm text-[#344054]"
                  >
                    Subject*
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="What is your Subject?"
                    className="outline-none rounded-lg border px-[14px] py-[10px] border-[#D0D5DD] mt-2"
                    style={{
                      boxShadow: "0px 1px 2px 0px #1018280D",
                    }}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  {errorSubject && (
                    <p className="text-red-600">{errorSubject}</p>
                  )}
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-1/2 flex flex-col">
                    <label
                      htmlFor="from"
                      className="font-medium text-sm text-[#344054]"
                    >
                      From*
                    </label>
                    <select
                      className="outline-none rounded-lg border px-[14px] py-[10px] border-[#D0D5DD] mt-2 mr-2"
                      style={{
                        boxShadow: "0px 1px 2px 0px #1018280D",
                      }}
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    >
                      {data.map((item) => (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errorFrom && <p className="text-red-600">{errorFrom}</p>}
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label
                      htmlFor="from"
                      className="font-medium text-sm text-[#344054]"
                    >
                      To*
                    </label>
                    <select
                      className="outline-none rounded-lg border px-[14px] py-[10px] border-[#D0D5DD] mt-2 "
                      style={{
                        boxShadow: "0px 1px 2px 0px #1018280D",
                      }}
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    >
                      {data.map((item) => (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errorTo && <p className="text-red-600">{errorTo}</p>}
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="from"
                    className="font-medium text-sm text-[#344054]"
                  >
                    Status*
                  </label>
                  <select
                    className="outline-none rounded-lg border px-[14px] py-[10px] border-[#D0D5DD] mt-2 "
                    style={{
                      boxShadow: "0px 1px 2px 0px #1018280D",
                    }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {statusData.map((item) => (
                      <option value={item.name} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errorStatus && <p className="text-red-600">{errorStatus}</p>}
                </div>
                <div className="flex flex-col mt-4">
                  <label
                    htmlFor="description"
                    className="font-medium text-sm text-[#344054]"
                  >
                    Description*
                  </label>
                  <textarea
                    placeholder="e.g. I joined Stripe’s Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
                    rows={"4"}
                    className="outline-none rounded-lg border px-[14px] py-[10px] border-[#D0D5DD] mt-2 resize-none"
                    style={{
                      boxShadow: "0px 1px 2px 0px #1018280D",
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                  />
                  {errorDescription && (
                    <p className="text-red-600">{errorDescription}</p>
                  )}
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor=""></label>
                </div>
                <div className="flex flex-col mt-4">
                  <p className="font-medium text-sm text-[#344054]">
                    Attach Photo
                  </p>
                  <label
                    htmlFor="photo"
                    className="flex items-center outline-none rounded-lg border border-dashed px-2 py-2 justify-center border-[#D0D5DD] mt-2 resize-none"
                  >
                    <img src={featuredIcon} className="mr-2" />
                    <p>
                      <span>click to upload photo </span>or drag and drop
                    </p>
                  </label>
                  <input type="file" className="hidden" id="photo" />
                </div>
                <div className="flex flex-col md:flex-row mt-4 items-center justify-around">
                  <FileInfo />
                  <FileInfo />
                </div>
                <div className="flex items-center my-4">
                  <button
                    onClick={closeModal}
                    className="w-1/2 border-2 rounded-lg py-2 text-[#344054] mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-1/2 rounded-lg py-2 text-white bg-[#1B6792] ml-2"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modal>
      <div className="flex justify-between items-center pb-4 border-b-2 border-b-[#F7F6F6]">
        <div className="flex items-center">
          <img src={modalIcon} alt="avatar" className="mr-2" />
          <div>
            <p className="small-subtitles text-black">User Name</p>
            <p className="font-medium text-sm text-[#616363]">
              From: {ticketData.from}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FiEdit3 className="mr-4" size={24} onClick={openEditModal} />
          <RiDeleteBin5Line size={24} color="red" onClick={openModal} />
        </div>
      </div>
      <div className="my-4 max-h-[55vh] md:h-auto md:overflow-hidden overflow-y-scroll">
        <div>
          <p className="small-subtitles mb-2">{ticketData.subject}</p>
          <p className="font-normal text-base text-[#616363]">
            {ticketData.description}
          </p>
        </div>
        <div className="mt-5">
          <h5>
            Attachments: <span className="text-[#B9BCBC]">(3)</span>
          </h5>
          <div>
            <p className="text-sm font-medium text-[#616363] ">Images:</p>
            <div className="flex flex-col md:flex-row">
              <FileInfo />
              <FileInfo />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[#616363]">Files:</p>
            <FileInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
