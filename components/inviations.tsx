import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

// import { InviteService } from "services";
// const inviteService = new InviteService();
// toast.configure();

const Invitation = ({ profileData }) => {
  const [load] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setData(profileData?.collaborators);
  }, [profileData]);

  //   const acceptRejectInvitaion = (e, response) => {
  //     const collabPayload = {
  //       id: e.id,
  //       proof_id: e.proof_id,
  //       user_id: e.user_id,
  //       status: response,
  //     };

  //     inviteService
  //       .collaborator(collabPayload)
  //       .then(() => {
  //         mutateUserDetails();
  //         if (response === "accepted") {
  //           toast.success("Invitation accepted");
  //         } else {
  //           toast.success("Invitation rejected");
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error(err);
  //       });
  //   };

  return (
    <div className="px-3 m-3">
      {(data || [])?.map((e: any, id: any) => (
        <div className="card flex-row p-2 pe-4 align-items-center relative my-3 mb-0" key={id}>
          <img src="/info-i.svg" alt="/info" className="pe-2" />
          <span>
            Invitation for the <b>{e.proof.article_name}</b>
          </span>

          <button
            className="btn border-primary txt-primary ms-auto font-12 text-nowrap"
            // onClick={() => acceptRejectInvitaion(e, "accepted")}
          >
            {load && <Spinner animation="border" className="me-2 sp-wh" />}
            <img src="/check.svg" alt="/check" width={12} className="me-2" />
            Accept
          </button>
          <button
            className="btn btn-sm ms-3 font-12 text-danger border-0"
            // onClick={() => acceptRejectInvitaion(e, "rejected")}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};
export default Invitation;
