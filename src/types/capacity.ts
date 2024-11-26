export interface Capacity {
  code: string;
  name: string;
  wd_code: string;
  description?: string;
  users?: {
    known?: CapacityUser[];
    available?: CapacityUser[];
    wanted?: CapacityUser[];
  };
}

export interface CapacityUser {
  id: string;
  username: string;
  profile_image?: string;
}

export interface QueryData {
  params?: {
    language?: string;
    id?: string;
  };
  headers: {
    Authorization: string;
  };
}

export interface CapacityResponse {
  code: string;
  wd_code: string;
  name: string;
  description?: string;
  users: {
    known?: CapacityUser[];
    available?: CapacityUser[];
    wanted?: CapacityUser[];
  };
}
