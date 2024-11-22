'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const authData = localStorage.getItem("pocketbase_auth");
      if (authData) {
        const { token, model } = JSON.parse(authData)
        setUser(model)
      }
    }
    fetchUser();
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("pocketbase_auth");
    setUser(null)
    router.refresh()
    router.push("/")
  }

  return (
    <>
      <div>
        {user ? (
          <div>
            {user.username}

            <Button onClick={handleLogout}
            >Logout</Button>
          </div>
        ):(
          <div>user not login

          </div>
        )
        }

      </div>
    </>
  );
}
