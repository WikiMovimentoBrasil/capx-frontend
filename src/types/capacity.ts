export interface Capacity {
  id: number;
  code?: number;
  skill_type: string[];
  skill_wikidata_item: string;
  name?: string;
  children?: Capacity[];
}

export interface CapacityResponse {
  code: string;
  wd_code: string;
  name: string;
}

export interface QueryData {
  params?: {
    language?: string;
    [key: string]: any;
  };
  headers?: {
    Authorization?: string;
    [key: string]: any;
  };
}

export interface CapacityCategory {
  id: number;
  name: string;
  color: string;
}
