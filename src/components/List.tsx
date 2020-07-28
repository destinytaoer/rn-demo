import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
// import {getRealSize as S} from './utils';
import ListItem from './ListItem';

interface Data {
  statusId: 'QUOTE' | 'UNQUOTE' | 'ABATE';
  statusDesc: string;
  userNeed: string;
  isSimpleInquiry: boolean;
  inquiryId: string;
  inquiryDataType: string;
  engineType: string;
  createdName: string;
  carBrandName: string;
  createdStamp: number;
  carModelName: string;
  carBrandId: string;
  hasNewQuote: boolean;
  isVINErr?: boolean;
  VINErrMsg?: string;
}
const DATA: Array<Data> = [
  {
    statusId: 'QUOTE',
    statusDesc: '已报价',
    userNeed: '机油格,燃油滤清器,右空气格',
    isSimpleInquiry: false,
    inquiryId: 'B20072001023',
    inquiryDataType: 'HOT',
    engineType: '路虎 Range Rover [揽胜]',
    createdName: 'linfs3',
    carBrandName: '路虎',
    createdStamp: 1595209830000,
    carModelName: '路虎 揽胜2010年－2012年',
    carBrandId: 'LANDROVER',
    hasNewQuote: false,
    isVINErr: true,
    VINErrMsg:
      '亲~因 VIN 码有误，已帮您重新发起询价，请注意变更呦~（新询价单号为：B20062809753）',
  },
  {
    statusId: 'QUOTE',
    statusDesc: '已报价',
    userNeed: '燃油滤清器,右空气格,左空气格',
    isSimpleInquiry: false,
    inquiryId: 'B20072000413',
    inquiryDataType: 'HOT',
    engineType: '路虎 Range Rover [揽胜]',
    createdName: 'linfs3',
    carBrandName: '路虎',
    createdStamp: 1595209691000,
    carModelName: '路虎 揽胜2010年－2012年',
    carBrandId: 'LANDROVER',
    hasNewQuote: false,
  },
  {
    statusId: 'QUOTE',
    statusDesc: '已报价',
    userNeed: '机油格,燃油滤清器,空气格',
    isSimpleInquiry: false,
    inquiryId: 'B20072007081',
    inquiryDataType: 'HOT',
    engineType: '路虎 Range Rover [揽胜] 2011 3.6T 手自一体 TDV8',
    createdName: 'linfs1',
    carBrandName: '路虎',
    createdStamp: 1595209428000,
    carModelName: '路虎 揽胜2010年－2012年',
    carBrandId: 'LANDROVER',
    hasNewQuote: false,
  },
  {
    statusId: 'QUOTE',
    statusDesc: '已报价',
    userNeed: '机油格,燃油滤清器,空气格',
    isSimpleInquiry: false,
    inquiryId: 'B20072005167',
    inquiryDataType: 'HOT',
    engineType: '路虎 Range Rover [揽胜] 2011 3.6T 手自一体 TDV8',
    createdName: 'linfs1',
    carBrandName: '路虎',
    createdStamp: 1595209282000,
    carModelName: '路虎 揽胜2010年－2012年',
    carBrandId: 'LANDROVER',
    hasNewQuote: false,
  },
  {
    statusId: 'UNQUOTE',
    statusDesc: '报价中',
    userNeed: 'FPX,雪种,右转向节',
    isSimpleInquiry: false,
    inquiryId: 'B20071802066',
    inquiryDataType: 'HOT',
    engineType: '宝马 535Li 2011  3.0T 手自一体',
    createdName: '向思宇',
    carBrandName: '宝马',
    createdStamp: 1595054655000,
    carModelName: '华晨宝马 535Li',
    carBrandId: 'BMW',
    hasNewQuote: false,
  },
  {
    statusId: 'UNQUOTE',
    statusDesc: '报价中',
    userNeed: '机油滤清器,后刹车片,右转向节',
    isSimpleInquiry: false,
    inquiryId: 'B20071804630',
    inquiryDataType: 'HOT',
    engineType: '宝马 535Li 2011  3.0T 手自一体',
    createdName: '向思宇',
    carBrandName: '宝马',
    createdStamp: 1595053644000,
    carModelName: '华晨宝马 535Li',
    carBrandId: 'BMW',
    hasNewQuote: false,
  },
  {
    statusId: 'UNQUOTE',
    statusDesc: '报价中',
    userNeed: '机油滤清器,后刹车片,右转向节',
    isSimpleInquiry: false,
    inquiryId: 'B20071800817',
    inquiryDataType: 'HOT',
    engineType: '宝马 535Li 2011  3.0T 手自一体',
    createdName: '向思宇',
    carBrandName: '宝马',
    createdStamp: 1595053300000,
    carModelName: '华晨宝马 535Li',
    carBrandId: 'BMW',
    hasNewQuote: false,
  },
  {
    statusId: 'ABATE',
    statusDesc: '已过期',
    userNeed: '火花塞',
    isSimpleInquiry: false,
    inquiryId: 'B20071808463',
    inquiryDataType: 'HOT',
    engineType: '奥迪 A8L 2013  3.0TFSI 手自一体 45TFSI Quattro',
    createdName: 'cks',
    carBrandName: '奥迪',
    createdStamp: 1595052365000,
    carModelName: '进口奥迪 Audi A8L qu. 3,0 A8',
    carBrandId: 'AUDI',
    hasNewQuote: false,
  },
  {
    statusId: 'ABATE',
    statusDesc: '已过期',
    userNeed: '空气格,机油格,刹车片',
    isSimpleInquiry: false,
    inquiryId: 'B20071807882',
    inquiryDataType: 'HOT',
    engineType: '路虎 Range Rover [揽胜] 2011 3.6T 手自一体 TDV8',
    createdName: 'linfs1',
    carBrandName: '路虎',
    createdStamp: 1595051936000,
    carModelName: '路虎 揽胜2010年－2012年',
    carBrandId: 'LANDROVER',
    hasNewQuote: false,
  },
  {
    statusId: 'UNQUOTE',
    statusDesc: '报价中',
    userNeed: '机油滤清器,右转向节',
    isSimpleInquiry: false,
    inquiryId: 'B20071805003',
    inquiryDataType: 'HOT',
    engineType: '宝马 535Li 2011  3.0T 手自一体',
    createdName: '向思宇',
    carBrandName: '华晨宝马',
    createdStamp: 1595051694000,
    carModelName: '华晨宝马 535Li',
    carBrandId: 'BMW',
    hasNewQuote: false,
  },
];

const List = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <ListItem data={item} />}
        keyExtractor={(item, index) => index + ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 243, 244, 1)',
  },
});

export default List;
