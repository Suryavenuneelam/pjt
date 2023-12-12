// import Link from "next/link";
// import { HandMetal } from "lucide-react";
// // import React, { useState, useEffect } from "react";

// const Navbar = () => {
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // useEffect(() => {
//   //   if (localStorage.getItem("isLoggedIn")) {
//   //     setIsLoggedIn(true);
//   //   } else {
//   //     setIsLoggedIn(false);
//   //   }
//   // }, []);

//   return (
//     <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
//       <div className="container flex items-center justify-between">
//         <Link href="/">
//           <a>
//             <HandMetal />
//           </a>
//         </Link>
//         <ul className="flex space-x-4">
//           {isLoggedIn && (
//             <li>
//               <Link href="/profile">
//                 <a>Profile</a>
//               </Link>
//             </li>
//           )}
//           {!isLoggedIn && (
//             <li>
//               <Link href="/sign-in">
//                 <a>Sign In</a>
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";

const Navbar = () => {
    return (
        <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <HandMetal />
                </Link>
                <div className="flex space-x-4">
                    <Link className={buttonVariants()} href="/sign-in">
                        Sign in
                    </Link>
                    <Link className={buttonVariants()} href="/profile">
                        Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;