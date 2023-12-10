import { supabase } from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be allowed");
  }
  return data;
}
export async function createUser() {
  const { data, error } = await supabase.from("users").insert([]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
  return data;
}
export async function deleteUser(id) {
  const { data, error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
  return data;
}
export async function updateUser(id, updatedData) {
  const { data, error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("User could not be updated");
  }
  return data;
}
