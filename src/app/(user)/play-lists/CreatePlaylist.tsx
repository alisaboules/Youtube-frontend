import { playlistService } from '@/services/play-lists.service';
import type { IPlayListData } from '@/types/playlists.types';
import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { useMutation } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { m } from 'framer-motion';
import { X } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import toast from 'react-hot-toast';

export function CreatePlaylist({ refetch, onClose }: { refetch: () => void; onClose: () => void }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IPlayListData>({
    mode: 'onChange',
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ['create a playlist'],
    mutationFn: (data: IPlayListData) => playlistService.createPlayList(data),
    onSuccess() {
      refetch();
      reset();
      onClose();
      toast.success('Playlist successfully created!');
    },
  });
  
  const onSubmit: SubmitHandler<IPlayListData> = (data) => {
    mutate(data);
  };

  useHotkeys('esc', (e) => {
    e.preventDefault();
    onClose();
  });

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50,
      }}>
      <div className="relative w-full max-w-md rounded-2xl bg-[#282828] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 transition-colors hover:bg-[#3f3f3f]">
          <X />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          {isPending ? (
            <SkeletonLoader count={2} />
          ) : (
            <>
              <Field
                label="Title"
                type="text"
                registration={register('title', { required: 'Title is required.' })}
                error={errors.title?.message}
                placeholder="Enter a title..."
              />
              <Field
                label="Id from url"
                type="text"
                registration={register('videoPublicId', { required: 'Id is required.' })}
                error={errors.videoPublicId?.message}
                placeholder="Enter a id..."
              />
            </>
          )}
          <div className="text-center mt-4">
            <Button type="submit" isLoading={isPending} variant="secondary">
              Create
            </Button>
          </div>
        </form>
      </div>
    </m.div>
  );
}
