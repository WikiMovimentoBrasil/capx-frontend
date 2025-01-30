import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { eventsService } from "@/services/eventService";

export function useEvent(eventId?: number, token?: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!token || !eventId) return;

      setIsLoading(true);
      try {
        const eventData = await eventsService.getEventById(eventId, token);
        setEvent(eventData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch event")
        );
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, token]);

  const createEvent = async (data: Partial<Event>) => {
    if (!token) return;
    try {
      const response = await eventsService.createEvent(data, token);
      console.log("Service response:", response);
      return response;
    } catch (error) {
      console.error("Error in createEvent hook:", error);
      setError(
        error instanceof Error ? error : new Error("Failed to create event")
      );
      throw error;
    }
  };

  const updateEvent = async (eventId: number, data: Partial<Event>) => {
    if (!token || !eventId) return;
    try {
      await eventsService.updateEvent(eventId, data, token);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to update event")
      );
    }
  };

  const deleteEvent = async (eventId: number, token: string) => {
    if (!token || !eventId) return;
    try {
      await eventsService.deleteEvent(eventId, token);
      setEvent(null);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to delete event")
      );
    }
  };

  return {
    event,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}

export function useEvents(events: Event[], token?: string) {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!token || !events?.length) return;

      setIsLoading(true);
      try {
        const eventPromises = events.map((event) =>
          eventsService.getEventById(event.id, token)
        );
        const eventsData = await Promise.all(eventPromises);
        setEventsData(eventsData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch events")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [events, token]);

  return {
    events,
    isLoading,
    error,
  };
}
