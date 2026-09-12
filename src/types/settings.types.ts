import type { IChannel } from '@/types/channel.types';
import type { IFullUser } from '@/types/user.types';

export interface ISettingsData extends Pick<IFullUser, 'name' | 'email'> {
  password: string;
  channel?: Pick<IChannel, 'avatarUrl' | 'bannerUrl' | 'description' | 'slug' | 'name'>;
}
