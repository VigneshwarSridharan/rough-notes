import { useState } from "react";
import { Tabs, Tab } from "baseui/tabs-motion";

import NewTab from "./components/NewTab";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { useAtom, useSetAtom } from "jotai";
import { activeTabAtom, tabAtom } from "./atoms";
import { v4 as uuid } from "uuid";
import NoteDetails from "./components/NoteDetails";

const tabsStyle = {
  Root: {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
  },
  TabList: {
    style: {
      flexGrow: 0,
    },
  },
  EndEnhancerContainer: {
    style: ({ $theme }) => ({
      margin: $theme.sizing.scale100,
    }),
  },
};
const tabStyle = {
  Tab: {
    style: ({ $theme }) => ({
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: $theme.sizing.scale100,
    }),
  },
  TabPanel: {
    style: ({ hidden }) => {
      return {
        height: "100%",
        overflow: "auto",
        display: hidden ? "" : "flex",
        flexDirection: "column",
      };
    },
  },
};

const TabButton = ({ onClose, children }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <Block display="flex" alignItems="center">
      <Block
        overrides={{
          Block: {
            style: ({ $theme }) => ({
              marginRight: $theme.sizing.scale200,
              whiteSpace: "nowrap",
            }),
          },
        }}
      >
        {children}
      </Block>
      <Button
        shape={SHAPE.square}
        size={SIZE.mini}
        kind={KIND.tertiary}
        onClick={handleClose}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
    </Block>
  );
};

const AddTab = () => {
  const setTabsList = useSetAtom(tabAtom);
  const setActiveTab = useSetAtom(activeTabAtom);

  return (
    <Button
      shape={SHAPE.square}
      size={SIZE.compact}
      kind={KIND.tertiary}
      onClick={() => {
        const newUUID = uuid();
        setTabsList((prev) => [
          ...prev,
          {
            name: "New Tab",
            id: newUUID,
            noteId: null,
          },
        ]);
        setActiveTab(newUUID);
      }}
    >
      <i className="bi bi-plus-lg"></i>
    </Button>
  );
};

const Notes = () => {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [tabsList, setTabsList] = useAtom(tabAtom);
  const [css, theme] = useStyletron();
  const handleRemoveTab = (id) => {
    if (tabsList.length > 1) {
      const newTablist = tabsList.filter((item) => item.id != id);
      setTabsList(newTablist);
      if (id === activeTab) {
        const tabInx = tabsList.findIndex((item) => item.id === id);
        let inx = tabInx + 1;
        if (tabInx === 0) {
          inx = 1;
        } else if (tabInx === tabsList.length - 1) {
          inx = tabInx - 1;
        }
        const tabItem = tabsList[inx];
        setActiveTab(tabItem.id);
      }
    }
  };
  return (
    <Tabs
      activeKey={activeTab}
      onChange={({ activeKey }) => {
        setActiveTab(activeKey);
      }}
      activateOnFocus
      endEnhancer={<AddTab />}
      overrides={tabsStyle}
    >
      {tabsList.map((item) => {
        return (
          <Tab
            key={item.id}
            overrides={tabStyle}
            title={
              <TabButton onClose={() => handleRemoveTab(item.id)}>
                {item.name}
              </TabButton>
            }
          >
            {!!item.note && <NoteDetails {...item} />}
            {!item.note && <NewTab {...item} />}
          </Tab>
        );
      })}
    </Tabs>
  );
};

export default Notes;
