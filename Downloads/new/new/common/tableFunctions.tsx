import React from "react";

export const customStyles = {
  headRow: {
    style: {
      background: "var(--dgreen) !important",
      color: "#D9D9D9",
      borderRadius: "0.25rem 0.25rem 0 0",
    },
  },
  rows: {
    style: {
      fontSize: "10px",
      "&:last-of-type": {
        borderRadius: "0 0 0.25rem 0.25rem",
        borderBottom: "2px solid #0000001f ",
      },
    },
  },
};

export const customSearchStyles = {
  table: {
    style: {
      "& .rdt_TableBody": {
        height: "100px",
        overflow: "auto",
      },
    },
  },
  header: {
    style: {
      minHeight: "20px",
      paddingRight: "16px",
    },
  },
  headRow: {
    style: {
      background: "var(--bg) !important",
      color: "var(--color-light) !important",
      borderRadius: "0.25rem 0.25rem 0 0",
      height: "30px",
      minHeight: "30px",
    },
  },
  rows: {
    style: {
      fontSize: "10px",
      height: "30px",
      minHeight: "30px",
      "&:last-of-type": {
        borderRadius: "0 0 0.25rem 0.25rem",
        borderBottom: "2px solid #0000001f ",
      },
    },
  },
};

export const statusCol = (row) => (
  <span
    title={row.status}
    className={
      "text-nowrap rounded-1 f-10 f-i p-2 py-1" +
      (row.status === "Active"
        ? " clr-lgreen bg-lgreen"
        : row.status === "Inactive"
        ? " clr-danger bg-danger "
        : " clr-orange bg-orange ")
    }
    style={{ lineHeight: "18px" }}
  >
    &#x2022; {row.status}
  </span>
);

export const sortFunction = (rA, rB, key) =>
  rA[key] || "" > rB[key] || "" ? 1 : rB[key] || "" > rA[key] || "" ? -1 : 0;

export const calculationDiv = (el, cls, clk) => {
  return (
    <>
      {el.val.map((e, id) => (
        <div className="d-flex align-items-center text-black" key={id}>
          <div className="w-100px f-12 f-ellipsis ps-3" title="Calculation">
            Calculation
          </div>
          <div className={"flex-center f-12 f-ellipsis"} onClick={clk}>
            &nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
            <div className={"f-12 f-ellipsis" + (cls ? " f-underline" : "")} title={e}>
              {e}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
