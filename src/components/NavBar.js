import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar({ darkMode, toggleDarkMode }) {  // ✅ Receive props from App.js
  const navigate = useNavigate();

  const handleFavoritesButtonClick = () => {
    navigate("/favorites");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#ff5733" }}>
      <Container>
        {/* Logo on the Left */}
        <Navbar.Brand 
          onClick={() => navigate("/")} 
          className="navbar-brand" 
          style={{ cursor: "pointer" }}
        >
          <b>Daily Digest</b>
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Align buttons to the Right */}
        <Navbar.Collapse id="basic-navbar-nav" className="ms-auto justify-content-end">
          <Button 
            className="custom-button" 
            onClick={handleFavoritesButtonClick} 
          >
            <span style={{ color: "red" }}>❤</span> Favorites
          </Button>

          <Button 
            className="custom-button ms-2" 
            onClick={toggleDarkMode} // ✅ Use toggleDarkMode from App.js
          >
            {darkMode ? "🌙" : "☀️"} {/* ✅ Change icon based on theme */}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
