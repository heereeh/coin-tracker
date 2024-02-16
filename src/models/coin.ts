export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface ICoinDetail {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags?: TagsEntity[] | null;
  team?: TeamEntity[] | null;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: Links;
  links_extended?: LinksExtendedEntity[] | null;
  whitepaper: Whitepaper;
  first_data_at: string;
  last_data_at: string;
}
export interface TagsEntity {
  id: string;
  name: string;
  coin_counter: number;
  ico_counter: number;
}
export interface TeamEntity {
  id: string;
  name: string;
  position: string;
}
export interface Links {
  explorer?: string[] | null;
  facebook?: string[] | null;
  reddit?: string[] | null;
  source_code?: string[] | null;
  website?: string[] | null;
  youtube?: string[] | null;
}
export interface LinksExtendedEntity {
  url: string;
  type: string;
  stats?: Stats | null;
}
export interface Stats {
  subscribers?: number | null;
  contributors?: number | null;
  stars?: number | null;
  followers?: number | null;
}
export interface Whitepaper {
  link: string;
  thumbnail: string;
}

export interface ICoinPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: Quotes;
}
export interface Quotes {
  USD: USD;
}
export interface USD {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}

export interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
