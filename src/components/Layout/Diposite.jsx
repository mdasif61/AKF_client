import React, { useContext, useState } from "react";
import SideNav from "./SideNav";
import dipoLogo from "/public/Images/logo.png";
import "./Css/Diposite.css";
import { addToDb } from "../../../postStored";
import { mainContext } from "../NavPage/AuthProvider";
import useTitle from "../hooks/useTitle";

const Diposite = () => {
  useTitle("Diposite")
  const [pinAll, setPin] = useState("");
  const { info } = useContext(mainContext);
  const [error,setError]=useState(null)

  const makePin = () => {
    let random = Math.floor(Math.random() * 10000);
    const pinStr = random + "";
    if (pinStr.length === 4) {
      setPin(random);
    } else {
      return;
    }
  };

  const handleDiposite = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const address = form.address.value;
    const monthFee = form.monthFee.value;
    const specialFund = form.specialFund.value;
    const pin = form.pin.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const blood = form.blood.value;
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const time = date.getTime();

    if(name==""){
      setError("name has been required!")
      return;
    }else if(address==""){
      setError("address has been required!")
      return;
    }else if(monthFee==""){
      setError("month fee has been required!")
      return;
    }else if(specialFund==""){
      setError("special fund has been required!")
      return;
    }else if(pin==""){
      setError("pin has been required!")
      return;
    }else if(phone==""){
      setError("phone has been required!")
      return;
    }else if(email==""){
      setError("email has been required!")
      return;
    }else if(blood==""){
      setError("blood has been required!")
      return;
    }else if(!email.includes("@")){
      setError("email not found!");
      return;
    }

    // let infoList=[];
    const allInfo = {
      name,
      address,
      monthFee,
      specialFund,
      pin,
      phone,
      email,
      blood,
      year,
      day,
      month,
      time,
    };

    // info(name,address,monthFee,specialFund,pin,phone,email,blood)
    addToDb(allInfo);
    form.reset();
    setError("")
    setPin(null)
  };

  return (
    <div>
      <SideNav>
        <div className="flex p-20 items-center h-full justify-center flex-col">
          <div className="mb-10">
            <img className="w-[50%] mx-auto" src={dipoLogo} alt="" />
            <p className="text-center font-bold">
              Provide Your Valid Diposite Info...
            </p>
            <p className="text-red-500 text-center font-bold mt-3">{error}</p>
          </div>

          <form onSubmit={handleDiposite}>
            <div className="w-full dipositeInfo">
              <div className="inputName m-2 flex rounded-full overflow-hidden">
                <div className="h-10 flex items-center justify-center absolute bg-cyan-700 text-white w-32 rounded-full z-30">
                  Name
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  id=""
                  className="w-full relative pl-36 h-10"
                />
              </div>

              <div className="inputName m-2 flex rounded-full overflow-hidden">
                <div className="h-10 flex items-center justify-center absolute bg-cyan-700 text-white w-32 rounded-full z-30">
                  Address
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  id=""
                  className="w-full relative pl-36 h-10"
                />
              </div>

              <div className="inputName m-2 flex rounded-full overflow-hidden">
                <div className="h-10 flex items-center justify-center absolute bg-cyan-700 text-white w-32 rounded-full z-30">
                  Monthly Fee
                </div>
                <input
                  type="text"
                  name="monthFee"
                  placeholder="Monthly Fee"
                  id=""
                  className="w-full relative pl-36 h-10"
                />
              </div>

              <div className="inputName m-2 flex rounded-full overflow-hidden">
                <div className="h-10 flex items-center justify-center absolute bg-cyan-700 text-white w-32 rounded-full z-30">
                  Special Fund
                </div>
                <input
                  type="text"
                  name="specialFund"
                  placeholder="Special Fund"
                  id=""
                  className="w-full relative pl-36 h-10"
                />
              </div>

              <div className="inputName cursor-pointer m-2 flex rounded-full overflow-hidden">
                <div
                  onClick={makePin}
                  className="h-10 flex items-center justify-center absolute bg-green-700 hover:bg-green-600 text-white font-bold w-32 rounded-full z-30"
                >
                  Make Pin
                </div>
                <input
                  type="text"
                  name="pin"
                  placeholder="Pin"
                  id=""
                  value={pinAll}
                  readOnly
                  className="w-full relative pl-36 h-10 pointer-events-none"
                />
              </div>
              <div className="inputName m-2 flex rounded-full overflow-hidden">
                <div className="h-10 flex items-center justify-center absolute bg-cyan-700 text-white w-32 rounded-full z-30">
                  Phone
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Your Phone"
                  id=""
                  className="w-full relative pl-36 h-10"
                />
              </div>
              <div className="inputName m-2 flex rounded-full overflow-hidden">
                <div className="h-10 flex items-center justify-center absolute bg-cyan-700 text-white w-32 rounded-full z-30">
                  Email
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                  id=""
                  className="w-full relative pl-36 h-10"
                />
              </div>
              <div className="inputName m-2 flex rounded-full overflow-hidden">
                <div className="h-10 flex items-center justify-center absolute bg-cyan-700 text-white w-32 rounded-full z-30">
                  Blood
                </div>
                <input
                  type="text"
                  name="blood"
                  placeholder="Enter Your Blood Group"
                  id=""
                  className="w-full relative pl-36 h-10"
                />
              </div>
            </div>
            <div className="text-center">
              <button className="btn w-32 mt-10">Diposite</button>
            </div>
          </form>
        </div>
      </SideNav>
    </div>
  );
};

export default Diposite;
