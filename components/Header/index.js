import { Input, Menu, Modal, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import LoginForm from "components/Login";
import RegisterForm from "components/Register";
import { GlobalContext } from "components/Context";

import i18n from "components/i18n/i18n";

export default function Header() {
  const { user, logout } = React.useContext(GlobalContext);
  const [t, { language, changeLanguage }] = i18n.useTranslation();
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
            content={t("h1")}
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
              content={t("change-locale")}
              onClick={() => changeLanguage(language === "en" ? "de" : "en")}
            />
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
