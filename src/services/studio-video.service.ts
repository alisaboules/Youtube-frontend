import { instance  } from '@/api/axios';
import type { IPaginationParams } from '@/types/pagination.types';
import type { IVideoFormData } from '@/types/studio-video.types';
import type { IVideo, IVideosPagination } from '@/types/video.types';

class StudioService {
  private _VIDEOS = '/studio/videos';

  getAll(params: IPaginationParams) {
    return instance.get<IVideosPagination>(this._VIDEOS, {params});
  }

  delete(id: string) {
    return instance.delete(`${this._VIDEOS}/${id}`);
  }

  update(id: string, dto: IVideoFormData) {
    return instance.put(`${this._VIDEOS}/${id}`, dto);
  }

  byId(id: string) {
    return instance.get<IVideo>(`${this._VIDEOS}/${id}`);
  }
  
  create(dto: IVideoFormData) {
    return instance.post(this._VIDEOS, dto);
  }
}

export const studioService = new StudioService();
