//////////////////////////////////////////////// Navigation Bar Links functions /////////////////////////////////////////
function showPasswords() { //displays only Password Manager components
    document.getElementById('manager__container').style = "display: block"; 
    document.getElementById('add__container').style = "display: none";
    document.getElementById('strength__container').style = "display: none";
    document.getElementById('generator__container').style = "display: none";
}

function showAddPass() { //displays only Add Password components
    document.getElementById('manager__container').style = "display: none";
    document.getElementById('add__container').style = "display: block";
    document.getElementById('strength__container').style = "display: none";
    document.getElementById('generator__container').style = "display: none";
}

function showStrength() { //displays only Password Strength components
    document.getElementById('manager__container').style = "display: none";
    document.getElementById('add__container').style = "display: none";
    document.getElementById('strength__container').style = "display: block";
    document.getElementById('generator__container').style = "display: none";
}

function showGenerate() { //displays only Generate Password components
    document.getElementById('manager__container').style = "display: none";
    document.getElementById('add__container').style = "display: none";
    document.getElementById('strength__container').style = "display: none";
    document.getElementById('generator__container').style = "display: block";
}

////////////////////////////////////////////// Add New Password function ///////////////////////////////////////////////
function addToTable() {
    var AddWebsite = document.getElementById('website').value;
    var AddUsername = document.getElementById('username').value;
    var AddPassword = document.getElementById('password').value;



    if (document.getElementById('username').value == "" || document.getElementById('password').value == "") {
        //asks user to input both username and password if either or both inputs are left empty
        AddInfoPara.innerText = "Please ensure you fill in both new Username and Password information.";
        setTimeout(function () { document.getElementById("AddInfoPara").style = "display: none"; }, 10000); //message timer
        setTimeout(function () { AddInfoPara.innerText = ""; }, 3000);
        document.getElementById("AddInfoPara").style = "display: block";
    } else {
        document.getElementById('DefaultText').style = "display: none";
        var newRow = document.createElement("tr"); //adds new row to table
        newRow.innerHTML = "<td>" + AddWebsite + "</td><td>" + AddUsername + "</td><td>" + AddPassword + "</td>"; //adds new info to just-created row
        var tableContent = document.getElementById('tableContent');  //checks for existing content in table

        if (tableContent.children.length > 0) {
            tableContent.insertBefore(newRow, tableContent.children[0]); //appends new row below existing ones
        } else {
            tableContent.appendChild(newRow); //adds new row as first row
        }

        //lets user know the information was successfully added to table
        AddInfoPara.innerText = "Information has been added to your table!";
        setTimeout(function () { document.getElementById("AddInfoPara").style = "display: none"; }, 10000); //message timer
        setTimeout(function () { AddInfoPara.innerText = ""; }, 3000);
        document.getElementById("AddInfoPara").style = "display: block";
    }

    //////////////////////////////////////////////// JSON File format ///////////////////////////////////////////////

    let NewAccount = { //format
        Website: AddWebsite,
        Username: AddUsername,
        Password: AddPassword
    };

    let Data = localStorage.getItem('Accounts');
    let Accounts = Data ? JSON.parse(Data) : [];
    Accounts.push(NewAccount); //pushes new information into file
    localStorage.setItem('Accounts', JSON.stringify(Accounts));

    document.getElementById('website').value = '';     //clears input fields after adding to the table
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}


//////////////////////////////////////////// Download/Upload JSON File ///////////////////////////////////////////////
function DownloadFile() {
    let Data = localStorage.getItem('Accounts');
    let Accounts = Data ? JSON.parse(Data) : [];
    let Name = "Accounts.json";
    var blob = new Blob([JSON.stringify(Accounts, null, 3)], {type: "application/json"});
    var url = URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.href = url;
    link.download = Name;
    link.click();
}

function UploadFile() {
    const fileInput = document.createElement('input');
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.style.display = "none";
    
    document.body.appendChild(fileInput);
    fileInput.click();
    
    fileInput.addEventListener('change', function(e) {
        var file = e.target.files[0];
        
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let contents = e.target.result; // Use 'result' instead of 'results'
                var data = JSON.parse(contents);
                document.getElementById('tableContent').innerHTML = '';//clears table
                // Update table with uploaded data
                data.forEach(item => {
                    var newRow = document.createElement('tr');
                    newRow.innerHTML = "<td>" + item.Website + "</td><td>" + item.Username + "</td><td>" + item.Password + "</td>";
                    document.getElementById('tableContent').appendChild(newRow);
                });
                localStorage.setItem('Accounts', JSON.stringify(data));
            };
            reader.readAsText(file);
            document.body.removeChild(fileInput);
        }
    });
}

/////////////////////////////////////////// Password Strength Indicator ///////////////////////////////////////////
var strength = document.getElementById("strength");
var strengthPara = document.getElementById("StrengthPara");

function CheckStrength() {
    let PasswordStrengthValue = "0";
    let PasswordStrength = "";

    if (document.getElementById("StrengthBox").value == document.getElementById("StrengthBox").value.toUpperCase()) {
        PasswordStrengthValue++;
    } 

    if (document.getElementById("StrengthBox").value.length >= 7) {
        PasswordStrengthValue++;
    }
    if(document.getElementById("StrengthBox").value.length >= 13) {
        PasswordStrengthValue++;
    }

    if(PasswordStrengthValue == 0) {
        PasswordStrength = "Weak";
    } else if (PasswordStrengthValue == 1) {
        PasswordStrength = "Medium";
    } else if(PasswordStrengthValue == 2) {
        PasswordStrength = "Strong";
    }
    
    if (document.getElementById("StrengthBox").value == "") {
        strengthPara.innerText = "Please input a Password first.";
        setTimeout(function() { strengthPara.style = "display: none"; }, 10000);
        setTimeout(function() { strengthPara.innerText = ""; }, 3000);
        strengthPara.style = "display: block";
    } else {
        strengthPara.innerText = "Password strength: " + PasswordStrength;
        setTimeout(function() { strengthPara.style = "display: none"; }, 11000);
        setTimeout(function() { strengthPara.innerText = ""; }, 3000);
        strengthPara.style = "display: block";
    }
}




/////////////////////////////////////////////// Generate Password function ////////////////////////////////////////////
var Generated = document.getElementById('GeneratedBox');
var UpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var LowerCase = 'abcdefghijklmnopqrstuvwxyz';
var number = '0123456789';
var symbol = '!?*$/+=@&()#';
var Chars = UpperCase + LowerCase + number + symbol;
var RangeValue = document.getElementById('range__value');
RangeValue.innerText = "12";

function RangeNr() { //Allows user to see how many characters have been selected to be generated
    RangeValue.innerText = parseInt(document.getElementById('generate__range').value);
}

function createPassword() {
    let GeneratedPassword = "";
    GeneratedPassword += UpperCase[Math.floor(Math.random() * UpperCase.length)];
    GeneratedPassword += LowerCase[Math.floor(Math.random() * LowerCase.length)];
    GeneratedPassword += number[Math.floor(Math.random() * number.length)];
    GeneratedPassword += symbol[Math.floor(Math.random() * symbol.length)];
    GeneratedPassword += Chars[Math.floor(Math.random() * Chars.length)];
    
    for (i = 0; i < (parseInt(document.getElementById('generate__range').value)-5); i++) {
        GeneratedPassword += Chars[Math.floor(Math.random() * Chars.length)];
    }

    Generated.value = GeneratedPassword;
}

function copyPassword(){
    var CopiedPass = document.getElementById('GeneratedBox');
    CopiedPass.select();
    document.execCommand("copy");
}