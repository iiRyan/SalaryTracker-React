import React from "react";
import { getLabels, colors } from "../helper/helper";
import { useParams } from "react-router-dom";
import { default as api } from "../store/apiSlice";


export default function Labels() {
  const { month } = useParams();

  const { data, isFetching, isSuccess, isError } = api.useGetExpensesQuery(month);

  // Add a check to see if `data` exists and has `expenses`
  if (isFetching) {
    return <div>Fetching...</div>;
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }
  if (isSuccess && data) {
    console.log(getLabels(data, "category"));
  }

  return (
    <>
      {data && getLabels(data, "category").map((v, i) => (
          <LabelComponent key={i} data={v} checkColor={colors} />
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
