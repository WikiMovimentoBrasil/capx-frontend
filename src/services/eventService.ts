import { Event } from "@/types/event";
import axios from "axios";

export const eventsService = {
  async getEventById(eventId: number, token: string): Promise<Event> {
    try {
      const response = await axios.get(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw error;
    }
  },
};
