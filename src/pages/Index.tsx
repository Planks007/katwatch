import React, { useEffect, useState } from 'react';
import { MediaRow } from '@/components/MediaRow';
import { getUserSubscription } from '@/api/getUserSubscription';

const Index: React.FC = () => {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>('user@example.com'); // get from auth context

  useEffect(() => {
    if (userEmail) {
      getUserSubscription(userEmail).then((sub) => setHasSubscription(sub.status === 'active'));
    }
  }, [userEmail]);

  const sampleMedia = [
    { id: '1', title: 'Movie 1', thumbnail_url: '/thumb1.jpg', rating: 4.5 },
    { id: '2', title: 'Movie 2', thumbnail_url: '/thumb2.jpg', rating: 4.0 },
  ];

  return (
    <div>
      <MediaRow
        title="Movies"
        media={sampleMedia}
        onMediaClick={(id) => console.log('Clicked', id)}
        hasActiveSubscription={hasSubscription}
      />
    </div>
  );
};

export default Index;
