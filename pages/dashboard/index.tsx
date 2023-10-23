import React, { FC, useState, useEffect } from "react";
import { Button, Container, Image } from "react-bootstrap";

import { DataTable } from "components/data-tables";
import { UploadFile, DeleteFile } from "components/modals";
import { CommonService } from "services";
const uploadfiledata = new CommonService();
import Link from "next/link";
import { toast } from "react-toastify";
const Dashboard: FC = () => {
  const cardData = new CommonService();
  const [id, setId] = useState();
  console.log(id);
  const getStatusStyle = (status) => {
    let textColor = "black";
    let backgroundColor = "";
    // let padding = "5px";
    let dotColor = "";

    switch (status) {
      case "In-progress":
        textColor = "#BE0F0F";
        backgroundColor = "#FEE1E3";
        dotColor = "#BE0F0F";
        break;
      case "success":
        textColor = "#00C708";
        backgroundColor = "#E7FEE1";
        dotColor = "#00C708";
        break;
      default:
        break;
    }

    return {
      color: textColor,
      background: backgroundColor,

      dotColor,
    };
  };

  const columns = [
    {
      name: "File Name",
      center: false,
      sortable: true,
      selector: "FileName",
      style: { cursor: "auto" },
      cell: (row) => <span> {row.name} </span>,
    },
    {
      name: "Upload Date",
      sortable: true,
      center: false,
      selector: "UploadDate",
      style: { cursor: "auto" },
      cell: (row) => <span> {row.updated_at}</span>,
    },
    {
      name: "status",
      sortable: true,
      center: false,
      selector: "Status",
      style: { cursor: "auto" },

      cell: (row) => (
        <span style={getStatusStyle(row.status)}>
          <span
            className="status-dot"
            style={{ backgroundColor: getStatusStyle(row.status).dotColor }}
          ></span>
          {row.status}
        </span>
      ),
    },
    {
      name: "Classification",
      sortable: true,
      selector: "Classification",
      center: false,
      style: { cursor: "auto" },
      cell: (row) => (
        <Link href={`${row.id}/summaryreport`} style={{ color: "#6464FF" }}>
          {row.result[0]?.classification_level}
        </Link>
      ),
    },
    {
      name: "Lineart",
      sortable: true,
      selector: "Lineart",
      center: false,
      style: { cursor: "auto" },
      cell: (row) => (
        <Link href={`${row.id}/summaryreport`} style={{ color: "#6464FF" }}>
          {row.result[0]?.heavy_line_art_level}
        </Link>
      ),
    },
    {
      name: "No. of Observa...",
      sortable: true,
      selector: "Observation",
      center: false,
      style: { cursor: "auto" },
      cell: () => <span style={{ color: "#6464FF" }}>_</span>,
    },
    {
      name: "Delete",
      sortable: true,
      selector: "Delete",
      center: false,
      style: { cursor: "auto" },
      cell: (row) => (
        <Image
          src="icons/delete.svg"
          alt="Delete"
          onClick={() => {
            setDeleteFile({ ...deleteFile, model: true });
            setId(row.id);
          }}
          style={{ cursor: "pointer" }}
        ></Image>
      ),
    },
  ];

  // const getLevel = (row) => {
  //   console.log(row, "kkkk");
  // };

  // const data = [
  //   {
  //     FileName: "Financial Document",
  //     UploadDate: "06/01/2023, 12:45",
  //     Status: "In-progress",
  //     Classification: "Level 2",
  //     Observation: "8",
  //     Delete: "1",
  //   },
  //   {
  //     FileName: "Financial Document",
  //     UploadDate: "06/01/2023, 12:45",
  //     Status: "In-progress",
  //     Classification: "Level 3",
  //     Observation: "8",
  //     Delete: "1",
  //   },
  //   {
  //     FileName: "Financial Document",
  //     UploadDate: "06/01/2023, 12:45",
  //     Status: "Success",
  //     Classification: "Level 1",
  //     Observation: "8",
  //     Delete: "1",
  //   },
  //   {
  //     FileName: "Financial Document",
  //     UploadDate: "06/01/2023, 12:45",
  //     Status: "Success",
  //     Classification: "Level 2",
  //     Observation: "8",
  //     Delete: "1",
  //   },
  // ];

  const [count, setCount] = useState({}) as any;
  const [tableData, setTableData] = useState([]);
  const [newState, setNewState] = React.useState({
    model: false,
  });
  const [deleteFile, setDeleteFile] = React.useState({
    model: false,
  });
  // const refreshTableData = () => {
  //   fileTableData.getTableData().then((data) => {
  //     setTableData(data);
  //   });
  // };
  const getData = () => {
    uploadfiledata
      .getTableData()
      .then((data) => {
        console.log(data, "data");
        setTableData(data);
        setCount(data.stats);

        // getTableData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    cardData
      .CardData()
      .then((data) => {
        console.log(data, "data");

        setCount(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  }, []);

  return (
    <>
      <div className="d-flex flex-column main-container-i1 me-0 ms-0 w-100 ">
        {/* <Invitation {...{ profileData, mutateUserDetails }} /> */}
        <div className="px-5 mx-3">
          <Container fluid className="px-0">
            <div className="row  justify-content-center py-4">
              <div
                className="col-4 g-3 col-md d-flex cursor-pointer"
                // onClick={() => {
                //   router.push("/myproofs?tab=total");
                // }}
              >
                <div className="dashboard-white-card w-100 p-4 gap-3">
                  <Image src={"/icons/files.svg"} alt="files"></Image>
                  <p className=" stat-card-title mb-0">Total files</p>
                  <p className="stat-card-value">{count?.total_files_count}</p>
                </div>
              </div>
              <div className="col-4 g-3 col-md d-flex cursor-pointer">
                <div className="dashboard-white-card w-100 p-4 gap-3">
                  <Image src={"/icons/completed-files.svg"} alt="completed-files"></Image>
                  <p className=" stat-card-title mb-0">Completed files</p>
                  <p className="stat-card-value">{count?.completed_files_count}</p>
                </div>
              </div>
              <div className="col-4 g-3 col-md d-flex cursor-pointer">
                <div className="dashboard-white-card w-100 p-4 gap-3">
                  <Image src={"/icons/In-progress-files.svg"} alt="In-progress-files"></Image>
                  <p className=" stat-card-title mb-0">In-progress files</p>
                  <p className="stat-card-value">{count?.in_progress_files_count}</p>
                </div>
              </div>
              <div className="col-4 g-3 col-md d-flex cursor-pointer">
                <div className="dashboard-white-card w-100 p-4 gap-3">
                  <Image src={"/icons/layers.svg"} alt="layers"></Image>
                  <p className=" stat-card-title mb-0">Classifications</p>
                  <p className="stat-card-value">
                    L1 - {count?.classification?.L1_count}, L2 - {count?.classification?.L2_count},
                    L3 - {count?.classification?.L3_count}{" "}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="dashboard-new-proofs text-start w-100 p-4 gap-3">
                <h2 className="table-header fw-600">Welcome Aboard!</h2>
                <div className="d-flex align-items-center">
                  <div>
                    <h2 className="sub-heading  fw-600">All Files</h2>
                  </div>

                  <div className="d-flex ms-auto gap-3">
                    <div className="d-flex align-items-center">
                      <div className="input-group">
                        <span className="input-group-text">
                          <Image src="/icons/search.svg" alt="search" />
                        </span>
                        <input
                          className="form-control search"
                          type="text"
                          placeholder="Search"
                          aria-label="Search"
                          // value={search}
                          // onChange={handleSearch}
                        />
                      </div>
                    </div>
                    <Button
                      id="create-button"
                      className="new-file-button"
                      onClick={() => {
                        setNewState({ ...newState, model: true });
                      }}
                    >
                      <div className="d-flex w-100 align-items-center ">
                        <Image src="/icons/add.svg" alt="create new project" className="me-2" />
                        New File
                      </div>
                    </Button>
                  </div>
                </div>
                <DataTable
                  columns={columns}
                  data={tableData}
                  row={5}
                  // refreshTable={refreshTableData}
                />
              </div>
            </div>
          </Container>
        </div>
        <UploadFile newState={newState} setNewState={setNewState} getData={getData} />
        <DeleteFile
          deleteFile={deleteFile}
          setDeleteFile={setDeleteFile}
          id={id}
          setId={setId}
          getData={getData}
        />
      </div>
    </>
  );
};
export default Dashboard;
