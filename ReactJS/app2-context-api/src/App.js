import logo from "./logo.svg";
import "./App.css";
import ThemeProvider from "./ThemeProvider";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Header from "./Components/Header";
import Products from "./Components/Products";
import Electronics from "./Components/Electronics";
import Clothing from "./Components/Clothing";
function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Button>Light Theme Button</Button>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/products" exact element={<Products />}>
            <Route path="/products/electronics" element={<Electronics />} />
            <Route path="/products/clothing" element={<Clothing />} />
          </Route> */}
          <Route path="/products" element={<Products />}>
            <Route
              path="/products/electronics"
              element={<Electronics />}
              exact
            />
            <Route path="/products/clothing" element={<Clothing />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
