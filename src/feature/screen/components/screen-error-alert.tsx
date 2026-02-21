import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  state: string;
  errorType: string | null;
  errorMessage: string;
};

export function ScreenErrorAlert({
  state,
  errorType,
  errorMessage,
}: Props) {
  if (state !== "error" && state !== "denied" && state !== "cancelled") {
    return null;
  }

  const title =
    errorType === "permission-denied"
      ? "Permission Denied"
      : errorType === "user-cancelled"
        ? "Screen Selection Cancelled"
        : "Screen Sharing Error";

  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
