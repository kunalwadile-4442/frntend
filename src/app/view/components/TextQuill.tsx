/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import { UUID4 } from "../../utils/common";




function TextQuill(props) {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Ref for the menu
  const [tagText, setTagText] = useState("");
  const [cursor, setCursor] = useState(0);
  const editorRef = useRef(null); // Ref for ReactQuill

  const id = useMemo(() => UUID4(), []);

  const onChangeText = (e) => {
    props?.onChange(e);
    checkForSpecialCharacter();
  };

const keyword_list = props?.keywords || [];

  const checkForSpecialCharacter = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const startContainer = range.startContainer;
      const text = startContainer.textContent || "";
      if (startContainer.nodeType === Node.TEXT_NODE) {
        const cursorPosition = range.startOffset;
        const lastAtIndex = text.lastIndexOf("#", cursorPosition - 1);
        if (lastAtIndex !== -1) {
          const textAfterAt = text.substring(lastAtIndex + 1, cursorPosition);
          if (
            !/\s/.test(textAfterAt) &&
            (textAfterAt.length > 0 || text[lastAtIndex] == "#")
          ) {
            setTagText(textAfterAt);
            setShowMenu(true);
            setTimeout(() => setCursor(0), 40);
            return;
          }
        }
      }
      setShowMenu(false);
      setTagText("");
    }
  };

  const handleInput = (e) => {
    onChangeText(e);
  };

  const callSelectTag = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    const tagTextReplacement = `#${item?.name}`; // This is plain text replacement
    const tagTextPattern = new RegExp(`#${tagText}(?![\\w\\s])`, "g"); // Pattern to match #tagText
    const textChange = props?.field?.value?.replace(
      tagTextPattern,
      `${tagTextReplacement}&nbsp;`
    ); // Replace tag with formatted string
    if (editorRef.current) {
      const quill = editorRef.current.getEditor(); // Get Quill editor instance
      const range = quill.getSelection();
      const cursorIndex = range ? range.index : 0;
      onChangeText(textChange);
      const insertPosition = cursorIndex + `${tagTextReplacement}&nbsp;`.length;
      quill.setSelection(insertPosition);
    }
  };

  const gotoMain = (value) => {
    const element = document.getElementById("innerDivScroll13" + cursor);
    document
      .getElementById(`menuScroll1-${id}`)
      .scrollTo({ top: element.offsetTop + value, behavior: "smooth" });
  };

  const filteredKeywords = keyword_list
    ?.filter((item) =>
      item.page.includes(props?.tagPage ? `${props?.tagPage},` : "")
    )
    ?.filter((item) => item.name.toLowerCase().includes(tagText.toLowerCase()));
  const handleKeyDown = (e) => {
    if (showMenu) {
      if (e.keyCode === 38 || e.keyCode === 40 || e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
      }
      if (e.key === "Enter") {
        if (filteredKeywords[cursor]) {
          const selectedItem = filteredKeywords[cursor];
          callSelectTag(e, selectedItem);
          setTimeout(() => setCursor(0), 40);
          setShowMenu(false);
        }
      } else if (e.keyCode === 38 && cursor > 0) {
        gotoMain(-90);
        setCursor(cursor - 1);
      } else if (e.keyCode === 40 && cursor < filteredKeywords?.length - 1) {
        gotoMain(+10);
        setCursor(cursor + 1);
      }
    }
  };

  let quillRef = null;
  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async function () {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const range = quillRef.getEditor().getSelection();
        quillRef.getEditor().insertEmbed(range.index, "image", e.target.result);
      };
      reader.readAsDataURL(file);
    };
  }
  const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}], 
      ],

  };

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, false] }],
//         ["bold", "italic", "underline", "strike", "blockquote"],
//         [
//           { list: "ordered" },
//           { list: "bullet" },
//           { indent: "-1" },
//           { indent: "+1" },
//         ],
//         ["link", "image"], // Image option
//         ["clean"],
//       ],
//       handlers: {
//         image: imageHandler, // Custom image handler
//       },
//     },
//   };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    if (showMenu && document.getElementById(`menuScroll1-${id}`)) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const boundingRect = range.getBoundingClientRect();
        const menuWidth = 250;
        const menuHeight = document.getElementById(
          `menuScroll1-${id}`
        ).clientHeight;
        const spaceAbove = boundingRect.top + window.scrollY;
        const spaceBelow = window.innerHeight - boundingRect.bottom;
        let topPosition, leftPosition;
        if (spaceBelow >= menuHeight) {
          topPosition = boundingRect.bottom + window.scrollY + 15;
        } else {
          topPosition = boundingRect.top + window.scrollY - menuHeight - 15;
        }
        leftPosition = Math.max(
          0,
          Math.min(
            boundingRect.left + window.scrollX,
            window.innerWidth - menuWidth
          )
        );
        setMenuPosition({ top: topPosition, left: leftPosition });
      }
    }
  }, [showMenu, tagText, cursor]);

  return (
    <React.Fragment>
      <div className="p-view-footer" id={id}>
        <div className={`${props?.isToolbar ? "h-40" : "ql-text-line h-full"}`}>
          <ReactQuill
            {...props?.field}
            ref={editorRef} // Set ref for ReactQuill
            theme="snow"
            className={`${props?.innerRender ? "h-full" : "h-full"}`}
            onChange={handleInput}
            onKeyPress={handleKeyDown}
            onKeyDown={handleKeyDown}
            modules={props?.isToolbar ? modules : { toolbar: null }}
            value={props?.field?.value}
            formats={props?.isToolbar && formats}
            readOnly={props?.readOnly}
          />
        </div>
      </div>
      {showMenu && (
        <>
          <div
            ref={menuRef}
            className="menu-editor"
            style={{ top: menuPosition.top, left: menuPosition.left }}
            tabIndex={-1}
            id={`menuScroll1-${id}`}
          >
            {filteredKeywords?.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className={
                    cursor === index
                      ? "list-item text-sm actions"
                      : "list-item text-sm"
                  }
                  onClick={(e) => callSelectTag(e, item)}
                  id={"innerDivScroll13" + index}
                  onMouseEnter={() => setCursor(index)}
                >
                  {item?.name}
                </div>
              </React.Fragment>
            ))}
            {filteredKeywords?.length === 0 && (
              <div className="list-item text-sm">No data Found</div>
            )}
          </div>
          <div
            className="menu_backdrop"
            onClick={(e) => {
              e.preventDefault();
              setShowMenu(false);
              setCursor(0);
            }}
          ></div>
        </>
      )}
    </React.Fragment>
  );
}

export default TextQuill;
