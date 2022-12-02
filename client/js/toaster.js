function toaster(text, type='default', time=5000){
    document.querySelector('#toasterText').textContent = '';
    document.querySelector('#toasterText').textContent = text;
    document.title = '';
    document.title = text;

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
        document.title = 'Dragoned';
    }, time)
}