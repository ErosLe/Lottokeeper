import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/apiUsers";
import "../style/Homepage.css";
export default function HomePage() {
  const [info, setInfo] = useState([]);
  const [who, setWho] = useState([]);
  const [searched, setSearched] = useState(null);
  const [isXAnimation, setIsXAnimation] = useState(true);

  const [isDoneListVisible, setIsDoneListVisible] = useState(false);

  const toggleDoneListVisibility = () => {
    setIsDoneListVisible((prev) => !prev);
  };
  const [isTodoListVisible, setIsTodoListVisible] = useState(false);

  const toggleTodoListVisibility = () => {
    setIsTodoListVisible((prev) => !prev);
  };
  const [isQuestionsListVisible, setIsQuestionsListVisible] = useState(false);

  const toggleQuestionsListVisibility = () => {
    setIsQuestionsListVisible((prev) => !prev);
  };

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
      <div className="summary-container-text-right">
        <h2 onClick={toggleDoneListVisibility}>Ami elkészült</h2>
        {isDoneListVisible && (
          <ul>
            <li>
              Főoldal ahol a látogató kezdeményezheti a belépést vagy a
              regisztrációt
            </li>
            <li>A regisztrációs oldal</li>
            <li>A bejelentkezési oldal</li>
            <li>A felhasználó, illetve az admin dashboard</li>
          </ul>
        )}
      </div>
      <div className="summary-container-text-left">
        <h2 onClick={toggleTodoListVisibility}>Ami még hátravan</h2>
        {isTodoListVisible && (
          <ul>
            <li>...többek között</li>
            <li>Sorsolás komponense és annak lefuttatása a szelvényeken</li>
            <li>
              Egyenleg módosulása a a szelvények megjátszásával, nyereménnyel,
              bevétellel
            </li>
            <li>Refaktorálás</li>
            <li>Stílus véglegesítése</li>
            <li>Architektúra optimálisabb rétegelése</li>
            <li>Hibamegelőzés finomhangolása</li>
          </ul>
        )}
      </div>
      <div className="summary-container-questions">
        <h2 onClick={toggleQuestionsListVisibility}>Kérdések</h2>
        {isQuestionsListVisible && (
          <ul>
            <li>
              Kérdés lehetett az hogy az üzemeltető miként szimulálja a
              játékost:
            </li>
            <li>
              Úgy értelmeztem a helyzetet hogy az admin -például technikai hiba
              esetén- képes szelvényt megjátszani a felhasználó nevében.
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
