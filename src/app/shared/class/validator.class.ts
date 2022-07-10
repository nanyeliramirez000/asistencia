export class Validator {

    constructor() {}

    HashNumber(string: string): boolean {
      return /\d/.test(string);
    }
    
    HasLetter(string: string): boolean {
        if(isNaN(+string)){
            return true;
        }
        return false;
    }

    CheckMail(email: string) : boolean {
      const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (regexp.test(email)){
        return true;
      }
      return false;
    }

    CheckAddress(address: string) : boolean {
      if(address.length < 10 || address.indexOf(" ") === -1 || !this.HasLetter(address)){
        return false;
      }else{
        return true;
      }
    }

    CheckExp(cMonth: string, cYear: string): boolean{

      if(this.HasLetter(cMonth) || this.HasLetter(cYear)){
        return false;
      }

      const month = + cMonth;
      const year =  + cYear;

      if (month > 12 || month < 1){
        return false;
      }
      if (year < 22 || year > 30){
        return false;
      }
      if (year === 22){
        if (month < 6){
          return false;
        }
      }
      return true;
    }

    CheckCvv(code: string) : boolean { 
      const hasLetter = this.HasLetter(code);
      if(hasLetter){
        return false;
      }

      if(code.length !== 3){
        return false;
      }

      return true;
    }

    CheckNIP(code: string) : boolean { 
      const hasLetter = this.HasLetter(code);
      if(hasLetter){
        return false;
      }

      if(code.length !== 4){
        return false;
      }

      return true;
    }
    
    CardNumber(cardNumber) {
      // tslint:disable-next-line: no-null-keyword
      let cardType = null;
      if (this.VisaCardnumber(cardNumber)) {
        cardType = "visa";
      } else if (this.MasterCardnumber(cardNumber)) {
        cardType = "mastercard";
      } else if (this.AmexCardnumber(cardNumber)) {
        cardType = "americanexpress";
      } else if (this.DiscoverCardnumber(cardNumber)) {
        cardType = "discover";
      } else if (this.DinerClubCardnumber(cardNumber)) {
        cardType = "dinerclub";
      } else if (this.JCBCardnumber(cardNumber)) {
        cardType = "jcb";
      }
      return cardType;
    }
  
    private AmexCardnumber(inputtxt) {
      const cardno = /^(?:3[47][0-9]{13})$/;
      return cardno.test(inputtxt);
    }
  
    private VisaCardnumber(inputtxt) {
      const cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      return cardno.test(inputtxt);
    }
  
    private MasterCardnumber(inputtxt) {
      const cardno = /^(?:5[1-5][0-9]{14})$/;
      return cardno.test(inputtxt);
    }
  
    private DiscoverCardnumber(inputtxt) {
      const cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
      return cardno.test(inputtxt);
    }
  
    private DinerClubCardnumber(inputtxt) {
      const cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
      return cardno.test(inputtxt);
    }
  
    private JCBCardnumber(inputtxt) {
      const cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
      return cardno.test(inputtxt);
    }
  
    checkCreditCard(cardnumber, cardname) {
      const cards = new Array();
      let cardError = "";
  
      cards [0] = {name: "Visa",
                   length: "13,16",
                   prefixes: "4",
                   checkdigit: true};
      cards [1] = {name: "MasterCard",
                   length: "16",
                   prefixes: "51,52,53,54,55",
                   checkdigit: true};
      cards [2] = {name: "DinersClub",
                   length: "14,16",
                   prefixes: "36,38,54,55",
                   checkdigit: true};
      cards [3] = {name: "CarteBlanche",
                   length: "14",
                   prefixes: "300,301,302,303,304,305",
                   checkdigit: true};
      cards [4] = {name: "AmEx",
                   length: "15",
                   prefixes: "34,37",
                   checkdigit: true};
      cards [5] = {name: "Discover",
                   length: "16",
                   prefixes: "6011,622,64,65",
                   checkdigit: true};
      cards [6] = {name: "JCB",
                   length: "16",
                   prefixes: "35",
                   checkdigit: true};
      cards [7] = {name: "enRoute",
                   length: "15",
                   prefixes: "2014,2149",
                   checkdigit: true};
      cards [8] = {name: "Solo",
                   length: "16,18,19",
                   prefixes: "6334,6767",
                   checkdigit: true};
      cards [9] = {name: "Switch",
                   length: "16,18,19",
                   prefixes: "4903,4905,4911,4936,564182,633110,6333,6759",
                   checkdigit: true};
      cards [10] = {name: "Maestro",
                   length: "12,13,14,15,16,18,19",
                   prefixes: "5018,5020,5038,6304,6759,6761,6762,6763",
                   checkdigit: true};
      cards [11] = {name: "VisaElectron",
                   length: "16",
                   prefixes: "4026,417500,4508,4844,4913,4917",
                   checkdigit: true};
      cards [12] = {name: "LaserCard",
                   length: "16,17,18,19",
                   prefixes: "6304,6706,6771,6709",
                   checkdigit: true};
      // Establish card type
      let cardType = -1;
      for (let i = 0; i < cards.length; i++) {
        // See if it is this card (ignoring the case of the string)
        // tslint:disable-next-line: triple-equals
        if (cardname.toLowerCase () == cards[i].name.toLowerCase()) {
          cardType = i;
          break;
        }
      }
  
      // If card type not found, report an error
      // tslint:disable-next-line: triple-equals
      if (cardType == -1) {
         cardError = "ccErrorNo";
         return false;
      }
  
      // Ensure that the user has provided a credit card number
      // tslint:disable-next-line: triple-equals
      if (cardnumber.length == 0)  {
         cardError = "ccErrorNo";
         return false;
      }
  
      // Now remove any spaces from the credit card number
      cardnumber = cardnumber.replace (/\s/g, "");
  
      // Check that the number is numeric
      // tslint:disable-next-line: prefer-const
      let cardNo = cardnumber;
      // tslint:disable-next-line: prefer-const
      let cardexp = /^[0-9]{13,19}$/;
      if (!cardexp.exec(cardNo))  {
         cardError = "ccErrorNo";
         return false;
      }
  
      // Now check the modulus 10 check digit - if required
      if (cards[cardType].checkdigit) {
        let checksum = 0;                                  // running checksum total
        const mychar = "";                                   // next char to process
        let j = 1;                                         // takes value of 1 or 2
  
        // Process each digit one by one starting at the right
        let calc;
        for (let i = cardNo.length - 1; i >= 0; i--) {
          // Extract the next digit and multiply by 1 or 2 on alternative digits.
          calc = Number(cardNo.charAt(i)) * j;
  
          // If the result is in two digits add 1 to the checksum total
          if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
          }
  
          // Add the units element to the checksum total
          checksum = checksum + calc;
  
          // Switch the value of j
          // tslint:disable-next-line: triple-equals
          if (j == 1) {j = 2; } else {j = 1; }
        }
  
        // All done - if checksum is divisible by 10, it is a valid modulus 10.
        // If not, report an error.
        if (checksum % 10 !== 0)  {
         cardError = "ccErrorNo";
         return false;
        }
      }
  
      // Check it's not a spam number
      // tslint:disable-next-line: triple-equals
      if (cardNo == "5490997771092064") {
        cardError = "ccErrorNo";
        return false;
      }
  
      // The following are the card-specific checks we undertake.
      let lengthValid = false;
      let prefixValid = false;
      // const undefined;
  
      // We use these for holding the valid lengths and prefixes of a card type
      let prefix = new Array ();
      let lengths = new Array ();
  
      // Load an array with the valid prefixes for this card
      prefix = cards[cardType].prefixes.split(",");
  
      // Now see if any of them match what we have in the card number
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < prefix.length; i++) {
        const exp = new RegExp ("^" + prefix[i]);
        if (exp.test (cardNo)) {prefixValid = true; }
      }
  
      // If it isn't a valid prefix there's no point at looking at the length
      if (!prefixValid) {
         cardError = "ccErrorNo";
         return false;
      }
  
      // See if the length is valid for this card
      lengths = cards[cardType].length.split(",");
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < lengths.length; j++) {
        // tslint:disable-next-line: triple-equals
        if (cardNo.length == lengths[j]) {lengthValid = true; }
      }
  
      if (!lengthValid) {
         cardError = "ccErrorNo";
         return false;
      }
  
      // The credit card is in the required format.
      return true;
    }
}
  