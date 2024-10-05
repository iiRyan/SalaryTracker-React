import React from "react";
import { getLabels } from "../helper/helper";
import { useParams } from "react-router-dom";
import { default as api } from "../store/apiSlice";

export default function Labels() {
  const { month } = useParams();

  const { data, isFetching, isSuccess, isError } = api.useGetMonthsQuery(month);

  function checkColor(category) {
    if (category === "needs") return "rgb(54, 162, 235)";
    if (category === "wants") return "rgb(255, 99, 132)";
    if (category === "savings") return "rgb(255, 205, 86)";
    return "#f9c74f"; // default color
  }

  // Add a check to see if `data` exists and has `expenses`
  if (isFetching) {
    return <div>Fetching...</div>;
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }
  if (isSuccess && data?.expenses) {
    console.log(getLabels(data.expenses, "category"));
  }

  return (
    <>
      {data?.expenses && getLabels(data.expenses, "category").map((v, i) => (
          <LabelComponent key={i} data={v} checkColor={checkColor} />
        ))}
    </>
  );
}

function LabelComponent({ data, checkColor }) {
  if (!data) return <></>;
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: `${checkColor(data.category)}` }}
        ></div>
        <h3 className="text-md">{data.category ?? ""}</h3>
      </div>
      <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}
