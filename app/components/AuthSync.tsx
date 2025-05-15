"use client";

import { useAuthSync } from "../hooks/useAuth";

export function AuthSync() {
  useAuthSync();
  return null;
} 