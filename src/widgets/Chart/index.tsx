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
    const d = [50, 10, 40, 95, 85];
    return (
      <>
        <BarChart
          style={{ height: 200 }}
          data={d}
          svg={{ fill: '#7b4173' }}
          contentInset={{ top: 30, bottom: 30 }}>
          <Grid />
        </BarChart>
      </>
    );
  }
}
