
import { Status, Timestamps } from './api.model';

export interface RefreshToken extends Timestamps {
  id: number;
  user_id: number;
  family_id: string;
  device_info: string | null;
  expires_at: string;
  status: Status;
}
