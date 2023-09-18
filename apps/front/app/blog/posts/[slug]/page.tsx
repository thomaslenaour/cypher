import { format, parseISO } from 'date-fns';
import {allPosts, Post} from '../../../../.contentlayer/generated';
import { Footer, Header } from '@cypher/front/components/common';
import {
  Box,
  Button,
  Container, Grid,
  Stack,
  Typography,
} from '@cypher/front/shared/ui';
import Link from 'next/link';
import { SvgBackground } from '../../../../../../libs/front/pages/root/src/lib/components/SvgBackground';
import React from 'react';
import { RecordingAnimation } from '../../../../../../libs/front/pages/root/src/lib/components/RecordingAnimation';
import { fr } from 'date-fns/locale';
import {PostsHelper} from "../../utils/PostsHelper";
import {PostCard} from "../../components/PostCard";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <>
      <Header />
      <Container>
        <Link href="/blog">
          <Button>Retour</Button>
        </Link>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '40%' }}>
            <RecordingAnimation />
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Typography level="body-sm">
              <time dateTime={post.date}>
                {format(parseISO(post.date), 'dd MMMM yyyy', { locale: fr })}
              </time>
            </Typography>
            <Typography my={4} level="h1" fontSize={50}>
              {post.title}
            </Typography>
            <Typography>
              <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography level="h3">A voir aussi</Typography>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              {PostsHelper.getThreeHighlightedPosts().map(
                (post: Post, idx: number) => (
                  <Grid xs={4} md={12}>
                    <PostCard key={idx} {...post} />
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default PostLayout;
