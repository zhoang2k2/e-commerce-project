import Navbar from "../components/Navbar/Navbar";
import NavbarRoutes from "../routes/NavbarRoutes";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="content-container">
        <div className="content-body">
          <NavbarRoutes />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
