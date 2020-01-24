import React from "react";
import update from "react-addons-update";
import "./LotteryTicket.css";
import Utils from "./Utils.js";

class LotteryTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: Array(49).fill(false),
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
    } else if (numberOfSelectedFields < 6) {
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
    console.log(callback);
    const fields = Array(49).fill(false);
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
      6 - this.getNumberOfSelectedFields()
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
    if (this.getNumberOfSelectedFields() === 6) {
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
    const fields = [0, 1, 2, 3, 4, 5, 6];
    const selectionFinished =
      this.getNumberOfSelectedFields() === 6 ? "show button" : "hide";
    return (
      <div>
        <h1>Lotto - 6 aus 49</h1>
        <div className="lottoTicket">
          {/* Alle Spalten iterieren*/}
          {fields.map(row => (
            <div key={row} className="ticket-row">
              {/* Alle Zeilen iterieren*/}
              {fields.map(columns => {
                const fieldIndex = row * 7 + columns;
                {
                  /* Feld mit der berechneten Nummer erstellen*/
                }
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
          this.getNumberOfSelectedFields() === 6
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
function Field(props) {
  const selectedClass = props.selected ? " field selected-field" : "field";

  return (
    <button className={selectedClass} onClick={props.onClick}>
      {props.number}
    </button>
  );
}

export default LotteryTicket;
