import {Post} from "../../../../../../apps/front/.contentlayer/generated";
import Link from "next/link";
import { format, parseISO } from 'date-fns'
import { Box, Card, Typography } from "@mui/joy";

export function PostCard(post: Post) {
  return (
    <Link href={`/blog/${post.url}`}>
      <Box sx={{
        border: "1px solid red",
        background: "blur"
      }}>
        <Typography level="h2">
            {post.title}
        </Typography>
        <Typography level="h3">
            {post.description}
        </Typography>
        <time dateTime={post.date} >
          {format(parseISO(post.date), 'd LLLL, yyyy')}
        </time>
      </Box>
    </Link>
  )
}
