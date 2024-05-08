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
  Result,
  Table,
  TableColumnsType,
  message,
  notification,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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

export default function App() {
  const [users, setUsers] = useState([]);
  const [id, setID] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [roles, setroles] = useState("");
  const [Loading, setLoading] = useState(true); // to show loading before get data form db
  const [form] = Form.useForm(); // to reset form after save or close
  const [edit, setEdit] = useState(false); // if true update else save new
  const [searchText, setSearchText] = useState(""); // to search on table
  const [errors, setErrors] = useState(); // if connection error  save here

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
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setID(record._id);
              form.setFieldsValue({
                name: record.name,
                email: record.email,
                password: record.password,
                roles: record.roles,
              });
              setEdit(true);
              showModal();
            }}
          />
        </>
      ),
    },
  ];

  let toastInstance: any = null; // to show 1 toast message only

  useEffect(() => {
    setLoading(true);
    Axios.get(`${api}/users`)
      .then(async (res) => {
        setUsers(res.data);
        setLoading(false); // stop loading and show data
      })
      .catch((error) => {
        setErrors(error.response.status);
        if (!toastInstance) {
          // Create toast only if there isn't one already
          toastInstance = toast.error(
            "Error " + error.response.status || "Unknown error",
            {
              position: "top-center",
              style: {
                width: "100%",
              },
            }
          );
          setLoading(false);
        }
      });
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await Axios.get(`${api}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = users.filter((user) => {
    // Implement your search logic here
    const searchTextLower = searchText.toLowerCase(); // Case-insensitive search
    return (
      // Search relevant fields
      user.name.toLowerCase().includes(searchTextLower) ||
      user.email.toLowerCase().includes(searchTextLower)
      // Add more fields as needed based on your data structure
    );
  });

  const save = () => {
    Axios.post(`${api}/users`, {
      name: name,
      email: email,
      password: password,
      roles: roles,
    }).then((res) => {
      if (res.data.message === "Saved!") {
        toast.success(res.data.message, {
          position: "top-center",
        });
        getData();
      }else{
        toast.error(res.data.message, {
          position: "top-center",
        });
      }
    });
  };

  const update = () => {
    Axios.put(`${api}/users`, {
      _id: id,
      name: form.getFieldValue("name"),
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
      roles: form.getFieldValue("roles"),
    }).then((res) => {
      toast.success("Updated.", {
        position: "top-center",
      });
      getData();
    });
    setEdit(false);
  };

  const remove = (id: string) => {
    console.log(id);
    Axios.delete(`${api}/users/${id}`).then((res) => {
      getData();
    });
  };

  // Modal //////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!edit) {
      await save();
    } else {
      await update();
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEdit(false);
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

  return (
    <>
      <div>
        <Toaster />
      </div>
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
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
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
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Roles" name="roles" rules={[{ required: true }]}>
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

              <Button //if edit === true hide this button
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
        {!errors && (
          <>
            <Input.Search
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
              style={{ paddingBottom: 5 }}
              allowClear
            />
            <Table
              columns={columns}
              dataSource={filteredData}
              loading={Loading}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "calc(300px + 50%)", y: 500 }}
              rowKey={(record) => record._id}
            ></Table>
          </>
        )}

        {errors && (
          <Result status="warning" title={"Can't Load Data :" + errors} />
        )}
      </Card>
    </>
  );
}
