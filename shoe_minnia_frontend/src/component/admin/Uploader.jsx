import { PlusOutlined } from "@ant-design/icons";
import { Box, Button, Modal } from "@mui/material";
import { Upload } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { PRODUCT_IMAGES_REQUEST } from "../../constants/productConstants";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Uploader = () => {
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = (info) => {
    const { file, fileList } = info;
    if (info.file.status === "uploading") {
      info.file.status = "done";
    }
    setFileList(fileList);
    dispatch({
      type: PRODUCT_IMAGES_REQUEST,
      payload: fileList,
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const dummyRequest = ({ fileList: newFileList }) => {
    console.log("dummyRequest");
  };
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        customRequest={dummyRequest}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        onClose={handleCancel}
        footer={null}
        title={previewTitle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            alt="example"
            style={{
              width: "100%",
              height: "auto",
            }}
            src={previewImage}
          />
        </Box>
      </Modal>
    </>
  );
};
export default Uploader;
