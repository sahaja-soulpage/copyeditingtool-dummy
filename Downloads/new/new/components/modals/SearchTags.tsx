import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";

import { htmlData, tagCode, tagsFilters } from "@/common/functions";

import FileService from "@/services/file.service";
import { customSearchStyles } from "@/common/tableFunctions";
import { ReactSVG } from "react-svg";
import { useDebounce } from "@/hooks/useDebounce";

const fileService = new FileService();

export default function SearchTags({ dt, setValue, searchModal, setSearchModal }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [data, setData] = useState<any>([]);
  const [reset, setReset] = useState<any>(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const debounceText = useDebounce(search, 500).trim();
  useEffect(() => {
    const getData = async () => {
      const url = dt?.extra?.url || dt?.url;
      const filter = [];
      filters.map((e) =>
        (tagsFilters.find((el) => el.lb === e)?.vl || []).map(
          (ele) => !filter.includes(ele) && filter.push(ele)
        )
      );
      const tags = await fileService.searchTags({ url, name: debounceText, filter });
      setData(tags);
    };
    getData();
  }, [debounceText, filters, reset]);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = async () => {
      setToggleCleared(!toggleCleared);
      await fileService.clearTags({ url: dt?.extra.url || dt?.url, remove: selectedRows });
      const vl = await htmlData(dt);
      setReset(!reset);
      setValue(vl);
      //   setData(differenceBy(data, selectedRows, "title"));
    };

    return (
      <div className="clr-danger me-1 cr-p" onClick={handleDelete}>
        <ReactSVG src="/icons/del.svg" />
      </div>
    );
  }, [data, selectedRows, toggleCleared]);

  const tagColumns: any = [
    {
      name: "Type",
      selector: (row) => (
        <span title={tagCode(row.slice(4, 6), "vl")}>{tagCode(row.slice(4, 6), "vl")}</span>
      ),
      maxWidth: "150px",
    },
    {
      name: "Id",
      selector: (row) => <span title={row}>{row}</span>,
      sortable: true,
      sortFunction: (rA, rB) => (rA > rB ? 1 : rB > rA ? -1 : 0),
      grow: 1,
    },
    {
      name: "Options",
      selector: (row) => (
        <div
          className=""
          onClick={async () => {
            setToggleCleared(!toggleCleared);
            await fileService.clearTags({ url: dt?.extra.url || dt?.url, remove: [row] });
            const vl = await htmlData(dt);
            setReset(!reset);
            setValue(vl);
          }}
        >
          <ReactSVG src="/icons/delete.svg" />
        </div>
      ),
      minWidth: "85px",
      maxWidth: "85px",
      center: true,
    },
  ];

  return (
    <Modal show={searchModal} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Body className="p-0">
        <div className="p-3">
          <h5 className="fw-bold">Search iXBRL Tags</h5>
          <div className="flex-center gap-2 w-100">
            <p className="m-0 f-12">Search</p>
            <input
              className="w-100 border rounded f-12 search-input"
              placeholder="Search Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <hr />
          <p className="fw-bold f-14">Filters</p>
          <div className="row px-2">
            {tagsFilters.map((e, idx) => (
              <div key={idx} className="col-3 p-1 d-flex align-items-center">
                <input
                  type="checkbox"
                  id={e.lb}
                  checked={filters.includes(e.lb)}
                  onChange={(event) => {
                    let tempArr = [...filters];
                    if (event.target.checked) {
                      if (e.lb === "All Tags") tempArr = ["All Tags"];
                      else tempArr = [...tempArr, e.lb].filter((el) => el !== "All Tags");
                    } else tempArr = [...tempArr, e.lb].filter((el) => el !== e.lb);
                    setFilters(tempArr);
                  }}
                />
                <label htmlFor={e.lb} className="f-12 text-dark ms-1 cr-p">
                  {e.lb}
                </label>
              </div>
            ))}
          </div>

          <hr />
        </div>

        <div style={{ width: "calc(100% - 18px)", margin: "auto" }}>
          <DataTable
            responsive
            title={<p className="fw-bold f-14 mb-2">iXBRL Tags</p>}
            customStyles={customSearchStyles}
            className="table-width"
            columns={tagColumns}
            data={data}
            fixedHeader
            persistTableHead
            highlightOnHover
            pointerOnHover
            pagination
            selectableRows
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
          />
        </div>

        <div className="w-100 text-end p-3">
          <button className="btn f-14 px-5 me-2" onClick={() => setSearchModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary f-14 px-5" onClick={() => setSearchModal(false)}>
            Ok
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
