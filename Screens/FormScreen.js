import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Layout,
  Text,
  Icon,
  Input,
  Datepicker,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Divider,
} from '@ui-kitten/components';
import layanan from '../assets/data/Layanan';
import CardInfo from '../components/CardInfo';

const FormScreen = ({route, navigation}) => {
  // props from navigation
  const {id, token} = route.params;

  const [data, setData] = useState(layanan[id].fill);
  const [caption, setCaption] = useState(layanan[id].fill);
  const [scrollNav, setScrollNav] = useState(false);

  //  NAVIGATION STATE
  const navigateStep = i => {
    navigation.navigate('Step', {id: i});
  };

  const navigateUpload = i => {
    var check = 0;

    Object.keys(layanan[id].fill).map((item, i) => {
      if (data[item]) {
        setCaption(prevState => ({
          ...prevState,
          [item]: '',
        }));
        check += 1;
      } else {
        setCaption(prevState => ({
          ...prevState,
          [item]: 'Harus diisi.',
        }));
      }
    });
    console.log(data);
    console.log(check);
    console.log(Object.keys(layanan[id].fill).length);

    if (check === Object.keys(layanan[id].fill).length) {
      navigation.navigate('Upload', {id: i, data: data, token: token});
    }
  };

  // SELECT
  var indexSelect = 0;
  const [selectedIndex, setSelectedIndex] = useState([
    new IndexPath(0),
    new IndexPath(0),
    new IndexPath(0),
    new IndexPath(0),
    new IndexPath(0),
  ]);

  const inputSelect = (label, value, option, i, fill, j) => {
    return (
      <View style={styles.containerInput} key={j}>
        <Text style={styles.label}>{label}</Text>
        <Select
          key={j}
          placeholder={value}
          value={option[selectedIndex[i - 1].row]}
          selectedIndex={selectedIndex[i - 1]}
          size="large"
          onSelect={index => {
            console.log(index);
            var arr = [...selectedIndex];
            arr[i - 1] = index;
            setSelectedIndex(arr);
            setData(prevState => ({
              ...prevState,
              [fill]: {
                [fill]: option[index.row],
                index: index,
              },
            }));
          }}>
          {option.map(data => (
            <SelectItem title={data} />
          ))}
        </Select>
      </View>
    );
  };

  var indexDate = 0;
  const [date, setDate] = useState([new Date(), new Date(), new Date()]);

  const inputDate = (label, value, fill, i, j) => {
    // icon calendar
    const CalendarIcon = props => <Icon {...props} name="calendar" />;
    const now = new Date();
    const min = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 39999,
    );
    return (
      <View style={styles.containerInput} key={j}>
        <Text style={styles.label}>{label}</Text>
        <Datepicker
          placeholder={value}
          size="large"
          caption={caption[fill]}
          date={date[i - 1]}
          min={min}
          onSelect={nextDate => {
            // format date
            // function formatDate(date) {
            //   var d = new Date(date),
            //     month = '' + (d.getMonth() + 1),
            //     day = '' + d.getDate(),
            //     year = d.getFullYear();

            //   if (month.length < 2) month = '0' + month;
            //   if (day.length < 2) day = '0' + day;

            //   return [year, month, day].join('-');
            // }
            var arr = [...date];
            arr[i - 1] = nextDate;
            setDate(arr);
            setData(prevState => ({
              ...prevState,
              [fill]: nextDate,
            }));
          }}
          accessoryRight={CalendarIcon}
        />
      </View>
    );
  };

  // input Disable
  const inputDisabled = (label, value, i) => (
    <View style={styles.containerInput} key={i}>
      <Text style={styles.label}>{label}</Text>
      <Input key={i} placeholder={value} size="large" disabled={true} />
    </View>
  );

  const input = (label, value, fill, i) => (
    <View style={styles.containerInput} key={i}>
      <Text style={styles.label}>{label}</Text>
      <Input
        key={i}
        placeholder={value}
        size="large"
        style={caption[fill] ? {borderColor: '#FF4235', borderWidth: 1.5} : {}}
        caption={caption[fill]}
        onChangeText={text =>
          setData(prevState => ({
            ...prevState,
            [fill]: text,
          }))
        }
      />
    </View>
  );

  const inputNumber = (label, value, fill, i) => (
    <View style={styles.containerInput} key={i}>
      <Text style={styles.label}>{label}</Text>
      <Input
        key={i}
        placeholder={value}
        size="large"
        style={caption[fill] ? {borderColor: '#FF4235', borderWidth: 1.5} : {}}
        caption={caption[fill]}
        keyboardType="number-pad"
        onChangeText={text =>
          setData(prevState => ({
            ...prevState,
            [fill]: text,
          }))
        }
      />
    </View>
  );

  const inputArea = (label, value, fill, i) => (
    <View style={styles.containerInput} key={i}>
      <Text style={styles.label}>{label}</Text>
      <Input
        key={i}
        multiline={true}
        placeholder={value}
        size="large"
        style={caption[fill] ? {borderColor: '#FF4235', borderWidth: 1.5} : {}}
        caption={caption[fill]}
        onChangeText={text =>
          setData(prevState => ({
            ...prevState,
            [fill]: text,
          }))
        }
      />
    </View>
  );

  return (
    <Layout style={styles.container}>
      <View style={styles.gradient}>
        <View
          style={[
            scrollNav ? styles.containerHeaderScroll : styles.containerHeader,
            {justifyContent: 'space-between'},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Icon
              fill="#292929"
              name="arrow-back"
              style={styles.iconBack}
              onPress={() => navigation.goBack()}
            />
            <Text category="h6" style={styles.title}>
              {layanan[id].jenisLayanan}
            </Text>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.circleOn} />
            <View style={styles.line} />
            <View style={styles.circleOff} />
            <View style={styles.line} />
            <View style={styles.circleOff} />
          </View>
        </View>
      </View>
      <ScrollView
        style={{zIndex: -1, paddingVertical: '4%'}}
        showsVerticalScrollIndicator={false}
        // detect Scroll
        onScroll={event => {
          if (event.nativeEvent.contentOffset.y <= 0) {
            setScrollNav(false);
          } else {
            setScrollNav(true);
          }
        }}>
        {/* Info */}
        <View style={styles.containerCardInfo}>
          <View style={styles.containerHeaderMenu}>
            <Text style={styles.title} category="h6">
              Prosedur & Persyaratan
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.cardInfo}>
            <CardInfo
              idLayanan={id}
              title={layanan[id].jenisLayanan}
              detail={layanan[id].informasi.detail}
              navigate={navigateStep}
            />
          </View>
        </View>
        {/* Card Informasi*/}
        <View style={styles.containerForm}>
          <View style={styles.containerHeaderMenu}>
            <Text style={styles.title} category="h6">
              Formulir Pengajuan
            </Text>
          </View>
          {/* input */}
          <Divider style={styles.divider} />
          {layanan[id].form.map((data, i) => {
            if (data.type === 'disabled') {
              return inputDisabled(data.label, data.value, data.fill, i);
            } else if (data.type === 'input') {
              return input(data.label, data.value, data.fill, i);
            } else if (data.type === 'inputNumber') {
              return inputNumber(data.label, data.value, data.fill, i);
            } else if (data.type === 'inputArea') {
              return inputArea(data.label, data.value, data.fill, i);
            } else if (data.type === 'date') {
              indexDate += 1;
              return inputDate(data.label, data.value, data.fill, indexDate, i);
            } else if (data.type === 'select') {
              indexSelect += 1;
              return inputSelect(
                data.label,
                data.label,
                data.value,
                indexSelect,
                data.fill,
                i,
              );
            }
          })}
        </View>
        <Button
          style={styles.button}
          size="large"
          onPress={() => navigateUpload(id)}>
          Selanjutnya
        </Button>
      </ScrollView>
    </Layout>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
  },
  containerHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  containerHeaderScroll: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: '9%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 8,
    alignItems: 'center',
  },
  iconBack: {
    marginRight: 8,
    width: 28,
    height: 28,
  },
  containerCardInfo: {
    marginTop: '20%',
    borderRadius: 8,
  },
  iconAttention: {
    width: 21,
    height: 21,
  },
  containerInfo: {
    flexDirection: 'row',
  },
  infoTitle: {
    fontWeight: '700',
    marginLeft: 6,
    color: '#4A4A4A',
  },
  infoDetail: {
    marginTop: 2,
    paddingHorizontal: 4,
    fontSize: 13,
    color: '#4a4a4a',
    lineHeight: 17,
    letterSpacing: 0.5,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    height: '50%',
    width: '120%',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerForm: {
    marginTop: 24,
  },
  containerStep: {
    marginTop: 16,
    marginBottom: '15%',
  },
  input: {
    borderWidth: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#2E3A59',
    marginBottom: 4,
    fontSize: 14,
  },
  containerHeaderMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardInfo: {
    paddingHorizontal: 4,
  },
  containerInput: {
    marginBottom: 14,
  },
  button: {
    marginTop: 14,
    marginBottom: '10%',
  },
  divider: {
    marginBottom: 14,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    zIndex: 20,
  },
  circleOn: {
    width: 16,
    height: 16,
    backgroundColor: '#6690FF',
    borderRadius: 25,
  },
  circleOff: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#6690FF',
    borderRadius: 25,
  },
  line: {
    height: 2,
    width: 14,
    backgroundColor: '#6690FF',
  },
});
