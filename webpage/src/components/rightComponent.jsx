import React, { useEffect, useState } from "react";
import "./../styles/rightComponent.css";
import Popup from "./popup";
import { useQuery } from "@apollo/client";
import { GET_DATA_RIGHT } from "../GraphQL/querry";

const RightComponent = () => {
  const [popup, popupOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_DATA_RIGHT);
  // useEffect(() => {
  //   console.log(loading, error, data)
  // },[loading, error, data])

  console.log(data);

  const heading = (data) => {
    if (loading) return "loading";
    if (error) return "error";
    return data.getAllContentData[0].rightheading;
  };

  const para = (data) => {
    if (loading) return "loading";
    if (error) return "error";
    return data.getAllContentData[0].rightpara;
  };

  return (
    <>
      <ul id="nav-bar">
        <li>
          <a href="">About</a>
        </li>
        <li>
          <a href="">Blog</a>
        </li>
        <li>
          <a href="">Careers</a>
        </li>
        <li>
          <a data-testid='contact' onClick={() => popupOpen(true)}>Contacts</a>
        </li>
      </ul>

      <h1 className='right-heading'>{heading(data)}</h1>
      <p className='right-para'>{para(data)}</p>

      <div id="badges">
        <img id="fb-badge" />
        <img id="li-badge" />
        <img id="tw-badge" />
      </div>

      {/* {popup && <Popup data-testid='popup-box' popupOpen={popupOpen} />} */}
    </>
  );
};

export default RightComponent;
