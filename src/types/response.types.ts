export interface ApiResponse<T = unknown> {
  data?: T | null;
  message: string;
  success: boolean;
}

export type ArticlesFilters = {
  advertisement: boolean;
  brand: boolean;
  negativity: boolean;
};

export type AuthUser = {
  articlesample: boolean | "claimed" | "generating article";
  authorization: string;
  created: Date;
  email: string;
  filter: ArticlesFilters;
  keyword: {
    industry: {
      id: number;
      industry: string;
      name: string;
    };
    keyword: string;
  };
  blacklist: string;
  midjourney: 0;
  name: string;
  package: {
    amount: number;
    id: number;
    name: string;
  };
  tone: string;
  website?: string;
  password: string;
  phone: string;
  quota: number;
};

export type LoginApiResponse = ApiResponse<AuthUser>;
export type ForgotPwdApiResponse = ApiResponse<null>;
export type NewPwdApiResponse = ApiResponse<null>;
export type EmailLoginApiResponse = ApiResponse<string | undefined>;

export type SignUpApiResponse = ApiResponse<string>;
export type UpdateProfileResponse = ApiResponse<{
  authorization: string;
  email: string;
  name: string;
  package: string;
  phone: string;
  website: string;
}>;

export type TIndustry = {
  id: number;
  name: string;
};

export type IndustryListApiResponse = ApiResponse<Array<TIndustry>>;

export type KeywordApiResponse = ApiResponse<{
  filter: ArticlesFilters;
  industry: {
    id: number;
    industry: string;
    name: string;
  };
  keyword: string;
}>;

export type GenerateApiResponse = ApiResponse<string>;
export type ArticlesApiResponse = ApiResponse<{
  articles: Array<Article>;
  current_page: number,
  total_articles: number,
  total_pages: number
}>;

export type Article = {
  id: number;
  headline: string;
  summary: string;
  body: string;
  image: string;
  timestamp: Date;
};
