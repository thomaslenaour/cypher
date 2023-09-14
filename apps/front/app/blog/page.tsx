import {Footer, Header} from "@cypher/front/components/common";
import React from "react";
import { Box, Grid, Stack } from "@cypher/front/shared/ui";
import { LeftSide } from "./components/LeftSide";
import { RightSide } from "./components/RightSide";
import { SvgBackground } from "../../../../libs/front/pages/root/src/lib/components/SvgBackground";
export default function Home() {
  return (
    <>
      <Header />
      <Box mx={{ xs: 3, sm: 8, md: 10, lg: 15 }} >
        <SvgBackground />
        <Stack direction="row" spacing={4} sx={{ mt: 10, minHeight: "80vh" }}>
          <LeftSide />
          <RightSide />
        </Stack>
      </Box>
      <Footer />
    </>
  )
}
