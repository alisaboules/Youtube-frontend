import { fileService } from "@/services/file.services";
import type { IFileResponse } from "@/types/file.types";
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react";
import toast from "react-hot-toast";

interface Props {
  onChange?: (url: string) => void;
  folder?: string;
  onSuccess?: (data: IFileResponse[]) => void;
  onError?: () => void;
}

type TUseUpload = (props: Props) => {
  uploadFile: (file: File) => void;
  isLoading: boolean;
};

export const useUpload: TUseUpload = ({ onChange, folder, onError, onSuccess }) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['upload file'],
    mutationFn: (data: FormData) => fileService.upload(data, folder),
    onSuccess: ({ data }) => {
      const firstFile = data[0];
      if (!firstFile) return;
      onChange?.(firstFile.url);
      onSuccess?.(data);
    },
    onError: error => {
      toast.error(error.message);
      onError?.();
    }
  })

  const uploadFile = useCallback((file: File) =>  {
    const formData = new FormData();
      formData.append('file', file);
      mutate(formData);
  }, [mutate]);

  return { 
    uploadFile,
    isLoading: isPending};
}