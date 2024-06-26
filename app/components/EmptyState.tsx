'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';

interface EmptyState {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
}
const EmptyState = ( {
  title = 'No exact matches',
  subTitle = 'Try changing or remove some of your filters',
  showReset
} : EmptyState ) => {
  const router = useRouter();

  return (
    <div
      className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        "
    >
      <Heading
        center
        title={title}
        subTitle={subTitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push( '/' )}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;