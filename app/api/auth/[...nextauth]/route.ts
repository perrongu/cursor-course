import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        if (url.includes("callbackUrl")) {
          const callbackUrl = new URL(url).searchParams.get("callbackUrl");
          if (callbackUrl && callbackUrl.startsWith(baseUrl)) {
            return callbackUrl;
          }
        }
        return url;
      }
      return baseUrl + "/dashboards";
    }
  },
})

export { handler as GET, handler as POST } 