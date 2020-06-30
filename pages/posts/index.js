import Header from "components/Header";
import { getPosts } from "services/firebase";
import Link from "next/link";

export default function ({ posts }) {
  const [sPosts, setsPosts] = React.useState(posts);
  return (
    <>
      <Header />
      <div className="posts">
        <h1>Here is the list of articles</h1>
        {sPosts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                <a>{post.id}</a>
              </Link>
            </li>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await getPosts();
  const arr = [];
  for (let [key, value] of Object.entries(res)) {
    arr.push({
      id: key,
      date: value.date,
      title: value.title,
    });
  }
  return {
    props: {
      posts: arr,
    },
  };
}
