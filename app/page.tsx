import { Box, Button, Heading } from "@yamada-ui/react"
import Link from "next/link"
import { Layout } from "@/components/layouts"
import { auth, signOut } from "@/utils/auth/auth"

export default async function Home() {
  const session = await auth()
  return (
    <Layout>
      <Heading>Hello</Heading>
      <Box as="pre">{JSON.stringify(session, null, 2)}</Box>
      {session ? (
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button type="submit">Sign out</Button>
        </form>
      ) : (
        <Button as={Link} href="/auth/signin">
          Sign in
        </Button>
      )}
    </Layout>
  )
}
