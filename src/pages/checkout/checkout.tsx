import { Col, Row } from "reactstrap";
import * as React from "react";
import { useState, useEffect } from "react";
import ItemList from "./itemList";
import Total from "./total";
import { billInfo, idVsPriceInfo } from "./checkout.d";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  // prettier-ignore
  const [billInfo, setBillInfo] = useState<billInfo>({totalItems:0, totalBill:0, discountAmount:0, typeDiscountAmount:0 });
  // prettier-ignore
  const [idVsPriceInfo, setIdVsPriceInfo] = useState<idVsPriceInfo>({});

  useEffect(() => {
    let newBillInfo: billInfo = {
      totalItems: 0,
      totalBill: 0,
      discountAmount: 0,
      typeDiscountAmount: 0,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, value] of Object.entries(idVsPriceInfo)) {
      newBillInfo.totalItems++;
      newBillInfo.totalBill += value.price * value.quantity;
      newBillInfo.discountAmount += (value.price * value.quantity * value.discountPercent) / 100 || 0;
      newBillInfo.typeDiscountAmount += (value.price * value.quantity * value.typeDiscountPercent) / 100 || 0;
    }
    setBillInfo(newBillInfo);
  }, [idVsPriceInfo]);

  return (
    <>
      <div className="container">
        <Row>
          <Col className="col-8">
            <ItemList idVsPriceInfo={idVsPriceInfo} setIdVsPriceInfo={setIdVsPriceInfo} />
          </Col>
          <Col className="col-4">
            <Total billInfo={billInfo} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Checkout;
