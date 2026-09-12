import { instance } from '@/api/axios';
import type { IFileResponse, IProcessingStatus } from '@/types/file.types';

class FileService {
  private _UPLOAD_FILE = '/upload-file'

  async upload(file: FormData, folder?: string) {
    return instance.post<IFileResponse[]>(`/upload-file`, file, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  getProcessingStatus(fileName: string) {
    return instance.get<IProcessingStatus>(`${this._UPLOAD_FILE}/status/${fileName}`)
  }
}
export const fileService = new FileService();
