import { ResellerService, ResellerMedia } from '@/services/ResellerService';

const fetchMedia = async () => {
  if (!user) {
    setMediaList([]);
    return;
  }
  const streams: ResellerMedia[] = await ResellerService.getUserStreams(user.id);

  // Map to local Media type
  const mapped: Media[] = streams.map((s) => ({
    id: s.id,
    title: s.name,
    thumbnail_url: s.thumbnail,
    rating: s.rating,
    description: `${s.name} - ${s.category}`,
    runtime: s.runtime,
    category: s.category,
    stream_url: subscriptionActive ? s.stream_url : undefined,
  }));

  setMediaList(mapped);
};
