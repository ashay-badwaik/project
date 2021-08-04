import React, { Component } from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA_LEFT } from "../GraphQL/querry";
import "./../styles/leftComponent.css";

const LeftComponent = () => {
  const { loading, error, data } = useQuery(GET_DATA_LEFT);

  // console.log(data);

  const heading = (data) => {
    if (loading) return "loading";
    if (error) return "Error";
    return data.getAllContentData[0].leftheading;
  };

  const para = (data) => {
    if (loading) return "loading";
    if (error) return "Error";
    return data.getAllContentData[0].leftpara;
  };

  

  return (
    <div className="left">
      <img id="catAndDog" />
      
      <h1 id="heading" data-testid="heading">{heading(data)}</h1>
      <p id="paragraph" data-testid="para">{para(data)}</p>

      <div className="store-badges">
        <a href="https://www.apple.com/in/app-store/" data-testid='appstore'>
          <img id="appStoreBadge" />
        </a>
        <a href="https://play.google.com/store" data-testid='playstore'>
          <img id="playStoreBadge" />
        </a>
      </div>
    </div>
  );
};

export default LeftComponent;
