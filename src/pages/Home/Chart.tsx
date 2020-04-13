import React, { PureComponent, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { useTranslation } from '../../strings';
import { Grid } from '@material-ui/core';

export interface IProps {
  data: any;
  metric: any;
  isMobile: boolean;
}


const ChartLine = ({ data, metric, isMobile }: IProps) => {

  const { Strings } = useTranslation();

  const CustomizedDot = (props: any) => {
    const {
      cx, cy, dataKey, payload, value,
    } = props;

    return (<circle cx={cx} cy={cy} r={4} strokeWidth={3} fill={metric.color} />);
  };

  const CustomTooltipContent = (props: any) => {
    const {
      cx, cy, dataKey, payload, value, name
    } = props;

    console.log("custome", payload)

    return (
      <div>
        <p>
          <b>Région : {name}</b>
        </p>
        <p>
          <b>Cas actifs : </b> {value}
        </p>
      </div>
    )

  }

  const text = Strings(metric.label)

  return (
    <Grid container  spacing={0}>
      <ContainerHeader>
        <ContainerTitle>{Strings(metric.titleChart)}</ContainerTitle>
      </ContainerHeader>
      <ResponsiveContainer width={!isMobile ? '90%' : '99%'} height={!isMobile ? 353 : 260} aspect={!isMobile ? 2 : 1.5}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Line type="monotone" style={{ strokeWidth: "3px" }} name={text} dataKey={metric.id} stroke={metric.color} dot={<CustomizedDot />} />
          <XAxis dataKey="date" stroke={'#eee'} />
          <YAxis stroke={'#eee'} />
          <Tooltip
            labelStyle={{ color: "#756e6e" }}
            itemStyle={{ color: metric.color }}
            labelFormatter={function (value) {
              return <DateHeader>{value}</DateHeader> ;
            }}
            formatter={function (value, name) {
              return <b>{value}</b>;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Grid>
  );
}

const ContainerHeader = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const ContainerTitle = styled.div`
  justify-content: center;
  display: flex;
  color: #eee;
`;
const DateHeader = styled.div`
  text-align: center;
  font-weight: 600;
`;
export default ChartLine;
