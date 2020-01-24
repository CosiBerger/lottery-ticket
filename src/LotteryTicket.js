import React from "react";
import "./LotteryTicket.css";
import Utils from "./Utils.js";

class LotteryTicket extends React.Component {
  numberOfFields = 54;
  numberOfMaxSelectedFields = 7;
  GRID = [0, 1, 2, 3, 4, 5, 6, 7];

  /**
   * Constructor
   * @param {} props
   */
  constructor(props) {
    super(props);
    this.state = {
      fields: Array(this.numberOfFields).fill(false),
      showForwardButton: false,
      showSelectedNumbers: false
    };
  }

  /**
   * Setzt die States des LotteryTickets, sobald eins der Felder geklickt wurde.
   * Die Anzahl der ausgewaehlten Felder wird hoch bzw. runter gezaehlt.
   * @param {number} index Der Index des geklickten Feldes
   */
  handleClick(index) {
    let fields = this.state.fields.slice();
    let numberOfSelectedFields = this.getNumberOfSelectedFields();

    if (fields[index] === true) {
      fields[index] = false;
      numberOfSelectedFields -= 1;
    } else if (numberOfSelectedFields < this.numberOfMaxSelectedFields) {
      fields[index] = true;
      numberOfSelectedFields += 1;
    }

    this.setState({ fields });
    this.setState({ showSelectedNumbers: false });
  }

  /**
   * Setzt alle States des LotteryTickets zurueck auf die default Werte
   */
  unselectFields(callback) {
    const fields = Array(this.numberOfFields).fill(false);
    this.setState(
      { fields, showForwardButton: false, showSelectedNumbers: false },
      callback
    );
  }

  /**
   * Gibt die Anzahl der bereits ausgewaehlten Felder zurueck
   */
  getNumberOfSelectedFields() {
    const array = this.state.fields.filter(field => {
      return field;
    });

    return array.length;
  }

  /**
   * Waehlt 6 zufaellige Zaheln zweische 1 und 49 aus und
   * setzt diese als fields state.
   */
  displayRandomNumber() {
    const fields = this.state.fields;
    const randomNumbers = Utils.getRandomNumbers(
      this.state.fields,
      this.numberOfMaxSelectedFields - this.getNumberOfSelectedFields()
    );
    randomNumbers.map(number => {
      fields[number] = true;
    });

    this.setState({ fields });
  }

  /**
   * Fuehrt eine Quicktipp auswahl durch, indem sech zahlen zufaellig ausgewahlt werden.
   * Wenn bereits zuvor eine Zahl ausgewaehlt war, bleibt diese erhalten
   */
  displayQuickTipps() {
    if (this.getNumberOfSelectedFields() === this.numberOfMaxSelectedFields) {
      this.unselectFields(() => {
        this.displayRandomNumber();
      });
    } else {
      this.displayRandomNumber();
    }
  }

  /**
   * Setzt den State showSelectedNumbers auf true, sodass die Ausgewaehlten Felder in der Gui
   * angezeigt werden
   */
  showSelectedNumbers() {
    this.setState({ showSelectedNumbers: true });
  }

  /**
   * Rendert das gesamte LotteryTicket
   */
  render() {
    const selectionFinished =
      this.getNumberOfSelectedFields() === this.numberOfMaxSelectedFields
        ? "show button"
        : "hide";
    return (
      <div>
        <h1>Lotto - 6 aus 49</h1>
        <div className="lottoTicket">
          {/* Alle Spalten iterieren*/}
          {this.GRID.map(row => (
            <div key={row} className="ticket-row">
              {/* Alle Zeilen iterieren*/}
              {this.GRID.map(columns => {
                const fieldIndex = row * this.GRID.length + columns;
                /* Feld mit der berechneten Nummer erstellen*/
                return (
                  <Field
                    key={fieldIndex}
                    number={fieldIndex + 1}
                    selected={this.state.fields[fieldIndex]}
                    onClick={() => this.handleClick(fieldIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div>
          {/* Quicktipp Button fuer die zufaellige Auswahl von 6 Feldern*/}
          <button
            className="show button"
            onClick={() => this.displayQuickTipps()}
          >
            Quicktipp
          </button>

          {/* Weiter Button, der erscheint, sobald 6 Felder ausgewaehlt wurden*/}
          <button
            className={selectionFinished}
            onClick={() => this.showSelectedNumbers()}
          >
            Weiter
          </button>
        </div>

        {/* Anzeige der 6 ausgewaehlten Felder*/}
        <h2>
          {this.state.showSelectedNumbers &&
          this.getNumberOfSelectedFields() === this.numberOfMaxSelectedFields
            ? Utils.getSelectedFields(this.state.fields)
            : ""}
        </h2>

        {/* Trash Buttom zur Aufhebung der ausgewaehlten Felder*/}
        <div className="clearBoth">
          <div className="trash" onClick={() => this.unselectFields()}></div>
        </div>
      </div>
    );
  }
}

/**
 * Komponente fuer ein einzelnes Zahlenfeld (ohne eigenen State)
 * @param {*} props Die Properties der Komponente
 *                  selected -> Gibt an, ob das Feld derzeit ausgewaehlt ist
 *                  number -> Die Zahl, die im Feld dargestellt wird
 *                  onCLick -> Klick Handler
 */
function Field({ selected, number, onClick }) {
  const selectedClass = selected ? " field selected-field" : "field";

  return (
    <button className={selectedClass} onClick={onClick}>
      {number}
    </button>
  );
}

export default LotteryTicket;
