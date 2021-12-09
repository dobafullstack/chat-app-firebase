import React from "react";
import { Row, Col } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function index() {
    return (
        <div
            style={{
                backgroundImage:
                    'url("https://cdn5.f-cdn.com/contestentries/1578585/21468461/5d62b49ac544b_thumb900.jpg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}>
            <Row>
                <Col span={8}>
                    <Sidebar />
                </Col>
                <Col span={16}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    );
}
