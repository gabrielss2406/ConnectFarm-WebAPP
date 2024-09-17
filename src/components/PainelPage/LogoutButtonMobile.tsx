import { UserService } from "@/services/user";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/shared/ui/popover";
import { Button } from "@/components/shared/ui/button";

export const LogoutButtonMobile: React.FC<any> = ({ routeName }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const router = useRouter();

    async function handleLogout() {
        const userService = new UserService();
        try {
            await userService.logout();
            toast.success("Usuário deslogado com sucesso!");
            router.push("../");
        } catch (error) {
            toast.error("Erro ao fazer logout!");
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className={`text-white hover:text-gray-300 mt-2 text-center`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setShowPopover(true)}
                >
                    Sair
                </div>
            </PopoverTrigger>
            {showPopover && (
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-white">
                                Tem certeza que deseja sair?
                            </p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowPopover(false)}>
                                Cancelar
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    handleLogout();
                                    setShowPopover(false);
                                }}
                            >
                                Sair
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
};
