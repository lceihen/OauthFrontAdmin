import { ModalForm } from "@ant-design/pro-form";
import { BetaSchemaForm } from "@ant-design/pro-form";

import { Button, message, Upload } from "antd";
import { updateUserRecord, createUserRecord } from "@/api";
import FormItem from "antd/es/form/FormItem";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { getBase64 } from "@/utils";
import { ossPut } from "@/utils/oss";

export default (props: any) => {
  const { type, data = {}, callback } = props;

  const uploadRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const textForType = type === "create" ? "添加" : "编辑";
  const columns = [
    {
      title: "userName",
      dataIndex: ["userName"],
      name: "userName",
      formItemProps: {
        rules: [{ required: true, message: "此项为必填项" }],
      },
    },

    {
      title: "nickName",
      dataIndex: ["nickName"],
      name: "nickName",
    },
    {
      title: "hashedPassword",
      dataIndex: ["hashedPassword"],
      name: "hashedPassword",
    },
    {
      title: "phone",
      dataIndex: ["phone"],
      name: "phone",
    },
    {
      title: "gender",
      dataIndex: ["gender"],
      name: "gender",
    },
    {
      title: "email",
      dataIndex: ["email"],
      name: "email",
    },

    {
      title: "createdAt",
      dataIndex: ["createdAt"],
      name: "createdAt",
      valueType: "date",
    },
    {
      title: "updatedAt",
      dataIndex: ["updatedAt"],
      name: "updatedAt",
      valueType: "date",
    },
  ];

  const [avatar, setaAvatarUrl] = useState(data?.avatar || "");

  const onChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setaAvatarUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleUpload = async ({ file }: any) => {
    if (!/^image/.test(file.type)) {
      message.warning("只能上传图片");
      return;
    }
    ossPut({
      fileName: file.name,
      filePath: file,
    })
      .then((url) => {
        message.success("上传成功");

        setaAvatarUrl(url?.split("?")[0]);
      })
      .catch((error) => {
        message.error(`上传失败${error}`);
      });
  };

  return (
    <ModalForm
      width={500}
      style={{ paddingTop: 30 }}
      trigger={
        <Button type={type === "create" ? "primary" : "dashed"}>
          {textForType}
        </Button>
      }
      layout="horizontal"
      initialValues={data}
      onFinish={async (value) => {
        let res = null;
        if (type === "update") {
          res = await updateUserRecord({
            record: {
              ...data,
              ...value,
              avatar,
            },
          });
        } else {
          res = await createUserRecord({
            record: {
              ...data,
              ...value,
              avatar,
            },
          });
        }

        if (res?.code === "-1") {
          message.warning("编辑失败");
          return false;
        }
        message.success(textForType + "成功");
        callback && callback();
        return true;
      }}
      onFinishFailed={() => {
        message.warning("请检查是否填写完整");
      }}
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <BetaSchemaForm layoutType="Embed" columns={columns}></BetaSchemaForm>

      <FormItem label="avatar" name="avatar">
        <Upload
          ref={uploadRef}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={onChange}
          customRequest={handleUpload}
          maxCount={1}
        >
          {avatar ? (
            <img src={avatar} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </FormItem>
    </ModalForm>
  );
};
