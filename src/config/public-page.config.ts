class PublicPage {
  AUTH = '/auth';

  HOME = '/';
  TRENDING = '/trending';
  CARTOONS = '/cartoons';

  MY_CHANNEL = '/my-channel';
  SUBSCRIPTIONS = '/subscriptions';
  HISTORY = '/history';
  LIKED_VIDEOS = '/liked-videos';
  PLAY_LISTS = '/play-lists';
  
  FEEDBACK = '/feedback';

  VIDEO(path: string) {
    return `/v/${path}`
  }

  CHANNEL(path: string) {
    return `/c/${path}`
  }

  SEARCH(searchTerm: string) {
    return `/s?term=${searchTerm}`;
  }

  PLAYLIST(path?: string) {
    return `/play-lists/${path ? `${path}`: ''}`
  }
}

export const PUBLIC_PAGE = new PublicPage()