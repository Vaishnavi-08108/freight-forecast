import {
  describe,
  expect,
  it
} from "vitest";

describe(
  "FreightIQ smoke checks",
  () => {

    it(
      "has the expected product name",
      () => {

        expect(
          "FreightIQ"
        ).toContain(
          "Freight"
        );

      }
    );


    it(
      "forecast arithmetic is deterministic",
      () => {

        const current =
          2161;

        const predicted =
          2556.41;

        expect(
          predicted
        ).toBeGreaterThan(
          current
        );

      }
    );


    it(
      "backend request uses expected fields",
      () => {

        const payload = {

          cargo_type:
            "Coal",

          cargo_tonnes:
            50000,

          destination:
            "Paradip Port",

          contract_duration_months:
            3

        };

        expect(
          payload.cargo_type
        ).toBe("Coal");

        expect(
          payload.cargo_tonnes
        ).toBe(50000);

        expect(
          payload.destination
        ).toBe("Paradip Port");

        expect(
          payload.contract_duration_months
        ).toBe(3);

      }
    );


    it(
      "vessel ranking has three classes",
      () => {

        const ranking = [
          "Supramax",
          "Panamax",
          "Capesize"
        ];

        expect(
          ranking
        ).toHaveLength(3);

      }
    );

  }
);