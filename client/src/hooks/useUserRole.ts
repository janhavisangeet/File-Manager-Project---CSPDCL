import { useMemo } from "react";
import useTokenStore from "@/store"; // Adjust path as needed
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";

const useUserRole = (): string | null => {
  const { token } = useTokenStore((state) => state);

  const role = useMemo(() => {
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded?.role || null;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }, [token]);

  return role;
};

export default useUserRole;
