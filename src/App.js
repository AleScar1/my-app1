import React, { useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponente from './components/NavbarComponente';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from "./components/Welcome";
import AllTheBooks from "./components/AllTheBooks";
import MyFooterComponent from "./components/MyFooterComponent";
import CommentArea from "./components/CommentArea";
import BookDetails from "./components/BookDetails";
import NotFound from "./components/NotFound";
import fantasy from "./books/fantasy.json";

export const ThemeContext = createContext();

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("light");
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleBookSelect = (asin) => {
    setSelectedBookAsin(asin);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <NavbarComponente searchQuery={searchQuery} handleSearch={setSearchQuery} />
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Welcome />
                  <Row>
                    <Col md={8}>
                      <AllTheBooks
                        books={fantasy}
                        searchQuery={searchQuery}
                        onBookSelect={handleBookSelect}
                        selectedBookAsin={selectedBookAsin}
                      />
                    </Col>
                    <Col md={4}>
                      <CommentArea asin={selectedBookAsin} enableActions />
                    </Col>
                  </Row>
                </>
              }
            />
            <Route path="/book/:asin" element={<BookDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <MyFooterComponent />
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
