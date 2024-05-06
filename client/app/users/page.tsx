"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  PopconfirmProps,
  Table,
  TableColumnsType,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Axios from "axios";
const PageName = "Users";
const api = "http://localhost:3001";

interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  email: string;
  password: string;
  roles?: string;
}

const remove = (id: string) => {
  console.log(id);
  Axios.delete(`${api}/users/${id}`).then((res) => {
    console.log(id, res.data);
  });
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [roles, setroles] = useState("");
  const [Loading, setLoading] = useState(true); // to show loading before get data form db
  const [form] = Form.useForm(); // to reset form after save or close

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "_id",
      hidden: true,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Password",
      dataIndex: "password",
    },
    {
      title: "Roles",
      dataIndex: "roles",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      render: (_, record) => (
        <>
          <Popconfirm
            title={"Delete the " + PageName.slice(0, -1)}
            description={"Are you sure to delete  " + record.name + "?"}
            onConfirm={() => confirmRemove(record._id)}
            okText="Yes, Remove"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
          <> </>
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </>
      ),
    },
  ];

  useEffect(() => {
    Axios.get(`${api}/users`).then(async (res) => {
      setUsers(res.data);
      setLoading(false); // stop loading and show data
    });
  }, [users]);

  const save = () => {
    Axios.post(`${api}/users`, {
      name: name,
      email: email,
      password: password,
      roles: roles,
    }).then((res) => {
      console.log("added");
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal //////////
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await save();
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  //////////////////

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "not valid email!",
      number: "not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const confirmRemove = (id: string) => {
    remove(id);
    message.success("Removed");
  };

  const cancelRemove: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <>
      <Modal
        title={"Add " + PageName.slice(0, -1)}
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ paddingBottom: 0 }}
        maskClosable={false} //not close by click out of modal
        footer={[]}
      >
        <Card
          style={{
            padding: 10,
            margin: 30,
            paddingBottom: 0,
            marginBottom: -20,
          }}
        >
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600, textAlign: "center" }}
            validateMessages={validateMessages}
            onFinish={handleOk}
          >
            <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
              <Input
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[{ required: true }]}
            >
              <Input.Password
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Roles" name="Roles" rules={[{ required: true }]}>
              <Input
                onChange={(e) => {
                  setroles(e.target.value);
                }}
              />
            </Form.Item>
            <br />

            <Divider />
            <Form.Item style={{ marginBottom: -10, textAlign: "right" }}>
              <Button onClick={handleCancel} icon={<CloseOutlined />} />
              <> </>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>

      <Card
        title={PageName}
        extra={<Button onClick={showModal} icon={<PlusOutlined />}></Button>}
      >
        <Table columns={columns} dataSource={users} loading={Loading} scroll={{ x: 'calc(700px + 50%)', y: 240 }}/>
      </Card>
    </>
  );
}
