import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, DarkTheme, BaseProvider, useStyletron } from "baseui";
import { Block } from "baseui/block";
import { useAtom } from "jotai";
import appThemeAtom from "./atoms/AppTheme";
import { THEME } from "./contacts";

const engine = new Styletron();

const Layout = (props) => {
  const [theme] = useAtom(appThemeAtom);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme === THEME.light ? LightTheme : DarkTheme}>
        <LayoutBlock {...props} />
      </BaseProvider>
    </StyletronProvider>
  );
};

const LayoutBlock = ({ children }) => {
  const [css, theme] = useStyletron(appThemeAtom);

  console.log("sdss--d", theme);

  return (
    <Block
      className={css({
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.primary,
        minHeight: "100vh",
      })}
    >
      {children}
    </Block>
  );
};

export default Layout;
