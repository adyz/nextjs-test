import Head from "next/head";
import Link from "next/link";
import { createPost, getPosts } from "services/firebase";

export default function Home({ posts }) {
  const [newPostTitle, setNewPostTitle] = React.useState("");
  const [sPosts, setsPosts] = React.useState(posts);

  function handleNewPostChange(event) {
    setNewPostTitle(event.target.value);
  }

  async function handleNewPostSubmit(e) {
    e.preventDefault();
    const post = {
      title: newPostTitle,
      date: new Date().toISOString(),
    };
    const res = await createPost(post);
    post.id = res.name;
    let newPostsClone = [...sPosts];
    newPostsClone.push(post);
    console.log(newPostsClone);
    setsPosts(newPostsClone);
  }

  return (
    <>
      <Head />
      <div className="container">
        <div className="posts">
          <h1>Here is the list of articles</h1>
          {sPosts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`} as={`/posts/${post.id}`}>
                  <a>{post.id}</a>
                </Link>
              </li>
            );
          })}
        </div>

        <div className="dashboard">
          <h1>This is the dashboard</h1>

          <form onSubmit={handleNewPostSubmit}>
            <label>
              <span>Name</span>
              <br />
              <input
                type="text"
                value={newPostTitle}
                onChange={handleNewPostChange}
              />
            </label>
            <button>POST</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        h1 {
          color: var(--primary);
          font-size: 1rem;
        }
        .container {
          display: grid;
          grid-auto-flow: column;
        }
        .posts,
        .dashboard {
          border: 10px solid #eee;
          padding: 10px;
        }
        .dashboard {
          border-left: 0;
        }
      `}</style>
      <style global jsx>{`
        :root {
          --primary: #0076fa;
          --secondary: #ffd834;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
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
