const firstNumb = document.getElementById("firstnumb")
const secNumb = document.getElementById("secnumb")
const operation = document.getElementById("operation")
const button = document.getElementById("btn")
const result = document.getElementById("result")

let prevResult = null

const resetError = () => {
    firstNumb.style.color = ""
    firstNumb.style.border = "2px dashed red"
    secNumb.style.color = ""
    secNumb.style.border = "2px dashed red"

    const errorMsgs = result.querySelectorAll(".error-msg")
    errorMsgs.forEach(msg => msg.remove())
}

const checkError = (a, b) => {
    let hasError = false;

    if (isNaN(a)) {
        hasError = true;
        firstNumb.style.color = "red"
        firstNumb.style.border = "2px solid red"
    }

    if (isNaN(b)) {
        hasError = true;
        secNumb.style.color = "red"
        secNumb.style.border = "2px solid red"
    }

    if (hasError) {
        result.innerHTML = ""
        const errorMsg = "Введите корректные числа"
        const errorDiv = document.createElement("div")
        errorDiv.textContent = errorMsg
        errorDiv.style.color = "red"
        result.prepend(errorDiv)
        result.style.justifyContent = "center"
    }
    
    return hasError;
}

const showResult = (text) => {
    result.innerHTML = ""

    if (prevResult) {
        result.style.justifyContent = "space-around"
        const prevDiv = document.createElement("div")
        prevDiv.textContent = prevResult
        prevDiv.style.opacity = "0.5"
        prevDiv.style.color = "#000000"
        result.appendChild(prevDiv)
    }
    else{
        result.style.justifyContent = "center"
    }

    const newDiv = document.createElement("div")
    newDiv.textContent = text
    newDiv.style.color = "#000000"
    result.appendChild(newDiv)

    prevResult = text
}

const calculate = () => {
    resetError()

    const fnumb = +(firstNumb.value)
    const snumb = +(secNumb.value)
    const sign = operation.value

    if (checkError(fnumb, snumb)) return;

    let res

    switch(sign) {
        case "+":
            res = fnumb + snumb;
            break
        case "-":
            res = fnumb - snumb;
            break
        case "*":
            res = fnumb * snumb;
            break
        case "/":
            if (snumb === 0) {
                result.innerHTML = ""
                const errorDiv = document.createElement("div");
                errorDiv.textContent = "Нельзя делить на ноль";
                errorDiv.style.color = "red";
                result.prepend(errorDiv);
                secNumb.style.color = "red"
                secNumb.style.border = "2px solid red"
                result.style.justifyContent = "center"
                return;
            }
            res = fnumb / snumb;
            break
        case "%":
            res = (fnumb * snumb)/100;
            break
        case "xⁿ":
            res = fnumb ** snumb;
            break
    }

    const text = `${fnumb}${sign === "xⁿ" ? "**" : sign}${snumb}=${res}`
    showResult(text)
}

button.addEventListener("click", calculate)