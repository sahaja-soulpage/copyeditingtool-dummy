import React from "react";
import type { IHighlight } from "react-pdf-highlighter";
import { Image, Accordion } from "react-bootstrap";
interface Props {
  highlights: Array<IHighlight>;
  // pagenumber: Array<LTWHP>;
  resetHighlights: () => void;
  state: any;
  deletedHighlights: any;
}

// const updateHash = (highlight: IHighlight) => {
//   document.location.hash = `highlight-${highlight.id}`;
// };
// const highlight = [
//   {
//     content: "Read entire text and correct errors in spelling, grammar and punctuation",
//     list: [
//       "Read entire text and correct errors Read entire text and correct errors",
//       "wilalso",
//       "",
//       "",
//     ],
//   },
//   {
//     content: "Ensure consistency of style across the book",
//     list: ["affect", "wilalso", "", ""],
//   },
// ];
export function Sidebar({ highlights }: Props) {
  return (
    <div className="sidebar m-4 " style={{ width: "25vw", background: "#FAFAFA" }}>
      <div className="description ms-4 py-3">
        <div className="d-flex align-items-center ">
          <div>
            <h2 className="sub-heading  fw-600">All Observations</h2>
          </div>

          <div className="d-flex ms-auto gap-3">
            <Image src="/icons/downarrow.svg" alt="create new project" className="me-2" />
          </div>
        </div>
      </div>
      <Accordion defaultActiveKey="0">
        {highlights.map((highlight: any, id: any) => (
          <Accordion.Item eventKey={id} key={id}>
            <Accordion.Header style={{ background: "#FAFAFA " }} key={id}>
              {" "}
              <div className="d-flex mt-3 p-3 gap-2">
                <p className="f-16 fw-400 Observ-header">{highlight?.name}</p>

                {/* <div className="rounded-circle round-div">{highlight.position.pageNumber}</div> */}
                <div
                  className={`rounded-circle ${
                    highlight.position.pageNumber > 5 ? "round-div" : "round-div1"
                  }`}
                >
                  {highlight.position.pageNumber}
                </div>

                <Image
                  className="arrow_acc mt-2"
                  src={"/icons/arrow-down.svg"}
                  alt="arrow-down"
                  style={{ width: "10px", height: "19px" }}
                />
              </div>
            </Accordion.Header>

            <Accordion.Body key={id} className="acc-hover">
              <div className="d-flex flex-column message">
                {/* <p className="f-13 mb-2 mt-2" style={{ fontWeight: 400 }}>
                  {highlight.content.text}
                </p> */}

                <div className="d-flex flex-column ">
                  <ul
                    className="ms-2 f-16 mb-2"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    {highlights.map((highlight: any, id: any) => (
                      <div key={id}>
                        <li className="py-1 rounded">{`${highlight.content.text}`}</li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="mb-0 mt-0" />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* <ul className="sidebar__highlights">
        {highlights.map((highlight: any, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.content.text}</strong>
              {highlight.comment.text ? (
                <p style={{ marginTop: "0.5rem" }}>{`${highlight.comment.text}`}</p>
              ) : null}
              {highlight.content.image ? (
                <div className="highlight__image" style={{ marginTop: "0.5rem" }}>
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>

            {highlight.Response?.length > 0 ? <strong>Response</strong> : null}
            <div></div>
            {highlight.Response?.map((item) => (
              <div>
                <p style={{ marginTop: "0.5rem" }}>{item.name}</p>
              </div>
            ))}

            <div className="highlight__location">Page {highlight.position.pageNumber}</div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
