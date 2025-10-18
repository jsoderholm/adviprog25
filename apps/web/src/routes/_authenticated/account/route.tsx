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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/account")({
  component: RouteComponent,
})

export function RouteComponent() {
  return (
    <div className="max-w-lm mx-auto">
      <div className="space-y-10">
      <section className="space-y-10 rounded-lg border p-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Delete account</h2>
            <p className="text-muted-foreground">
              Deleting your account will remove your saved locations and history.
              This action cannot be undone.
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete my account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  )
}
