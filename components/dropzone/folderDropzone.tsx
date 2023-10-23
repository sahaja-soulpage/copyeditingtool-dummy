import React, { useCallback, useMemo } from "react";
// import _ from "lodash";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
toast.configure();
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // padding: "60px 0px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#F6F9FB",

  backgroundColor: "#F6F9FB",
  color: "#A0A1AB",
  outline: "none",
  // transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FolderDropzone({ setSelectedFile, maxNumberOfFiles, acceptedFileExtention }) {
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      console.log(fileRejections, "file rej");
      if (fileRejections.length > maxNumberOfFiles) {
        toast.error(`Please upload max of ${maxNumberOfFiles} .zip`);
      }
    } else {
      console.log(acceptedFiles, "acceptedFiles");
      setSelectedFile(acceptedFiles[0]);
    }

    // selectedTag.selectedImages = acceptedFiles;
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop,
    accept: acceptedFileExtention,
    maxFiles: maxNumberOfFiles,
    maxSize: 25000000, // 25mb
  });
  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="py-5 px-2" {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <div className="d-flex ">
        <small
          className="text-center"
          style={{ color: "#A0A1AB", fontSize: "21px", fontWeight: "400" }}
        >
          Drop a folder here or
          <a className="mb-3 text-blue" style={{ cursor: "pointer", color: "#0090A1" }}>
            {" "}
            browse
          </a>
        </small>
      </div>
      <small className="text-center">Only .zip files are accepted</small>
    </div>
  );
}

export default FolderDropzone;
