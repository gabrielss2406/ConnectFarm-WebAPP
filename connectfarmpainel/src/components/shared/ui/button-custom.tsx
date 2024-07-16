import { Loader2 } from "lucide-react";
import type React from "react";
import { Button, type ButtonProps } from "../ui/button";

interface ButtonCustomProps extends ButtonProps {
  isLoading?: boolean;
}

export const ButtonCustom: React.FC<ButtonCustomProps> = (props) => {
  return (
    <Button {...props} disabled={props.isLoading || props.disabled}>
      {props.isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        props.children
      )}
    </Button>
  );
};
