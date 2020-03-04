function calculate(expr) {
    let arr = expr.split(' ');

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*") {
            arr[i] = Number(arr[i - 1]) * Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
        if (arr[i] === "/") {
            if (arr[i + 1] === '0') throw new TypeError('TypeError: Division by zero.');
            arr[i] = Number(arr[i - 1]) / Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "+") {
            arr[i] = Number(arr[i - 1]) + Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
        if (arr[i] === "-") {
            arr[i] = Number(arr[i - 1]) - Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i -= 1;
        }
    }
    return Number(arr[0]);
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
    let open_brackets = 0, close_brackets = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            open_brackets += 1;
        }
        if (expr[i] == ')') {
            close_brackets += 1;
        }
    }
    if (open_brackets !== close_brackets) {
        throw new Error("ExpressionError: Brackets must be paired.");
    }

    let brackets_expression;

    while (open_brackets > 0) {
        if ((brackets_expression = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null) {
            for (let i = 0; i < brackets_expression.length; i++) {
                let str = brackets_expression[i].replace('(', '').replace(')', '');
                expr = expr.replace(brackets_expression[i], calculate(str));
            }
        }
        open_brackets -= 1;
    }
    return calculate(expr);
}

module.exports = {
    expressionCalculator
}