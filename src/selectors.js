import { curry, pipe, values, T, map, head, merge, gte, mapObjIndexed, clamp, prop, innerJoin, repeat, last, mapAccum, filter, find, propEq } from 'ramda';
import { createSelector } from 'reselect';

const trace = curry((msg, requests) => {
  console.log(msg, requests);
  return requests;
})

//Global Selectors
const series = (state) => state.inputs.series;
const parallel = (state) => state.inputs.parallel;
const batteries = (state) => state.batteries;
const inputs = (state) => state.inputs;
const cVoltTable = (state) => state.admin.cVoltTable;

const basicMath = curry((inputs,batteries) => {
  let {series, parallel, milesPerKwh, minAmps, minMiles, minC, controllerAmps, throttle, maxCharge, minCharge} = inputs;

  return map((battery) => {
    let {cellAmpHours, cellAmps} = battery;
    let volts =           Math.round(series * 3.7);
    let ampHours =        Math.round(cellAmpHours * parallel/1000);
    let wattHours =       Math.round(volts * ampHours);
    let amps =            Math.round(cellAmps * parallel);
    let lbs =             (Math.round((battery.weight * series * parallel * 2.2/1000)*100)/100).toPrecision(3);
    let miles =           Math.round(wattHours/milesPerKwh);
    let price =           Math.round(battery.pricePerCell * series * parallel);
    let peakWatts =       Math.round(controllerAmps * volts * 10)/10;
    let dollarsPerMile =  Math.round(price/miles).toPrecision(3);
    let dollarsPerAmp =   (Math.round(price/amps*100)/100).toPrecision(3);
    let cRating =         Math.round(cellAmps/cellAmpHours*1000*10)/10;
    let controllerCRating = Math.round(controllerAmps/ampHours*10)/10;
    let throttleAmps =    Math.round(controllerAmps*throttle/100*10)/10;
    let throttleC =       Math.round(throttleAmps/ampHours*10)/10;

    const topVolts = (4.2 - .7 + (maxCharge/100 * .7));
    const topLife = (0.3489081 + (13.1669 - 0.3489081)/(1 + Math.pow((topVolts/3.933238),46.24881)));
    const dod = (maxCharge - minCharge)/100;
    const dodLife = (0.8844147 + (3.813178 - 0.8844147)/(1 + Math.pow((dod/0.5254842),9.261628)));

    const topSanity = topLife > 1.5 ? topLife * (topLife/Math.pow((topLife-0.5),2)) : topLife;
    const dodSanity = dodLife > 1.5 ? dodLife * (dodLife/Math.pow((dodLife-0.5),2)) : dodLife;

    let lifeSpan = Math.round(400 * topLife * dodLife);


    return {
      ...battery,
      volts,
      ampHours,
      wattHours,
      amps,
      lbs,
      miles,
      price,
      dollarsPerMile,
      dollarsPerAmp,
      cRating,
      controllerCRating,
      peakWatts,
      throttleAmps,
      throttleC,
      lifeSpan,
    };
  }, batteries)
});

const getCValues = curry((inputs, cVoltTable,activeBattery) => {
  const t = prop('volts',head(filter((table) => {
    return table.c >= activeBattery.throttleC
  },cVoltTable)));
  return {...activeBattery, cVoltTable: t}
});


const activeBattery = curry((inputs,batteries) => {
  const test = head(values(filter(propEq('cellType', inputs.cellType), batteries)));
  return merge(inputs, test)
});

export const getBatteries = createSelector(
  [ batteries, series, parallel, inputs ],
  (batteries, series, parallel, inputs) =>  {
    return pipe(
      basicMath(inputs),
      // trace("batteries"),
    )(batteries);
  }
);

export const getActiveBattery = createSelector(
  [ inputs, batteries, getBatteries],
  ( inputs, batteries, getBatteries) =>  {
    return pipe(
      mapObjIndexed((battery, index) => {return {...battery, cellType:index}}),
      activeBattery(inputs),
      // trace("batteries"),
    )(getBatteries);
  }
);

export const getPowerTable = createSelector(
  [ inputs, cVoltTable, getActiveBattery],
  ( inputs, cVoltTable, activeBattery) =>  {
    return pipe(
      getCValues(inputs, cVoltTable),
      // trace("batteries"),
    )(activeBattery);
  }
);

const calcLifespan = curry((lifeInputs, battery) => {
  return battery;
})

export const getLifeSpan = createSelector(
  [ cVoltTable, getActiveBattery],
  ( cVoltTable, activeBattery) =>  {
    return pipe(
      calcLifespan(cVoltTable),
      // trace("batteries"),
    )(activeBattery);
  }
);



