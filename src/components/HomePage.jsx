import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/apiUsers";
import "../style/Homepage.css";
export default function HomePage() {
  const [info, setInfo] = useState([]);
  const [who, setWho] = useState([]);
  const [searched, setSearched] = useState(null);
  const [isXAnimation, setIsXAnimation] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsXAnimation((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  const toTheCustomer = async () => {
    const userInput = prompt("Kérlek írd be a felhasználóneved");
    if (userInput && userInput.trim() !== "") {
      setSearched(userInput);
      const data = await getUsers();
      const userExists = data.some((item) => item.fullName === userInput);
      if (userExists) {
        const foundUser = data.find((item) => item.fullName === userInput);
        navigate(`customer/${foundUser.id}`);
      } else {
        navigate("create");
      }
    } else {
      navigate("create");
    }
  };

  console.log(info);
  return (
    <>
      <div
        id="otext"
        className={`overlay-text${
          isXAnimation ? "-animate-spin-slow-x" : "-animate-spin-slow-y"
        }`}
      >
        Lottokeeper
      </div>
      <div className="background"></div>
      <div className="button-container">
        <button
          onClick={() => {
            return navigate("create");
          }}
          className="registration-button"
        >
          Regisztráció
        </button>
        <button onClick={toTheCustomer} className="login-button">
          Belépés
        </button>
      </div>
      <div className="summary-container text-right">
        <h2>Összefoglaló</h2>
        <ul>
          <li>Soroslás komponens</li>
        </ul>
      </div>
    </>
  );
}
