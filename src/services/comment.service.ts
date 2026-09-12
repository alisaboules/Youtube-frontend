import { axiosClassic, instance } from '@/api/axios';
import type { ICommentData, VideoComment } from '@/types/video.types';

class CommentService {
  private _COMMENTS = '/comments';

  async byVideoPublicId(publicId: string, sort: 'newest' | 'top' = 'newest') {
    const data = await axiosClassic.get<VideoComment[]>(`${this._COMMENTS}/by-video/${publicId}`, {
      params: {
        sort,
      },
    });

    return data;
  }
  pin(id: string) {
    return instance.put(`${this._COMMENTS}/${id}/pin`);
  }
  update(id: string, data: ICommentData) {
    return instance.put<VideoComment>(`${this._COMMENTS}/${id}`, data);
  }

  delete(id: string) {
    return instance.delete<VideoComment>(`${this._COMMENTS}/${id}`);
  }

  create(data: ICommentData) {
    return instance.post<VideoComment>(this._COMMENTS, data);
  }

  toggleLike(id: string) {
    return instance.put(`${this._COMMENTS}/${id}/like`);
  }

  toggleDislike(id: string) {
    return instance.put(`${this._COMMENTS}/${id}/dislike`);
  }
}
export const commentService = new CommentService();
