import { useEffect, useMemo, useState } from "react";

import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";
import { User } from "@auth0/auth0-spa-js";
import { posthog } from "posthog-js";

import { addAccessTokenInterceptor } from "../utils/api";

const AUTH0_ORGANIZATIONS = "https://genway.ai/orgs";

interface UserData extends User {
  [AUTH0_ORGANIZATIONS]: string[];
}
interface UseUserProps {
  onLogout?: () => void;
}

export const useUser = ({ onLogout }: UseUserProps = {}) => {
  const {
    user,
    isLoading: isLoadingUser,
    logout: logoutAuth0,
    getAccessTokenSilently,
    isAuthenticated,
    error,
  } = useAuth0<UserData>();

  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const [isGenway, setIsGenway] = useState<boolean | undefined>(undefined);

  async function logout(params: LogoutOptions = {}) {
    onLogout?.();
    logoutAuth0(params);
  }

  const tenantIds = useMemo(() => {
    return user?.[AUTH0_ORGANIZATIONS] || [];
  }, [user]);

  const isLoading = useMemo(() => {
    return isLoadingUser || isAdmin === undefined;
  }, [isLoadingUser, isAdmin]);

  useEffect(() => {
    if (user && isAuthenticated) {
      addAccessTokenInterceptor(getAccessTokenSilently, isAuthenticated);
    }
  }, [user, getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    if (user) {
      const isGenwayEmail =
        user.email?.includes("@genway.ai") &&
        user.email_verified &&
        user.sub?.includes("google");

      const hasTenants = tenantIds.length > 0;

      setIsAdmin(isGenwayEmail || hasTenants);
      posthog.onFeatureFlags(() => {
        setIsGenway(isGenwayEmail || false);
      });
    } else if (!isLoadingUser) {
      setIsAdmin(false);
    }
  }, [user, tenantIds, isLoadingUser]);

  return { logout, user, isLoading, isAdmin, isGenway, tenantIds, error };
};
