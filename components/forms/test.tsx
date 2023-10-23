// react
import React, { FC } from "react";
// react bootstrap
import { Modal, Accordion, OverlayTrigger, Tooltip, Form } from "react-bootstrap";
// next seo
import { NextSeo } from "next-seo";
// import Moment from "moment";
import Button from "react-bootstrap-button-loader";
import { checkTenant } from "@constants/functions";
// toast
import { toast } from "react-toastify";
import { ConnectionsService } from "services";
import { isArray } from "lodash";
// componenets
// import { ChangePassword } from "components/forms";
// services
import { AuthorizationService, TenantService } from "services";
//toast configuration
toast.configure();
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
// import { SettingsPageValidation } from "lib/validation";
import { ChevronDown } from "@styled-icons/bootstrap/ChevronDown";
// hooks
import { useRequest } from "@lib/hooks";
// for form validations
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// yup
import useLoginStatus from "lib/hooks/userLoginStatus";
import { ListTable } from "components/data-tables";
import { DeleteProject, DeleteUser } from "components/modals";
// shimmer
import { ShimmerCircularImage, ShimmerButton, ShimmerThumbnail } from "react-shimmer-effects";

import { TimezonePicker, TimezoneDisplayFormat } from "@blueprintjs/timezone";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Position } from "@blueprintjs/core";

const userService = new AuthorizationService();
const connections = new ConnectionsService();
const tenantService = new TenantService();

// const phoneRegExp =
//   // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//   /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
const Profile: FC = () => {
  const { user: profileData, mutate } = useLoginStatus();
  const [showModal, setShowModal]: any = React.useState(false);

  const [showIcon, setShowIcon] = React.useState(false);
  const [projectDelete, setProjectDelete] = React.useState(false);
  const [userDelete, setUserDelete] = React.useState(false);

  const [tempId, setTempId] = React.useState(0);

  const [loading, setLoading] = React.useState(false);
  const [showSSO, setShowSSO] = React.useState(false);

  // const [tz, setTz] = React.useState("");

  const [loader, setLoader] = React.useState(false);

  const [defaultLogin, setDefaultLogin] = React.useState("Email and password (default)");

  const [requestInput, setRequestInput] = React.useState({
    clientId: "",
    ssoType: "",
    success: false,
  });
  // React.useMemo(() => {
  //   const tzValue = tz.value ?? tz;
  //   setDatetime(datetime.goto(tzValue));
  // }, [tz]);
  const {
    data: projects,
    mutate: projectsMutate,
  }: // isValidating,
  any = useRequest({
    url: `/api/projects/`,
  });

  const { data: userList, mutate: usersMutate }: any = useRequest({
    url: `/api/userslist/`,
  });

  const { handleChange, handleSubmit, setFieldValue, values, resetForm, errors } = useFormik({
    initialValues: {
      firstname: profileData?.first_name ? profileData.first_name : "",
      lastname: profileData?.last_name ? profileData.last_name : "",

      contact_number:
        profileData?.mobile_number && profileData?.mobile_number !== "null"
          ? profileData.mobile_number
          : "",
      email: profileData?.email ? profileData.email : "",
      company: profileData?.company && profileData?.company !== "null" ? profileData.company : "",
      role: profileData?.role ? profileData.role : "",
      industry: profileData?.industry ? profileData.industry : "",
      timezone: profileData?.user_timezone ? profileData.user_timezone : "",
      avatar: profileData?.profile_pic ? profileData.profile_pic : "",
      isEditable: false,
      show: false,
    },
    // validationSchema: Yup.object({
    //   contact_number: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    // }),
    enableReinitialize: true,
    // validateOnChange: false,

    // validate: SettingsPageValidation,

    onSubmit: async (values) => {
      setFieldValue("show", false);

      let uploadedFile;
      if (typeof values.avatar !== "string" && values.avatar) {
        const imgData = new FormData();
        imgData.append("name[]", `profile`);
        imgData.append("asset[]", values.avatar);
        uploadedFile = await connections.dumpJSONFile(imgData);
      } else {
        uploadedFile = true;
      }

      const formData = new FormData();
      formData.append("first_name", values.firstname);
      formData.append("last_name", values.lastname);
      formData.append("company", values.company);
      formData.append("role", values.role);
      formData.append("mobile_number", values.contact_number);
      formData.append("industry", values.industry);
      formData.append("user_timezone", values.timezone);
      formData.append("profile_pic", isArray(uploadedFile) ? uploadedFile[0].asset : values.avatar);

      // typeof values.avatar !== "string"
      //   ? formData.append(
      //       "profile_pic",
      //       isArray(uploadedFile) ? uploadedFile[0].asset : values.avatar
      //     )
      //   : null;
      userService
        .editUser(formData)
        .then(() => {
          mutate();
          toast.success("Changes done successfully");
          setShowIcon(false);
        })
        .catch((error) => {
          toast.error(error);
          setShowIcon(false);
        });
    },
  });

  const handleChange1 = (e: any) => {
    setDefaultLogin(e.target.value);
    if (e.target.value === "SSO (Google)") {
      setShowSSO(true);
    } else {
      setShowSSO(false);
      handleSSOSave1();
    }
  };

  const handleSSOSave1 = async () => {
    const tenant = await checkTenant();
    tenantService
      .postTenantIntegration(tenant.id, {
        name: "email",
        props: {
          enabled: "false",
          key: {
            clientId: "",
          },
        },
        extra: {},
      })
      .then(() => {
        toast.success("Successfully sent");

        setLoading(false);

        setRequestInput({
          ...requestInput,
          success: true,
          clientId: "",
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const handleSSOSave = async () => {
    if (requestInput.clientId?.length === 0 || requestInput.ssoType?.length === 0) {
      toast.error("Please fill all the data");
      setLoading(false);
    } else {
      setLoading(true);
      const tenant = await checkTenant();
      tenantService
        .postTenantIntegration(tenant.id, {
          name: requestInput.ssoType,
          props: {
            enabled: "true",
            key: {
              clientId: requestInput.clientId,
            },
          },
          extra: {},
        })
        .then(() => {
          toast.success("Successfully sent");

          setLoading(false);

          setRequestInput({
            ...requestInput,
            success: true,
            clientId: "",
          });
        })
        .catch((err) => {
          setLoading(false);

          toast.error(err);
        });
    }
  };

  const copyToClipBoard = async (copyMe: any) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      toast.success("Copied!");
    } catch (err: any) {
      toast.error(err);
    }
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit: useformhandleSubmit,
    reset,
    formState: { errors: useformerrors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmitInviteuser = async (values: any) => {
    const inviteuser: any = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    };
    setLoader(true);

    tenantService
      .checkEmail({ email: values.email })
      .then((res: any) => {
        if (res?.available) {
          toast.error("Email already taken");
          setLoader(false);
        } else {
          try {
            setLoader(true);
            userService.inviteUser(inviteuser);
            toast.success("Inviataion email sent.");
            setShowModal(false);
            setLoader(false);
          } catch (e: any) {
            toast.error(e);
            setLoader(false);
          }
        }
      })
      .catch((err: any) => {
        toast.error(err);
      });
  };
  const columns = [
    {
      name: "PROJECT ID",
      sortable: true,
      center: false,
      selector: "id",
    },
    {
      name: "PROJECT NAME",
      sortable: true,
      center: false,
      selector: "name",
    },
    {
      name: "CREATED ON",
      sortable: true,
      center: false,
      selector: "updated",
      cell: (row: any) => <>{row.created_at}</>,
    },
    {
      name: "ACTION",
      sortable: true,
      center: false,
      selector: "notebook_url",

      cell: (row: any, index: any) => (
        <div key={index}>
          <button
            onClick={() => {
              setProjectDelete(!projectDelete);
              setTempId(row?.id);
            }}
            className="btn btn-outline-danger text-center delete-project"
          >
            Delete project
          </button>
        </div>
      ),
    },
  ];

  const columns1 = [
    {
      name: "FIRST NAME",
      sortable: true,
      center: false,
      selector: "first_name",

      cell: (row: any) => {
        return (
          <div>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-engine">{row.first_name}</Tooltip>}
            >
              <p className="text-truncate mb-0" style={{ width: "120px" }}>
                {row.first_name}
              </p>
            </OverlayTrigger>
          </div>
        );
      },
    },
    {
      name: "LAST NAME",
      sortable: true,
      center: false,
      selector: "last_name",

      cell: (row: any) => {
        return (
          <div>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-engine">{row.last_name}</Tooltip>}
            >
              <p className="text-truncate mb-0" style={{ width: "120px" }}>
                {row.last_name}
              </p>
            </OverlayTrigger>
          </div>
        );
      },
    },
    {
      name: "CONTACT",
      sortable: true,
      center: false,
      selector: "contact",
      cell: (row: any) => <>{row.contact_number}</>,
    },
    {
      name: "EMAIL",
      sortable: true,
      center: false,
      selector: "email",

      cell: (row: any) => {
        return (
          <>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-engine">{row.email}</Tooltip>}
            >
              <p className="text-truncate mb-0" style={{ width: "120px" }}>
                {row.email}
              </p>
            </OverlayTrigger>

            <img
              src="/copy.svg"
              alt="copy-icon"
              className="ms-auto cursor-pointer"
              onClick={() => copyToClipBoard(row?.email)}
            />
          </>
        );
      },
    },
    {
      name: "ROLE",
      sortable: true,
      center: false,
      selector: "role",

      cell: (row: any) => {
        return (
          <div>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-engine">{row.role}</Tooltip>}
            >
              <p className="text-truncate mb-0" style={{ width: "120px" }}>
                {row.role}
              </p>
            </OverlayTrigger>
          </div>
        );
      },
    },
    {
      name: "SIGNUP TIME",
      sortable: true,
      center: false,
      selector: "date_joined",
      cell: (row: any) => {
        return (
          <div>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-engine">{row.date_joined}</Tooltip>}
            >
              <p className="text-truncate mb-0" style={{ width: "120px" }}>
                {row.date_joined}
              </p>
            </OverlayTrigger>
          </div>
        );
      },
    },
    // {
    //   name: "TRAIL END DATE",
    //   sortable: true,
    //   center: false,
    //   selector: "enddate",
    //   cell: (row: any) => {
    //     if (row.end_date === null) {
    //       const new_date = Moment(row.date_joined).add(14, "days").format("MM/DD/YYYY HH:mm");
    //       return (
    //         <div>
    //           <OverlayTrigger
    //             placement="bottom"
    //             overlay={<Tooltip id="tooltip-engine">{new_date}</Tooltip>}
    //           >
    //             <p className="text-truncate mb-0" style={{ width: "120px" }}>
    //               {new_date}
    //             </p>
    //           </OverlayTrigger>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div>
    //           <OverlayTrigger
    //             placement="bottom"
    //             overlay={<Tooltip id="tooltip-engine">{row.end_date}</Tooltip>}
    //           >
    //             <p className="text-truncate mb-0" style={{ width: "120px" }}>
    //               {row.end_date}
    //             </p>
    //           </OverlayTrigger>
    //         </div>
    //       );
    //     }
    //   },
    // },
    {
      name: "STATUS",
      sortable: true,
      center: false,
      selector: "is_active",
      cell: (row: any) => (
        <>
          <button
            className={
              "btn text-center w-100 text-nowrap px-0  " +
              (row?.is_active ? "btn-outline-success" : "btn-outline-danger")
            }
            style={{ fontSize: 13, borderRadius: "4px" }}
          >
            {row?.is_active ? "Active" : "Inactive"}
          </button>
        </>
      ),
    },

    {
      name: "ACTION",
      sortable: true,
      center: false,
      selector: "notebook_url",

      cell: (row: any, index: any) => {
        if (profileData?.is_superuser || profileData?.tenant_superuser) {
          return (
            <div key={index}>
              <button
                onClick={() => {
                  setUserDelete(!userDelete);
                  setTempId(row?.id);
                }}
                style={{ fontSize: 13, borderRadius: "4px" }}
                className=" btn text-center w-100 me-2 mr-2 text-nowrap px-0 btn-outline-danger delete-project"
              >
                Delete user
              </button>
            </div>
          );
        }
      },

      // cell: (row: any, index: any) => (
      //   <div key={index}>
      //     <button
      //       onClick={() => {
      //         setUserDelete(!userDelete);
      //         setTempId(row?.id);
      //       }}
      //       style={{ fontSize: 13, borderRadius: "4px" }}
      //       className=" btn text-center w-100 me-2 mr-2 text-nowrap px-0 btn-outline-danger delete-project"
      //     >
      //       Delete user
      //     </button>
      //   </div>
      // ),
    },
  ];

  const hiddenFileInput = React.useRef(null) as any;

  const handleEdit = () => {
    setFieldValue("isEditable", true);
    setShowIcon(true);
  };
  const roles = [
    "Customer service manager",
    "CXO/General manager",
    "Data scientist",
    "Developer/Software engineer/Analyst",
    "IT manager",
    "Marketing/PR manager",
    "Operations manager",
    "Sales manager",
    "Student/Personal interest",
    "Others",
  ];

  const industry = [
    "Information Technology",
    "Pharma",
    "Education",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Gaming",
    "Others",
  ];

  const signin = ["Google", "Microsoft", "Slack"];
  // const handleImageClick = () => {
  //   if (values.isEditable) hiddenFileInput.current.click();
  // };

  const handleImageChange = (event: any) => {
    setFieldValue("avatar", event.target.files[0]);
  };

  const dropdownHandleChange = (event: any) => {
    setRequestInput({ ...requestInput, ssoType: event.target.value });
  };
  const handleSave = () => {
    setFieldValue("show", true);
  };

  const handleClose = () => {
    setFieldValue("show", false);
  };

  const handleCancel = () => {
    setFieldValue("show", false);
    resetForm();
    setShowIcon(false);
    setFieldValue("isEditable", false);
  };

  const handleMobile = (tel: any) => {
    setFieldValue("contact_number", tel);
  };

  const handleSubmission = () => {
    handleSubmit();
  };
  const handleTimezoneChange = (timezone: string) => {
    setFieldValue("timezone", timezone);
  };
  // load user data
  React.useEffect(() => {
    // fetchUserData();
  }, []);
  // console.log(window.document.getElementById("input1")?.offsetWidth);
  return (
    <>
      <NextSeo title={`${process.env.CLIENT_NAME} - Settings`} description="User settings" />
      <div className="d-flex h-100 container flex-column align-items-start mt-2 ">
        {!values.email ? (
          <div
            className="d-flex flex-column w-100 h-100  justify-content-center align-items-center"
            // style={{ height: "82vh" }}
          >
            {/* <Spinner animation="grow" className="dblue mb-5" /> */}
            <div className="d-flex flex-column w-80 ">
              <div className="summary-1 my-3">
                <h4 className="mb-2 title">Settings</h4>
                <p className="mt-1 f-16 opacity-75">Change your profile and account settings.</p>
              </div>
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <ShimmerThumbnail height={23} rounded />
                  <ShimmerCircularImage size={80} />
                </div>
                <ShimmerButton size="sm" />
              </div>
              <hr className="my-1 my-3" />
              <div className="d-flex flex-column w-100 pt-4 ">
                <div className="d-flex justify-content-between w-100 ">
                  <ShimmerThumbnail height={30} width={250} rounded />
                  <ShimmerThumbnail height={30} width={250} rounded />
                  <ShimmerThumbnail height={30} width={250} rounded />
                </div>
                <div className="d-flex justify-content-between w-100 ">
                  <ShimmerThumbnail height={30} width={250} rounded />
                  <ShimmerThumbnail height={30} width={250} rounded />
                  <ShimmerThumbnail height={30} width={250} rounded />
                </div>
                <div className="d-flex w-100 ">
                  <ShimmerThumbnail height={30} width={250} rounded />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <form className="container" onSubmit={handleSubmit}>
              <div className="container">
                <div className="pt-1">
                  <div className="summary-1 mt-3">
                    <h4 className="mb-2 title">Settings</h4>
                    <p className="mt-1 f-16 opacity-75">
                      Change your profile and account settings.
                    </p>
                  </div>
                  <div className="bg-white p-4 mt-1 rounded card-container">
                    <div>
                      <div className="d-flex align-items-center">
                        <div>
                          <h4>Avatar</h4>
                        </div>
                        <div className="ms-auto">
                          {!values.isEditable ? (
                            <button
                              className="btn btn-primary px-4 text-white "
                              type="button"
                              onClick={handleEdit}
                            >
                              Edit
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary px-4 text-white "
                              type="button"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                          )}
                        </div>
                      </div>
                      <img
                        // src={
                        //   values.avatar
                        //     ? typeof values.avatar == "string"
                        //       ? values.avatar
                        //       : URL.createObjectURL(values.avatar)
                        //     : "/avatarUser.svg"
                        // }
                        src={
                          values.avatar
                            ? typeof values.avatar == "string"
                              ? values.avatar
                              : URL.createObjectURL(values.avatar)
                            : "/newAvatar.svg"
                        }
                        alt="User-picture"
                        style={{ width: 70, height: 70 }}
                        className="rounded-circle"
                      />
                      {showIcon === true && values.isEditable ? (
                        <div className="overlay">
                          <img
                            onClick={() => {
                              // handleImageClick;
                              // values.isEditable ?
                              hiddenFileInput.current.click();
                              // : null;
                            }}
                            src="/editIcon.svg"
                            alt="delete-icon"
                            style={{
                              marginTop: "-60px",
                              color: "#6152D9",
                              marginLeft: "54px",
                            }}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            ref={hiddenFileInput}
                            onChange={handleImageChange}
                            className="d-none"
                          />
                        </div>
                      ) : null}
                    </div>
                    <hr className="my-1 mt-3" />
                    <h4 className="pt-2">Profile</h4>
                    <div className="row">
                      <div className="col-md-4">
                        <p className="font-16 my-2 p-0 ">First name</p>
                        <input
                          type="text"
                          name="firstname"
                          id=""
                          className="form-control  image-placeholder profile-font"
                          value={values.firstname}
                          placeholder="First name"
                          onChange={handleChange}
                          // readOnly
                        />

                        <p className="font-16 my-2 p-0 ">Email</p>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control  image-placeholder profile-font"
                          value={values.email}
                          onChange={handleChange}
                          readOnly
                        />
                        <p className="font-16 my-2 p-0 ">Industry</p>
                        <select
                          className="form-select  image-placeholder profile-font"
                          id="inputGroupSelect02"
                          name="industry"
                          onChange={handleChange}
                          required
                          placeholder="Select your Industry"
                          disabled={!values.isEditable}
                          value={values.industry}
                        >
                          <option value="" className="text-muted" disabled hidden selected>
                            Select your industry
                          </option>
                          {industry.map((item, index) => (
                            <option key={index} value={item} selected={item === values.industry}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <p className="font-16 my-2 p-0 ">Last name</p>
                        <input
                          type="text"
                          name="lastname"
                          id=""
                          className="form-control  image-placeholder profile-font"
                          value={values.lastname}
                          placeholder="Last name"
                          onChange={handleChange}
                          // readOnly
                        />

                        <p className="font-16 my-2 p-0 ">Company</p>
                        <input
                          type="text"
                          name="company"
                          id="input1"
                          className="form-control  image-placeholder"
                          style={{ backgroundColor: "#EDF2F7" }}
                          value={values.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          disabled={!values.isEditable}
                        />

                        <p className="font-16 my-2 p-0 ">Timezone</p>
                        <TimezonePicker
                          value={values.timezone}
                          popoverProps={{
                            position: Position.BOTTOM,
                          }}
                          valueDisplayFormat={TimezoneDisplayFormat.NAME}
                          placeholder="Select timezone"
                          onChange={handleTimezoneChange}
                          disabled={!values.isEditable}
                        ></TimezonePicker>
                      </div>
                      <div className="col-md-4">
                        <p className="font-16 my-2 p-0 ">Contact number</p>
                        <PhoneInput
                          country={"us"}
                          // name="contact_number"
                          inputClass="form-control  image-placeholder w-100"
                          inputStyle={{
                            backgroundColor: "#EDF2F7",
                            width: "100%",
                          }}
                          value={values.contact_number}
                          onChange={handleMobile}
                          disabled={!values.isEditable}
                          placeholder="Enter your mobile number"
                        />

                        <p className="text-danger">
                          {errors.contact_number ? errors.contact_number : ""}
                        </p>

                        <p className="font-16 my-2 p-0 ">What is your role?</p>
                        <select
                          className="form-select  profile-font"
                          id="inputGroupSelect02"
                          onChange={handleChange}
                          disabled={!values.isEditable}
                          required
                          name="role"
                        >
                          <option value="" className="text-muted" disabled hidden selected>
                            Select your role
                          </option>
                          {roles.map((item, index) => (
                            <option key={index} value={item} selected={item === values.role}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {profileData?.is_superuser || profileData?.tenant_superuser ? (
                      <>
                        <hr className="my-4" />
                        <Accordion>
                          <Accordion.Toggle className="border-0 bg-white" eventKey="1">
                            <div>
                              <h4 className="fw-bold f-20" style={{ color: "#3B3E40" }}>
                                Signin type
                                <ChevronDown
                                  width={16}
                                  height={16}
                                  className="ms-2 cursor-pointer"
                                />
                              </h4>
                            </div>
                          </Accordion.Toggle>
                          <Accordion.Collapse className="pt-3" eventKey="1">
                            <>
                              <div
                                className="d-flex mt-2 align-items-center justify-content-start"
                                onChange={handleChange1}
                              >
                                <div className="ms-1">
                                  <input
                                    className="cursor-pointer"
                                    type="radio"
                                    value="Email and password (default)"
                                    name="defaultLogin"
                                    checked={defaultLogin === "Email and password (default)"}
                                  />
                                  <span className=" f-16 ms-2 p-0">
                                    Email and password (default)
                                  </span>
                                </div>
                                <div>
                                  <input
                                    className="ms-5 cursor-pointer"
                                    type="radio"
                                    value="SSO (Google)"
                                    name="defaultLogin"
                                    checked={defaultLogin === "SSO (Google)"}
                                  />
                                  <span className="f-16 ms-2">SSO (Google)</span>
                                </div>
                              </div>

                              {showSSO ? (
                                <div className="d-flex mt-4 ms-1 justify-content-between">
                                  <div>
                                    <p className="font-16 my-2 p-0 ">SSO</p>
                                    <select
                                      className="form-select  image-placeholder profile-font"
                                      id="inputGroupSelect02"
                                      name="Signin"
                                      onChange={dropdownHandleChange}
                                      // required
                                      placeholder="Select your SSO"
                                      // disabled={!values.isEditable}
                                      value={requestInput.ssoType}
                                    >
                                      <option value="" className="text-muted">
                                        Select your SSO
                                      </option>
                                      {signin?.map((item, index) => (
                                        <option
                                          key={index}
                                          value={item}
                                          selected={item === requestInput.ssoType}
                                        >
                                          {item}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <div className="d-flex flex-row">
                                      <p className="font-16 my-2 mt-1 ms-4 ">Client id</p>
                                      <p
                                        className="f-11 cursor-pointer my-2 mt-2 mb-0 ms-1"
                                        style={{ color: "#0087ff" }}
                                        onClick={() => {
                                          window.open(
                                            "https://docs.google.com/document/d/1LwYJWzMokUU7q8CNMPqVPlAf3Eg3GIz7RUiJtVL7HKM/edit"
                                          );
                                        }}
                                      >
                                        (How to create client id)
                                      </p>
                                    </div>

                                    <input
                                      type="text"
                                      name="client id"
                                      id=""
                                      className="form-control mt-1 ms-4 image-placeholder profile-font"
                                      value={requestInput.clientId}
                                      placeholder="Client id"
                                      onChange={(e: any) => {
                                        setRequestInput({
                                          ...requestInput,
                                          clientId: e.target.value,
                                        });
                                      }}
                                      // readOnly
                                    />
                                  </div>
                                  <div className="ms-auto mt-auto">
                                    <Button
                                      className="btn btn-primary text-white "
                                      type="button"
                                      loading={loading}
                                      onClick={handleSSOSave}
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              ) : null}
                            </>
                          </Accordion.Collapse>
                        </Accordion>
                      </>
                    ) : null}

                    <hr className="my-4" />
                    <Accordion>
                      <Accordion.Toggle className="border-0 bg-white" eventKey="1">
                        <h4 className="fw-bold f-20" style={{ color: "#3B3E40" }}>
                          My projects
                          <ChevronDown width={16} height={16} className="ms-2 cursor-pointer" />
                        </h4>
                      </Accordion.Toggle>
                      <Accordion.Collapse className="pt-3" eventKey="1">
                        <div className="border">
                          <ListTable columns={columns} data={projects} />
                        </div>
                      </Accordion.Collapse>
                    </Accordion>

                    <>
                      <hr className="my-4" />
                      <Accordion className="w-100">
                        <Accordion.Toggle className="border-0 w-100 bg-white" eventKey="1">
                          <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold f-20" style={{ color: "#3B3E40" }}>
                              My team
                              <ChevronDown width={16} height={16} className="ms-2 cursor-pointer" />
                            </h4>
                            {profileData?.is_superuser || profileData?.tenant_superuser ? (
                              <>
                                <Button
                                  onClick={(e: any) => {
                                    setShowModal(true);
                                    e.stopPropagation();
                                  }}
                                  className="text-white"
                                >
                                  Invite user
                                </Button>
                              </>
                            ) : null}
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse className="pt-3" eventKey="1">
                          <div className="border">
                            <ListTable columns={columns1} data={userList} />
                          </div>
                        </Accordion.Collapse>
                      </Accordion>
                    </>
                  </div>

                  <hr className="my-1" />
                </div>
              </div>

              <Modal
                onHide={handleClose}
                show={values.show}
                backdrop="static"
                keyboard={false}
                centered
              >
                <Modal.Header className="border-0 mt-4 ps-4 d-flex justify-content-center align-items-center">
                  <Modal.Title className="mb-0">Confirm action</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mb-0 mt-0 ps-4 pt-0 d-flex justify-content-center align-items-center">
                  Do you want to save the changes?
                </Modal.Body>
                <Modal.Footer className="border-0 ms-2 mt-2 mb-2 d-flex justify-content-center align-items-center">
                  <button className="btn ms-3 bg-white" onClick={handleCancel}>
                    Cancel
                  </button>
                  <Button
                    variant="primary"
                    className="text-white"
                    onClick={handleSubmission}
                    style={{ width: 117 }}
                  >
                    Yes, save
                  </Button>
                </Modal.Footer>
              </Modal>
            </form>
          </>
        )}
      </div>

      <DeleteProject
        projectDelete={projectDelete}
        setProjectDelete={setProjectDelete}
        id={tempId}
        projectsMutate={projectsMutate}
      />

      <DeleteUser
        userDelete={userDelete}
        setUserDelete={setUserDelete}
        id={tempId}
        usersMutate={usersMutate}
      />

      <Modal show={showModal} backdrop="static" keyboard={false} centered>
        <Form onSubmit={useformhandleSubmit(onSubmitInviteuser)}>
          <Modal.Header>
            <Modal.Title className="mb-0">Invite User</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            <div className="d-flex flex-column">
              {["First name", "Last name", "Email"].map((ele: any, id: any) => (
                <Form.Group key={id}>
                  <Form.Label>{ele}</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    placeholder={`Enter ${ele.toLowerCase()}`}
                    {...register(ele.replace(" ", "_").toLowerCase())}
                    className={`form-control input-create-project1 mb-2 ${
                      useformerrors[`${ele.replace(" ", "_").toLowerCase()}`] ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback mb-2">
                    {useformerrors[`${ele.replace(" ", "_").toLowerCase()}`]?.message}
                  </div>
                </Form.Group>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer className="border-top-0 mb-1 pt-0 justify-content-center">
            <Button
              onClick={() => {
                setShowModal(false);
                reset();
              }}
              variant="text"
              className="f-14"
            >
              Cancel
            </Button>
            <Button loading={loader} type="submit" className="f-14 text-white">
              Invite
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default Profile;