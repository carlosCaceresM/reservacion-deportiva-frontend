import { Reserva } from './reserva';

describe('Reserva', () => {
  it('should create an instance', () => {
    expect(new Reserva(1,'Hiko', '2022-07-12 18:52:23',2,60000,1)).toBeTruthy();
  });
});
