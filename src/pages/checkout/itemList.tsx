import * as React from "react";
import { useState, useEffect } from "react";
import { getCheckoutData } from "../../services/checkoutServices";
import { Spin } from "antd";
import { checkoutData } from "../../services/checkoutServices";
import ItemRow from "./itemRow";
import { idVsPriceInfo } from "./checkout";


export interface ItemListProps {
    idVsPriceInfo: idVsPriceInfo;
    setIdVsPriceInfo: React.Dispatch<React.SetStateAction<idVsPriceInfo>>;
}

const ItemList: React.FC<ItemListProps> = ({idVsPriceInfo, setIdVsPriceInfo }) => {
  const [checkoutDataArray, setCheckoutDataArray] = useState<checkoutData[]>([]);
  const [checkoutDataLoading, setCheckoutDataLoading] = useState(false);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setCheckoutDataLoading(true);
        const { data } = await getCheckoutData();
        setCheckoutDataArray(data);
        setCheckoutDataLoading(false);
      } catch (err) {
        console.log(err);
        setCheckoutDataLoading(false);
      }
    };

    fetchCheckoutData();
  }, []);

  return (
    <>
      {checkoutDataLoading ? (
        <>
          {" "}
          <Spin />{" "}
        </>
      ) : (
        <>
          {checkoutDataArray.map((item) => (
            <ItemRow
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              discount={item.discount}
              type={item.type}
              img_url={item.img_url}
              idVsPriceInfo={idVsPriceInfo}
              setIdVsPriceInfo={setIdVsPriceInfo}
            />
          ))}
        </>
      )}
    </>
  );
};

export default ItemList;
