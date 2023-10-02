import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import featuredIcon from "../assets/Featuredicon.png";
import modalIcon from "../assets/modalIcon.png";
import { getDepartments, getStatus } from "../axios/requests";
import Spinner from "./Spinner";
import { postTicket } from "../features/actions";
import FileInfo from "./FileInfo";

const date = new Date();

const Search = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [companyChecked, setCompanyChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState("");
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

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ticket);

  const { data, isLoading, isError } = useQuery({
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
    setChecked(false);
    setCompanyChecked(false);
    setShowCreate(false);
    setError("");
  };

  const onContinueHandler = () => {
    if (checked === false && companyChecked === false) {
      setError("Please select an Option");
    } else {
      setShowCreate(true);
    }
  };

  const onSubmit = (e) => {
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
      dispatch(
        postTicket({ subject, from, to, status, description, date })
      ).then((res) => {
        if (res.payload.code === 201) {
          setModalIsOpen(false);
          setChecked(false);
          setCompanyChecked(false);
          setShowCreate(false);
          setError("");
          setSubject("");
          setFrom("select");
          setTo("select");
          setStatus("select");
          setDescription("");
        }
      });
  };

  return (
    <div className="bg-white rounded-lg w-full mb-4 p-4 flex items-center justify-between">
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
        {isLoading && (
          <>
            <Spinner />
          </>
        )}
        {isError && <p>Something Want Wrong </p>}
        {showCreate ? (
          <div className="w-full">
            {companyChecked ? (
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
                  onSubmit={onSubmit}
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
                        defaultValue="select"
                      >
                        <option value="select" disabled>
                          Select Department
                        </option>
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
                        defaultValue="select"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      >
                        <option value="select" disabled>
                          Select Department
                        </option>
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
                      defaultValue="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="select" disabled>
                        Select Status
                      </option>
                      {statusData.map((item) => (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errorStatus && (
                      <p className="text-red-600">{errorStatus}</p>
                    )}
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
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <Spinner />
                        </span>
                      ) : (
                        "Create"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <button onClick={closeModal}>X</button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img src={modalIcon} alt="plus-sign" />
                <div className="flex flex-col ml-2">
                  <p className="font-semibold text-lg text-[#101828]">
                    Create Now Ticket
                  </p>
                  <p className="font-normal text-sm text-[#475467]">
                    Chose Ticket type to create new ticket
                  </p>
                </div>
              </div>
              <div>
                <button onClick={closeModal}>X</button>
              </div>
            </div>
            <div
              className={`${
                companyChecked === true
                  ? "border-[#1B6792] bg-[#EDF3F6]"
                  : "border-[#E4E7EC]"
              }  my-8 border-2  rounded-xl p-4 hover:cursor-pointer`}
              onClick={() => {
                setCompanyChecked((prev) => !prev);
                setChecked(false);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img src={modalIcon} alt="plus sign" />
                  <div className="flex flex-col ml-2">
                    <p className="font-medium text-sm text-[#101828]">
                      Create Company Ticket
                    </p>
                    <p className="font-normal text-sm text-[#475467]">
                      Creating a new ticket to be sent between company
                      departments
                    </p>
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="checkOne"
                    id="checkOne"
                    checked={companyChecked}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                checked === true
                  ? "border-[#1B6792] bg-[#EDF3F6]"
                  : "border-[#E4E7EC]"
              }  my-8 border-2  rounded-xl p-4 hover:cursor-pointer`}
              onClick={() => {
                setChecked((prev) => !prev);
                setCompanyChecked(false);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img src={modalIcon} alt="plus sign" />
                  <div className="flex flex-col ml-2">
                    <p className="font-medium text-sm text-[#101828]">
                      Create Support Ticket
                    </p>
                    <p className="font-normal text-sm text-[#475467]">
                      Creating a new ticket to be sent to a department in
                      another company
                    </p>
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="checkTwo"
                    id="checkTwo"
                    checked={checked}
                  />
                </div>
              </div>
            </div>
            {error !== "" && (
              <p className="text-red-700 text-center">{error}</p>
            )}
            <div className="flex items-center my-4">
              <button
                onClick={closeModal}
                className="w-1/2 border-2 rounded-lg py-2 text-[#344054] mr-2"
              >
                Cancel
              </button>
              <button
                className="w-1/2 rounded-lg py-2 text-white bg-[#1B6792] ml-2"
                onClick={onContinueHandler}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </Modal>
      <h5 className="hidden md:block font-medium text-base">My Tickets</h5>
      <div className="hidden md:flex items-center justify-between border-x border-neutral-200 px-8 w-3/4">
        <div className="text-neutral-300 font-normal text-sm">view(0)</div>
        <div className="flex items-center bg-neutral-50 p-2 mx-4 rounded w-3/4">
          <AiOutlineSearch className="text-neutral-400 mr-2" size={24} />
          <input
            className="outline-none bg-neutral-50 w-full"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <div className="bg-neutral-50 p-2 rounded ">
          <AiOutlineFilter className="text-neutral-400" size={24} />
        </div>
      </div>
      <input
        placeholder="Search.."
        className="border-b-2 border-b-[#1b6792] p-2 outline-none w-2/5 md:hidden"
      />
      <div>
        <button
          className="bg-[#1b6792] text-white p-2 rounded"
          onClick={openModal}
        >
          + New Tickets
        </button>
      </div>
    </div>
  );
};

export default Search;
