// Set the current year for copyright
document.getElementById("year").textContent = new Date().getFullYear()

// Calculator functionality
let currentOperand = "0"
let previousOperand = ""
let operation = undefined
let shouldResetScreen = false

const currentOperandElement = document.getElementById("current-operand")
const previousOperandElement = document.getElementById("previous-operand")

function updateDisplay() {
  currentOperandElement.textContent = currentOperand

  if (operation != null) {
    previousOperandElement.textContent = `${previousOperand} ${operation}`
  } else {
    previousOperandElement.textContent = previousOperand
  }
}

function appendNumber(number) {
  if (currentOperand === "0" || shouldResetScreen) {
    currentOperand = number
    shouldResetScreen = false
  } else if (number === "." && currentOperand.includes(".")) {
    return
  } else {
    currentOperand += number
  }
  updateDisplay()
}

function appendOperator(operator) {
  if (currentOperand === "") return

  if (previousOperand !== "") {
    calculate()
  }

  operation = operator
  previousOperand = currentOperand
  currentOperand = ""
  updateDisplay()
}

function calculate() {
  let computation
  const prev = Number.parseFloat(previousOperand)
  const current = Number.parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return

  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "×":
      computation = prev * current
      break
    case "÷":
      if (current === 0) {
        clearAll()
        currentOperand = "Error"
        updateDisplay()
        return
      }
      computation = prev / current
      break
    default:
      return
  }

  // Format the result to avoid extremely long decimals
  currentOperand = computation.toString()
  if (currentOperand.includes(".")) {
    const parts = currentOperand.split(".")
    if (parts[1].length > 10) {
      currentOperand = computation.toFixed(10).replace(/\.?0+$/, "")
    }
  }

  operation = undefined
  previousOperand = ""
  shouldResetScreen = true
  updateDisplay()
}

function clearAll() {
  currentOperand = "0"
  previousOperand = ""
  operation = undefined
  updateDisplay()
}

function deleteNumber() {
  if (currentOperand === "0" || shouldResetScreen) return

  if (currentOperand.length === 1) {
    currentOperand = "0"
  } else {
    currentOperand = currentOperand.slice(0, -1)
  }
  updateDisplay()
}

// Initialize display
updateDisplay()

// Add keyboard support
document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    appendNumber(event.key)
  } else if (event.key === ".") {
    appendNumber(".")
  } else if (event.key === "+") {
    appendOperator("+")
  } else if (event.key === "-") {
    appendOperator("-")
  } else if (event.key === "*") {
    appendOperator("×")
  } else if (event.key === "/") {
    event.preventDefault() // Prevent browser's find functionality
    appendOperator("÷")
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault()
    calculate()
  } else if (event.key === "Backspace") {
    deleteNumber()
  } else if (event.key === "Escape") {
    clearAll()
  }
})

// Theme toggle functionality
function toggleTheme() {
  document.body.classList.toggle("light-theme")

  // Save theme preference
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light")
  } else {
    localStorage.setItem("theme", "dark")
  }
}

// Check for saved theme preference
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme")
  }

  // Initialize currency converter
  convertCurrency()
})

// Currency converter functionality
const exchangeRates = {
  USD: {
    EUR: 0.92,
    GBP: 0.79,
    JPY: 154.35,
    SAR: 3.75,
    AED: 3.67,
    EGP: 48.5,
    KWD: 0.31,
    QAR: 3.64,
    BHD: 0.38,
    OMR: 0.38,
    JOD: 0.71,
    LBP: 90000,
    TRY: 32.15,
    CAD: 1.37,
    AUD: 1.52,
    CHF: 0.9,
    CNY: 7.24,
  },
  EUR: {
    USD: 1.09,
    GBP: 0.86,
    JPY: 167.73,
    SAR: 4.08,
    AED: 3.99,
    EGP: 52.73,
    KWD: 0.33,
    QAR: 3.96,
    BHD: 0.41,
    OMR: 0.42,
    JOD: 0.77,
    LBP: 97875,
    TRY: 34.95,
    CAD: 1.49,
    AUD: 1.65,
    CHF: 0.98,
    CNY: 7.87,
  },
  GBP: {
    USD: 1.27,
    EUR: 1.17,
    JPY: 195.63,
    SAR: 4.76,
    AED: 4.66,
    EGP: 61.52,
    KWD: 0.39,
    QAR: 4.62,
    BHD: 0.48,
    OMR: 0.49,
    JOD: 0.9,
    LBP: 114210,
    TRY: 40.78,
    CAD: 1.74,
    AUD: 1.93,
    CHF: 1.14,
    CNY: 9.18,
  },
  JPY: {
    USD: 0.0065,
    EUR: 0.006,
    GBP: 0.0051,
    SAR: 0.024,
    AED: 0.024,
    EGP: 0.31,
    KWD: 0.002,
    QAR: 0.024,
    BHD: 0.0024,
    OMR: 0.0025,
    JOD: 0.0046,
    LBP: 0.58,
    TRY: 0.21,
    CAD: 0.0089,
    AUD: 0.0099,
    CHF: 0.0058,
    CNY: 0.047,
  },
  SAR: {
    USD: 0.27,
    EUR: 0.25,
    GBP: 0.21,
    JPY: 41.16,
    AED: 0.98,
    EGP: 12.93,
    KWD: 0.082,
    QAR: 0.97,
    BHD: 0.1,
    OMR: 0.1,
    JOD: 0.19,
    LBP: 24000,
    TRY: 8.57,
    CAD: 0.37,
    AUD: 0.41,
    CHF: 0.24,
    CNY: 1.93,
  },
  AED: {
    USD: 0.27,
    EUR: 0.25,
    GBP: 0.21,
    JPY: 42.06,
    SAR: 1.02,
    EGP: 13.22,
    KWD: 0.084,
    QAR: 0.99,
    BHD: 0.1,
    OMR: 0.1,
    JOD: 0.19,
    LBP: 24523,
    TRY: 8.76,
    CAD: 0.37,
    AUD: 0.41,
    CHF: 0.25,
    CNY: 1.97,
  },
  EGP: {
    USD: 0.021,
    EUR: 0.019,
    GBP: 0.016,
    JPY: 3.18,
    SAR: 0.077,
    AED: 0.076,
    KWD: 0.0064,
    QAR: 0.075,
    BHD: 0.0078,
    OMR: 0.0079,
    JOD: 0.015,
    LBP: 1856,
    TRY: 0.66,
    CAD: 0.028,
    AUD: 0.031,
    CHF: 0.019,
    CNY: 0.15,
  },
  KWD: {
    USD: 3.26,
    EUR: 3.0,
    GBP: 2.57,
    JPY: 503.18,
    SAR: 12.23,
    AED: 11.97,
    EGP: 158.11,
    QAR: 11.88,
    BHD: 1.23,
    OMR: 1.25,
    JOD: 2.31,
    LBP: 293478,
    TRY: 104.79,
    CAD: 4.47,
    AUD: 4.95,
    CHF: 2.93,
    CNY: 23.6,
  },
  QAR: {
    USD: 0.27,
    EUR: 0.25,
    GBP: 0.22,
    JPY: 42.4,
    SAR: 1.03,
    AED: 1.01,
    EGP: 13.32,
    KWD: 0.084,
    BHD: 0.1,
    OMR: 0.11,
    JOD: 0.2,
    LBP: 24725,
    TRY: 8.83,
    CAD: 0.38,
    AUD: 0.42,
    CHF: 0.25,
    CNY: 1.99,
  },
  BHD: {
    USD: 2.65,
    EUR: 2.44,
    GBP: 2.09,
    JPY: 409.52,
    SAR: 9.95,
    AED: 9.74,
    EGP: 128.65,
    KWD: 0.81,
    QAR: 9.66,
    OMR: 1.02,
    JOD: 1.88,
    LBP: 238806,
    TRY: 85.27,
    CAD: 3.64,
    AUD: 4.03,
    CHF: 2.39,
    CNY: 19.2,
  },
  OMR: {
    USD: 2.6,
    EUR: 2.39,
    GBP: 2.05,
    JPY: 401.17,
    SAR: 9.75,
    AED: 9.54,
    EGP: 126.04,
    KWD: 0.8,
    QAR: 9.47,
    BHD: 0.98,
    JOD: 1.84,
    LBP: 234000,
    TRY: 83.55,
    CAD: 3.56,
    AUD: 3.95,
    CHF: 2.34,
    CNY: 18.81,
  },
  JOD: {
    USD: 1.41,
    EUR: 1.3,
    GBP: 1.11,
    JPY: 217.39,
    SAR: 5.28,
    AED: 5.17,
    EGP: 68.31,
    KWD: 0.43,
    QAR: 5.13,
    BHD: 0.53,
    OMR: 0.54,
    LBP: 126761,
    TRY: 45.28,
    CAD: 1.93,
    AUD: 2.14,
    CHF: 1.27,
    CNY: 10.2,
  },
  LBP: {
    USD: 0.000011,
    EUR: 0.00001,
    GBP: 0.0000088,
    JPY: 0.0017,
    SAR: 0.000042,
    AED: 0.000041,
    EGP: 0.00054,
    KWD: 0.0000034,
    QAR: 0.00004,
    BHD: 0.0000042,
    OMR: 0.0000043,
    JOD: 0.0000079,
    TRY: 0.00036,
    CAD: 0.000015,
    AUD: 0.000017,
    CHF: 0.00001,
    CNY: 0.00008,
  },
  TRY: {
    USD: 0.031,
    EUR: 0.029,
    GBP: 0.025,
    JPY: 4.8,
    SAR: 0.12,
    AED: 0.11,
    EGP: 1.51,
    KWD: 0.0095,
    QAR: 0.11,
    BHD: 0.012,
    OMR: 0.012,
    JOD: 0.022,
    LBP: 2800,
    CAD: 0.043,
    AUD: 0.047,
    CHF: 0.028,
    CNY: 0.23,
  },
  CAD: {
    USD: 0.73,
    EUR: 0.67,
    GBP: 0.58,
    JPY: 112.66,
    SAR: 2.74,
    AED: 2.68,
    EGP: 35.4,
    KWD: 0.22,
    QAR: 2.66,
    BHD: 0.27,
    OMR: 0.28,
    JOD: 0.52,
    LBP: 65693,
    TRY: 23.47,
    AUD: 1.11,
    CHF: 0.66,
    CNY: 5.28,
  },
  AUD: {
    USD: 0.66,
    EUR: 0.61,
    GBP: 0.52,
    JPY: 101.55,
    SAR: 2.47,
    AED: 2.42,
    EGP: 31.91,
    KWD: 0.2,
    QAR: 2.4,
    BHD: 0.25,
    OMR: 0.25,
    JOD: 0.47,
    LBP: 59211,
    TRY: 21.15,
    CAD: 0.9,
    CHF: 0.59,
    CNY: 4.76,
  },
  CHF: {
    USD: 1.11,
    EUR: 1.02,
    GBP: 0.88,
    JPY: 171.5,
    SAR: 4.17,
    AED: 4.08,
    EGP: 53.89,
    KWD: 0.34,
    QAR: 4.04,
    BHD: 0.42,
    OMR: 0.43,
    JOD: 0.79,
    LBP: 100000,
    TRY: 35.72,
    CAD: 1.52,
    AUD: 1.69,
    CNY: 8.04,
  },
  CNY: {
    USD: 0.14,
    EUR: 0.13,
    GBP: 0.11,
    JPY: 21.32,
    SAR: 0.52,
    AED: 0.51,
    EGP: 6.7,
    KWD: 0.042,
    QAR: 0.5,
    BHD: 0.052,
    OMR: 0.053,
    JOD: 0.098,
    LBP: 12431,
    TRY: 4.44,
    CAD: 0.19,
    AUD: 0.21,
    CHF: 0.12,
  },
}

function convertCurrency() {
  const amount = Number.parseFloat(document.getElementById("amount").value)
  const fromCurrency = document.getElementById("from-currency").value
  const toCurrency = document.getElementById("to-currency").value

  if (isNaN(amount)) {
    document.getElementById("result").value = "أدخل رقماً صحيحاً"
    return
  }

  let result

  if (fromCurrency === toCurrency) {
    result = amount
  } else if (fromCurrency === "USD" && toCurrency in exchangeRates["USD"]) {
    result = amount * exchangeRates["USD"][toCurrency]
  } else if (toCurrency === "USD" && fromCurrency in exchangeRates) {
    result = amount / exchangeRates[fromCurrency]["USD"]
  } else if (fromCurrency in exchangeRates && toCurrency in exchangeRates[fromCurrency]) {
    result = amount * exchangeRates[fromCurrency][toCurrency]
  } else {
    // Convert to USD first, then to target currency
    const toUSD = fromCurrency === "USD" ? amount : amount / exchangeRates[fromCurrency]["USD"]
    result = toCurrency === "USD" ? toUSD : toUSD * exchangeRates["USD"][toCurrency]
  }

  // Format the result to avoid extremely long decimals
  if (result < 0.01) {
    document.getElementById("result").value = result.toFixed(6)
  } else if (result < 1) {
    document.getElementById("result").value = result.toFixed(4)
  } else {
    document.getElementById("result").value = result.toFixed(2)
  }
}

function swapCurrencies() {
  const fromCurrency = document.getElementById("from-currency")
  const toCurrency = document.getElementById("to-currency")
  const temp = fromCurrency.value

  fromCurrency.value = toCurrency.value
  toCurrency.value = temp

  convertCurrency()
}

// Add event listeners for currency converter
document.getElementById("amount").addEventListener("input", convertCurrency)
document.getElementById("from-currency").addEventListener("change", convertCurrency)
document.getElementById("to-currency").addEventListener("change", convertCurrency)
