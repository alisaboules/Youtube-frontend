'use client';

import { STUDIO_PAGE } from '@/config/studio-page';
import { useUpload } from '@/hooks/useUpload';
import { fileService } from '@/services/file.services';
import { studioService } from '@/services/studio-video.service';
import type { IVideoFormData } from '@/types/studio-video.types';
import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Textarea } from '@/ui/field/Textarea';
import { Heading } from '@/ui/Heading';
import { formatFileSize } from '@/utils/getFileSize';
import { useMutation, useQuery } from '@tanstack/react-query';
import { m } from 'framer-motion';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { TagsField } from '@/ui/tags/Tags';

const FileUploader = dynamic(
  () => import('react-drag-drop-files').then((mod) => mod.FileUploader),
  { ssr: false },
);

interface Props {
  onClose?: () => void;
}

export function UploadVideo({ }: Props) {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IVideoFormData>({
    mode: 'onChange',
  });
  const router = useRouter();
  const handleClose = () => {
    router.replace(STUDIO_PAGE.HOME);
  };

  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IVideoFormData) => studioService.create(data),
    onSuccess() {
      toast.success('Video successfully published!');
      reset();
      handleClose();
    },
    onError() {
      toast.error('Failed to publish the video.');
    },
  });
  const [processingFileName, setProcessingFileName] = useState<string | null>(null);
  const fileName = useWatch({ control, name: 'videoFileName' });
  const thumbnailUrl = useWatch({control, name: 'thumbnailUrl'});
  const onSubmit: SubmitHandler<IVideoFormData> = (data) => {
    console.log(data);
    mutate(data);
  };

  const { uploadFile, isLoading } = useUpload({
    onSuccess(data) {
      const file = data[0];
      if (!file) return;
      setProcessingFileName(file.name);
      setValue('videoFileName', file.name);
      if (file.maxResolution) {
        setValue('maxResolution', file.maxResolution);
      }
    },
  });
  const { uploadFile: uploadThumbnail, isLoading: isThumbnailLoading } = useUpload({
    onSuccess(data) {
      const file = data[0];
      if (!file) return;
      setValue('thumbnailUrl', file.url);
      toast.success('Thumbnail successfully uploaded.');
      console.log('THUMBNAIL URL:', file.url)
    },
    onError() {
      toast.error('Failed to upload thumbnail.');
    },
  });

  const handleThumbnailChange = (file: File | File[]) => {
    const selectedFile = Array.isArray(file) ? file[0] : file;
    if (!selectedFile) return;
    setSelectedThumbnail(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setThumbnailPreview(previewUrl);
    uploadThumbnail(selectedFile);
  };
  // const trackProcessingStatus = (fileName: string) => {
  //   const intervalId = setInterval(async () => {
  //     const {data} = await fileService.getProcessingStatus(fileName);
  //     setProgress(data);
  //     if (data == 100) {
  //       clearInterval(intervalId);
  //       setIsReadyToPublish(true);
  //       toast.success('The video processed successfully.')
  //     }
  //   }, 1000)
  // }
  const { data: processingData } = useQuery({
    queryKey: ['processing video', processingFileName],
    queryFn: () => fileService.getProcessingStatus(processingFileName!),
    enabled: !!processingFileName,
    refetchInterval: 1000,
  });

  const progress = processingData?.data.status ?? 0;
  const isReadyToPublish = progress === 100;
  const hasShownSuccessToast = useRef(false);

  console.log('fileName:', fileName);
  console.log('processingData:', processingData);
  console.log('progress:', progress);

  useEffect(() => {
    if (progress === 100 && !hasShownSuccessToast.current) {
      hasShownSuccessToast.current = true;
      toast.success('The video was successfully uploaded.');
    }
  }, [progress]);

  const handleDragDropChange = (file: File | File[]) => {
    const selectedFile = Array.isArray(file) ? file[0] : file;
    if (!selectedFile) return;
    hasShownSuccessToast.current = false;
    setSelectedVideo(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setVideoPreview(previewUrl);
    uploadFile(selectedFile);
  };
  console.log('VIDEO URL:', fileName);
  return (
    <div className="absolute inset-0 flex justify-center items-center z-[50] bg-background/50">
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          width: '85%',
          maxWidth: 960,
        }}>
        <div className="relative mx-auto w-full max-w-md rounded-2xl bg-[#282828] p-6 shadow-2xl">
          <Heading isH1 className="border-b border-border">
            Upload a video
          </Heading>
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-full p-2 transition-colors hover:bg-[#3f3f3f]">
            <X />
          </button>
          <div className="mt-5">
            <p className="mb-2 font-medium">Video (up to 1GB)</p>
            {!selectedVideo ? (
              <FileUploader
                name="file"
                handleChange={handleDragDropChange}
                types={['MP4', 'AVI', 'MOV', 'WMV']}
                dropMessageStyle={{ backgroundColor: '#374151' }}
                maxSize={1024}
                onSizeError={() => {
                  toast.error('File is too big! (max 1Gb)');
                }}
              />
            ) : (
              <div className="mt-3 rounded-xl border border-border bg-[#1f1f1f] p-3">
                <div className="flex gap-3">
                  {videoPreview && (
                    <video
                      src={videoPreview}
                      className="h-20 w-32 rounded-lg object-cover"
                      muted
                      preload="metadata"
                    />
                  )}
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="truncate font-medium">{selectedVideo.name}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      {formatFileSize(selectedVideo.size)}
                    </p>
                    {isLoading && <p className="mt-1 text-sm text-yellow-400">Uploading...</p>}
                    {!isLoading && !isReadyToPublish && (
                      <p className="mt-1 text-sm text-blue-400">
                        Processing... {Math.round(progress)}%
                      </p>
                    )}
                    {isReadyToPublish && (
                      <p className="mt-1 text-sm text-green-500">✓ Video ready</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVideo(null);
                      setVideoPreview(null);
                      setProcessingFileName(null);
                      setValue('videoFileName', '');
                    }}
                    className="self-start rounded-full p-2 hover:bg-[#3f3f3f]">
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
          {isLoading && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '38px',
              }}>
              <p>Uploading...</p>
            </m.div>
          )}
          {processingFileName && progress < 100 && (
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-700">
              <m.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          )}
          <div className="mt-5">
            <p className="mb-2 font-medium">Thumbnail (320x180)</p>
            {!selectedThumbnail ? (
              <FileUploader
                name="thumbnail"
                handleChange={handleThumbnailChange}
                types={['JPG', 'JPEG', 'PNG', 'WEBP']}
                dropMessageStyle={{ backgroundColor: '#374151' }}
                maxSize={10}
                onSizeError={() => {
                  toast.error('Thumbnail is too big! (max 10MB)');
                }}
              />
            ) : (
              <div className="mt-3 rounded-xl border border-border bg-[#1f1f1f] p-3">
                <div className="flex gap-3">
                  {thumbnailPreview && (
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      width={30}
                      height={30}
                      className="h-20 w-32 rounded-lg object-cover"
                    />
                  )}

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="truncate font-medium">{selectedThumbnail.name}</p>

                    <p className="mt-1 text-sm text-gray-400">
                      {formatFileSize(selectedThumbnail.size)}
                    </p>

                    {isThumbnailLoading ? (
                      <p className="mt-1 text-sm text-yellow-400">Uploading thumbnail...</p>
                    ) : (
                      <p className="mt-1 text-sm text-green-500">✓ Thumbnail uploaded</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedThumbnail(null);
                      setThumbnailPreview(null);

                      setValue('thumbnailUrl', '');
                    }}
                    className="self-start rounded-full p-2 hover:bg-[#3f3f3f]">
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}

            {isThumbnailLoading && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-center">
                <p>Uploading thumbnail...</p>
              </m.div>
            )}
          </div>
          {/* <label className='flex flex-col items-center px-4 py-6 bg-gray-200 text-quaternary rounded-lg shadow-lg tracking-wide uppercase border border-quaternary cursor-pointer hover:bg-primary hover:text-foreground transition-colors duration-200 '>
            <UploadCloud size={40} />
            <span className=''>Select a video</span>
            <input type='file' className='hidden' accept='video/*' onChange={handleInputChange}/>
          </label> */}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <Field
              label="Title"
              type="text"
              registration={register('title', { required: 'Title is required.' })}
              error={errors.title?.message}
              placeholder="Enter a title..."
            />
            <Textarea
              label="Description"
              error={errors.description?.message}
              registration={register('description', { required: 'Description is required.'})}
              rows={1}
              placeholder="Enter a description..."
            />
            <Controller
								control={control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										label='Tags:'
										onTagsChange={onChange}
										tags={value}
										error={error?.message}
                    
									/>
								)}
							/>
            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="secondary">
                Publish
              </Button>
            </div>
          </form>
        </div>
      </m.div>
    </div>
  );
}
