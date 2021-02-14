import React from "react";

import Highlight, { defaultProps } from "prism-react-renderer";

import nightOwl from "prism-react-renderer/themes/nightOwl";
import palenight from "prism-react-renderer/themes/palenight";

const dark = true; // Mock dark mode.

const theme = dark ? palenight : nightOwl;

const calculateLinesToHighlight = (meta) => {
  const RegEx = /{([\d,-]+)}/;

  if (RegEx.test(meta)) {
    const lineNumbers = RegEx.exec(meta)[1]
      .split(",")
      .map((v) => v.split("-").map((y) => parseInt(y, 10)));

    return (index) => {
      const lineNumber = index + 1;

      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );

      return inRange;
    };
  } else {
    return () => false;
  }
};

const Code = ({ code, language, metastring }) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={{ overflow: "auto", borderRadius: "0.25rem" }}>
          <pre
            className={className}
            style={{
              padding: "1rem 1rem 1rem .75rem",
              fontSize: "1rem",
              float: "left",
              minWidth: "100%",
              overflow: "initial",
              ...style,
            }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({
                  line,
                  key: i,
                  style: shouldHighlightLine(i) && {
                    backgroundColor: "rgba(201, 167, 255, 0.2)",
                    margin: "0px -1rem 0 -0.75rem",
                    padding: " 0px 7px",
                    borderLeft: "5px solid rgb(201, 167, 255)",
                  },
                })}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "1.75rem",
                    userSelect: "none",
                    opacity: "0.3",
                  }}
                >
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default Code;
