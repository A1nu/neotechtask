function Indexes() {
    this.data = data;
}

Indexes.prototype.getData = function () {
    var url = 'https://api.coindesk.com/v1/bpi/currentprice.json?t=123454';
    var xnr = new XMLHttpRequest();
    xnr.open('GET', url, false);
    xnr.send();
    if (xnr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    } else {
        return xnr.responseText;
    }
};

Indexes.prototype.parsing = function () {
    var input = this.getData();
    this.data = JSON.parse(input);
    return this.data;
};

Indexes.prototype.fillCurrenciesForms = function () {
    this.parsing();
    var bpi = this.data.bpi;
    var keymap = Object.keys(bpi);
    console.log(bpi);
    for (var i = 0; i < keymap.length; i++) {
        var currentRatio = 1 / bpi[keymap[i]].rate_float;
        document.getElementById('currency-name' + i).innerHTML = bpi[keymap[i]].code;
        document.getElementById('currency-state' + i).innerHTML = 'Курс: ' + currentRatio.toFixed(7);
    }
};