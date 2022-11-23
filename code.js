let amount = 0;
let months = 0;
let yearPercentage = 0;

let capital = 0;
let monthlyIntrestRate = 0;
let monthlyIntrest = 0;
let monthlyCapital = 0;
let monthlyPayement = 0;

function getUserInfo() {
    amount = parseFloat(document.getElementById('amountInput').value);
    capital = amount;
    months = parseInt(document.getElementById('monthInput').value) * 12;
    yearPercentage = parseFloat(document.getElementById('intrestInput').value);
    calculateMonthlyPayement();

    //console.log('montant: ' + amount + ' Capital: ' + capital + 'months: ' +months+ ' %: ' +yearPercentage);
} 

function calculateMonthlyPayement() {
    monthlyIntrestRate = yearPercentage / 1200;
    monthlyPayement = ((amount * monthlyIntrestRate) / (1 - (Math.pow((1 + monthlyIntrestRate), months * -1))));
    showOverview();
    getDetails();
}

function showOverview() {
    document.getElementById('overview').innerHTML = `
    <p class="m-0">Monthly payment : $ ${monthlyPayement.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</p>
    <p class="m-0">Annual payment : $ ${(monthlyPayement * 12).toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</p>
    <p class="m-0">Total to paid : $ ${(monthlyPayement * months).toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</p>
    <p class="m-0">Total interest to paid : $ ${((monthlyPayement * months) - amount).toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</p>
    `;
}


function getDetails() {
    let information = "";
    let counter = 1

    


    while (counter <= months) {
        let payementdate = new Date;
        payementdate.setMonth(payementdate.getMonth() + (counter));
        let month = payementdate.getMonth() + 1;
        let year = payementdate.getFullYear();
        let displayDate = '';
        if (month < 10) {
            displayDate = `01/0${month}/${year}`;
        } else {
            displayDate = `01/${month}/${year}`;
        }
        monthlyIntrest = (capital * monthlyIntrestRate);
        capital -= (monthlyPayement - monthlyIntrest);

        information += ` 
        <tr>
            <td>${counter++}</td>
            <td>${displayDate}</td>
            <td>$ ${(monthlyPayement - monthlyIntrest).toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
            <td>$ ${monthlyIntrest.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
            <td>${0}</td>
            <td>$ ${capital.toLocaleString('be', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
        </tr>
    `; 
    }

    document.getElementById('details').innerHTML = information;
}

//getUserInfo();