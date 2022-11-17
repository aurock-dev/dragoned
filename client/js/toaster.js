function toaster(text, type='default'){
    document.querySelector('#toasterText').textContent = '';
    document.querySelector('#toasterText').textContent = text;

    switch (type) {
        case 'default':
            document.querySelector('#toasterText').classList = '';
            break;

        case 'alert':
            document.querySelector('#toasterText').classList.add('toasterAlert');
            break;

        default:
            break;
    }


    setTimeout(() => {
        document.querySelector('#toasterText').textContent = '';
        document.querySelector('#toasterText').classList = '';
    }, 3000)
}