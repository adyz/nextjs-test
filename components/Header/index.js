import { Input, Menu, Modal, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import LoginForm from "components/Login";
import RegisterForm from "components/Register";
import { GlobalContext } from "components/Context";

export default function Header() {
  const { user, logout } = React.useContext(GlobalContext);
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
            {user.email ? (
              <Button onClick={logout}>Logout {user.email}</Button>
            ) : (
              <>
                <Modal trigger={<Button>Login</Button>}>
                  <Modal.Content>
                    <Modal.Description>
                      <LoginForm />
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
                <Modal trigger={<Button>Register</Button>}>
                  <Modal.Content>
                    <Modal.Description>
                      <RegisterForm />
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </>
            )}
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
