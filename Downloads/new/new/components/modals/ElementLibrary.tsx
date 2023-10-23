import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";

import { Spinner as Spin } from "@/components/loaders/Spinner";
import TreeView from "@/components/TreeView";

import { getLabel, selectStyle, options } from "@/common/functions";
import match from "@/common/stringMatching";
import { customSearchStyles, sortFunction } from "@/common/tableFunctions";
import { useDebounce } from "@/hooks/useDebounce";

import TaxonomyService from "@/services/taxonomy.service";

const taxonomyService = new TaxonomyService();

const fields = [
  { lb: "Data Type", vl: "dataType" },
  { lb: "Deprecated", vl: "deprecated" },
  { lb: "", vl: "" },
  { lb: "Balance", vl: "balance" },
  { lb: "Period", vl: "period" },
  { lb: "Abstract", vl: "abstract" },
  { lb: "SIC Code", vl: "sic" },
];

const fieldValues = [
  { lb: "Data Type", vl: "dataType" },
  { lb: "Substitution Group", vl: "substitutionGroup" },
  { lb: "Balance", vl: "balance" },
  { lb: "Period", vl: "period" },
  { lb: "Abstract", vl: "abstract" },
];

export default function ElementLibrary(props) {
  const { modal, setModal, setOpenModal, router, dt, onModalSubmit } = props;
  const { searchInModal, setSearchInModal } = props;
  useEffect(() => {
    setSearch(searchInModal);
    setElements({ ...elements, rst: true });
  }, [searchInModal]);

  const defaultFilters = () => {
    return {
      dataType: "",
      deprecated: "false",
      balance: "",
      period: "",
      abstract: modal.typ === "Element" ? "false" : "",
      sic: "",
    };
  };
  const [tab, setTab] = useState("Search");
  const [search, setSearch] = useState<any>(null);
  const [fSearch, setFSearch] = useState<any>(false);
  const [filter, setFilter] = useState<any>({ ...defaultFilters() });
  const [entities, setEntities] = useState<any>(null);

  useEffect(() => {
    const getOpts = async () => {
      try {
        const url = dt?.taxonomy?.data?.fields;
        const response = await fetch(url);
        const jsonFields = await response.json();
        setEntities(jsonFields[0]);
      } catch (e) {
        toast.error(e || "Error");
      }
    };
    getOpts();
  }, [dt?.taxonomy?.data?.fields]);

  const roleOpts = (lb) => {
    const opt = lb.includes("SIC") ? null : { label: "(All)", value: "" };

    let opts: any = [];

    if (["Data Type", "Deprecated", "Balance", "Period", "Abstract"].includes(lb) && entities) {
      opts = (entities[lb === "Data Type" ? "dataType" : lb.toLowerCase()] || []).map((e) => {
        return {
          label:
            e === "true" ? (
              "Yes"
            ) : e === "false" ? (
              "No"
            ) : lb === "Data Type" ? (
              <span className="text-nowrap" title={e}>
                {e}
              </span>
            ) : (
              getLabel(e)
            ),
          value: e,
        };
      });
    } else opts = [...options(lb)];
    if (opt) opts.unshift(opt);
    return [...opts];
  };

  const close = async () => {
    setModal({ ...modal, data: null, show: false });
    setOpenModal(false);
    if (router.asPath !== router.asPath.split("#")[0]) router.replace(router.asPath.split("#")[0]);
    setSearchInModal("");
  };
  const handleSubmit = async () => {
    onModalSubmit({ typ: modal.typ, ...modal.data });
    close();
  };

  const defaultData = { rst: false, ld: false, data: [], count: 0, pg: 1, pPg: 30 };

  const [load, setLoad] = useState<any>(false);

  const [elements, setElements] = useState<any>({ ...defaultData, ld: true });
  const [searchTxt, setSearchTxt] = useState<any>("");
  const [element, setElement] = useState<any>({});
  const [elementId, setElementId] = useState<any>("");

  const selectElement = (row) => {
    router.replace(`${router.asPath.split("#")[0]}#${row.cn}`);
    setElementId(row.cn);
  };

  const err = (e) => {
    toast.error(e || "Error");
    setElements({ ...defaultData });
  };

  const debounceText = useDebounce((search || "").trim(), 500);
  const getPayload = (page, perPage) => {
    const payload = Object.fromEntries(Object.entries(filter).filter(([_, value]) => value !== ""));
    payload["name"] = debounceText;
    payload["matchFull"] = fSearch;
    payload["page"] = page;
    payload["perPage"] = perPage;
    return payload;
  };

  useEffect(() => {
    const getSearch = async () => {
      try {
        const payload = { ...getPayload(1, elements.pPg) };
        const searchData = await taxonomyService.searchFilterTaxonomy(dt.taxonomyId, payload);
        setSearchTxt(payload["name"]);
        setElements({ ...elements, ...searchData, rst: false, ld: false, pg: 1 });
      } catch (e) {
        err(e);
      }
    };
    if (dt?.taxonomyId) getSearch();
  }, [dt?.taxonomyId, filter, debounceText, fSearch]);

  const handlePageChange = async (pg: any) => {
    if (!elements.rst) {
      try {
        const payload = { ...getPayload(pg, elements.pPg) };
        const searchData = await taxonomyService.searchFilterTaxonomy(dt.taxonomyId, payload);

        setElements({ ...elements, ...searchData, ld: false, pg });
      } catch (e) {
        err(e);
      }
    }
  };

  const handlePerRowsChange = async (pPg: any, pg: any) => {
    try {
      const payload = { ...getPayload(pg, pPg) };
      const searchData = await taxonomyService.searchFilterTaxonomy(dt.taxonomyId, payload);

      setElements({ ...elements, ...searchData, ld: false, pg, pPg });
    } catch (e) {
      err(e);
    }
  };

  useEffect(() => {
    const getElement = async () => {
      try {
        setLoad(true);
        const elementData = await taxonomyService.searchTaxonomy(
          `${dt.taxonomyId}?file=Presentation&elementId=${elementId}`
        );
        if (elementData.length > 0) {
          setElement(elementData[0]);
          setModal({ ...modal, data: elementData[0] });
        }
        setLoad(false);
      } catch (e) {
        setLoad(false);
        toast.error(e || "Error");
      }
    };
    if (elementId) getElement();
  }, [elementId]);

  const elementsColumns: any = [
    {
      name: "Element Name",
      selector: (row) => (
        <span className="f-ellipsis" title={row.name} onClick={() => selectElement(row)}>
          {row.name}
        </span>
      ),
      sortable: true,
      sortFunction: (rA, rB) => sortFunction(rA, rB, "name"),
      grow: 1,
    },
    {
      name: "Match",
      selector: (row) => (
        <span className="f-ellipsis" onClick={() => selectElement(row)}>
          {match(searchTxt, row.name)}
          {" %"}
        </span>
      ),
      right: true,
      width: "80px",
      minWidth: "80px",
    },
    {
      name: "Flags",
      selector: (row) => (
        <span className="f-ellipsis" onClick={() => selectElement(row)}>
          {row["Filer Usage Count"]}
        </span>
      ),
      right: true,
      width: "80px",
      minWidth: "80px",
    },
  ];

  const [copyId, setCopyId] = useState<any>("");

  const copy = (ele: any, id: any) => {
    navigator.clipboard.writeText(ele);
    const tooltip = document.getElementById(id) as HTMLElement;
    tooltip.innerHTML = "Copied!";
    tooltip.classList.add("tooltip-visible");
  };

  const onMouseOut = (id: any) => {
    const tooltip = document.getElementById(id) as HTMLElement;
    tooltip.innerHTML = "";
    tooltip.classList.remove("tooltip-visible");
  };
  const properties = [
    { lb: "Name", vl: "name" },
    { lb: "Data Type", vl: "dataType" },
    { lb: "Substitution Group", vl: "substitutionGroup" },
    { lb: "Period Type", vl: "period" },
    { lb: "Abstract", vl: "abstract" },
  ];

  const labels = [
    { lb: "Standard Label", vl: "label_x" },
    { lb: "Documentation", vl: "documentation" },
  ];

  const elementValues = (type) => (
    <>
      {type.map((e, id) => (
        <div
          className="border-bottom flex-between search-table"
          key={id}
          onMouseEnter={() => setCopyId(e.lb + "" + id)}
        >
          <div className="f-ellipsis">{e.lb}</div>
          <div className="f-ellipsis" title={element[e.vl]}>
            {element[e.vl]}
          </div>
          <div className="relative p-0">
            <span className="tooltip-text" id={e.lb + "" + id}></span>
            <img
              src="/icons/copy.svg"
              alt="-"
              className={copyId === e.lb + "" + id ? "cr-p" : "d-none"}
              style={{ opacity: "0.5" }}
              onClick={() => copy(`${element[e.vl]}`, `${copyId}`)}
              onMouseOut={() => onMouseOut(`${copyId}`)}
            />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <Modal show={modal.show} centered backdrop="static" fullscreen={true} keyboard={false}>
      <Modal.Body className="p-0">
        <div className="flex-between flex-wrap files-tabs p-3 pb-0">
          <div
            className={tab === "Search" ? "active" : "color-light"}
            onClick={() => setTab("Search")}
          >
            <h5 className="fw-bold">Element Library Search</h5>
          </div>
          <span className="color-light">|</span>
          <div
            className={tab === "Taxonomy" ? "active" : "color-light"}
            onClick={() => setTab("Taxonomy")}
          >
            <h5 className="fw-bold">Taxonomy Viewer</h5>
          </div>
          <div className="ms-auto"></div>
        </div>

        <div
          className={tab === "Search" ? "d-flex flex-column gap-2 p-3" : "d-none"}
          style={{ overflowY: "auto", height: "calc(100% - 166px)" }}
        >
          <div className="flex-center">
            <label
              htmlFor="search"
              className="text-nowrap form-label f-14 mb-0 me-2"
              style={{ minWidth: "75px" }}
            >
              Look for
            </label>

            <div className="relative w-100">
              <input
                className="w-100 border rounded search-input"
                style={{ paddingRight: elements.ld ? "4rem" : "1.75rem" }}
                placeholder="Search Element Name"
                id="search"
                autoFocus={true}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setElements({ ...elements, rst: true });
                }}
              />
              <div
                className={elements.ld ? "search-loading absolute" : "d-none"}
                style={{ top: "18px", right: "28px" }}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="mx-2">
              <label className="flex-center d-inline-flex gap-1">
                <input
                  name="fullSearch"
                  type="checkbox"
                  className=""
                  checked={fSearch}
                  onChange={() => {
                    setFSearch(!fSearch);
                    setElements({ ...elements, rst: true });
                  }}
                />
                <p className="text-nowrap f-12 m-0">Match full words only</p>
              </label>
            </div>
            <span className="color-light me-2">|</span>
            <img
              src="/icons/reset.svg"
              alt="-"
              width={16}
              height={16}
              className="cr-p"
              onClick={() => {
                setFilter({ ...defaultFilters() });
                setSearch("");
                setFSearch(false);
              }}
            />
          </div>
          <div className="row px-2 w-100" style={{ zIndex: "999" }}>
            {fields.map((el, id) => (
              <div
                className={"col-12 p-1 py-2 flex-center " + (id == 0 ? "col-md-6" : "col-md-3")}
                key={id}
              >
                <label
                  htmlFor={el.lb}
                  className="text-nowrap form-label f-14 mb-0 me-2"
                  style={{ minWidth: "75px" }}
                >
                  {el.lb}
                </label>

                {el.lb && (
                  <div className="w-100">
                    <Select
                      instanceId={`react-select-${el.lb}`}
                      classNamePrefix="select"
                      styles={selectStyle("16px", "38px")}
                      placeholder={el.lb.includes("SIC") ? "" : el.lb}
                      options={roleOpts(el.lb)}
                      value={roleOpts(el.lb).find((ele) => ele.value === filter[el.vl])}
                      onChange={(e: any) => {
                        setFilter({ ...filter, [el.vl]: e.value });
                        setElements({ ...elements, rst: true });
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <hr className="my-2" />

          <h6 className="fw-bold m-0">Elements</h6>
          <div className="row px-2 w-100">
            <div className="col-12 p-1 flex-center">
              <label className="text-nowrap form-label f-14 mb-0 me-2" style={{ minWidth: "75px" }}>
                Name
              </label>

              <input className="form-control f-12" value={(element?.name || ":").split(":")[1]} />
            </div>
          </div>

          <div className="">
            <DataTable
              responsive
              customStyles={customSearchStyles}
              className=""
              columns={elementsColumns}
              data={elements.data}
              noDataComponent={<div className="flex-grow-1" style={{ height: "100px" }}></div>}
              progressPending={elements.ld}
              progressComponent={
                <div className="flex-grow-1" style={{ height: "100px" }}>
                  <Spin />
                </div>
              }
              fixedHeader
              persistTableHead
              highlightOnHover
              pointerOnHover
              pagination
              paginationServer
              paginationTotalRows={elements.count}
              paginationPerPage={elements.pPg}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              paginationResetDefaultPage={elements.rst}
              onRowClicked={(row: any) => selectElement(row)}
            />
          </div>

          <div className="flex-between text-black f-12">
            <label className="form-label ">
              Only Displaying:<span> xbrli:item</span>
            </label>
            <label className="form-label ">
              Flags:<span>E=Extended Element, U=Used in report</span>
            </label>
            <label className="form-label">
              {elements.length} <span> Elements Found</span>
            </label>
          </div>

          <h6 className="d-flex align-items-center fw-bold m-0">
            Properties{load && <Spinner animation="border" className="sp-75 ms-2" />}
          </h6>

          <div className="row px-2 w-100">
            <div className="col-12 col-md-6">
              {fieldValues.map((el, id) => (
                <div className="col-12 p-1 py-2 flex-center" key={id}>
                  <label
                    htmlFor={el.lb}
                    className="text-nowrap form-label f-14 mb-0 me-2"
                    style={{ minWidth: "125px" }}
                  >
                    {el.lb}
                  </label>

                  {el.lb && (
                    <div className="w-100">
                      <input className="form-control f-12" value={element[el.vl] || ""} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="col-12 col-md-6">
              {[
                { lb: "Label", vl: "label_y" },
                { lb: "", vl: "documentation" },
              ].map((el, id) => (
                <div className="col-12 p-1 py-2 flex-center" key={id}>
                  <label
                    htmlFor={el.lb}
                    className="text-nowrap form-label f-14 mb-0 me-2"
                    style={{ minWidth: "125px" }}
                  >
                    {el.lb}
                  </label>

                  {el.lb ? (
                    <div className="w-100">
                      <input className="form-control f-12" value={element[el.vl] || ""} />
                    </div>
                  ) : (
                    <textarea
                      className="form-control f-12"
                      id="floatingTextarea2"
                      rows={9}
                      value={element[el.vl] || ""}
                    ></textarea>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={tab === "Search" ? "d-none" : "d-flex gap-2 p-3 pb-0 network"}
          style={{ height: "calc(100% - 166px)" }}
        >
          <div
            className="network-browser"
            style={{ height: "100%", width: "500px", minWidth: "500px" }}
            id="network-browser"
          >
            {(dt?.taxonomy?.data?.treeViews || [])?.length > 0 &&
            dt?.taxonomy?.data?.treeViews.find((e) => e.label === "Presentation") ? (
              <TreeView
                url={dt?.taxonomy?.data?.treeViews.find((e) => e.label === "Presentation").value}
                {...{ elementId, setElementId }}
              />
            ) : (
              <div className="flex-center h-100">
                <Spinner animation="border" className="sp-1" />
              </div>
            )}
          </div>

          <div
            className="d-flex flex-column px-2"
            style={{ overflowY: "auto", width: "calc(100% - 500px)" }}
          >
            <div className="">
              {element ? (
                <>
                  <div className="f-12 text-black mb-2">Properties</div>
                  <div className="bg-body flex-between search-table">
                    <div className="f-ellipsis color-light">Property</div>
                    <div className="f-ellipsis color-light">Value</div>
                    <div></div>
                  </div>
                  {elementValues(properties)}
                  <div className="f-12 text-black my-2">Labels</div>
                  <div className="bg-body flex-between search-table">
                    <div className="f-ellipsis color-light">Property</div>
                    <div className="f-ellipsis color-light">Value</div>
                    <div></div>
                  </div>
                  {elementValues(labels)}
                </>
              ) : (
                <></>
              )}
            </div>
            <hr className="my-2 mt-auto pb-3" />
            <div className="">
              <div className="flex-center mb-3">
                <label
                  htmlFor="search"
                  className="text-nowrap form-label f-14 mb-0 me-2"
                  style={{ minWidth: "75px" }}
                >
                  Search
                </label>

                <div className="relative w-100">
                  <input
                    className="w-100 border rounded search-input"
                    style={{ paddingRight: elements.ld ? "4rem" : "1.75rem" }}
                    placeholder="Search Element Name"
                    id="search"
                    autoFocus={true}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setElements({ ...elements, rst: true });
                    }}
                  />
                  <div
                    className={elements.ld ? "search-loading absolute" : "d-none"}
                    style={{ top: "18px", right: "28px" }}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="">
                <DataTable
                  responsive
                  customStyles={customSearchStyles}
                  className=""
                  columns={elementsColumns}
                  data={elements.data}
                  noDataComponent={<div className="flex-grow-1" style={{ height: "100px" }}></div>}
                  progressPending={elements.ld}
                  progressComponent={
                    <div className="flex-grow-1" style={{ height: "100px" }}>
                      <Spin />
                    </div>
                  }
                  fixedHeader
                  persistTableHead
                  highlightOnHover
                  pointerOnHover
                  pagination
                  paginationServer
                  paginationTotalRows={elements.count}
                  paginationPerPage={elements.pPg}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerRowsChange}
                  paginationResetDefaultPage={elements.rst}
                  onRowClicked={(row: any) => selectElement(row)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 pt-0">
          <hr className="my-2 pb-3" />

          <div className="w-100 text-end">
            <button className="btn f-14 px-5 me-2" onClick={close}>
              Cancel
            </button>
            <button className="btn btn-primary f-14 px-5" onClick={handleSubmit}>
              Okay
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
