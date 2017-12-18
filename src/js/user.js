function UserData() {
    this.data = data;
    this.userName = userName;
    this.account = account;
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
    return this.data;
};

UserData.prototype.fillUserForm = function () {
    var data = this.parsing();
    document.getElementById('name').innerHTML = this.data['username'];
    document.getElementById('account').innerHTML = "Счет: #" + this.data['account'];
    document.getElementById('cash').innerHTML = this.data['available_cash'];
};
