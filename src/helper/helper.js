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

export function chart_Data(transaction, custom){

    let bg = _.map(colors(), a => a.color)
    
    let dataValue = getSum(transaction)
    console.log(colors())

    const config = {
        data : {
          datasets: [{
              data: dataValue,
              backgroundColor: colors(),
              hoverOffset: 4,
              borderRadius : 30,
              spacing: 10
            }]
        },
        options : {
            cutout: 115
        }
    }

    return custom ?? config;

}
export function colors() {
  let backgroundColor = [
    "rgb(54, 162, 235)",// Blue
    "rgb(255, 99, 132)",// Red
    "rgb(255, 205, 86)",// Yellow 
    
  ];
  return backgroundColor;
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