import NextAuth from "next-auth";


import type { NextAuthConfig } from "next-auth";



const baseUrl = process.env.AUTH_SERVER_URL
const clientId = process.env.AUTH_CLIENT_ID;
const clientSecret = process.env.AUTH_CLIENT_SECRET;

// const baseUrl = "https://gosu-auth.abdmandhan.my.id";
// const clientId = "1"
// const clientSecret = "secret"

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    {
      clientId: clientId,
      clientSecret:
        clientSecret,
      id: "oauth2orize",
      name: "Oauth2orize",
      type: "oauth",
      authorization: {
        url: `${baseUrl}/oauth/authorize`,
        params: {
          scope: "*",
          prompt: "login",
        },
      },
      // params: {
      //   grant_type: "authorization_code",
      //   async request(context) {
      //     // context contains useful properties to help you make the request.
      //     console.log({context})
      //     return { tokens };
      //   },
      // },
      checks: ["pkce", "state"],
      userinfo: `${baseUrl}/oauth/userinfo`,
      token: `${baseUrl}/oauth/token`,
      async profile(profile: any, tokens: any) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          // image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        session.user.token = token.access_token as string;
        session.user.refresh_token = token.refresh_token as string;
      }

      return session;
    },

    jwt({ token, user, account }) {
      return { ...token, ...account, ...user };
    },
  },
  debug: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
