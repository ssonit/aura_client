export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  placeholder?: string;
}
export type TPinCard = JSX.Element;

interface Media {
  id: string;
  url: string;
  type: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  website: string;
  created_at: string;
  updated_at: string;
}

interface Pin {
  id: string;
  user_id: string;
  title: string;
  description: string;
  media_id: string;
  link_url: string;
  user: User;
  media: Media;
  created_at: string;
  updated_at: string;
}

export interface ListPinResponse {
  data: Pin[];
  paging: {
    page: number;
    limit: number;
    total: number;
  };
  filter: any;
}
