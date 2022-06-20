import { Button, Form, Icon, Input, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const { Title } = Typography;

const PrivateOption = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOption = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDiscription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Firm and Animation");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDiscriptionChange = (e) => {
    setDiscription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/video/upload", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        console.log("실패숙이");
        alert("비디오 업로드 실패");
      }
    });
  };

  const onSubmit = (event) => {};

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop Zone */}

          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/* Thumb Zone */}
          <div>
            <img src="" alt="" />
          </div>
        </div>

        <br />
        <br />
        <label>Title.</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description.</label>
        <TextArea onChange={onDiscriptionChange} value={Description} />
        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOption.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOption.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        {/* <Button type="submit" size="large" onClick>
          Submit
        </Button> */}
      </Form>
    </div>
  );
}

export default VideoUploadPage;
