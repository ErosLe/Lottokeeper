import { supabase } from "./supabase";

export async function getTickets() {
  const { data, error } = await supabase.from("tickets").select("*");

  if (error) {
    console.error(error);
    throw new Error("Tickets could not be allowed");
  }
  return data;
}
export async function createTicket(ticket) {
  const { data, error } = await supabase.from("tickets").insert([ticket]);

  if (error) {
    console.error(error);
    throw new Error("Ticket could not be created");
  }
  return data;
}
