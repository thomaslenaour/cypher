import { compareDesc } from 'date-fns';
import { allPosts, Post } from '../../../.contentlayer/generated';

export class PostsHelper {
  static getAllPostsSortedByDate(): Post[] {
    return allPosts.sort((a: any, b: any) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );
  }

  static getAllPostsNotHighlighted(): Post[] {
    return PostsHelper.getAllPostsSortedByDate().filter(
      (post: Post) => !post.highlight
    );
  }

  // Returns the highlighted post. If no post has been configured to be highlighted, returns the last post created.
  static getHighlightPost(): Post {
    return allPosts.find((post: Post) => post.highlight) || allPosts[0];
  }

  static getLastTwoPostsNotHighlighted(): Post[] {
    const allPostsNotHighlighted = PostsHelper.getAllPostsNotHighlighted();
    return [allPostsNotHighlighted[0], allPostsNotHighlighted[1]];
  }
}
