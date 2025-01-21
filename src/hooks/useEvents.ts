import { useState, useEffect } from "react";
import { Event } from "@/types/event";
import { eventsService } from "@/services/eventService";

export function useEvent(eventId: number, token?: string) {
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

  return {
    event,
    isLoading,
    error,
  };
}
