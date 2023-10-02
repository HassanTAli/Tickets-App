import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "react-modal";

import logo from "../assets/noData.png";
import modalIcon from "../assets/modalIcon.png";
import { getDepartments, getStatus } from "../axios/requests";
import Spinner from "./Spinner";
import { postTicket } from "../features/actions";
import featuredIcon from "../assets/Featuredicon.png";

const date = new Date();

const NotFound = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [companyChecked, setCompanyChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [from, setFrom] = useState("select");
  const [to, setTo] = useState("select");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("select");

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
    dispatch(postTicket({ subject, from, to, status, description, date })).then(
      (res) => {
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
      }
    );
  };

  return (
    <div className="flex flex-col items-center p-12 min-h-[68vh]">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add a new Ticket"
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
      <img src={logo} alt="no-data" />
      <p className="font-semibold text-lg">No data to show</p>
      <p className="small-text-regular text-neutral-300 mt-4">
        Create a new Ticket Lorem Ipsum is simply dummy text of the printing and
        typesetting industry.
      </p>
      <button
        className="bg-[#1b6792] text-white p-2 rounded mt-8"
        onClick={openModal}
      >
        + New Ticket
      </button>
    </div>
  );
};

export default NotFound;
