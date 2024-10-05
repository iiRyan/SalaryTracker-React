import React from "react";
import { default as api } from "../store/apiSlice";
import { useParams } from "react-router-dom";

export default function List() {
  const { month } = useParams();

  function checkColor(category) {
    if (category === "needs") return "rgb(54, 162, 235)";
    if (category === "wants") return "rgb(255, 99, 132)";
    if (category === "savings") return "rgb(255, 205, 86)";
  }

  const { data, isFetching, isSuccess, isError } = api.useGetMonthsQuery(month);
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;

  // Handler for delete button click
  const handlerClick = async (e) => {
    if(!e.target.dataset.id) return 0;
    deleteTransaction({ month: month, recordId: e.target.dataset.id }).unwrap();
    
  };

  
  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess && data?.expenses) {
    Transactions = data.expenses.map((expense, index) => (
      <Transaction
        key={index}
        id={expense.id}
        category={expense.category}
        title={expense.title}
        amount={expense.amount}
        checkColor={checkColor}
        handler={handlerClick}
      />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  } else {
    Transactions = <div>No transactions found</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ id, category, title, amount, checkColor, handler }) {
  return (
    <div
      className="item flex justify-center bg-customGray py-2 rounded-r"
      style={{ borderRight: `8px solid ${checkColor(category)}` }}
    >
      <button className="px-3" onClick={handler} data-id={id ?? ""}>
        <box-icon
          name="trash"
          size="17px"
          color={checkColor(category)}
          oonClick={handler}
          data-id={id ?? ""}
        />
      </button>
      <span className="block w-full">{title ?? ""}</span>
      <span className="block w-full">{amount ?? ""}</span>
    </div>
  );
}
