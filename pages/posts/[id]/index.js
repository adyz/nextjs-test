import { useRouter } from "next/router";
import Header from "components/Header";
import { getPosts, getPost } from "services/firebase";

const Post = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header />
      <h1>Post: {id}</h1>
      <p>{post.title}</p>
    </>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  const res = await getPosts();
  const arr = [];
  for (let [key, value] of Object.entries(res)) {
    arr.push({
      id: key,
      date: value.date,
      title: value.title,
    });
  }

  // Get the paths we want to pre-render based on posts
  const paths = arr.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await getPost(`${params.id}`);

  // Pass post data to the page via props
  return { props: { post: res } };
}

export default Post;
