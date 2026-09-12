'use client';

import { Button } from '@/ui/button/Button';
import { Heading } from '@/ui/Heading';
import { SkeletonLoader } from '@/ui/SkeletonLoader';
import { useQuery } from '@tanstack/react-query';
import { ListVideo } from 'lucide-react';
import { CreatePlaylist } from './CreatePlaylist';
import { useState } from 'react';
import { PlaylistItem } from './PlaylistItem';
import { playlistService } from '@/services/play-lists.service';

export function PlayLists() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Playlists'],
    queryFn: () => playlistService.getUserPlayLists(),
  });
  
  return (
    <section className="px-10 mb-20">
      <div className="flex justify-between items-center mb-6">
        <Heading isH1 IconMe={ListVideo} className="mb-0">
          Playlists
        </Heading>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          Create
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {isLoading ? (
          <SkeletonLoader count={4} />
        ) : data?.data?.length ? (
          data?.data?.map(playlist => <PlaylistItem key={playlist.id} playlist={playlist} refetch={refetch}/>)
        ) : (
          <p>You haven&apos;t created any playlists yet!</p>
        )}
      </div>
      {isModalOpen && (
        <CreatePlaylist refetch={refetch} onClose={() => setIsModalOpen(false)}/>
      )}
    </section>
  );
}
