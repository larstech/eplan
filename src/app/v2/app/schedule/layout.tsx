import Sidebar from "@/app/v2/components/sidebar"
import { ReactNode } from "react"
import { Col, Row } from "react-bootstrap"

type LayoutParams = Readonly<{ children: ReactNode }>

export default function Layout({ children }: LayoutParams) {
  return (
    <Row>
      <Col md={3} lg={2} className="border-end">
        <Sidebar />
      </Col>

      <Col md={9} lg={10}>
        {children}
      </Col>
    </Row>
  )
}
