function UserData() {
    this.data = data;
    this.availableCash = availableCash;
};

UserData.prototype.getData = function () {
    var row = {
        "username": "Иннокентий Ф.",
        "account": 62946480,
        "available_cash": 120
    };
    return JSON.stringify(row);
};

UserData.prototype.parsing = function () {
    var input = this.getData();
    this.data = JSON.parse(input);
    this.availableCash = this.data['available_cash'];
    return [this.data, this.availableCash];
};

UserData.prototype.fillUserForm = function () {
    this.parsing();
    document.getElementById('name').innerHTML = this.data['username'];
    document.getElementById('account').innerHTML = "Счет: #" + this.data['account'];
    document.getElementById('cash').innerHTML = this.data['available_cash'].toFixed(7);
};

UserData.prototype.cash = function () {
    return this.availableCash;
};

UserData.prototype.updateCash = function (diff) {
    this.availableCash += diff;
    document.getElementById('cash').innerHTML = this.availableCash.toFixed(7);
};