class Utils {
  constructor() {}

  /**
   * Liest die ausgewaehlten Felder aus und gibt diese als Komma separierten
   * String zurueck
   */
  getSelectedFields(fields) {
    let selectedFields = [];
    fields.map((selected, index) => {
      if (selected === true) {
        selectedFields.push(index + 1);
      }
    });

    return selectedFields.join();
  }

  /**
   * Prueft ob die uebergebene Zahl bereits im uebergeben Array enthalten ist
   * @param {Array} array Der Array mit den bereits random generierten Zahlen
   * @param {Number} number Die Zahl, die geprueft werden soll
   */
  isAlreadInArray(array, number) {
    let isInArray = false;
    array.map(element => {
      if (element === number) {
        isInArray = true;
      }
    });
    return isInArray;
  }

  /**
   * Generiert eine beliebige Anzahl an zufaelligen Zahlen und gibt diese als Array zurueck
   * @param {Number} count Die Anzahl an zufaellig generierten Zahlen
   */
  getRandomNumbers(fields, count) {
    const array = Array(count).fill();
    const numberOfFields = fields.length;

    array.map((i, index) => {
      let randomNumber = Math.floor(Math.random() * numberOfFields);

      while (
        this.isAlreadInArray(array, randomNumber) ||
        fields[randomNumber] === true
      ) {
        randomNumber = Math.floor(Math.random() * numberOfFields);
      }
      array[index] = randomNumber;
    });

    return array;
  }
}

const instance = new Utils();
//Object.freeze(instance);

export default instance;
