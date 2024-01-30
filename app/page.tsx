"use client";

import CustomLink from "@/components/custom-link";
import packageJSON from "../package.json";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket = io("http://localhost:3010/auth", {
  transports: ["websocket"],
  autoConnect: false,
});

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id: string
        };
      };
    };
  }
  
}
export default function Index() {
  
  useEffect(() => {
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  const login = () => {
    // const queryId = "AAHotMNfAgAAAOi0w18Z2LX4";
    // const query = btoa(
    //   "query_id=AAHotMNfAgAAAOi0w18Z2LX4&user=%7B%22id%22%3A5901628648%2C%22first_name%22%3A%22Foo%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22fransiskusbenny%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1696479110&hash=358ee4ebd5c81558f8ca984e651589567ff7b16979bfd117bc90d486045f36d8"
    // );

    const queryId = window.Telegram.WebApp.initDataUnsafe.query_id;
    const query = btoa(window.Telegram.WebApp.initData);

    socket.connect();

    socket.once(`login:${queryId}`, (message: any) => {
      //handle when has successfully login
      console.log(JSON.stringify(message));

       socket.disconnect();
    });

    window.open(
      `http://localhost:3002/api/v1/google/telegram-login?query=${query}`
    );
  };
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <CustomLink href="https://nextjs.authjs.dev">NextAuth.js</CustomLink>{" "}
        for authentication. Check out the{" "}
        <CustomLink href="/server-example" className="underline">
          Server
        </CustomLink>{" "}
        and the{" "}
        <CustomLink href="/client-example" className="underline">
          Client
        </CustomLink>{" "}
        examples to see how to secure pages and get session data.
      </p>
      <p>
        Current{" "}
        <CustomLink href="https://nextjs.authjs.dev">NextAuth.js</CustomLink>{" "}
        version: <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
      </p>

      <Button type="button" onClick={login}>
        Google login
      </Button>
    </div>
  );
}
