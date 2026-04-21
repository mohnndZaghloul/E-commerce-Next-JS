import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { deleteCategories } from "@/actions/system-actions";

export default function DeleteButton({
  children,
  title,
  description,
  id,
}: {
  children: ReactNode;
  title: string;
  description: string;
  id: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button className="cursor-pointer absolute -top-2 -right-2 bg-destructive hover:bg-destructive/80 w-6 h-6 text-xs">
            {children}
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle className="capitalize">{title}</AlertDialogTitle>
          <AlertDialogDescription className="capitalize">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isLoading}
            className="cursor-pointer"
            variant="outline">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await deleteCategories(id);
            }}
            className="cursor-pointer"
            variant="destructive">
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
