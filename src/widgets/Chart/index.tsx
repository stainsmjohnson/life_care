import { View } from 'native-base';
import React from 'react';
import {
  BarChart,
  Grid,
  StackedBarChart,
  XAxis,
  YAxis,
} from 'react-native-svg-charts';

export default class StackedBarChartExample extends React.PureComponent {
  render() {
    const d = [18, 16, 17, 18];
    const dDates = ['30/06', '01/07', '02/07', '03/07'];
    return (
      <View flexDirection={'row'} flex={1}>
        <YAxis
          data={d}
          contentInset={{
            top: 20,
            bottom: 20,
          }}
          svg={{
            fill: 'grey',
            fontSize: 12,
          }}
          numberOfTicks={5}
          formatLabel={value => `${value}`}
        />
        <View flex={1}>
          <BarChart
            style={{ height: 200 }}
            data={d}
            svg={{ fill: '#155e75' }}
            numberOfTicks={0}
            contentInset={{ top: 30, bottom: 30 }}>
            <Grid />
          </BarChart>
          <XAxis
            data={d}
            svg={{
              fill: 'grey',
              fontSize: 15,
            }}
            style={{
              marginTop: 10,
            }}
            contentInset={{
              left: 35,
              right: 35,
            }}
            formatLabel={(value, index) => `${dDates[index]}`}
          />
        </View>
      </View>
    );
  }
}
