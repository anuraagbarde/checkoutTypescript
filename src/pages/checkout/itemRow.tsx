import { Row, Col, Card } from "reactstrap";
import * as React from "react";
import { checkoutData } from "../../services/checkoutServices";
import { X, Plus, Minus } from "react-feather";
import { idVsPriceInfo } from "./checkout.d";

type idVsPriceInfoState = {
  idVsPriceInfo: idVsPriceInfo,
  setIdVsPriceInfo: React.Dispatch<React.SetStateAction<idVsPriceInfo>>,
};

type ItemRowProps = checkoutData & idVsPriceInfoState;

const ItemRow: React.FC<ItemRowProps> = ({
  id,
  name,
  price,
  discount,
  type,
  img_url,
  idVsPriceInfo,
  setIdVsPriceInfo,
}) => {
  const plusHandler = () => {
    setIdVsPriceInfo((prevState) => {
      if (prevState.hasOwnProperty(id)) {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            quantity: prevState[id].quantity + 1,
          },
        };
      } else {
        return {
          ...prevState,
          [id]: {
            price,
            quantity: 1,
            discountPercent: discount,
            typeDiscountPercent: type === "fiction" ? 15 : 0,
          },
        };
      }
    });
  };
  const minusHandler = () => {
    setIdVsPriceInfo((prevState) => {
      if (prevState.hasOwnProperty(id)) {
        return {
          ...prevState,
          [id]: {
            ...prevState[id],
            quantity: prevState[id].quantity > 1 ? prevState[id].quantity - 1 : 0,
          },
        };
      } else {
        return {
          ...prevState,
          [id]: {
            price,
            quantity: 0,
            discountPercent: discount,
            typeDiscountPercent: type === "fiction" ? 15 : 0,
          },
        };
      }
    });
  };

  return (
    <>
      <Row>
        <Col className="col-6">
          <Card>
            <Row>
              <Col className="m-2">
                <img src={img_url} alt="itemImg" />
              </Col>
              <Col className="m-2">{name}</Col>
              <Col align="right">
                <X />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col align="center" className="col-4">
          <Row className="justify-content-center">
            <Plus
              className="mt-2"
              onClick={() => {
                plusHandler();
              }}
            />
            <Card className="mr-3 ml-3 p-2 pr-3 pl-3">{idVsPriceInfo[id]?.quantity || 0}</Card>
            <Minus
              className="mt-2"
              onClick={() => {
                minusHandler();
              }}
            />
          </Row>
        </Col>
        <Col className="col-2">{`$ ${price}`}</Col>
      </Row>
    </>
  );
};

export default ItemRow;
