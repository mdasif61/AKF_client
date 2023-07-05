import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import historyLogo from "/public/Images/logo.png";
import "./Css/History.css";
import { removeHistory } from "../../../postStored";
import useTitle from "../hooks/useTitle";

const History = () => {
  useTitle("History")
  const [info, setInfo] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("Info"));
    setInfo(local);
  }, []);

  const handleRemove = () => {
    setModal(!modal);
  };
  const handleOk = (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText == "YES") {
      removeHistory();
      setInfo([]);
      setModal(!modal);
    }
  };
  const handleCancel = (e) => {
    if (e.target.innerText == "CANCEL") {
      setModal(!modal);
      return;
    }
  };

  return (
    <div>
      <SideNav>
        <div className="flex relative flex-col items-center justify-center h-full">
          <div className="mb-5">
            <img className="w-[40%] mx-auto" src={historyLogo} alt="" />
          </div>

          <div className="w-full px-10 infoDiv">
            <table className="tableBody w-full text-center">
              <thead className="sticky top-0 z-30">
                <tr className="text-sm">
                  <th>SL.</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Monthly Fee</th>
                  <th>Special Fund</th>
                  <th>Pin</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Blood</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {info?.map((inf, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{inf.name}</td>
                    <td>{inf.address}</td>
                    <td>{inf.monthFee}</td>
                    <td>{inf.specialFund}</td>
                    <td>{inf.pin}</td>
                    <td>{inf.phone}</td>
                    <td>{inf.email}</td>
                    <td>{inf.blood}</td>
                    <td>{`${inf.day}/${inf.month}/${inf.year}`} <span className="text-gray-500">{inf.time}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleRemove} className="clear btn mt-6">
            Clear History
          </button>
          {modal && (
            <div className="bg-white h-36 w-64 flex flex-col items-center justify-center rounded-box shadow-lg anim">
              <p>Are You Sure?</p>
              <div>
                <button
                  onClick={handleOk}
                  className="btn btn-primary mx-2 my-3"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-warning mx-2 my-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </SideNav>
    </div>
  );
};

export default History;
