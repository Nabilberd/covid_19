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

    if (value > 100 && dataKey === "Nouveauxcaspositifs") {
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 1024 1024">
          <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
        </svg>
      );
    }
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
      <ResponsiveContainer width={!isMobile ? '90%' : '99%'} height={!isMobile ? 364 : 260} aspect={!isMobile ? 2 : 1.5}>
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
