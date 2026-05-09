import { supabase } from './supabaseClient';
import { Inquiry } from '../types';

export const inquiriesService = {
  async create(data: Omit<Inquiry, 'id' | 'created_at'>): Promise<Inquiry> {
    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return inquiry;
  },

  async getAll(): Promise<Inquiry[]> {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
