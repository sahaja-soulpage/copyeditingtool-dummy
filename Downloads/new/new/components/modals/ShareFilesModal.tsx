import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";

import { selectStyle } from "@/common/functions";
import { splitPages } from "@/common/ixbrlIds";

import UserService from "@/services/user.service";
import FileService from "@/services/file.service";

const fileService = new FileService();
const userService = new UserService();

export default function ShareFilesModal(props) {
  const { user, id, setReset, shareModal, setShareModal } = props;

  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [share, setShare] = useState<any>({ fileId: Number(id), users: [] });
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const getEntitiesData = async () => {
      try {
        const users: any = [{ label: user.email, value: user.id }];
        const data = await userService.getUsers(1, 10, "", "");
        data.data.map((e) => {
          if (e.email !== user.email) users.push({ label: e.email, value: e.id });
        });

        setUsers([...users]);

        const pageSplits = splitPages(shareModal.data.getContent(), "split");
        if (pageSplits === 1) close();
        setShare({
          fileId: Number(id),
          users: [...Array(pageSplits)].map(() => {
            return { label: user.email, value: user.id };
          }),
        });
        setLoading(false);
      } catch (e: any) {
        toast.error(e || "Error");
        setLoading(false);
      }
    };
    getEntitiesData();
  }, []);

  const close = async () => setShareModal({ data: null, show: false });

  const handleSubmit = async () => {
    try {
      setLoad(true);
      await fileService.splitFile({ ...share, users: share.users.map((e) => e.value) });
      setLoad(false);
      setReset((pR) => !pR);
      close();
    } catch (e: any) {
      toast.error(e || "Error");
      setLoad(false);
    }
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Modal show={shareModal.show} centered backdrop="static" keyboard={false}>
          <Modal.Body>
            <div className="d-flex flex-column gap-2">
              <h5 className="text-center fw-bold">Share Split Documents</h5>
              {share.users.map((el, id) => (
                <div className="row px-2" key={id}>
                  <div className="col-6 col-md-3 p-1 py-2">
                    <Select
                      instanceId={`react-select-${id}`}
                      classNamePrefix="select"
                      styles={selectStyle("16px", "38px")}
                      placeholder={`Select Split`}
                      options={[]}
                      value={{ label: `Split ${id + 1}`, value: id + 1 }}
                    />
                  </div>
                  <div className="col-6 col-md-9 p-1 py-2">
                    <AsyncSelect
                      instanceId="react-select-assign"
                      styles={selectStyle("16px", "38px")}
                      placeholder={`Search Users`}
                      defaultOptions={users}
                      loadOptions={(value) => {
                        const users: any = [{ label: user.email, value: user.id }];
                        return userService.getUsers(1, 10, value, "").then((res) => {
                          res.data.map((e) => {
                            if (e.email !== user.email) users.push({ label: e.email, value: e.id });
                          });
                          return [...users];
                        });
                      }}
                      value={el || null}
                      menuPlacement="top"
                      onChange={(event: any) => {
                        const tempArr = [...share.users];
                        tempArr[id] = event;
                        setShare({ ...share, users: tempArr });
                      }}
                    />
                  </div>
                </div>
              ))}

              <hr className="my-2" />

              <div className="w-100 text-end">
                <button className="btn f-14 px-5 me-2" onClick={close}>
                  Cancel
                </button>
                <button className="btn btn-primary f-14 px-5" onClick={handleSubmit}>
                  {load && <Spinner animation="border" className="me-2 sp-1" />}
                  Share
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
