export interface DemoItem {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: 'active';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DemoUser {
  username: string;
  password: string;
  displayName: string;
}

export interface ItemInput {
  title: string;
  description: string;
  tags?: string[];
}

