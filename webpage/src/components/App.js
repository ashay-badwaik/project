import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./../styles/App.css";
import LeftComponent from "./leftComponent";
import Slider from "./slider";
import Popup from "./popup";
import { useState } from "react";


const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  const [popup, popupOpen] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">

        <div id="left-box">
          <LeftComponent />
        </div>

        <div id="right-box">
          <Slider />
        </div>
      
        {popup && <Popup data-testid='popup-box' popupOpen={popupOpen} />}
      </div>
      
    </ApolloProvider>
  );
}

export default App;
