import React from "react";
// import { Tooltip } from "react-bootstrap";
// import DataTable from "react-data-table-component";
// import { conditionalRowStyles, pdfStyles } from "utils/data-tables";

// interface Props {
//   testhighlights: any;
//   setToggle: (id: boolean) => void;
//   state: any;
// }

// const updateHash = (highlight: any) => {
//   document.location.hash = `highlight-${highlight.id}`;
// };
export function Sidebar() {
  // const renderTooltip = (props, value) => {
  //   return (
  //     <Tooltip id="button-tooltip" {...props} bsPrefix="rounded bg-white p-0">
  //       <div
  //         style={{
  //           maxWidth: "200px",
  //           fontSize: "12px"
  //         }}
  //         className="rounded bg-black text-white p-1"
  //       >
  //         {value}
  //       </div>
  //     </Tooltip>
  //   );
  // };

  return (
    <div className="sidebar w-100">
      <div className="border table-details">
        {/* <DataTable
          data={testhighlights["tables"][state]["data"]}
          columns={getColumns()}
          dense={true}
          noTableHead
          conditionalRowStyles={conditionalRowStyles}
          customStyles={pdfStyles}
        /> */}
      </div>
    </div>
  );
}
