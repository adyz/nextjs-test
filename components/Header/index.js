import { Input, Menu } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const activeItem = router.pathname;

  const handleItemClick = (e, { name }) =>
    router.push(name, undefined, { shallow: true });

  return (
    <>
      <header>
        <Menu secondary>
          <Menu.Item
            name="/"
            content="Home"
            active={activeItem === "/"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="/posts"
            active={activeItem === "/posts"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="/contact"
            active={activeItem === "/contact"}
            onClick={handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item
              name="Login"
              active={activeItem === "Login"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </header>
      <style jsx>
        {`
          header {
            padding: 1rem;
          }
        `}
      </style>
    </>
  );
}
