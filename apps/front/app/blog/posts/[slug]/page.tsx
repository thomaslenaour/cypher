import { format, parseISO } from 'date-fns';
import { allPosts, Post } from '../../../../.contentlayer/generated';
import { Box, Container, Grid, Typography } from '@cypher/front/shared/ui';
import React from 'react';
import { fr } from 'date-fns/locale';
import { PostsHelper } from '../../utils/PostsHelper';
import { PostCard } from '../../components/PostCard';
import { BackButton } from '../../components/BackButton';
import { Footer, Header } from '@cypher/front/components/common/server';
import { RecordingAnimation } from '@cypher/front/components/common';
import { RightSide } from '../components/RightSide';

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
        <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '40%' }}>
            <RecordingAnimation />
          </Box>
        </Box>
        <Box mb={3} sx={{ position: 'sticky', top: '2rem' }}>
          <BackButton />
        </Box>
        <Typography level="body-sm">
          <time dateTime={post.date}>
            {format(parseISO(post.date), 'dd MMMM yyyy', { locale: fr })}
          </time>
        </Typography>
        <Grid container spacing={5}>
          <Grid xs={12} md={8}>
            <Typography my={4} level="h1" fontSize={{ sm: 40, md: 50 }}>
              {post.title}
            </Typography>
            <Typography>
              <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <RightSide {...post} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default PostLayout;
