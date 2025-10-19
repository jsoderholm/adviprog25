import { api } from "@repo/api";
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

type DeleteAccountVariables = void;
type DeleteAccountData = Response;
type DeleteAccountError = Error;

const DEFAULT_ERROR_MESSAGE = "Unable to delete account. Please try again.";

async function deleteAccountRequest(): Promise<DeleteAccountData> {
  const response = await api.account.$delete();

  if (!response.ok) {
    try {
      const body = (await response.clone().json()) as { message?: string };
      if (body?.message) {
        throw new Error(body.message);
      }
    } catch {
      /* no-op: fall through to generic error */
    }

    throw new Error(DEFAULT_ERROR_MESSAGE);
  }

  return response;
}

export function useDeleteAccount(
  options?: UseMutationOptions<
    DeleteAccountData,
    DeleteAccountError,
    DeleteAccountVariables
  >,
): UseMutationResult<
  DeleteAccountData,
  DeleteAccountError,
  DeleteAccountVariables
> {
  return useMutation({
    mutationFn: deleteAccountRequest,
    ...options,
  });
}
