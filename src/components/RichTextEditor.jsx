import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Editor, Range, Transforms } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";

// -------------------- Helpers --------------------
const toggleMark = (editor, format, value = true) => {
  if (!editor.selection || Range.isCollapsed(editor.selection)) {
    return; // nothing selected → ignore
  }
  const isActive = isMarkActive(editor, format, value);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value);
  }
};

const isMarkActive = (editor, format, value = true) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === value : false;
};

// -------------------- Toolbar Buttons --------------------
const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
      style={{
        padding: "4px 8px",
        marginRight: "8px",
        border: isMarkActive(editor, format)
          ? "2px solid black"
          : "1px solid gray",
        borderRadius: "4px",
        background: isMarkActive(editor, format) ? "#ddd" : "white",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

// Font size dropdown
const FontSizeSelect = () => {
  const editor = useSlate();
  const changeFontSize = (size) => {
    if (!editor.selection || Range.isCollapsed(editor.selection)) return;
    Editor.addMark(editor, "fontSize", size);
  };

  return (
    <select
      onChange={(e) => changeFontSize(e.target.value)}
      defaultValue="16px"
      style={{ marginRight: "8px", padding: "4px" }}
    >
      <option value="12px">12px</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="18px">18px</option>
      <option value="20px">20px</option>
      <option value="24px">24px</option>
    </select>
  );
};

// Font family dropdown
const FontFamilySelect = () => {
  const editor = useSlate();
  const changeFontFamily = (family) => {
    if (!editor.selection || Range.isCollapsed(editor.selection)) return;
    Editor.addMark(editor, "fontFamily", family);
  };

  return (
    <select
      onChange={(e) => changeFontFamily(e.target.value)}
      defaultValue="Arial"
      style={{ marginRight: "8px", padding: "4px" }}
    >
      <option value="Arial">Arial</option>
      <option value="Times New Roman">Times New Roman</option>
      <option value="Courier New">Courier New</option>
      <option value="Georgia">Georgia</option>
      <option value="Verdana">Verdana</option>
    </select>
  );
};

// Text color picker
const ColorPicker = () => {
  const editor = useSlate();
  const changeColor = (color) => {
    if (!editor.selection || Range.isCollapsed(editor.selection)) return;
    Editor.addMark(editor, "color", color);
  };

  return (
    <input
      type="color"
      defaultValue="#000000"
      onChange={(e) => changeColor(e.target.value)}
      style={{ marginRight: "8px", cursor: "pointer" }}
    />
  );
};

// -------------------- Leaf Renderer --------------------
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code)
    children = (
      <code style={{ background: "#eee", padding: "2px 4px" }}>{children}</code>
    );
  if (leaf.superscript) children = <sup>{children}</sup>;
  if (leaf.subscript) children = <sub>{children}</sub>;
  if (leaf.fontSize)
    children = <span style={{ fontSize: leaf.fontSize }}>{children}</span>;
  if (leaf.fontFamily)
    children = <span style={{ fontFamily: leaf.fontFamily }}>{children}</span>;
  if (leaf.color)
    children = <span style={{ color: leaf.color }}>{children}</span>;

  return <span {...attributes}>{children}</span>;
};

// -------------------- Main Component --------------------
const RichTextEditor = ({
  placeholder = "Enter some rich text...",
  value,
  onChange,
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  // ensure editor always has at least one node
  if (value.length === 0) {
    setValue([{ type: "paragraph", children: [{ text: "" }] }]);
  }

  return (
    <div className="flex flex-col w-full">
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        {/* Toolbar */}
        <div style={{ marginBottom: "10px" }}>
          <MarkButton format="bold">B</MarkButton>
          <MarkButton format="italic">I</MarkButton>
          <MarkButton format="underline">U</MarkButton>
          <MarkButton format="code">{`</>`}</MarkButton>
          <MarkButton format="superscript">X²</MarkButton>
          <MarkButton format="subscript">X₂</MarkButton>
          <FontSizeSelect />
          <FontFamilySelect />
          <ColorPicker />
        </div>
        {/* Editable Area */}
        <Editable
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            minHeight: "150px",
            backgroundColor:"white"
          }}
          onKeyDown={(event) => {
            // example: ctrl+b = bold
            if (event.ctrlKey && event.key === "b") {
              event.preventDefault();
              toggleMark(editor, "bold");
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default RichTextEditor;
