import _ from "lodash";

export function getSum(transaction, category){
    let sum = _(transaction)
                      .groupBy("category")
                      .map((objs, key) => {
                        if(!category) return _.sumBy(objs, 'amount'); // [needs, savings,wants]
                        return {
                            'category' : key,
                            'total' : _.sumBy(objs, 'amount')
                        }
                      })
                      .value()
    return sum;
}
export function chart_Data(transaction, custom) {
    let bg = transaction.map((trans) => colors(trans.category)); // Extract category and map to colors
  
    let dataValue = getSum(transaction);
    console.log(bg);
  
    const config = {
      data: {
        datasets: [
          {
            data: dataValue,
            backgroundColor: bg, // Use the background colors based on categories
            hoverOffset: 4,
            borderRadius: 30,
            spacing: 10,
          },
        ],
      },
      options: {
        cutout: 115,
      },
    };
  
    return custom ?? config;
  }
  
  export function colors(category, amount) {
    // Use varying shades depending on the amount
    if (category === "needs") return amount > 1000 ? "#1E3A8A" : "rgba(54, 162, 235, 0.8)"; // Darker Blue for high expenses
    if (category === "wants") return amount > 1000 ? "#B91C1C" : "rgba(255, 99, 132, 0.8)";  // Darker Red for high expenses
    if (category === "savings") return amount > 1000 ? "#D97706" : "rgba(255, 205, 86, 0.8)"; // Darker Yellow for high savings
    return "#f9c74f"; // Default color
  }
  
export function getLabels(transaction) {
  let amountSum = getSum(transaction, "category");
  let Total = _.sum(getSum(transaction));
    
  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

export function getTotal(transaction){
    return _.sum(getSum(transaction))
}

export function getLeft(income,totalExpenses){
    return income - totalExpenses;
}

export function capitalizeFirstLetter (string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };