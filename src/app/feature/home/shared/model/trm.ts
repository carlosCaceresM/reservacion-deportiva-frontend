export class Trm {
  id: string;
  unit: string;
  validityFrom: string;
  validityTo: string;
  value: string;
  success: string;

  constructor(id: string,
    unit: string,
    validityFrom: string,
    validityTo: string,
    value: string,
    success: string
  ) {

    this.id = id;
    this.unit = unit;
    this.validityFrom = validityFrom;
    this.validityTo = validityTo;
    this.value = value;
    this.success = success;
  }
}
