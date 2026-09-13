// import { fileService } from "@/services/file.services";
// import type { IFileResponse } from "@/types/file.types";
// import { useMutation } from "@tanstack/react-query"
// import { useCallback } from "react";
// import toast from "react-hot-toast";

// interface Props {
//   onChange?: (url: string) => void;
//   folder?: string;
//   onSuccess?: (data: IFileResponse[]) => void;
//   onError?: () => void;
// }

// type TUseUpload = (props: Props) => {
//   uploadFile: (file: File) => void;
//   isLoading: boolean;
// };

// export const useUpload: TUseUpload = ({ onChange, folder, onError, onSuccess }) => {
//   const { mutate, isPending } = useMutation({
//     mutationKey: ['upload file'],
//     mutationFn: (data: FormData) => fileService.upload(data, folder),
//     onSuccess: ({ data }) => {
//       const firstFile = data[0];
//       if (!firstFile) return;
//       onChange?.(firstFile.url);
//       onSuccess?.(data);
//     },
//     onError: error => {
//       toast.error(error.message);
//       onError?.();
//     }
//   })

//   const uploadFile = useCallback((file: File) =>  {
//     const formData = new FormData();
//       formData.append('file', file);
//       mutate(formData);
//   }, [mutate]);

//   return { 
//     uploadFile,
//     isLoading: isPending};
// }

// import { fileService } from '@/services/file.services';
// import type { IFileResponse } from '@/types/file.types';
// import { useMutation } from '@tanstack/react-query';
// import { useCallback, useState } from 'react';
// import toast from 'react-hot-toast';

// interface Props {
// 	onChange?: (url: string) => void;
// 	folder?: string;
// 	onSuccess?: (data: IFileResponse[]) => void;
// 	onError?: () => void;
// }

// type TUseUpload = (props: Props) => {
// 	uploadFile: (file: File) => void;
// 	isLoading: boolean;
// };

// export const useUpload: TUseUpload = ({
// 	onChange,
// 	folder,
// 	onError,
// 	onSuccess
// }) => {
// 	const { mutate, isPending } = useMutation({
// 		mutationKey: ['upload file'],
// 		mutationFn: (data: FormData) =>
// 			fileService.upload(data, folder),
// 		onSuccess: ({ data }) => {
// 			const firstFile = data[0];
// 			if (!firstFile) return;
// 			const isVideo = firstFile.maxResolution !== undefined;
// 			if (!isVideo) {
// 				onChange?.(firstFile.url);
// 				onSuccess?.(data);
// 				return;
// 			}
//       setIsProcessing(true);
// 			const interval = setInterval(async () => {
// 				try {
// 					const { data: processingData } =
// 						await fileService.getProcessingStatus(
// 							firstFile.name
// 						);
// 					if (processingData.status === -1) {
//             setIsProcessing(false);
// 						clearInterval(interval);
// 						toast.error(
// 							'Ошибка обработки видео'
// 						);
// 						onError?.();
// 						return;
// 					}
// 					if (
// 						processingData.status === 100 &&
// 						processingData.url
// 					) {
// 						clearInterval(interval);
//             setIsProcessing(false);
// 						onChange?.(processingData.url);
// 						onSuccess?.([
// 							{
// 								...firstFile,
// 								url: processingData.url
// 							}
// 						]);
// 						toast.success(
// 							'Видео успешно обработано'
// 						);
// 					}
// 				} catch (error) {
// 					clearInterval(interval);
//           setIsProcessing(false);
// 					toast.error(
// 						'Не удалось проверить статус видео'
// 					);
// 					onError?.();
// 				}
// 			}, 1000);
// 		},

// 		onError: error => {
// 			toast.error(error.message);
// 			onError?.();
// 		}
// 	});
//   const [isProcessing, setIsProcessing] = useState(false)
// 	const uploadFile = useCallback(
// 		(file: File) => {
// 			const formData = new FormData();

// 			formData.append('file', file);
// 			mutate(formData);
// 		},
// 		[mutate]
// 	);

// 	return {
// 		uploadFile,
// 		isLoading: isPending || isProcessing
// 	};
// };

import { fileService } from '@/services/file.services';

import type { IFileResponse } from '@/types/file.types';

import { useMutation } from '@tanstack/react-query';

import { useCallback } from 'react';

import toast from 'react-hot-toast';

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

export const useUpload: TUseUpload = ({
  onChange,
  folder,
  onError,
  onSuccess,
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['upload file'],

    mutationFn: (data: FormData) =>
      fileService.upload(data, folder),

    onSuccess: ({ data }) => {
      const firstFile = data[0];

      if (!firstFile) return;

      onChange?.(firstFile.url);
      onSuccess?.(data);
    },

    onError: error => {
      toast.error(error.message);
      onError?.();
    },
  });

  const uploadFile = useCallback(
    (file: File) => {
      const formData = new FormData();

      formData.append('file', file);

      mutate(formData);
    },
    [mutate],
  );

  return {
    uploadFile,
    isLoading: isPending,
  };
};