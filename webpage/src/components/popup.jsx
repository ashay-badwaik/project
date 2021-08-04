import React, { useState } from "react";
import "./../styles/popup.css";
import { SEND_MESSAGE } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { popupOpen } from './rightComponent';

const Popup = ({ popupOpen }) => {
  
  const [name, setName] = useState("abcde");
  const [email, setEmail] = useState("abcde@mail.com");
  const [message, setMessage] = useState("hi");

  const [success, isSuccess] = useState(false);

  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE);

  const submit = () => {
    
    sendMessage({
      variables: { name: name, email: email, message: message },
    });
    
    setName("");
    setEmail("");
    setMessage("");

    isSuccess(true);
    
  };

  

  if (loading) return <p data-testid="loading">Sending message...</p>;
  if (error) return <p data-testid="error">Some error occured...</p>;


  return (
    <div className="background">
      <div id="container" data-testid='popup-box'>
        <div className="close-btn" data-testid="close-button" onClick={() => popupOpen(false)}></div>
        
        <div className="header">
          <h1 className='popup-heading'>Contact</h1>
          <p className='popup-para'>Lorem Ipsum is simply dummy text of the printing</p>
        </div>

        <div className="input-fields name">
          <label className="input-q">Name</label>
          <input
            className="input-a"
            name="name"
            type="text"
            data-testid="name-input"
            placeholder="Enter your name here"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="input-fields email">
          <label className="input-q">Email</label>
          <input
            className="input-a"
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Enter your email here"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="input-fields message">
          <label className="input-q">Message</label>
          <input
            className="input-a"
            type="text"
            name="message"
            data-testid="message-input"
            placeholder="Wanna share something with us"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>

        <button
          type="reset"
          data-testid="submit-button"
          className="submit"
          onClick={() => {submit()}}
        >
          Submit
        </button>
        
        <h1 className='success-message'>{success && 'Message sent'}</h1>

        <div className="footer">
          <p className='popup-footer-para'>Need more info? hello@newzera.com</p>
        </div>



        <div id="popup-badges">
          <img id="fb-badge" />
          <img id="li-badge" />
          <img id="tw-badge" />
        </div>
      </div>
    </div>
  );
};

export default Popup;
