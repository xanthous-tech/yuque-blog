import 'isomorphic-unfetch';

const API_ROOT = 'https://www.yuque.com/api/v2';

export interface YuquePayload<T> {
  data: T;
}

export interface HelloMessage {
  message: string;
}

export interface User {
  id: number;
  type: string; // TODO: enum
  login: string;
  name: string;
  description: string | null;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface Repo {
  id: number;
  type: string; // TODO: enum
  slug: string;
  name: string;
  namespace: string;
  user_id: string;
  user: User;
  description: string;
  creator_id: string;
  public: number;
  likes_count: number;
  watches_count: number;
  created_at: string;
  updated_at: string;
}

export interface Doc {
  id: number;
  slug: string;
  title: string;
  book_id: number;
  book: Repo;
  user_id: number;
  user: User;
  format: string; // TODO: enum
  body: string;
  body_draft: string;
  body_html: string;
  body_lake: string;
  creator_id: number;
  public: number;
  status: number;
  likes_count: number;
  comments_count: number;
  content_updated_at: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export class YuqueApi {
  private token: string;

  private headers: { [key: string]: string };

  constructor(token: string) {
    this.token = token;
    this.headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'yuque-blog',
      'X-Auth-Token': this.token,
    };
  }

  public async hello(): Promise<YuquePayload<HelloMessage>> {
    const { data } = await this.getResult<HelloMessage>('/hello');
    return {
      data,
    };
  }

  public async getUser(login?: string): Promise<YuquePayload<User>> {
    const { data } = await this.getResult<User>(`/user${login ? `s/${login}` : ''}`);
    return {
      data,
    };
  }

  public async getRepos(login: string, offset?: number): Promise<YuquePayload<Repo[]>> {
    const { data } = await this.getResult<Repo[]>(`/users/${login}/repos`);
    return {
      data,
    };
  }

  public async getDocs(namespace: string, offset?: number): Promise<YuquePayload<Doc[]>> {
    const { data } = await this.getResult<Doc[]>(`/repos/${namespace}/docs`);
    return {
      data,
    };
  }

  public async getDoc(namespace: string, slug: string): Promise<YuquePayload<Doc>> {
    const { data } = await this.getResult<Doc>(`/repos/${namespace}/docs/${slug}`);
    return {
      data,
    };
  }

  private async getResult<T>(path: string, options: RequestInit = {}): Promise<YuquePayload<T>> {
    const response = await fetch(`${API_ROOT}${path}`, {
      method: 'GET',
      headers: this.headers,
      ...options,
    });
    return response.json();
  }
}
