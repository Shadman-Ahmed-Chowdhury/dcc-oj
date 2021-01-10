import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

export const CodeEditor = (props) => {
  const [theme, toggleTheme] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState({
    id: null,
    name: "Select Language",
  });
  const valueGetter = useRef();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://ce.judge0.com/languages/");
      res
        .json()
        .then((res) => setLanguageList(res))
        .catch((err) => console.error(err));
    }

    fetchData();
  }, []);

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  function sendSourceCodeandLanguageId(event) {
    if (selectedLanguage.id === null) {
      alert("Select A Language");
      event.preventDefault();
    } else if (valueGetter.current() === "") {
      alert("Source code cannot be empty");
      event.preventDefault();
    } else {
      const sourceCode = valueGetter.current();
      props.submit(sourceCode, selectedLanguage);
    }
  }

  return (
    <div>
      <div className="btn-group">
        <DropdownButton
          className="dropdown-lang"
          id="dropdown-basic-button"
          size="sm"
          variant="secondary"
          title={selectedLanguage.name}
        >
          {languageList.map((language) => (
            <Dropdown.Item
              className="dropdown-item"
              key={language.id}
              eventKey={language.name}
              value={language.name}
              onClick={() => handleLanguageSelect(language)}
            >
              {language.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <div className="theme-toggler">
          <span className="theme-label theme-label-light">Light</span>
          <input
            type="checkbox"
            id="switch"
            checked={theme}
            onChange={(e) => toggleTheme(e.currentTarget.checked)}
          />
          <label htmlFor="switch"></label>
          <span className="theme-label">Dark</span>
        </div>
      </div>
      <Editor
        className="content"
        height="55vh"
        theme={theme ? "vs-dark" : "vs"}
        language="c"
        value={`
        #include <stdio.h>

        int main(void) {
          char name[10];
          scanf("%s", name);
          printf("Hello, %s", name);
          return 0;
        }`}
        editorDidMount={handleEditorDidMount}
      />

      <button
        className="btn btn-sm btn-outline-dark submit-btn"
        onClick={sendSourceCodeandLanguageId}
        disabled={!isEditorReady && !selectedLanguage.id}
      >
        Submit!
      </button>
    </div>
  );
};
