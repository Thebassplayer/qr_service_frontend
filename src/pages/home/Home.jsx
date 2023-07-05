// Icons
import { RiProductHuntLine } from "react-icons/ri";

// React Router
import { Link } from "react-router-dom";

// Components
import { ShowOnLogOut, ShowOnLogIn } from "../../components/protect/HiddenLink";

// Styles
import "./Home.scss";

// Images
import heroImg from "../../assets/inv-img.png";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>
        <ul className="home-links">
          <ShowOnLogOut>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogOut>
          <ShowOnLogOut>
            <li>
              <button className="--btn --btn-primary">
                <Link to="login">Login</Link>
              </button>
            </li>
          </ShowOnLogOut>
          <ShowOnLogIn>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogIn>
        </ul>
      </nav>
      {/*Hero Section*/}
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory & Stock Management System</h2>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
          <div className="hero-button">
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num={"45K"} text={"Brand Owners"} />
            <NumberText num={"123K"} text={"Active Users"} />
            <NumberText num={"500K"} text={"Partners"} />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Invention" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
