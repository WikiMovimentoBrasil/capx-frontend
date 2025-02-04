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
      if (!response || !response.id) {
        throw new Error("Invalid event response from server");
      }
      setEvent(response);
      return response;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to create event")
      );
      throw error;
    }
  };

  const updateEvent = async (eventId: number, data: Partial<Event>) => {
    if (!token || !eventId) return;
    try {
      console.log("Token being used:", token);
      console.log("Event data being sent:", data);
      const response = await eventsService.updateEvent(eventId, data, token);
      if (!response || !response.id) {
        throw new Error("Invalid event response from server");
      }
      setEvent(response);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Failed to update event")
      );
    }
  };

  const deleteEvent = async (eventId: number) => {
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

export function useEvents(eventIds?: number[], token?: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!token || !eventIds?.length) return;

      setIsLoading(true);
      try {
        const eventPromises = eventIds.map((id) =>
          eventsService.getEventById(id, token)
        );
        const eventsData = await Promise.all(eventPromises);
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch events")
        );
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [eventIds, token]);

  return {
    events,
    isLoading,
    error,
  };
}
