window.onload = function () {
    Indexes.prototype.fillCurrenciesForms();
    UserData.prototype.fillUserForm();
};

$('#confirm-button').on('click', function (e) {
    if (!AcceptTransaction.prototype.getTransactionStatus()) {
        AcceptTransaction.prototype.onConfirmButtonClicked();
    }
});

$('#repeat-button').on('click', function (e) {
    ShowTransaction.prototype.returnState();
});

$('#summ').on('keyup', function(e) {
    var index = Indexes.prototype.getCurrencyState();
    var currency = AcceptTransaction.prototype.getCurrency();
    var modifier = index[currency];
    console.log($(this).val());
    if ($(this).val()) {
        $('#currency-to-btc').text(((parseInt($(this).val()) * modifier).toFixed(3)) + " " + Indexes.prototype.getCurrencyRow(document.getElementById('currency').value));
    } else {
        $('#currency-to-btc').text('0');
    }
});