import { auth, signIn, signOut } from "auth"
import { Button } from "./ui/button"
import axios from "axios"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async (req) => {
        "use server"
        const session = await auth()

        
        if(session?.user) {
          // await axios.post("http://localhost:3000/oauth/logout", {
          //   token: session.user.token,
          // });

          await axios.post(`${process.env.AUTH_SERVER_URL}/oauth/logout`, {
            token: session.user.token,
          });
          
        }
      
        
        await signOut()
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}
