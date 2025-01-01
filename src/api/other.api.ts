/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConfig from "@/config/api.config";
import { definedMessages } from "@/lib/constants";
import { CustomError } from "@/types/error";
import {
  ArticlesApiResponse,
  GenerateApiResponse,
  IndustryListApiResponse,
  TIndustry,
} from "@/types/response.types";
import axios from "axios";

export async function getIndustryList(): Promise<IndustryListApiResponse> {
  try {
    const res = await axios.get(apiConfig.basepath + "?list=industry");
    if (res.status === 200 && res.data.status) {
      return {
        message: "",
        success: res.data.status ?? false,
        data: res.data.industry,
      };
    }
    throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN);
  } catch (error: any) {
    return {
      message:
        (error instanceof CustomError
          ? error.message
          : error?.response?.data?.message) ?? "",
      success: false,
      data: null,
    };
  }
}

export async function industryListFetcher(): Promise<Array<TIndustry>> {
  try {
    const res = await axios.get(apiConfig.basepath + "?list=industry");
    if (res.status === 200 && res.data.status) {
      return res.data.industry;
    }
    throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN);
  } catch (error: any) {
    return [];
  }
}

// export async function industryByKeyword(reqData: KeywordApiRequest): Promise<KeywordApiResponse> {
//     try {
//         const res = await axios.post("", reqData)
//         if (res.status === 200 && res.data.status) {
//             return {
//                 message: "",
//                 success: res.data.status ?? false,
//                 data: res.data.message
//             }
//         }
//         throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN)
//     } catch (error: any) {
//         return {
//             message: ((error instanceof CustomError) ? error.message : error?.response?.data?.message) ?? "",
//             success: false,
//             data: null
//         }
//     }
// }

export async function generate(): Promise<GenerateApiResponse> {
  try {
    const res = await axios.get(`${apiConfig.basepath}?generate=1`);
    if (res.status === 200) {
      return {
        message: "",
        success: res.data.status ?? false,
        data: res.data.generated,
      };
    }
    throw new CustomError(res.data.generated);
  } catch (error: any) {
    return {
      message:
        (error instanceof CustomError
          ? error.message
          : error?.response?.data?.generated) ?? "",
      success: false,
      data: null,
    };
  }
}

export async function getArticles(
  limit = 3,
  offset = 0
): Promise<ArticlesApiResponse> {
  try {
    const res = await axios.get(
      `${apiConfig.basepath}?limit=${limit}&offset=${offset}&image_url=0`
    );
    if (res.status === 200 && res.data.status) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
        data: {
          articles: res.data.articles?.map((article: any) => ({
            ...article,
            timestamp: new Date(article.timestamp),
            body: article.article,
          })),
          current_page: res.data.current_page,
          total_articles: res.data.total_articles,
          total_pages: res.data.total_pages,
        },
      };
    }
    throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN);
  } catch (error: any) {
    return {
      message:
        (error instanceof CustomError
          ? error.message
          : error?.response?.data?.message) ?? "",
      success: false,
      data: null,
    };
  }
}
