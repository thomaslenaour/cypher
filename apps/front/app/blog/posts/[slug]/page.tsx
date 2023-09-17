import { format, parseISO } from 'date-fns';
import { allPosts } from '../../../../.contentlayer/generated';
import { Footer, Header } from '@cypher/front/components/common';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@cypher/front/shared/ui';
import Link from 'next/link';
import { SvgBackground } from '../../../../../../libs/front/pages/root/src/lib/components/SvgBackground';
import React from 'react';
import { RecordingAnimation } from '../../../../../../libs/front/pages/root/src/lib/components/RecordingAnimation';
import { fr } from 'date-fns/locale';

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
      </Container>
      <Footer />
    </>
  );
};

export default PostLayout;
