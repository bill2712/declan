export interface ResourceLink {
  title: string;
  description: string;
  url: string;
  icon: 'book' | 'baby' | 'home';
}

export interface BlessingRequest {
  senderName: string;
  relationship: string;
  message: string;
}

export interface Photo {
  id: number;
  url: string;
  caption: string;
  type: 'ultrasound' | 'photo';
}