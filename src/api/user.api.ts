/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConfig from "@/config/api.config";
import { definedMessages } from "@/lib/constants";
import { CustomError } from "@/types/error";
import {
  CustomizeSchema,
  ForgotPasswordSchema,
  LoginFormSchema,
  SignUpFormSchema,
  UpdateProfileSchema,
} from "@/types/forms.types";
import {
  AuthUser,
  EmailLoginApiResponse,
  ForgotPwdApiResponse,
  KeywordApiResponse,
  LoginApiResponse,
  SignUpApiResponse,
  UpdateProfileResponse,
} from "@/types/response.types";
import axios from "axios";

export async function signup(
  data: SignUpFormSchema
): Promise<SignUpApiResponse> {
  try {
    const res = await axios.post(apiConfig.endpoints.register, data);
    if (res.status === 200 && res.data.status) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
        data: res.data.authorization,
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

export async function updateProfile(
  data: UpdateProfileSchema,
  authUser: AuthUser
): Promise<UpdateProfileResponse> {
  try {
    const res = await axios.post(apiConfig.endpoints.profile, {
      ...(authUser.email !== data.email && { email: data.email }),
      name: data.name,
      phone: data.phone,
      website: data.website,
    });
    if (res.status === 200 && res.data.status) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
        data: res.data.account,
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

export async function updateTone(tone: string): Promise<UpdateProfileResponse> {
  try {
    const res = await axios.post(apiConfig.endpoints.profile, {
      tone: tone
    });
    if (res.status === 200 && res.data.status) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
        data: res.data.account,
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

export async function getProfile(): Promise<AuthUser | null> {
  try {
    const res = await axios.get(apiConfig.endpoints.profile);
    if (res.status === 200 && res.data.account) {
      return {
        ...res.data.account,
        filter: {
          advertisement: res.data.account.filter.advertisement == 1,
          brand: res.data.account.filter.brand == 1,
          negativity: res.data.account.filter.negativity == 1,
        },
        created: new Date(res.data.account.created),
      };
    }
    throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN);
  } catch (error: any) {
    return null;
  }
}

export async function login(data: LoginFormSchema): Promise<LoginApiResponse> {
  try {
    const res = await axios.post(apiConfig.endpoints.login, data);
    if (res.status === 200) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
        data: res.data.account && {
          ...res.data.account,
          created: new Date(res.data.account.created),
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

export async function forgotPassword(
  data: ForgotPasswordSchema
): Promise<ForgotPwdApiResponse> {
  try {
    const res = await axios.post(apiConfig.endpoints.forgotPassword, data);
    if (res.status === 200 && res.data.status) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
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

export async function createNewPwd(data: {
  password: string;
  token: string;
}): Promise<ForgotPwdApiResponse> {
  try {
    const res = await axios.post(apiConfig.endpoints.forgotPassword, data);
    if (res.status === 200 && res.data.status) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
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

export async function updateKeyword(
  data: CustomizeSchema,
  isIndustryOther = false
): Promise<KeywordApiResponse> {
  try {
    const res = await axios.post(apiConfig.basepath, {
      ...(isIndustryOther && data.otherIndustry && data.otherIndustry !== ""
        ? {
          others: data.otherIndustry,
        }
        : {
          industry_id: parseInt(data.industry),
        }),
      keyword: data.keywords.join(", "),

      filter_brand: data.filter_brand,
      filter_negativity: data.filter_negativity,
      filter_advertisement: data.filter_advertisement,
      ...(data.website && { website: data.website }),
      ...(data.blacklist && { blacklist: data.blacklist.join(", ") }),
    });
    if (res.status === 200 && res.data.status) {
      if (data.tone) {
        try {
          await updateTone(data.tone)
        } catch (error) {
          console.error("Update Tone ", error)
        }
      }
      return {
        message: res.data.error ?? "",
        success: res.data.status ?? false,
        data: res.data.message,
      };
    }
    throw new CustomError(definedMessages.UNKNOWN_ERROR_TRY_AGAIN);
  } catch (error: any) {
    return {
      message:
        (error instanceof CustomError
          ? error.message
          : error?.response?.data?.error) ?? "",
      success: false,
      data: null,
    };
  }
}


type EmailLoginInput = ({ type: "email"; email: string; } | { type: "token"; token: string })

export async function emaillogin(
  data: EmailLoginInput
): Promise<EmailLoginApiResponse> {
  try {
    const res = await axios.post(apiConfig.endpoints.emaillogin, data);
    if (res.status === 200) {
      return {
        message: res.data.message ?? "",
        success: res.data.status ?? false,
        data: res.data.authorization
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
