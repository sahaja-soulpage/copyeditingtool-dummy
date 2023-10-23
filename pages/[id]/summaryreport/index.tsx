import React, { FC, useEffect, useState } from "react";
import { Button, Container, Image, Form, ProgressBar } from "react-bootstrap";
import { CommonService } from "services";
import { Observations } from "components/data-tables";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import { useFormik, FormikHelpers } from "formik";

const SummaryReport: FC = () => {
  const router = useRouter();

  // const fileSummaryReport = new CommonService();
  const tableSummaryReport = new CommonService();
  const [report, setReport] = useState({}) as any;
  // const [reportTable, setreportTable] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    tableSummaryReport
      .getSummaryReport(router.query.id)
      .then((data) => {
        console.log(data, "dataaaa");
        setReport(data);

        // toast.success("Project deleted...!");
      })
      .catch((error: any) => {
        toast.error(error.msg);
        toast.error("Error deleting project");
      });
  }, [router]);
  // useEffect(() => {
  //   fileSummaryReport.getTableData().then((data) => {
  //     setReport(data);
  //   });
  // }, []);
  useEffect(() => {
    // const calculation = report[0]?.id * 100;
    const calculation = report?.result?.[0]?.confidence_score * 100;
    setResult(calculation);
  }, [report]);
  const columns = [
    {
      name: "figures",
      center: false,
      selector: "Notes",
      style: { cursor: "auto" },
      width: "80%",
      // cell: (row) => <span> {row.name}</span>,
    },
    {
      name: "Issues",
      center: false,
      selector: "Issues",
      style: { cursor: "auto" },
      cell: (row) => <span> {row.Density > 0 ? "Yes" : "No"}</span>,
    },
    {
      name: "Density",
      center: false,
      selector: "Density",
      style: { cursor: "auto" },
      // cell: (row) => <span> {data.Notes}</span>,
    },
  ];
  const data = [
    {
      LevelNotes: "figures",
      Notes: "figures that not consecutively numbered",
      Issues: "Yes",
      Density: "0",
    },
    {
      LevelNotes: "figures",
      Notes: "list of figure numbers not matched against the numbering of figures in the text",
      Issues: "Yes",
      Density: "4",
    },
    {
      LevelNotes: "figures",
      Notes: "list of figure captions not matched against captions in the text",
      Issues: "Yes",
      Density: "9",
    },
    {
      LevelNotes: "figures",
      Notes: " figure callouts that are not found",
      Issues: "Yes",
      Density: "4",
    },
    {
      LevelNotes: "figures",
      Notes: "figure callouts that are not positioned appropriately",
      Issues: "Yes",
      Density: "4",
    },
    {
      LevelNotes: "figures",
      Notes: "figures titles from list are not consistent in style",
      Issues: "Yes",
      Density: "57",
    },
    {
      LevelNotes: "figures",
      Notes: "figures titles from text are not consistent in style",
      Issues: "Yes",
      Density: "27",
    },
  ];

  return (
    <>
      <div className="d-flex flex-column main-container-i1 me-0 ms-0 w-100 ">
        <div className="px-5 mx-3 py-5">
          <Container fluid className="px-0">
            <div className="dashboard-new-proofs text-start w-100 p-4 gap-3">
              <label className=" text-dark">File Name</label>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter File Name"
                  className="model-input            mb-0 "
                  value={report.name}
                  style={{ width: "190px" }}
                  disabled
                />
              </Form.Group>

              <h2 className="sub-heading  fw-600 pt-3 ">Results</h2>
              <div className="gap-2 d-flex mb-0">
                <p className="result-para fw-400  mb-0">The document is classified as</p>
                <p className="level-div p-1  mb-0">{report?.result?.[0]?.classification_level}</p>
              </div>
              <div className="gap-3 d-flex mb-0">
                <p className="result-para fw-400 mb-0">Confidence score</p>
                <div className="pt-1">
                  <ProgressBar
                    now={result}
                    className={`${result > 50 ? "custom-progress-bar" : "otherClass"}`}
                    style={{ width: "150px" }}
                  />
                </div>
                <p className="result-para fw-400 mb-0">
                  {report?.result?.[0]?.confidence_score.toFixed(2) * 100}%
                </p>
              </div>
              <div className="gap-2 d-flex mb-0">
                <p className="result-para fw-400  mb-0">The document is classified as</p>
                <p className="level-div p-1  mb-0">{report?.result?.[0]?.heavy_line_art_level}</p>
              </div>
              <hr></hr>
              <h2 className="sub-heading  fw-600 pt-3 ">Density Extraction</h2>
              <div className="d-flex align-items-center mb-4">
                <div className="gap-3 d-flex">
                  <p className="result-para fw-400 mb-0">Total no. of observations: </p>
                  <p className="result-para fw-400 ">54</p>
                </div>

                <div className="d-flex ms-auto gap-3">
                  <Button id="create-button" className="download-report-btn">
                    <div className="d-flex w-100 align-items-center ">
                      <Image
                        src="/icons/material-symbols_download.svg"
                        alt="create new project"
                        className="me-2"
                      />
                      Download report
                    </div>
                  </Button>
                  <Link href={"/documentview"}>
                    <Button id="create-button" className="new-file-button">
                      View all observations
                    </Button>
                  </Link>
                </div>
              </div>

              <Observations columns={columns} data={data} row={5} />
              <div className="text-end">
                <Link href={"/dashboard"}>
                  <Button id="create-button" className="new-file-button mt-4 ">
                    Back
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
export default SummaryReport;
