import { useEffect, useState } from "react";
import "../style/NumberGenerator.css";
import { getTickets } from "../services/apiTickets";
import { Form, useForm } from "react-hook-form";
import ToTheHomePage from "./ToTheHomePage";
import { supabase } from "../services/supabase";
import { useParams } from "react-router-dom";
import { getUsers } from "../services/apiUsers";

function NumberGenerator() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [user, setUser] = useState(null);
  const param = useParams();
  useEffect(() => {
    console.log(param.id);
  }, [selectedNumbers]);
  const generateRandomNumbers = () => {
    let numbers = [];
    while (numbers.length < 5) {
      let nr = Math.floor(Math.random() * 39) + 1;
      if (!numbers.includes(nr)) {
        numbers.push(nr);
      }
    }
    setSelectedNumbers(numbers);
  };

  const selectNumber = (number) => {
    if (!selectedNumbers.includes(number)) {
      setSelectedNumbers((prevNumbers) => [...prevNumbers, number]);
    } else {
      setSelectedNumbers((prevNumbers) =>
        prevNumbers.filter((n) => n !== number)
      );
    }
  };
  let nextId;

  getTickets().then((data) => {
    nextId = data.length + 1;
  });
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: ticket, error } = await supabase.from("tickets").upsert([
        {
          id: nextId,
          created_at: new Date(),
          numbers: selectedNumbers.sort((a, b) => a - b),
          winner: "FALSE",
          userId: param.id,
        },
      ]);

      if (error) {
        console.error(error);
      } else {
        console.log("Ticket created:", ticket);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form control={control} onSubmit={handleSubmit(onSubmit)}>
        <button onClick={generateRandomNumbers}>
          Generálj 5 véletlen számot
        </button>

        <div>
          <div>
            <p>
              Kiválasztott vagy generált számok: {selectedNumbers.join(" - ")}
            </p>
          </div>
          <div>
            <p>Válassz egy számot: </p>
          </div>
        </div>
        <div>
          {[...Array(39).keys()].map((number) => (
            <button
              id="num-button"
              key={number}
              onClick={() => selectNumber(number + 1)}
              style={{
                backgroundColor: selectedNumbers.includes(number + 1)
                  ? "#4caf50"
                  : "transparent",
                color: selectedNumbers.includes(number + 1)
                  ? "#ffffff"
                  : "black",
              }}
            >
              {number + 1}
            </button>
          ))}
        </div>

        <button type="submit">Beküldés</button>
        <div>
          <ToTheHomePage />
        </div>
      </Form>{" "}
    </>
  );
}

export default NumberGenerator;
