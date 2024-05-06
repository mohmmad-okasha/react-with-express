import { Row, Col, Card } from "antd";
import Link from "next/link";
import { UserSwitchOutlined } from "@ant-design/icons";

export default function app() {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Link href="/users">
          <Card
            bordered={true}
            style={{
              fontSize: "25px",
              backgroundColor: "#4D869C",
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
