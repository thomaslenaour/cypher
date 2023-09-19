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
  static getMainHighlightedPost(): Post {
    return allPosts.find((post: Post) => post.mainPost) || PostsHelper.getAllPostsSortedByDate()[0];
  }

  static getHighlightedPosts(): Post[] {
    return PostsHelper.getAllPostsSortedByDate().filter((post: Post) => post.highlight && !post.mainPost);
  }

  static getLastTwoPostsNotHighlighted(): Post[] {
    const allPostsNotHighlighted = PostsHelper.getAllPostsNotHighlighted();
    return [allPostsNotHighlighted[0], allPostsNotHighlighted[1]];
  }

  static getRestNonSpecialPosts(): Post[] {
    const mainHighlitedPost = PostsHelper.getMainHighlightedPost();
    const highlightedPosts =
      PostsHelper.getHighlightedPosts();

    const allHighlitedPosts = [mainHighlitedPost, highlightedPosts[0], highlightedPosts[1]]

    const allPostsSortedByDate = PostsHelper.getAllPostsSortedByDate();

    return allPostsSortedByDate.filter(
      (post) =>
        !allHighlitedPosts.some(
          (highlightPost) => highlightPost.title === post.title
        )
    );
  }

  static getAllPostsTags(): string[] {
    const allTags = PostsHelper.getRestNonSpecialPosts().map(
      (post: Post) => post.tag
    );
    // remove duplicates
    return [...new Set(allTags)];
  }

  static getAllPostsMatchWithTags(
    tags: string[] = PostsHelper.getAllPostsTags()
  ): Post[] {
    if (tags.length === 1 && tags[0] === 'Tous') {
      return PostsHelper.getRestNonSpecialPosts();
    }
    return PostsHelper.getRestNonSpecialPosts().filter((post: Post) =>
      tags.some((tag: string) => post.tag === tag)
    );
  }

  static getLastThreePostsThatNotTheCurrent(postTitle: string) {
    const allPostsThatNotTheCurrent =
      PostsHelper.getAllPostsSortedByDate().filter(
        (post: Post) => post.title !== postTitle
      );

    return [
      allPostsThatNotTheCurrent[0],
      allPostsThatNotTheCurrent[1],
      allPostsThatNotTheCurrent[2],
    ];
  }
}
