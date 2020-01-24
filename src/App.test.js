import React from "react";
import LotteryTicket from "./LotteryTicket";

const lotteryTicket = new LotteryTicket();

// beforeEach(() => {
//   const fields = Array(49).fill(false);
// });

/**
 * Prueft, ob der generierte Array mit den zufaelligen Zahlen auch die
 * richtige laenge hat
 */
test("RandomNumber Array has correct length", () => {
  const randomNumberArray = lotteryTicket.getRandomNumbers(6);
  expect(randomNumberArray.length).toEqual(6);
});

/**
 * Wenn kein Feld ausgewaehlt ist, dann sollte die Methode getSelectedFields()
 * einen leeren String zurueck geben
 */
test("No field selected", () => {
  const fields = Array(49).fill(false);
  const selectedFields = lotteryTicket.getSelectedFields(fields);
  expect(selectedFields).toEqual("");
});

/**
 * Prueft, ob die richtige Anzahl an Feldern als selected Fields ausgegeben
 * wird
 */
test("Returns correct selected Fields", () => {
  const fields = getSixSelectedFields();

  const selectedFields = lotteryTicket.getSelectedFields(fields);
  expect(selectedFields).toEqual("6, 8, 23, 29, 36, 42");
});

/**
 * Prueft, dass nicht der Array Index als Number des selected Fields ausgegeben
 * wird.
 */
test("Does not return array index as selected Field number", () => {
  const fields = getSixSelectedFields();

  const selectedFields = lotteryTicket.getSelectedFields(fields);
  expect(selectedFields).not.toBe("5, 7, 22, 28, 35, 41");
});

/**
 * Prueft, dass nicht der Array Index als Number des selected Fields ausgegeben
 * wird.
 */
test("Returns correct Selected Fields for five fields", () => {
  const fields = getFiveSelectedFields();

  const selectedFields = lotteryTicket.getSelectedFields(fields);
  expect(selectedFields).toEqual("6, 8, 23, 29, 36, ");
});

/**
 * Erstellt einen Array mit 49 Feldern und waehlt sechs von
 * ihnen aus.
 */
function getSixSelectedFields() {
  let fields = Array(49).fill(false);

  fields[5] = true;
  fields[7] = true;
  fields[35] = true;
  fields[41] = true;
  fields[22] = true;
  fields[28] = true;

  return fields;
}

/**
 * Erstellt einen Array mit 49 Feldern und waehlt sechs von
 * ihnen aus.
 */
function getFiveSelectedFields() {
  let fields = Array(49).fill(false);

  fields[5] = true;
  fields[7] = true;
  fields[35] = true;
  fields[22] = true;
  fields[28] = true;

  return fields;
}
