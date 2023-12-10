import { Form, useForm } from "react-hook-form";
import { supabase } from "../services/supabase";
import { getUsers } from "../services/apiUsers";
import ToTheHomePage from "./ToTheHomePage";
import { useEffect, useState } from "react";
import "../style/CreateUser.css";

function CreateUserForm() {
  const [nextId, setNextId] = useState();
  useEffect(() => {
    getUsers().then((data) => {
      setNextId(data.length + 1);
    });
  }, []);
  console.log(nextId);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setNextId((prevId) => prevId + 1);
      const { data: user, error } = await supabase.from("users").upsert([
        {
          id: nextId,
          created_at: new Date(),
          fullName: data.fullName,
          balance: 10000,
        },
      ]);
      if (error) {
        console.error(error);
      } else {
        console.log("User created:", user);
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form control={control} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullName">Felhasználónév:</label>
          <input
            {...register("fullName", { required: "Full Name is required" })}
          />
          <button id="add" type="submit">
            Add User
          </button>
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>
        <div>
          <ToTheHomePage />
        </div>
      </Form>
    </>
  );
}

export default CreateUserForm;
