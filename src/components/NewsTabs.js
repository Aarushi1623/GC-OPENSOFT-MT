import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import "../App.css"; // Import CSS file

function NewsTabs() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setDarkMode(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleThemeChange);
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Nav
      fill
      variant="tabs"
      defaultActiveKey="general"
      className={darkMode ? "dark-mode-tabs" : "light-mode-tabs"}
    >
      <Nav.Item>
        <Nav.Link onClick={() => scrollToSection("general")} className="custom-nav-link">
          General
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => scrollToSection("business")} className="custom-nav-link">
          Business
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => scrollToSection("entertainment")} className="custom-nav-link">
          Entertainment
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => scrollToSection("health")} className="custom-nav-link">
          Health
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => scrollToSection("science")} className="custom-nav-link">
          Science
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => scrollToSection("sports")} className="custom-nav-link">
          Sports
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => scrollToSection("technology")} className="custom-nav-link">
          Technology
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NewsTabs;
