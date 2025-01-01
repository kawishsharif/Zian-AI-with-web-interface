import { AuthUser } from "@/types/response.types";
import { create } from "zustand";

type AuthUserState = {
  loadingProfile?: boolean;
  authUser?: AuthUser | null;
  setLoadingProfile: (value: boolean) => void;
  setAuthUser: (profile: AuthUser | null) => void;
  logout: () => void;
};

const useAuthUserStore = create<AuthUserState>()((set) => ({
  loadingProfile: true,
  setAuthUser: (profile) =>
    set({
      authUser: profile,
      loadingProfile: false,
    }),
  setLoadingProfile: (loading) =>
    set(() => ({
      authUser: undefined,
      loadingProfile: loading,
    })),
  logout: () => {
    set({ authUser: null });
    window.location.reload();
  },
}));

export default useAuthUserStore;
