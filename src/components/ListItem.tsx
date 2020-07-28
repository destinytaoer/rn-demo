import React, {useMemo} from 'react';
import dayjs from 'dayjs';
import {
  Text,
  StyleSheet,
  View,
  Image,
  // Button,
  TouchableHighlight,
} from 'react-native';
import {getRealSize as S} from '../utils/utils';
import Icon from '../utils/setIcon';
import {useNavigation} from '@react-navigation/native';

interface Props {
  data: Data;
}
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

const ListItem = ({data}: Props) => {
  const navigation = useNavigation();
  const {
    statusId,
    statusDesc,
    userNeed,
    // isSimpleInquiry,
    inquiryId,
    // inquiryDataType,
    // engineType,
    createdName,
    // carBrandName,
    createdStamp,
    carModelName,
    carBrandId,
    // hasNewQuote,
    isVINErr,
    VINErrMsg,
  } = data;
  const imgUri = useMemo(
    () =>
      `https://parts-images.oss-cn-shenzhen.aliyuncs.com/brand_logo/${carBrandId}.png`,
    [carBrandId],
  );

  return (
    <TouchableHighlight
      underlayColor="none"
      onPress={() => navigation.navigate('Detail', {id: 101})}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.brand} source={{uri: imgUri}} />
          <Text style={styles.title}>{carModelName}</Text>
          <Text style={[styles.status, styles[statusId]]}>{statusDesc}</Text>
        </View>
        <View style={styles.content}>
          <Text
            style={[
              styles.userNeed,
              statusId === 'ABATE' ? styles.grey : null,
            ]}>
            {userNeed.split(',').join('、')}
          </Text>
          <View style={styles.createInfo}>
            <Text
              style={[
                styles.createdName,
                statusId === 'ABATE' ? styles.grey : null,
              ]}>
              {createdName}
            </Text>
            <Text style={styles.inquiryId}>{`（${inquiryId}）`}</Text>
            <Text style={styles.createTime}>
              {dayjs(createdStamp).format('HH:mm')}
            </Text>
          </View>
        </View>
        {isVINErr && (
          <View style={styles.footer}>
            <Icon style={styles.warnIcon} name="warningo" size={S(24)} />
            <Text style={styles.errMsg}>{VINErrMsg}</Text>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('Detail', {id: 1});
              }}
              underlayColor="#fff">
              <View style={styles.checkWrap}>
                <Text style={styles.check}>去查看</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: S(20),
    paddingBottom: S(18),
    marginHorizontal: S(20),
    marginTop: S(20),
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: S(18),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: S(12),
    marginBottom: S(28),
    borderBottomWidth: S(1),
    borderBottomColor: 'rgba(232,232,232,1)',
  },
  brand: {
    width: S(52),
    height: S(52),
    marginRight: S(24),
  },
  title: {
    fontSize: S(26),
    color: '#222222',
  },
  status: {
    marginLeft: 'auto',
  },
  content: {
    paddingLeft: S(8),
  },
  userNeed: {
    fontSize: S(28),
    color: '#222',
  },
  createInfo: {
    flexDirection: 'row',
    marginBottom: S(10),
    marginTop: S(32),
  },
  createdName: {
    fontSize: S(24),
    color: '#222',
  },
  inquiryId: {fontSize: S(24), color: '#C8C8C8'},
  createTime: {
    fontSize: S(24),
    color: '#C8C8C8',
    marginLeft: 'auto',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: S(8),
    paddingTop: S(8),
  },
  warnIcon: {
    alignSelf: 'flex-start',
    paddingTop: S(4),
    marginRight: S(8),
    // width: S(24),
    // height: S(24),
    color: '#F96A0E',
  },
  errMsg: {
    flex: 1,
    fontSize: S(24),
    color: '#F96A0E',
  },
  checkWrap: {
    width: S(100),
    height: S(54),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: S(20),
    borderRadius: S(27),
    borderWidth: S(1),
    borderColor: '#F96A0E',
    backgroundColor: '#fff',
  },
  check: {
    fontSize: S(24),
    color: '#F96A0E',
  },
  grey: {
    color: '#999999',
  },
  QUOTE: {
    color: '#F42C2C',
  },
  UNQUOTE: {
    color: '#F96A0E',
  },
  ABATE: {
    color: '#C8C8C8',
  },
});

export default ListItem;
