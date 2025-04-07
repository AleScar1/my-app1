import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import Welcome from "./components/Welcome";
import AllTheBooks from "./components/AllTheBooks";
import MyFooterComponent from "./components/MyFooterComponent";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <NavbarComponent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Container>
        <Welcome />
        <AllTheBooks searchQuery={searchQuery} />
      </Container>
      <MyFooterComponent />
    </div>
  );
};

export default App;