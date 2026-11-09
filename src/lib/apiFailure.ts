import { isAxiosError } from "axios";
/** Narrow unknown exceptions without exposing raw responses in the UI. */
export function apiFailure(cause: unknown): {
  response?: {
    status?: number;
    data?: { message?: string; statusCode?: number };
  };
} {
  if (!isAxiosError(cause)) return {};
  const body: unknown = cause.response?.data;
  const data =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  return {
    response: {
      status: cause.response?.status,
      data: {
        message: typeof data.message === "string" ? data.message : undefined,
        statusCode:
          typeof data.statusCode === "number" ? data.statusCode : undefined,
      },
    },
  };
}
