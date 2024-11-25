import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UsersType } from "@/lib/types";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
export function UserNav({
  user,
  token,
  setUser,
  setToken,
}: {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: UsersType;
  setUser: React.Dispatch<React.SetStateAction<UsersType | null>>;
}) {
  const navigate = useNavigate();

  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const res = await fetch("/api/logout", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const data = await res.json();
      // console.log(data);

      if (res.ok) {
        setUser(null);
        setToken(null);
        Cookies.remove("authToken");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8">
          <AvatarImage />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-dhvsu-light"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 text-white">
            <p className="text-sm font-medium leading-none">
              {user.user_creds.fn}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/profile">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <button className="w-full" onClick={handleLogout}>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
