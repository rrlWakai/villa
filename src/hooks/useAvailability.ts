import { useState, useEffect } from 'react';
import { reservationsService } from '../services/reservationsService';
import { addDays, isWithinInterval, parseISO } from 'date-fns';

export function useAvailability() {
  const [bookedRanges, setBookedRanges] = useState<{ check_in: string; check_out: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const ranges = await reservationsService.getBookedDates();
        setBookedRanges(ranges);
      } catch (err) {
        console.error('Error fetching booked dates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedDates();
  }, []);

  const isDateBooked = (date: Date): boolean => {
    return bookedRanges.some(range => {
      try {
        const start = parseISO(range.check_in);
        const end = parseISO(range.check_out);
        return isWithinInterval(date, { start, end: addDays(end, -1) });
      } catch {
        return false;
      }
    });
  };

  const checkAvailability = async (checkIn: string, checkOut: string): Promise<boolean> => {
    try {
      return await reservationsService.checkAvailability(checkIn, checkOut);
    } catch {
      return false;
    }
  };

  return { isDateBooked, checkAvailability, loading, bookedRanges };
}
