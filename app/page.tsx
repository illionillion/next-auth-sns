import { Box, Button, Heading } from "@yamada-ui/react"
import Link from "next/link"
import { Layout } from "@/components/layouts"
import { auth } from "@/utils/auth/auth"

export default async function Home() {
  const session = await auth()
  return (
    <Layout>
      <Heading>Hello</Heading>
      <Box as="pre">{JSON.stringify(session, null, 2)}</Box>
      {session ? (
        <Button as={Link} href="/api/auth/signout">
          Sign out
        </Button>
      ) : (
        <Button as={Link} href="/api/auth/signin">
          Sign in
        </Button>
      )}
    </Layout>
  )
}
