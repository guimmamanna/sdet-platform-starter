export interface ContractItem {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContractItemResponse {
  count: number;
  items: ContractItem[];
}

export class DemoConsumerClient {
  constructor(
    private readonly baseUrl: string,
    private readonly token: string,
  ) {}

  async listItems(query: string): Promise<ContractItemResponse> {
    const response = await fetch(`${this.baseUrl}/api/items?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Consumer client expected 200, received ${response.status}`);
    }

    return (await response.json()) as ContractItemResponse;
  }
}

