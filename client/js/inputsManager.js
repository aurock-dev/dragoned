function checkInput(input){
    if (input.length >= 3 && input.length <= 14){
        if (/^[a-zA-Z]+$/.test(input)){
            return true;
        };
    }
    return false; 
}