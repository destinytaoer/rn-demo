import React, { FC, memo } from "react";
import { View, Text } from "react-native";
import styles from "./style";

function formatMoney(money: number | string) {
  const moneyStr = String(money);
  const index = moneyStr.lastIndexOf(".");
  const dotIndex = moneyStr.length - index;
  if (index < 0) {
    return moneyStr.concat(".00");
  }
  if (dotIndex === 2) {
    return moneyStr.concat("0");
  }
  return moneyStr;
}

interface IPart {
  stockPartsName: string; // 配件名
  stockNo: string; // 配件编号
  partsCategoryName: string; //
  unit: string; // 单位
  spec: string; //
  model: string; //
  labourProjectName: string; //
  carNo: string; //
  batchNo: string; // 批次号
  supplier: string; // 供应商
  wareHouseId: string; // 仓库 id
  wareHouseName: string; // 仓库名
  wareHouseLocationName: string; // 仓位名
  costPrice: number; //
  qty: number; //
  total: number; //
  taxRate: number; //
  untaxedPrice: number; //
  taxes: number; //
  referentPrice: number; //
  purchasePrice: number; //
}

interface IPartItemProps {
  part: IPart;
}

const PartItem: FC<IPartItemProps> = memo((props) => {
  const {
    part: {
      stockPartsName,
      stockNo,
      qty,
      unit,
      wareHouseName,
      wareHouseLocationName,
      taxes,
      purchasePrice,
    },
  } = props;

  return (
    <View style={styles.part}>
      <View style={[styles.row, styles.hasMargin]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.partsName} numberOfLines={1}>
            {stockPartsName}
          </Text>
        </View>
        <View style={styles.descWrapper}>
          <Text style={styles.count}>
            {qty} {unit}
          </Text>
          <Text style={styles.price}>{formatMoney(purchasePrice)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.titleWrapper}>
          <Text style={styles.stockNo} numberOfLines={1}>
            {stockNo}
          </Text>
        </View>
        <View style={styles.descWrapper}>
          <Text style={styles.warehouse}>
            {wareHouseName}
            {wareHouseLocationName ? `-${wareHouseLocationName}` : ""}
          </Text>
          <Text style={styles.tax}>含税: {formatMoney(taxes)}</Text>
        </View>
      </View>
    </View>
  );
});

interface IProps {
  partsFlow: IPart[];
}

const PartsList: FC<IProps> = (props) => {
  const { partsFlow } = props;

  const total = partsFlow.reduce((total, part) => {
    return total + part.purchasePrice;
  }, 0);

  const totalTax = partsFlow.reduce((total, part) => {
    return total + Number(part.taxes);
  }, 0);

  return (
    <View style={styles.container}>
      {partsFlow.map((part) => {
        return <PartItem part={part} key={part.stockNo} />;
      })}
      {/* 运费 */}
      <View style={styles.part}>
        <View style={[styles.row, styles.hasMargin, styles.between]}>
          <Text style={styles.partsName}>运费</Text>
          <Text style={styles.price}>10.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.stockNo}>门店自费</Text>
        </View>
      </View>
      {/* 整单优惠 */}
      <View style={styles.part}>
        <View style={[styles.row, styles.hasMargin32, styles.between]}>
          <Text style={styles.partsName}>整单优惠</Text>
          <Text style={styles.discount}>-100.00</Text>
        </View>
        <View style={[styles.row, styles.end, styles.hasMargin16]}>
          <Text style={styles.partsName}>总金额: {total}</Text>
        </View>
        <View style={[styles.row, styles.end]}>
          <Text style={styles.tax}>含税: {formatMoney(totalTax)}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(PartsList);
