import { format, parseISO } from 'date-fns'
import { allPosts } from '../../../../.contentlayer/generated'
import { Footer, Header } from "@cypher/front/components/common";
import { Button, Container } from "@cypher/front/shared/ui";
import Link from "next/link";

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return (
    <>
      <Header/>
      <Container>
        <Link href="/blog">
          <Button>Retour</Button>
        </Link>
        <article>
          <div>
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'd LLLL yyyy')}
            </time>
            <h1>{post.title}</h1>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </article>
      </Container>
      <Footer/>
    </>
  )
}

export default PostLayout
