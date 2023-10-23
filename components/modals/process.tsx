import React, { FC } from "react";
import { Modal, Image } from "react-bootstrap";

interface INewFileProps {
  newprocess: any;
  setNewprocess: any;
}

const Process: FC<INewFileProps> = (props) => {
  const { newprocess, setNewprocess } = props;

  return (
    <div>
      <Modal backdrop="static" keyboard={false} show={newprocess?.model}>
        <Modal.Body>
          <div>
            <div className="d-flex align-items-start mb-3">
              <div className="d-flex ms-auto gap-3">
                <Image
                  src="/icons/cross.svg"
                  alt="create new project"
                  className="me-2"
                  onClick={() => {
                    setNewprocess({ ...newprocess, model: false });
                  }}
                />
              </div>
            </div>
            <div className="text-center">
              <Image src="/icons/mdi_error-outline.svg" alt="create new project" className="me-2" />
            </div>
            <h2 className="py-2 f-28 fw-600 text-center">Document is under process</h2>
            <p>You will receive a notification email once the results are ready!</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Process;
