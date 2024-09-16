import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <nav className="bg-sky-700 p-4">
        <ul className="flex gap-x-6 text-white">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          {!session ? (
            <li className="ml-auto">
              <Link href="/sign-in" className="hover:underline">
                Sign In
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li className="ml-auto">
                <Link href="/sign-out" className="hover:underline">
                  Sign Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
