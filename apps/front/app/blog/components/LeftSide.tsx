'use client';

import { Box, Stack } from "@cypher/front/shared/ui";
import React from "react";
import { Catchphrase } from "./Catchphrase";
import { PostsHelper } from "../utils/PostsHelper";
import { PostCard } from "./PostCard";

export function LeftSide() {
  // const postsSortedByDate = PostsHelper.getAllPostsSortedByDate();

  const highlightPost = PostsHelper.getHighlightPost();

  return (
  <Box>
    <Stack direction="column" sx={{
      height: "100%",
    }}>
      <Catchphrase />
      <PostCard {...highlightPost} />
    </Stack>
  </Box>
  )
}
