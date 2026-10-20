export interface CoupleInfo {
  partnerNepal: string;
  partnerUSA: string;
  partnerNepalCity: string;
  partnerUSACity: string;
  anniversaryDate: string;
  reunionDate: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  imageUrl: string;
  aspect?: string;
  isCustom?: boolean;
}

export interface LoveNote {
  id: string;
  sender: string;
  receiver: string;
  title: string;
  content: string;
  date: string;
  sealed: boolean;
}

export interface DakshinaReward {
  id: string;
  title: string;
  description: string;
  icon: string;
  revealed: boolean;
}
