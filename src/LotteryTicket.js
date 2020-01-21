import React from 'react';
import update from 'react-addons-update';
import './LotteryTicket.css';

class LotteryTicket extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fields: Array(49).fill(false),
      numberOfSelectedFields: 0,
      showForwardButton: false,
      showSelectedNumbers: false,
    }
  }
  
  handleClick(i) {
    let fields = this.state.fields.slice();
    let numberOfSelectedFields = this.state.numberOfSelectedFields;

    if(fields[i] === true) {
      fields[i] = false;
      numberOfSelectedFields -= 1;
    }else{

      if(numberOfSelectedFields < 6) {
        fields[i] = true;
        numberOfSelectedFields += 1;
      }
    }
    
    // Wenn 6 Kreuze gesetzt wurden, ist die auswahl beendet
    if(numberOfSelectedFields === 6) {
      this.setState({showForwardButton: true})
    }else{
      this.setState({showForwardButton:false})
    }

    this.setState({fields: fields});
    this.setState({numberOfSelectedFields: numberOfSelectedFields});
    this.setState({showSelectedNumbers: false});
  }

  unselectFields() {
    const fields = Array(49).fill(false);
    this.setState({fields: fields});
    this.setState({numberOfSelectedFields: 0});
    this.setState({showForwardButton: false});
    this.setState({showSelectedNumbers: false});
  }
  
  renderField(i) {
    return  <Field
        key ={i}
        number={i+1}
        selected={this.state.fields[i]}
        onClick={() => this.handleClick(i)}
      />
  }

  renderRow(i) {

    let fields = [];

    for(let j = 0; j < 7; j++) {
      fields.push(this.renderField(i + j))
    }
    return <div key={i} className="ticket-row">
        {fields}
    </div>
  }

  renderTicket(i) {
    if(i % 7 === 0) {
       return this.renderRow(i)
    }
  }

  getSelectedFields() {

    if(this.state.numberOfSelectedFields === 6) {
      let selectedFields = [];
      this.state.fields.forEach(function(selected, index) {
        if(selected === true) {
          selectedFields.push(index + 1);
        }
      });

      let selectedFieldsString = "";
      selectedFields.map((field, index) => {

        if(index === 5) {
          selectedFieldsString += field;
        }else{
          selectedFieldsString += field + ", ";
        }
        
      })

      return selectedFieldsString;
    }else{
      return "";
    }
  }
  showSelectedNumbers() {
    this.setState({showSelectedNumbers: true});
  }

  render() {

    const selectionFinished = this.state.showForwardButton ? 'show button' : 'hide';
    return (
      <div>
          {this.state.fields.map((field, index) => (
            this.renderTicket(index)
          ))}

        <div className="trash" onClick={this.unselectFields.bind(this)}></div>
        <button className={selectionFinished} onClick={this.showSelectedNumbers.bind(this)}>Weiter</button>
        <div className="result">{this.state.showSelectedNumbers ? this.getSelectedFields() : ""}</div>
      </div>
    );
  }  
}

function Field(props) {
  const selectedClass = props.selected ? ' field selected-field': 'field';
  
  return (
    <button className={selectedClass} onClick={props.onClick}>
      {props.number}
    </button>
  );
}

export default LotteryTicket;
