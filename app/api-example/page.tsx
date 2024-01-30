"use client"
import CustomLink from "@/components/custom-link"
import axios from "axios";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react"

export default function Page() {
  const [data, setData] = useState()

  async function logoutSession() {
    //  const csrfResponse = await axios
    //    .get("http://passport-oauth.test/sanctum/csrf-cookie")
    //    .then(() => signIn("laravel"));
    

    await fetch("/api/protected", {method: "post"});
    // const json = await res.json();
  }
  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/protected")
      const json = await res.json()
      setData(json)
    })()
  }, [])
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Route Handler Usage</h1>
      <p>
        This page fetches data from an API{" "}
        <CustomLink href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers">
          Route Handler
        </CustomLink>
        . The API is protected using the universal{" "}
        <CustomLink href="https://nextjs.authjs.dev#auth">
          <code>auth()</code>
        </CustomLink>{" "}
        method.
      </p>
      <h2 className="text-xl font-bold">Data from API Route:</h2>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>

      <button type="button" onClick={logoutSession}>Logout session</button>
    </div>
  )
}
