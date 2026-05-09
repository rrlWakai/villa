import { supabase } from './supabaseClient';
import { Reservation } from '../types';

export const reservationsService = {
  async create(data: Omit<Reservation, 'id' | 'status' | 'created_at'>): Promise<Reservation> {
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert([{ ...data, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return reservation;
  },

  async getAll(): Promise<Reservation[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  },

  async checkAvailability(checkIn: string, checkOut: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('reservations')
      .select('id')
      .eq('status', 'approved')
      .or(`check_in.lte.${checkOut},check_out.gte.${checkIn}`);

    if (error) throw error;
    return (data || []).length === 0;
  },

  async getBookedDates(): Promise<{ check_in: string; check_out: string }[]> {
    const { data, error } = await supabase
      .from('reservations')
      .select('check_in, check_out')
      .eq('status', 'approved');

    if (error) throw error;
    return data || [];
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
