import React, { Component } from "react";

import { PdfLoader, PdfHighlighter, Tip, Popup, AreaHighlight } from "react-pdf-highlighter";

import type { IHighlight, NewHighlight } from "../interfaces";

import { Spinner } from "components/Spinner";
// import { Sidebar } from "components/Sidebar";

interface State {
  url: string;
  highlights: Array<IHighlight>;
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => document.location.hash.slice("#highlight-".length);

// const resetHash = () => {
//   document.location.hash = "";
// };

const HighlightPopup = ({ comment }: { comment: { text: string; emoji: string; id?: string } }) =>
  comment.text ? (
    <div
      // className="Highlight__popup"
      className={"Highlight__popup" + (comment?.id === parseIdFromHash() ? "" : " d-none")}
    >
      {comment.emoji} {comment.text}
    </div>
  ) : null;

interface Props {
  toggle: boolean;
  setToggle: (id: boolean) => void;
  state: any;
  testhighlights: any;
}

class PdfViewer extends Component<Props, State> {
  state = {
    url: this.props.testhighlights.data,
    highlights: this.props.testhighlights["highLights"]
      ? [...this.props.testhighlights["highLights"]]
      : this.props.testhighlights["highLights"],
  };
  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };

  scrollViewerTo = (highlight: any) => {
    const data = highlight;
    console.log(data);
  };

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener("hashchange", this.scrollToHighlightFromHash, false);
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }

  addHighlight(highlight: NewHighlight) {
    const { highlights } = this.state;

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights],
    });
  }

  updateHighlight(highlightId: string, position: any, content: any) {
    this.setState({
      highlights: this.state.highlights.map((h) => {
        const { id, position: originalPosition, content: originalContent, ...rest } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    });
  }

  render() {
    const { url, highlights } = this.state;
    const { toggle } = this.props;

    return (
      <div className="row flex-grow-1 " style={{ padding: "1rem 2rem" }}>
        <div className={"col-12 " + (toggle ? "" : "col-lg-6")}>
          <div className="overflow-auto col-box">
            {/* <Sidebar
              testhighlights={testhighlights}
              setToggle={setToggle}
              state={state}
            /> */}
          </div>
        </div>
        <div className={"col-12 col-lg-6 pt-3 pt-sm-0 " + (toggle ? "" : "")}>
          <div className="border-dblue col-box" style={{ position: "relative" }}>
            <PdfLoader url={url} beforeLoad={<Spinner />}>
              {(pdfDocument) => (
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  enableAreaSelection={(event) => event.altKey}
                  onScrollChange={() => {
                    console.log("onScrollChange");
                  }}
                  // onScrollChange={resetHash}
                  // pdfScaleValue="page-width"
                  scrollRef={(scrollTo) => {
                    this.scrollViewerTo = scrollTo;

                    this.scrollToHighlightFromHash();
                  }}
                  onSelectionFinished={(
                    position,
                    content,
                    hideTipAndSelection,
                    transformSelection
                  ) => (
                    // <></>
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={(comment) => {
                        console.log(content, position, comment);
                        this.addHighlight({ content, position, comment });

                        hideTipAndSelection();
                      }}
                    />
                  )}
                  highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo
                  ) => {
                    const isTextHighlight = !(highlight.content && highlight.content.image);

                    const component = isTextHighlight ? (
                      // <Highlight
                      //   isScrolledTo={isScrolledTo}
                      //   position={highlight.position}
                      //   comment={highlight.comment}
                      // />
                      <></>
                    ) : (
                      <AreaHighlight
                        isScrolledTo={isScrolledTo}
                        highlight={highlight}
                        onChange={(boundingRect) => {
                          this.updateHighlight(
                            highlight.id,
                            { boundingRect: viewportToScaled(boundingRect) },
                            { image: screenshot(boundingRect) }
                          );
                        }}
                      />
                    );

                    return (
                      <Popup
                        popupContent={<HighlightPopup {...highlight} />}
                        onMouseOver={(popupContent) => setTip(highlight, () => popupContent)}
                        onMouseOut={hideTip}
                        key={index}
                        // children=
                      >
                        {component}
                      </Popup>
                    );
                  }}
                  highlights={highlights}
                />
              )}
            </PdfLoader>
          </div>
        </div>
      </div>
    );
  }
}

export default PdfViewer;
