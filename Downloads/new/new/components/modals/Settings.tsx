import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { Taxonomy, Namespace, Units, Options } from "@/components/Tabs";
import { defaults, include, reportPeriods } from "@/common/functions";

import FileService from "@/services/file.service";

const fileService = new FileService();

export default function Settings({ setReset, modal, setModal }) {
  const [tab, setTab] = useState("Taxonomy");
  const [dt, setDt] = useState<any>({});
  const [load, setLoad] = useState<any>(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setDt(modal.data);
  }, []);

  const handleErrors = async (tab) => {
    const err: any = {};
    [...defaults, ...reportPeriods].map((e) => {
      err[e.vl] =
        e.vl !== "reportPeriod" && e.req && !((dt[e.vl] && dt[e.vl].toString()) || "").trim()
          ? "This field is required"
          : "";
    });

    if (!dt.periodFrom || !dt.periodTo) err["reportPeriod"] = "This field is required";

    setErrors(err);
    if (Object.values(err).join().replaceAll(",", "")) return;

    setTab(tab);
  };

  const onFinish = async () => {
    if (load) return;
    try {
      setLoad(true);
      const pick1 = ["ticker", "cik", "companyWebsite"];
      const pick2 = ["period", "periodFrom", "periodTo", "unit", "status"];
      const pick = [...pick1, ...pick2];

      if (!modal.splitFile) await fileService.updateFile(dt.id, include(dt, pick));
      else {
        await fileService.updateFile(dt.file.id, include(dt, ["unit"]));
        await fileService.updateSplitFile(dt.id, include(dt, ["status"]));
      }

      setLoad(false);
      setModal({ show: false });
      setReset((pR) => !pR);
    } catch (e) {
      setLoad(false);
      toast.error(e || "Error");
    }
  };
  return (
    <Modal show={modal.show} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Body className="p-0">
        <div className="bg-mprimary flex-between flex-wrap f-12 files-tabs">
          {["Taxonomy", "Namespace & Period", "Units", "Options"].map((e, id) => (
            <React.Fragment key={id}>
              <div
                className={
                  "flex-grow-1 text-center f-14 m-0 p-3 " + (tab === e ? "active" : "color-light")
                }
                onClick={() => (tab === "Namespace & Period" ? handleErrors(e) : setTab(e))}
              >
                {e}
              </div>
              {id !== 3 && <span className="color-light">|</span>}
            </React.Fragment>
          ))}
          <div className="">
            <img
              src="/icons/cross.svg"
              width={16}
              height={16}
              onClick={() => setModal({ show: false })}
            />
          </div>
        </div>
        <div className="p-3">
          {tab === "Options" ? (
            <Options {...{ dt, setDt, setTab, load, onFinish }} />
          ) : tab === "Units" ? (
            <Units {...{ dt, setDt, tab, setTab }} />
          ) : tab === "Namespace & Period" ? (
            <Namespace {...{ handleErrors, errors, setErrors, modal, dt, setDt, setTab }} />
          ) : (
            <Taxonomy {...{ dt, modal, setModal, setTab }} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
