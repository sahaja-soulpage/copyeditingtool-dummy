import React, { Component, useEffect } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from "react-pdf-highlighter";
import type { IHighlight } from "../interfaces";
// import { testHighlights as _testHighlights } from "./test-highlights";
import { Spinner } from "./Spinner";
import { Sidebar } from "./ExSidebar";
// import "./style/App.css";
// const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;
interface State {
  url: string;
  highlights: Array<IHighlight>;
  render: boolean; // Define the 'render' property
}
const getNextId = () => String(Math.random()).slice(2);
const parseIdFromHash = () => document.location.hash.slice("#highlight-".length);
const resetHash = () => {
  document.location.hash = "";
};
// const [allHighlights, setallhighligts] = useState([]);
// useEffect(() => {
//     const h: any = testHighlights[initialUrl]
//         ? [...testHighlights[initialUrl]]
//         : [];
//     setallhighligts(h)
// }, [])
const HighlightPopup =
  // ({
  //     comment,
  // }: {
  //     comment: { text: string; emoji: string };
  // }) => {
  (allhighlights) => {
    const { render, updateHighlight, state } = allhighlights;
    useEffect(() => {
      [];
    }, [render]);
    console.log(updateHighlight, "UPDATE HL");
    console.log(state, "State");
    state.render = true;
    console.log(state, "UPdated State");
    return <>test</>;
  };
const PRIMARY_PDF_URL = "https://deeplobe.s3.ap-south-1.amazonaws.com/15032-5196-FullBook.pdf";
// const SECONDARY_PDF_URL = "https://deeplobe.s3.ap-south-1.amazonaws.com/15031-4986-FullBook.pdf";
const searchParams = new URLSearchParams(document.location.search);
const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;
class ExPdf extends Component<object, State> {
  state = {
    url: initialUrl,
    highlights: [],
    deletedHighlights: [],
    render: false,
  };
  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };
  onSelectionFinished = (position, hideTipAndSelection) => {
    // const {} = position;

    // Add the first highlight with one color (e.g., yellow)

    hideTipAndSelection();
  };
  toggleDocument = () => {
    // const newUrl = this.state.url === PRIMARY_PDF_URL ? PRIMARY_PDF_URL : PRIMARY_PDF_URL;
  };
  scrollViewerTo = (highlight: any) => {
    console.log(highlight);
  };
  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());
    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };
  componentDidMount() {
    window.addEventListener("hashchange", this.scrollToHighlightFromHash, false);
    const t: any = [
      {
        name: "list of figure captions not matched against captions in the text.",
        process_function: [
          {
            content: {
              text: "location of carlisle bay. old parish of vere shown as grey shaded area.",
            },
            position: {
              boundingRect: {
                x1: 54.6,
                y1: 203.518736,
                x2: 346.323624,
                y2: 212.614736,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 54.6,
                  y1: 203.518736,
                  x2: 346.323624,
                  y2: 212.614736,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
          {
            content: {
              text: "captured by terrestrial laser scan. right: as captured with digital camera.",
            },
            position: {
              boundingRect: {
                x1: 81.912,
                y1: 234.90873599999998,
                x2: 345.24119999999994,
                y2: 244.00473599999998,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 81.912,
                  y1: 234.90873599999998,
                  x2: 345.24119999999994,
                  y2: 244.00473599999998,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
          {
            content: {
              text: "aerial photos acquired roughly a decade apart between 1941 -1971",
            },
            position: {
              boundingRect: {
                x1: 54.6,
                y1: 255.83873600000004,
                x2: 326.868,
                y2: 264.93473600000004,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 54.6,
                  y1: 255.83873600000004,
                  x2: 326.868,
                  y2: 264.93473600000004,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
          {
            content: {
              text: "from plan done by greene in 1818 superimposed as a white line.",
            },
            position: {
              boundingRect: {
                x1: 81.912,
                y1: 329.108736,
                x2: 317.02540799999997,
                y2: 338.204736,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 81.912,
                  y1: 329.108736,
                  x2: 317.02540799999997,
                  y2: 338.204736,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
          {
            content: {
              text: "wharf\u2019.",
            },
            position: {
              boundingRect: {
                x1: 81.912,
                y1: 402.358736,
                x2: 110.47344000000001,
                y2: 411.454736,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 81.912,
                  y1: 402.358736,
                  x2: 110.47344000000001,
                  y2: 411.454736,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
          {
            content: {
              text: "old house relative to shoreline on plans, aerial photographs and satellite imagery.",
            },
            position: {
              boundingRect: {
                x1: 81.912,
                y1: 454.698736,
                x2: 380.879328,
                y2: 463.794736,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 81.912,
                  y1: 454.698736,
                  x2: 380.879328,
                  y2: 463.794736,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
          {
            content: {
              text: ". 12 changes in the meander of the rio minho \u2013 2019 sentinel imagery; 1941 aerial photo",
            },
            position: {
              boundingRect: {
                x1: 54.6,
                y1: 475.628736,
                x2: 397.896128,
                y2: 484.724736,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 54.6,
                  y1: 475.628736,
                  x2: 397.896128,
                  y2: 484.724736,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
          {
            content: {
              text: "and 1879 plan",
            },
            position: {
              boundingRect: {
                x1: 81.912,
                y1: 486.08873600000004,
                x2: 134.068464,
                y2: 495.18473600000004,
                width: 612,
                height: 792,
                pageNumber: 7,
              },
              rects: [
                {
                  x1: 81.912,
                  y1: 486.08873600000004,
                  x2: 134.068464,
                  y2: 495.18473600000004,
                  width: 612,
                  height: 792,
                  pageNumber: 7,
                },
              ],
              pageNumber: 7,
            },
            id: "None",
          },
        ],
      },
    ];
    t.map((item) => {
      this.setState({ ...this.state, highlights: item.process_function });
    });
  }

  // componentDidUpdate(nextProps, nextState: any) {
  //   if (this.state.deletedHighlights.length !== nextState.deletedHighlights.length) {
  //     this.state.render = true;
  //   }
  //   if (this.state.highlights.length !== nextState.highlights.length) {
  //     this.state.render = true;
  //     console.log(this.state, "COMPONENT UPDATEE");
  //   }
  // }
  componentDidUpdate(nextProps, nextState) {
    if (this.state.deletedHighlights.length !== nextState.deletedHighlights.length) {
      this.setState({ render: true });
    }
    if (this.state.highlights.length !== nextState.highlights.length) {
      this.setState({ render: true });
      console.log(this.state, "COMPONENT UPDATEE");
    }
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;
    return highlights.find((highlight) => highlight.id === id);
  }
  addHighlight(highlight: any) {
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
    const { url, highlights, deletedHighlights, render } = this.state;
    console.log("RESOLVE: ", this.state);
    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <div
          style={{
            height: "100vh",
            width: "75vw",
            position: "relative",
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
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
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={(comment) => {
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
                  const isTextHighlight = !highlight.content && !highlight.content.image;
                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                      onMouseOver={() => {
                        const hcontent: any = highlight.content;
                        const hposition: any = highlight.content;
                        const hcomment: any = highlight.content;
                        return (
                          <Tip
                            // onOpen={() => {}}
                            onOpen={undefined}
                            onConfirm={() => {
                              this.addHighlight({ hcontent, hposition, hcomment });
                              console.log(hcontent, "content");
                              console.log(hposition, "possssssss");
                              // hideTipAndSelection();
                            }}
                          />
                        );
                      }}
                    />
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
                      popupContent={
                        <HighlightPopup
                          highlights={highlights}
                          highlight={highlight}
                          deletedHighlights={deletedHighlights}
                          render={render}
                          updateHighlight={this.updateHighlight}
                          state={this.state}
                        />
                      }
                      onMouseOver={(popupContent) =>
                        setTip(highlight, (highlight) => {
                          console.log(highlight, "to resolve build error");
                          return popupContent;
                        })
                      }
                      onMouseOut={hideTip}
                      key={index}
                      // children={component}
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
        <Sidebar
          state={this.state}
          deletedHighlights={deletedHighlights}
          highlights={highlights}
          resetHighlights={this.resetHighlights}
          // toggleDocument={this.toggleDocument}
        />
        {/* <p>{this.state.highlights[0]?.content.error_message} </p> */}
        {/* <p>lllll</p> */}
      </div>
    );
  }
}
export default ExPdf;
