import axios from 'axios';
import { TICKETMASTER_API_KEY } from '../config/keys';

const BASE = 'https://app.ticketmaster.com/discovery/v2';

export interface TMEvent {
  id: string;
  name: string;
  info?: string;
  dates: any;
  _embedded?: any;
}

export async function searchEvents(keyword = '', city = ''): Promise<TMEvent[]> {
  const params: any = {
    apikey: TICKETMASTER_API_KEY,
  };
  if (keyword) params.keyword = keyword;
  if (city) params.city = city;

  const res = await axios.get(`${BASE}/events.json`, { params });
  const events = res.data._embedded?.events ?? [];
  return events;
}