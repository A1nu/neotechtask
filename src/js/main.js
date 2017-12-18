window.onload = function () {
    Indexes.prototype.fillCurrenciesForms();
    UserData.prototype.fillUserForm();
};

$('#confirm-button').on('click', function (e) {
    AcceptTransaction.prototype.onConfirmButtonClicked();
});

$('#summ').on('keyup', function(e) {
    var index = Indexes.prototype.getCurrencyState();
    var currency = AcceptTransaction.prototype.getCurrency();
    var modifier = index[currency];
    $('#currency-to-btc').text((parseInt($(this).val())*modifier).toFixed(7));
});