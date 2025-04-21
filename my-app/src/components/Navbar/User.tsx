import { PopoverContent } from "@material-tailwind/react";
import { CookieSetOptions } from "universal-cookie";

export function User ({
    triggers,
    removeCookie,
}: {
    triggers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };

    removeCookie: (name: "token", options?: CookieSetOptions) => void;
}) {
    function logout() {
        console.log("Logging out");
        removeCookie("token", {
            path: "/"
        });
    }

    return (
        // @ts-expect-error This is a popover content
        <PopoverContent
           {...triggers}
           className="z-40 max-w-[24-rem] px-10 py-5 bg-white rounded-lg shadow-custom hover:bg-gray-200 cursor-pointer "
           onClick={logout}
           >
            Logout
           </PopoverContent>
    );
}