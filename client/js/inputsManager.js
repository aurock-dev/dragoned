function checkInput(input){
    if (input.length >= 3 && input.length <= 12){
        if (/^[a-zA-Z]+$/.test(input)){
            return true;
        };
    }
    return false; 
}