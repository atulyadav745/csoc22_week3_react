import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

function no_authRequired() {
  const { token } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);
}

export default no_authRequired;
