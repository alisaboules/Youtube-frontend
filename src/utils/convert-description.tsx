// 'use client';

// import { Heading } from '@/ui/Heading';
// import { X } from 'lucide-react';
// import { useState } from 'react';

// interface Props {
//   description: string;
// }

// export function ChannelDescription({ description }: Props) {
//   const [isOpen, setIsOpen] = useState(false);
//   const firstParagraph = description.match(/<p[^>]*>.*?<\/p>/i)?.[0] || description;
//   return (
//     <>
//       <div className="flex items-center gap-1">
//         <div className='text-secondary text-sm'
//           dangerouslySetInnerHTML={{
//             __html: firstParagraph,
//           }}
//         />

//         <button
//           type="button"
//           onClick={() => setIsOpen(true)}
//           className="shrink-0 text-foreground"
//         >
//           ...more
//         </button>
//       </div>

//       {isOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 p-4"
//           onClick={() => setIsOpen(false)}
//         >
//           <div
//             className="w-full max-w-xl rounded-xl bg-[#1f1f1f] p-6 relative"
//             onClick={event => event.stopPropagation()}
//           >
//             <Heading isH1>
//               Description
//             </Heading>
//             <div
//               className="[&_p]:mb-3"
//               dangerouslySetInnerHTML={{
//                 __html: description,
//               }}
//             />
//             <button
//               type="button"
//               onClick={() => setIsOpen(false)}
//               className="text-foreground p-1 hover:bg-secondary/40 rounded-full hover:text-foreground absolute top-2 right-2"
//             >
//               <X />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

'use client';

import type { IVideo } from '@/types/video.types';
import { Heading } from '@/ui/Heading';
import { X } from 'lucide-react';
import { useState } from 'react';
import { transformDate } from './transform-date';
import { transformCounts } from './transform-count';

interface Props {
  description: string;
  mode?: 'modal' | 'inline';
  previewLines?: number;
  video?: IVideo;
}

export function Description({ description, mode = 'modal', previewLines = 1, video }: Props) {
  const [showFull, setShowFull] = useState(false);

  const previewHtml = (() => {
    const matches = description.match(/<p[^>]*>.*?<\/p>/gi);
    if (!matches) return description;
    return matches.slice(0, previewLines).join('');
  })();
  const hasMore = previewHtml !== description;

  if (mode === 'inline') {
    return (
      <div className="text-foreground text-sm article">
        {previewLines === 3 && video && showFull && (
          <div className="flex gap-2 mb-1 text-base">
            <span>{video.viewsCount.toLocaleString('en-UK')}</span>
            <span>
              {new Date(video.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        )}
        {previewLines === 3 && video && !showFull && (
          <div className="flex gap-2 mb-1 text-base">
            <span>{transformCounts(video.viewsCount)} views</span>
            <span> {transformDate(video.createdAt)} </span>
          </div>
        )}
        {video?.tags.map(tag => (<span className="text-quaternary cursor-pointer" key={tag.id}>{`#${tag.name} `}</span>))}
        {!showFull ? (
          <div className="relative mt-2">
            <div
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: previewLines,
                overflow: 'hidden',
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {hasMore && (
              <button
                type="button"
                onClick={() => setShowFull(true)}
                className="absolute bottom-0 -right-10 text-foreground px-1 text-base">
                more
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: description }} />
            {hasMore && (
              <button
                type="button"
                onClick={() => setShowFull(false)}
                className="mt-2 block text-foreground text-base">
                Show less
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <div className="text-secondary text-sm" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        {hasMore && (
          <button
            type="button"
            onClick={() => setShowFull(true)}
            className="shrink-0 text-foreground">
            ...more
          </button>
        )}
      </div>

      {showFull && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 p-4"
          onClick={() => setShowFull(false)}>
          <div
            className="w-full max-w-xl rounded-xl bg-[#1f1f1f] p-6 relative"
            onClick={(event) => event.stopPropagation()}>
            <Heading isH1>Description</Heading>
            <div
              className="[&_p]:mb-3"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            <button
              type="button"
              onClick={() => setShowFull(false)}
              className="text-foreground p-1 hover:bg-secondary/40 rounded-full hover:text-foreground absolute top-2 right-2">
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
