import { axiosClassic } from "@/api/axios";
import type { TUser } from "@/types/user.types";
import type { TAuthFormData } from "@/types/auth.types";
import Cookies from "js-cookie";
import { store } from "@/store";
import { clearAuthData, setAuthData } from "@/store/auth.slice";
import { EnumTokens } from "@/constants/auth.constants";

interface TAuthResponse { 
  user: TUser,
  accessToken: string
}

class AuthService {
  private _AUTH = 'auth';

  async main(type: 'login' | 'register', data: TAuthFormData, recaptchaToken?: string | null  ) {
    console.log('recaptchaToken:', recaptchaToken);
    const response = await axiosClassic.post<TAuthResponse>(`${this._AUTH}/${type}`, data, {
      headers: {
        recaptcha: recaptchaToken
      }
    });

    if (response.data.accessToken) {
      this._saveTokenStorage(response.data.accessToken);
      store.dispatch(setAuthData(response.data));
    }

    return response;
  }

  async getNewTokens() {
    const response = await axiosClassic.post<TAuthResponse>(`${this._AUTH}/access-token`);

    if (response.data.accessToken) {
      this._saveTokenStorage(response.data.accessToken);
      store.dispatch(setAuthData(response.data));
    }

    return response;
  }

  async getNewTokensByRefresh(refreshToken: string) {
    const response = await axiosClassic.post<TAuthResponse>(
      `${this._AUTH}/access-token`, {}, {
        headers: {
          Cookie: `refreshToken=${refreshToken}`
        }
      }
    )

    return response.data;
  }


  async logout( ) {
    const response = await axiosClassic.post<TAuthResponse>(`${this._AUTH}/logout`);

    if (response.data) {
      this.removeFromStorage();
    }

    return response;
  } 

  private _saveTokenStorage(accessToken: string) {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
      sameSite: 'lax',
      expires: 1 / 24,
      secure: true
    })
  }

  removeFromStorage() {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
    store.dispatch(clearAuthData());
  }

}

export const authService = new AuthService();