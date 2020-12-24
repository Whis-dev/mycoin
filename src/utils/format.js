// https://mizzo-dev.tistory.com/entry/JavaScript%EC%A0%95%EA%B7%9C%EC%8B%9D-%EC%88%AB%EC%9E%90%EC%97%90-1000%EB%8B%A8%EC%9C%84%EB%A1%9C-%EC%BD%A4%EB%A7%88%EC%89%BC%ED%91%9C-%EA%B5%AC%EB%B6%84%EC%9E%90-%EB%84%A3%EA%B8%B0

export const generateCurrency = (number, currency) => {
    const commaToNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return currency + commaToNumber ;
}

export const percentage = (number) => {
    const percentageNumber = +(number * 100).toFixed(1);
    const isPositive = percentageNumber > 0;
    return <span style={{color: `${isPositive ? 'red' : 'blue'}`}}>{percentageNumber}%</span>;
}