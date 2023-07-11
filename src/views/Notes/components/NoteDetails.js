import { Block } from "baseui/block";
import Editor from "../../../components/Editor";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { NotesDocument } from "../../../services/DatabaseService";

const NoteDetails = ({ name, id, note }) => {
  const [value, setValue] = useState(note.note);

  const handleChange = debounce((value) => {
    console.log("save -> ", value);
    NotesDocument.update(note.$id, { note: value });
    setValue(value);
  }, 500);

  return (
    <Block overrides={{ Block: { style: { display: "flex", flex: 1 } } }}>
      <Editor value={value} onChange={handleChange} />
    </Block>
  );
};

export default NoteDetails;
