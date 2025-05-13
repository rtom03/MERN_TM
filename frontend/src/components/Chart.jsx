import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartData } from "../utils/dummydata";

export const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <BarChart width={150} height={40} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis dataKey="total" />
        <Tooltip
          cursor={false}
          contentStyle={{ textTransform: "capitalize" }}
        />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
