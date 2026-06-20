const currencies = {
    EUR: "Euro",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    GBP: "British Pound",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    USD: "United States Dollar",
    ZAR: "South African Rand"
};

const firstSelect = document.getElementById("EnterCurrency");
const secondSelect = document.getElementById("ResultsCurrency");
const convertButton = document.getElementById("convBtn");

function getOption(data) {
    return Object.entries(data)
        .map(([code, name]) => `<option value="${code}">${code} | ${name}</option>`)
        .join("");
}

// insert currencies into dropdowns
firstSelect.innerHTML = getOption(currencies);
secondSelect.innerHTML = getOption(currencies);

convertButton.addEventListener("click", fetchCurrencies);

function fetchCurrencies() {
    const baseCur = firstSelect.value;
    const targetCur = secondSelect.value;
    const amount = parseFloat(document.getElementById("conv").value);

    if (isNaN(amount)) {
        alert("Please enter a valid number!");
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCur}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[targetCur];
            const result = amount * rate;

            document.getElementById("result").style.display = "block";
            document.getElementById("resultEnter").textContent =
               ` ${amount} ${baseCur} =`
            document.getElementById("resultExit").textContent =
                `${result.toFixed(2)} ${targetCur}`;
        });
}