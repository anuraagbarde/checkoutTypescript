import * as React from "react";
import { Card, Col, Row } from "reactstrap";
import { billInfo } from "./checkout";

export interface TotalProps {
  billInfo: billInfo;
}

const Total: React.FC<TotalProps> = ({ billInfo }) => {
  const { discountAmount, totalBill, totalItems, typeDiscountAmount } = billInfo;
  return (
    <>
      <Card>
        <Row>
          <Col>
            Items ({totalItems}): {totalBill}
          </Col>
        </Row>
        <Col>
          Discount: {discountAmount}
          <Row>
            <Col>Type Discount: {typeDiscountAmount}</Col>
          </Row>
        </Col>
      </Card>
      <Card>Order Total:{totalBill - discountAmount - typeDiscountAmount}</Card>
    </>
  );
};

export default Total;
