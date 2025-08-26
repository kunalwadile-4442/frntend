/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { App_url  } from "../../utils/constants/static";
import Icon from "./Icon";
import { useWebSocket } from "../../api/websocket/WebSocketContext";
import { UUID4 } from "../../utils/common";

function TextEditor(props) {
    const { send, isConnect } = useWebSocket()
    const [content, setContent] = useState(props?.field?.value);
    const [selection, setSelection] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const editorRef = useRef(null);
    const editorRef2 = useRef(null);

    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null); // Ref for the menu‚
    const [tagText, setTagText] = useState("")
    const [cursor, setCursor] = useState(0);
    const [valueCheck, setValueCheck] = useState(false)

    const id = useMemo(() => UUID4(), []);

    useEffect(() => {
        if (props?.field?.value && !valueCheck) {
            editorRef.current.innerHTML = props?.field?.value;
            setValueCheck(true)
        }
    }, [props?.field?.value])

    const onChangeText = (e) => {
        setContent(e);
        if (e === "<p><br></p>") {
            editorRef.current.innerHTML = "<p><br></p>"
        }
        props?.onChange(e);
        // editorRef.current.innerHTML = e
        // updateCursorPosition()
    }
    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        cleanAndSaveHistory();
        updateCursorPosition();
    };
    // useEffect(() => {
    //     if (isConnect && tagText) {
    //         send({ type: "customerService", action: "list", payload: { query: tagText, limit: "10", page: "1", active: false }, demo:{request_for:"text-editor"} })
    //         send({ type: "customerService", action: "list", payload: { query: tagText, limit: "10", page: "1", active: false }, demo:{request_for:"text-editor"} })
    //         send({ type: "customerService", action: "list", payload: { query: tagText, limit: "10", page: "1", active: false }, demo:{request_for:"text-editor"} })
    //         send({ type: "customerService", action: "list", payload: { query: tagText, limit: "10", page: "1", active: false }, demo:{request_for:"text-editor"} })
    //     }
    // }, [isConnect, tagText]);
    const wrapSelection = (before, after) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
            const wrappedText = `${before}${selectedText}${after}`;
            range.deleteContents();
            const newNode = document.createElement("span");
            newNode.innerHTML = wrappedText;
            range.insertNode(newNode);
            range.setStartAfter(newNode);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            cleanAndSaveHistory();
            updateCursorPosition();
        }
    };

    const handleMouseUp = () => {
        setSelection(window.getSelection().toString());
    };
    

    const checkForSpecialCharacter = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const startContainer = range.startContainer;
            const text = startContainer.textContent || "";
            if (startContainer.nodeType === Node.TEXT_NODE) {
                const cursorPosition = range.startOffset;
                // if (cursorPosition === text.length) {
                const lastAtIndex = text.lastIndexOf('#', cursorPosition - 1);
                if (lastAtIndex !== -1) {
                    const textAfterAt = text.substring(lastAtIndex + 1, cursorPosition);
                    if ((!/\s/.test(textAfterAt)) && (textAfterAt.length > 0 || text[lastAtIndex] == "#")) {
                        setTagText(textAfterAt)
                        // Get bounding rect for the range
                        const boundingRect = range.getBoundingClientRect();
                        const menuWidth = 250;
                        const menuHeight = 200;
                        const spaceAbove = boundingRect.top + window.scrollY;
                        const spaceBelow = window.innerHeight - boundingRect.bottom;
                        let topPosition, leftPosition;
                        if (spaceBelow >= menuHeight) {
                            topPosition = boundingRect.bottom + window.scrollY + 15;
                        } else {
                            topPosition = boundingRect.top + window.scrollY - menuHeight - 15;
                        }
                        leftPosition = Math.max(0, Math.min(boundingRect.left + window.scrollX, window.innerWidth - menuWidth));
                        setMenuPosition({
                            top: topPosition,
                            left: leftPosition
                        });
                        setShowMenu(true);
                        setCursor(0)
                        return;
                    }
                }
                // }
            }
            setShowMenu(false);
            setTagText("")
        }
    };

    const handleInput = (e) => {
        const editorContent = editorRef.current.innerHTML;
        if (!editorContent.trim()) {
            onChangeText("<p><br></p>");
        } else if (!editorContent.startsWith("<") || !content.startsWith("<")) {
            editorRef.current.innerHTML = `<p>${editorContent}</p>`
            onChangeText(`<p>${editorContent}</p>`);
        } else {
            onChangeText(editorContent);
        }
        cleanAndSaveHistory(editorContent);
        updateCursorPosition();
        checkForSpecialCharacter()
    };

    const cleanAndSaveHistory = (newContent = null) => {
        const currentContent =
            newContent !== null ? newContent : editorRef.current.innerHTML;
        // Remove empty paragraphs
        const cleanedContent = currentContent.replace(/<p><br><\/p>/g, "").trim();
        const updatedHistory = [
            ...history.slice(0, historyIndex + 1),
            cleanedContent,
        ];
        setHistory(updatedHistory);
        setHistoryIndex(updatedHistory.length - 1);
        onChangeText(cleanedContent || "<p><br></p>"); // Ensure there's always some content
        updateCursorPosition();
    };
    const handleBold = () => execCommand("bold");
    const handleItalic = () => execCommand("italic");
    const handleUnderline = () => execCommand("underline");
    const handleStrikeThrough = () => execCommand("strikeThrough");
    const isSelectionInBlockquote = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let container: any = range.commonAncestorContainer;
            while (container) {
                if (container.nodeType === 1 && container.tagName === "BLOCKQUOTE") {
                    return true;
                }
                container = container.parentNode;
            }
        }
        return false;
    };
    const removeBlockquote = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let container: any = range.commonAncestorContainer;
            while (container && container.tagName !== "BLOCKQUOTE") {
                container = container.parentNode;
            }
            if (container && container.tagName === "BLOCKQUOTE") {
                const parent = container.parentNode;
                while (container.firstChild) {
                    parent.insertBefore(container.firstChild, container);
                }
                parent.removeChild(container);
                cleanAndSaveHistory();
            }
            updateCursorPosition();
        }
    };
    // Update cursor position based on the current selection
    const updateCursorPosition = () => {
        scrollToCursor();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            setCursorPosition({
                start: range.startOffset,
                end: range.endOffset
            });
        }
    };

    const handleQuote = () => {
        if (isSelectionInBlockquote()) {
            removeBlockquote();
        } else {
            execCommand("formatBlock", "blockquote");
        }
    };
    const handleOrderedList = () => execCommand("insertOrderedList");
    const handleUnorderedList = () => execCommand("insertUnorderedList");
    const handleCode = () => wrapSelection("<code>", "</code>");
    const handleCodeBlock = () => wrapSelection("<pre><code>", "</code></pre>");
    const scrollToCursor = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const boundingRect = range.getBoundingClientRect();
            window.scrollTo({
                top: boundingRect.top + window.scrollY - 30,
                left: boundingRect.left + window.scrollX,
                behavior: 'smooth'
            });
        }
    };
    const setCursorToEnd = (element) => {
        // const range = selection.getRangeAt(0);
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    };
    useEffect(() => {
        document.execCommand("defaultParagraphSeparator", false, "p");
        scrollToCursor()
    }, [content]);

    useEffect(() => {
        cleanAndSaveHistory(content);
    }, []);

    useEffect(() => {
        if (!content) {
            onChangeText("<p><br></p>");
            updateCursorPosition();
        }
    }, []);
    useEffect(() => {
        const handleClick = (event) => {
            const pViewFooter = document.getElementById(id);
            if (pViewFooter && pViewFooter.contains(event.target)) {
                if (editorRef.current) {
                    editorRef.current.focus();
                }
            }
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    const buttons = [
        { title: "Bold", function: (e) => handleBold(), icon: App_url?.image?.Bold },
        { title: "Italic", function: (e) => handleItalic(), icon: App_url?.image?.Italic },
        { title: "Underline", function: (e) => handleUnderline(), icon: App_url?.image?.Underline },
        { title: "StrikeThrough", function: (e) => handleStrikeThrough(), icon: App_url?.image?.Strike },
        { title: "Quote", function: (e) => handleQuote(), icon: App_url?.image?.Quote },
        { title: "Ordered List", function: (e) => handleOrderedList(), icon: App_url?.image?.OrderList },
        { title: "Unordered List", function: (e) => handleUnorderedList(), icon: App_url?.image?.UnOrderList },
        // { title: "Code", function: (e) => handleCode(), icon: App_url?.image?.Code },
        // { title: "Code Block", function: (e) => handleCodeBlock(), icon: App_url?.image?.CodeBlock },
    ];

    const ButtonEditor = (props) => {
        const onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            props?.onClick(e)
        }
        const renderButton = () => {
            return (
                <button className={`${props?.className}`} onClick={onClick}>
                    {props?.children}
                </button>
            )
        }
        if (!props.title) {
            return renderButton();
        }
        return (
            renderButton()
        )
    }

    // const callSelectTag = (e, item: ICustomers) =>{
    //     e.preventDefault();
    //     e.stopPropagation();
    //     // const textChange = content?.replace(`#${tagText}`, `<tag id='${item?.id}'>${item?.name}</tag>`);
    //     const textChange = content?.replace(`#${tagText}`, `<tag style='background:aliceblue'>${item?.name}</tag>`);
    //     onChangeText(textChange);
    //     editorRef.current.innerHTML = textChange
    //     setCursorToEnd(editorRef.current);
    //     setMenuPosition({top:0, left:0})
    //     setShowMenu(false)
    // }


    const callSelectTag = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;
        const positionContent = content.indexOf(`#${tagText}`)

        const textChange = content?.replace(`#${tagText}`, `<tag></tag>${item?.name}&nbsp;`); // Add space after the tag
        onChangeText(textChange);
        editorRef.current.innerHTML = textChange;
        setCursorPositionAfterTag(editorRef.current, positionContent + item?.name.length + 1);
        setMenuPosition({ top: 0, left: 0 });
        setShowMenu(false);
    };

    const setCursorPositionAfterTag = (element, position) => {
        const selection = window.getSelection();
        const range = document.createRange();
    
        let currentNode = null;
        let currentPosition = 0;
    
        const findTextNode = (element, position) => {
            for (let i = 0; i < element.childNodes.length; i++) {
                const child = element.childNodes[i];
    
                if (child.nodeType === Node.TEXT_NODE) {
                    if (currentPosition + child.textContent.length >= position) {
                        return { node: child, pos: position - currentPosition }; // Adjust position relative to the node
                    }
                    currentPosition += child.textContent.length;
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const result = findTextNode(child, position);
                    if (result) {
                        return result;
                    }
                }
            }
            return null;
        };
    
        const result = findTextNode(element, position);
    
        if (result) {
            const { node, pos } = result;
            range.setStart(node, Math.min(pos, node.textContent.length));
            range.setEnd(node, Math.min(pos, node.textContent.length));
        } else {
            range.selectNodeContents(element);
            range.collapse(false);
        }
    
        selection.removeAllRanges();
        selection.addRange(range);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', checkForSpecialCharacter);
    }, []);

    const gotoMain = (value) => {
        const element = document.getElementById('innerDivScroll13' + cursor);
        document.getElementById('menuScroll1').scrollTo({ top: element.offsetTop + value, behavior: 'smooth' });
    };
          
    const getCursorPosition = (element) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        let cursorPosition = range.startOffset; 
        return cursorPosition;
    };
    const handleKeyDown = (e) => {
        if (showMenu) {
            e.preventDefault();
            e.stopPropagation();
            if (e.key === 'Enter') {
               if (e.keyCode === 38 && cursor > 0) {
                gotoMain(-90);
                setCursor(cursor - 1);
            } else if (e.keyCode === 40)  {
                gotoMain(+10);
                setCursor(cursor + 1);
            }
        }
    };
    return (
        <React.Fragment>
            <div className="p-view-footer" id={id}>
                <div className="position-relative h-100 w-100">
                    <div className="text-editor">
                        {props?.isToolbar && <div className="toolbar">
                            {buttons.map((item, index) => (
                                <ButtonEditor {...item} className="text-button" key={index} onClick={item.function}>
                                    <Icon attrIcon={item.icon} />
                                </ButtonEditor>
                            ))}
                        </div>}
                        <div className={`${props?.isToolbar ? 'ql-editor' : 'ql-text-line'}`}>

                            <div
                                {...props?.field}
                                ref={editorRef}
                                className={`editor ${content == "" || content == "<p><br></p>" ? "editor-placeholder" : ""}`}
                                contentEditable
                                onMouseUp={handleMouseUp}
                                onKeyDown={(e) => handleKeyDown(e)}
                                // dangerouslySetInnerHTML={{ __html: content }}
                                onInput={handleInput}
                                data-placeholder={props?.placeholder}
                            ></div>
                             <div
                                ref={editorRef2}
                                className={` hidden `}
                                dangerouslySetInnerHTML={{ __html: content }}
                                hidden
                                
                            ></div>
                        </div>

                    </div>
                </div>
            </div>
            {showMenu && (
                <>
                    <div
                        ref={menuRef}
                        className="menu-editor" style={{ top: menuPosition.top, left: menuPosition.left }}
                        tabIndex={-1}
                        id="menuScroll1"
                    >
                       
                        
                    </div>
                    <div className="menu_backdrop" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToCursor()
                        setCursorToEnd(editorRef.current)
                        setMenuPosition({ top: 0, left: 0 })
                        setShowMenu(false)
                        setCursor(0)

                    }}></div>
                </>
            )}
        </React.Fragment>
    );
}
}

export default TextEditor;