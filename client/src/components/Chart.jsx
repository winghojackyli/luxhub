import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  border: solid lightgray 1px;
  -webkit-box-shadow: 0px 0px 15px -10px rgb(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgb(0, 0, 0, 0.75);
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const ChartText = styled.div`
  font-weight: 300;
`;

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        {data.length ? (
          <LineChart data={data}>
            <YAxis dataKey="yaxis" stroke="#3c3c3c" />
            <XAxis dataKey="xaxis" stroke="#3c3c3c" />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#797979"
              dot={false}
            />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        ) : (
          <ChartText>No {title} Data</ChartText>
        )}
      </ResponsiveContainer>
    </Container>
  );
}
