"use client"

import { Center, VStack } from "@yamada-ui/react"
import type { FC } from "react"
import { Header } from "./header"

export const Layout: FC = ({ ...rest }) => {
  return (
    <>
      <Header />

      <Center as="main" w="full">
        <VStack
          alignItems="flex-start"
          w="full"
          maxW="9xl"
          gap={{ base: "lg", md: "md" }}
          py="lg"
          px={{ base: "lg", md: "md" }}
          {...rest}
        />
      </Center>
    </>
  )
}
