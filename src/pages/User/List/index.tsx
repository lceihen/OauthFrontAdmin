import { ProTable } from "@ant-design/pro-components";

import { Card, Button, message, Image } from "antd";
import { useRef } from "react";
import UserRecordModal from "./UserRecordModal";
import { getUserList, handleDeleteUserRecordApi } from "@/api";

export default () => {
  const tableRef = useRef<any>();

  const handleDeleteUserRecord = async (record) => {
    const { id } = record;
    const res = await handleDeleteUserRecordApi({ id });
    if (res?.code === "0") {
      message.success("操作成功");
    }
    tableRef.current.reload();
  };

  const columns: any = [
    {
      dataIndex: "id",
      title: "id",
    },
    {
      dataIndex: "userName",
      title: "userName",
    },
    {
      dataIndex: "phone",
      title: "phone",
    },
    {
      dataIndex: "nickName",
      title: "nickName",
    },
    {
      dataIndex: "gender",
      title: "gender",
      render: (_: any, record: any) => {
        return record?.gender === "1" ? "男" : "女";
      },
    },
    {
      dataIndex: "avatar",
      title: "avatar",
      render: (_, record) => {
        return record?.avatar ? <Image width={80} src={record.avatar} /> : null;
      },
    },
    {
      dataIndex: "email",
      title: "email",
    },
    {
      dataIndex: "createdAt",
      title: "createdAt",
    },
    {
      dataIndex: "updatedAt",
      title: "updatedAt",
    },
    {
      title: "操作",
      render: (_: any, record: any) => {
        return (
          <>
            <UserRecordModal
              data={record}
              type="update"
              callback={() => tableRef?.current?.reload()}
            />
            <Button
              danger
              style={{ marginLeft: 20 }}
              onClick={() => handleDeleteUserRecord(record)}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Card>
        <UserRecordModal
          callback={() => tableRef?.current?.reload()}
          data={{}}
          type="create"
        />
      </Card>
      <ProTable
        columns={columns}
        actionRef={tableRef}
        request={async (params) => {
          console.log("params------", params);
          const res: any = await getUserList({
            pageSize: String(params?.pageSize),
            current: String(params?.current),
          });
          console.log("res-------", res?.data);
          if (res?.code === "-1") {
            return {
              data: [],
              total: 0,
            };
          }
          return {
            data: res?.data,
            total: res?.total,
          };
        }}
        rowKey="id"
        search={false}
        form={{}}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
      />
    </>
  );
};
