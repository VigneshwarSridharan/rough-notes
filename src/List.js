import { Button } from "baseui/button";

import { useAtom } from "jotai";
import appThemeAtom from "./atoms/AppTheme";
import { THEME } from "./contacts";

const List = () => {
  const [theme, setTheme] = useAtom(appThemeAtom);
  return (
    <>
      <Button
        onClick={() =>
          setTheme(theme === THEME.light ? THEME.dark : THEME.light)
        }
      >
        {theme}
      </Button>
    </>
  );
};

export default List;
