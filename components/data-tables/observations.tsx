import React, { FC } from "react";
import DataTable, { createTheme } from "react-data-table-component";
// import { PageLoading } from "components/loaders";

const customStyles = {
  tableWrapper: {
    style: {
      display: "flex",
      flex: 1,
    },
  },
  headRow: {
    style: {
      minHeight: "40px",
      fontFamily: "Inter",
      fontSize: "16px",
      fontStyle: "normal",
      letterSpacing: 0.01,
      color: "red",
      opacity: 0.6,
      backgroundColor: "#D9D9D9",
      borderRadius: "5px 5px 0px 0px",
      borderSizing: "border-box",
      borderRight: "1px solid #E4E4E4",
      borderBottomWidth: "0px",
    },
  },
  rows: {
    style: {
      borderBottom: "0px",
      minHeight: "60px",
      height: "60px",
      color: "red",
    },
    highlightOnHoverStyle: {
      color: "#495968",
      backgroundColor: "rgba(0, 118, 255, 0.05)",
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },
  headCells: {
    style: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#000",
      opacity: 1,
      borderRight: "1px solid #B9B9B9",
    },
  },
  cells: {
    style: {
      color: "#4F4F5F !important",
      border: "0.5px solid #D9D9D9 !important",
      borderTop: "0px !important",
    },
  },
  pagination: {
    style: {
      fontSize: "15px",
      minHeight: "56px",
      borderTopWidth: "1px",
      fontStyle: "normal",
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "10px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
      },
      "&:hover:not(:disabled)": {
        cursor: "pointer",
      },
      "&:focus": {
        outline: "none",
      },
    },
  },
};

createTheme("solarized", {
  text: {
    primary: "#495968",
    secondary: "#0076FF",
  },
  background: {
    default: "#FFFFFF",
  },
  rows: {
    highlightOnHoverStyle: {
      color: "#FFFFFF",
      backgroundColor: "#0076FF",
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
      outlineStyle: "solid",
      outlineWidth: "1px",
    },
  },

  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});
interface IListTableProps {
  columns: any;
  data: any;
  progress?: any;
  row?: any;
}

const ListTable: FC<IListTableProps> = (props) => {
  const { columns, data, row, progress } = props;
  return (
    <DataTable
      theme="solarized"
      responsive
      customStyles={customStyles}
      data={data}
      columns={columns}
      noHeader
      defaultSortAsc
      pagination={row ? true : false}
      paginationPerPage={row ? row : 10}
      paginationRowsPerPageOptions={row ? [5, 10] : [5, 10, 15, 20]}
      paginationComponentOptions={{
        rowsPerPageText: row ? "Previewing" : "Rows per page:",
        rangeSeparatorText: "of",
        noRowsPerPage: false,
        selectAllRowsItem: row ? true : false,
        selectAllRowsItemText: "All",
      }}
      fixedHeader={true}
      highlightOnHover
      pointerOnHover
      persistTableHead
      progressPending={progress}
      //   progressComponent={<PageLoading />}
      style={{
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
    />
  );
};

export default ListTable;
