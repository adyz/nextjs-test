import Head from "next/head";
import Link from "next/link";
import Header from "components/Header";
import { createPost, getPosts } from "services/firebase";
import { Button, Checkbox, Form } from "semantic-ui-react";

export default function Home() {
  const [newPostTitle, setNewPostTitle] = React.useState("");

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
  }

  return (
    <>
      <Head />
      <Header />
      <div className="container">
        <div className="dashboard">
          <h1>This is the dashboard</h1>

          <Form>
            <Form.Group unstackable widths={2}>
              <Form.Input
                label="Post text"
                type="text"
                value={newPostTitle}
                onChange={handleNewPostChange}
              />
            </Form.Group>
            <Form.Button content="Post" />
          </Form>
          <hr />
          <Form>
            <h2>Register</h2>
            <Form.Field>
              <label>First Name</label>
              <input placeholder="First Name" />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder="Last Name" />
            </Form.Field>
            <Form.Field>
              <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
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
