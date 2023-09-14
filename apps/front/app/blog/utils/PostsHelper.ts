import { compareDesc } from 'date-fns';
import { allPosts, Post } from '../../../.contentlayer/generated';

export class PostsHelper {
  static getAllPostsSortedByDate(): Post[] {
    return allPosts.sort((a: any, b: any) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );
  }

  // Returns the highlighted post. If no post has been configured to be highlighted, returns the last post created.
  static getHighlightPost(): Post {
    return allPosts.find((post) => post.highlight) || allPosts[0];
  }

  // Avant-dernier et avant avant-dernier post
  static getPenultimateAndAntepenultimate(): Post[] {
    return [allPosts[1], allPosts[2]];
  }
}
