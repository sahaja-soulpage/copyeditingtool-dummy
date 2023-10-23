import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import AsyncSelect from "react-select/async";

import { toast } from "react-toastify";

import { selectStyle } from "@/common/functions";

import FileService from "@/services/file.service";

const fileService = new FileService();

export default function MergeFiles({ router, user, modal, setModal, setReset }) {
  const { isReady } = router;
  const [dt, setDt] = useState<any>(null);

  const [entities, setEntities] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);
  useEffect(() => {
    const getEntitiesData = async () => {
      try {
        const files: any = await fileService.getFiles("", 1, 10, "", "true");

        setEntities(
          files.data.map((e) => {
            return { label: e.fileName, value: e.splitFiles || [], field: e.id };
          })
        );
      } catch (e: any) {
        toast.error(e || "Error");
      }
    };
    if (user && isReady) getEntitiesData();
  }, [user, isReady]);

  const merge = async () => {
    try {
      if (!dt?.field) return;
      setLoad(true);
      await fileService.mergeFile({ fileId: dt.field });

      setLoad(false);
      setModal({ ...modal, show: false });
      setReset((pR) => !pR);
    } catch (e) {
      toast.error(e || "Error");
      setLoad(false);
    }
  };
  return (
    <Modal show={modal.show} centered backdrop="static" keyboard={false}>
      <Modal.Body>
        <div className="flex-center flex-column gap-2">
          <h5 className="text-center w-100 fw-bold py-2 m-0">Merge Your Files</h5>
          <hr className="w-100 m-0" />

          <div className="w-100">
            <label className="color-light f-12">File Name</label>
            <AsyncSelect
              instanceId="react-select-file"
              styles={selectStyle("16px", "38px")}
              placeholder={`Search Files`}
              defaultOptions={entities}
              loadOptions={(value) => {
                return fileService.getFiles("", 1, 10, value, "true").then((files) =>
                  files.data.map((e) => {
                    return { label: e.fileName, value: e.splitFiles || [], field: e.id };
                  })
                );
              }}
              value={dt}
              // menuPlacement="top"
              onChange={(event: any) => setDt({ ...event })}
            />
          </div>
          {(dt?.value || [])
            .sort(function (a, b) {
              return Number(a?.extra?.split) - Number(b?.extra?.split);
            })
            .map((e, id) => (
              <div className="flex-between gap-3 w-100" key={id}>
                <div className="flex-grow-1">
                  {!id && <label className="color-light f-12">Split Files</label>}
                  <div className="border rounded-1 f-12 p-2">{e.fileName}</div>
                </div>
                <div>
                  {!id && <label className="color-light f-12">Status</label>}
                  <div className="border rounded-1 flex-between gap-2 f-12 p-2">
                    {e.status}
                    <img alt="-" src={`/icons/${e.status}.svg`} width={18} height={18} />
                  </div>
                </div>
              </div>
            ))}
          <hr className="w-100 m-0 my-2" />
          <div className="w-100 text-end">
            <button
              className="btn f-14 px-4 me-2"
              onClick={() => setModal({ ...modal, show: false })}
            >
              Cancel
            </button>
            <button className="btn btn-primary f-14 px-4" disabled={!dt?.field} onClick={merge}>
              {load && <Spinner animation="border" className="me-2 sp-75" />}
              Merge
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
