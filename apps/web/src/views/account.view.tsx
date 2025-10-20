import { useId } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AccountViewProps = {
  password: string;
  onPasswordChange: (value: string) => void;
  onDelete: () => void;
  isDeleting: boolean;
};

export const AccountView = ({
  password,
  onPasswordChange,
  onDelete,
  isDeleting,
}: AccountViewProps) => {
  const passwordFieldId = useId();

  return (
    <div className="mx-auto max-w-lg">
      <section className="space-y-6 rounded-lg border p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Account settings</h1>
        </div>

        <div className="space-y-4 rounded-lg border border-destructive/40 bg-destructive/5 p-5">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-destructive">
              Delete account
            </h2>
            <p className="text-sm text-muted-foreground">
              Deleting your account will remove all associated data to this account. This action cannot be undone.
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete my account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your account and all associated
                  data will be removed immediately.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-2">
                <label
                  htmlFor={passwordFieldId}
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <Input
                  id={passwordFieldId}
                  type="password"
                  value={password}
                  onChange={(event) => onPasswordChange(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
};
