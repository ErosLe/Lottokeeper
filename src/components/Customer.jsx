import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/apiUsers";
import { Form, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ToTheHomePage from "./ToTheHomePage";
import NumberGenerator from "./NumberGenerator";
import { createTicket, getTickets } from "../services/apiTickets";
import { useMutation } from "@tanstack/react-query";
import "../style/Customer.css";

function Customer() {
  const [info, setInfo] = useState([]);
  const [who, setWho] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [thesetickets, setThesetickets] = useState([]);
  const param = useParams();
  console.log(param.id);

  useEffect(() => {
    getUsers().then((data) => {
      setWho(data.filter((el) => el.id == param.id));
    });
    getUsers().then((data) => {
      setInfo(data);
    });
    getTickets().then((data) => {
      setTickets(data);
    });

    getTickets().then((data) => {
      setThesetickets(data.filter((el) => el.userId == param.id));
    });
    console.log(param.id);
  }, [param]);
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = info.filter((user) => user.id !== userId);
      setInfo(updatedUsers);
    } catch (error) {
      console.error("Hiba történt a felhasználó törlése közben", error);
    }
  };

  return (
    <>
      <div>
        {who && (
          <ol>
            {who.map((items) =>
              items.fullName == "admin" ? (
                info.map(
                  (el) =>
                    el.fullName != "admin" && (
                      <>
                        {/**/}{" "}
                        {/* <div>
                          <br />
                          <button onClick={setVisibility}>
                            szelvények megjátszása
                          </button>
                        </div> */}
                        <li key={el.id} style={{ color: "black" }}>
                          <p>Felhasználónév: {el.fullName}</p>
                          <p>Egyenleg: {el.balance}</p>
                          <br />

                          <NumberGenerator
                            userid={param.id}
                            style={{
                              visibility: visibility ? "visible" : "hidden",
                            }}
                          />
                          <button onClick={() => handleDeleteUser(el.id)}>
                            felhasználó törlése
                          </button>
                          <br />
                        </li>
                        <hr />
                      </>
                    )
                )
              ) : (
                <>
                  <div
                    style={{
                      visibility: visibility ? "visible" : "hidden",
                    }}
                  >
                    <NumberGenerator />
                  </div>
                  <li key={items.id} style={{ color: "green" }}>
                    <p>Felhasználónév: {items.fullName}</p>
                    <p>Egyenleg: {items.balance}</p>
                  </li>
                  <div>
                    <button onClick={setVisibility}>
                      szelvények megjátszása
                    </button>
                  </div>
                </>
              )
            )}
          </ol>
        )}
        <ToTheHomePage />
      </div>
      <div>
        {who && (
          <ol>
            {who.map((items) =>
              items.fullName == "admin"
                ? tickets.map((el) => (
                    <>
                      <li key={el.id} style={{ color: "black" }}>
                        <p>szelvény azonosítója: {el.id}</p>
                        <p>szelvény számai: {el.numbers}</p>
                        <br />
                      </li>
                      <hr />
                    </>
                  ))
                : thesetickets.map((element) => (
                    <>
                      {element.userId == param.id}
                      <li key={element.id} style={{ color: "green" }}>
                        <p>szelvény azonosítója: {element.id}</p>
                        <p>szelvény számai: {element.numbers}</p>
                        <hr />
                      </li>
                    </>
                  ))
            )}
          </ol>
        )}
      </div>
    </>
  );
}
export default Customer;
