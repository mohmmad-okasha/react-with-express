import { Row, Col, Card } from "antd";
import Link from "next/link";
import { UserSwitchOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";

export default function app() {
  const [_, setCookies] = useCookies(["loading"]);//for loading page

  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Link onClick={() => setCookies('loading',true)} href="/users" >
          <Card
            bordered={true}
            style={{
              fontSize: "25px",
              backgroundColor: '#001529', //"#4D869C",
              color: "white",
            }}
          >
            <UserSwitchOutlined /> Users
          </Card>
        </Link>
      </Col>
    </Row>
  );
}
