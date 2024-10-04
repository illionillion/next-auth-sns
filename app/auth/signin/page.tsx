"use client"

import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Text,
} from "@yamada-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import type { FormEvent } from "react"
import { useState } from "react"
import { Layout } from "@/components/layouts"

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  console.log(error)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    console.log(result)

    if (result?.error) {
      setError(result.error)
    } else {
      // ログイン成功後の処理
      console.log("Logged in successfully")
      router.push("/")
    }
  }

  return (
    <Layout>
      <Container as="form" m="auto" onSubmit={handleSubmit}>
        <Heading textAlign="center">サインイン</Heading>
        <FormControl label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl label="Password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        {error ? <Text colorScheme="danger">{error}</Text> : undefined}
        <Button type="submit">サインイン</Button>
        <Button variant="link" as={Link} href="/auth/signup">
          サインアップ
        </Button>
      </Container>
    </Layout>
  )
}

export default Page
