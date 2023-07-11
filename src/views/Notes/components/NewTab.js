import { Block } from "baseui/block";
import { useEffect, useState } from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { NotesDocument } from "../../../services/DatabaseService";
import { Button } from "baseui/button";
import { Cell, Grid } from "baseui/layout-grid";
import { useAtom, useSetAtom } from "jotai";
import { activeTabAtom, tabAtom } from "../atoms";

const NewTab = ({ name, id, note }) => {
  const [notes, setNotes] = useState([]);
  const setTabsList = useSetAtom(tabAtom);
  useEffect(() => {
    NotesDocument.list().then((res) => {
      console.log("res", res);
      setNotes(res.documents);
    });
  }, []);

  const handleEditNote = (note) => {
    setTabsList((prev) => {
      const inx = prev.findIndex((item) => item.id === id);
      prev[inx].note = note;
      prev[inx].name = note.name;
      return [...prev];
    });
  };

  return (
    <>
      <Block>NewTab</Block>
      <Block>Name: {name}</Block>
      <Block>Id: {id}</Block>
      <Block>Note ID: {note?.$id}</Block>
      <Grid gridColumns={[1, 3, 4, 4]}>
        {notes.map((note) => {
          return (
            <Cell key={note.$id}>
              <Card
                overrides={{
                  Root: {
                    style: ({ $theme }) => ({
                      marginBottom: $theme.sizing.scale600,
                    }),
                  },
                }}
              >
                <StyledBody>{note.name}</StyledBody>
                <StyledAction>
                  <Button
                    overrides={{ BaseButton: { style: { width: "100%" } } }}
                    onClick={() => handleEditNote(note)}
                  >
                    Edit
                  </Button>
                </StyledAction>
              </Card>
            </Cell>
          );
        })}
      </Grid>
    </>
  );
};

export default NewTab;
