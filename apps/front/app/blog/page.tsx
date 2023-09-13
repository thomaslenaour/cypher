import { compareDesc } from 'date-fns'
import { allPosts } from '../../.contentlayer/generated'
import {Footer, Header} from "@cypher/front/components/common";
import React from "react";
import {PostCard} from "../../../../libs/front/components/blog/src/lib/PostCard";
import {Container} from "@cypher/front/shared/ui";

export default function Home() {
  const posts = allPosts.sort((a: any, b: any) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <>
      <Header/>
      <Container>
        <h1 className="mb-8 text-center text-2xl font-black">Next.js + Contentlayer Example</h1>
        {posts.map((post: any, idx: any) => (
          <PostCard key={idx} {...post} />
        ))}
      </Container>
      <Footer/>
    </>
  )
}
