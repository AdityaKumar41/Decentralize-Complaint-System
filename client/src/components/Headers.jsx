import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";

const Headers = () => {
  return (
    <div>
      <header className="w-screen">
        <SignedOut>
          <div className="mx-auto bg-red">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton />
        </SignedIn>
      </header>
    </div>
  );
};

export default Headers;
