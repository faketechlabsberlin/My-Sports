export const FILTER_BY_SPORT = "FILTER_BY_SPORT";
export const FILTER_BY_MIN_SIZE = 'FILTER_BY_MIN_SIZE';
export const FILTER_BY_MAX_SIZE = 'FILTER_BY_MAX_SIZE';
export const FILTER_BY_MIN_SKILL = 'FILTER_BY_MIN_SKILL';
export const FILTER_BY_MAX_SKILL = 'FILTER_BY_MAX_SKILL';
export const FILTER_BY_DATE = 'FILTER_BY_DATE';
export const FILTER_BY_TIME = 'FILTER_BY_TIME';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_LOCATION = 'FILTER_BY_LOCATION';

export const filterByName = payload => ({
   type: FILTER_BY_NAME,
   payload
});

export const filterBySport = payload => ({
   type: FILTER_BY_SPORT,
   payload
});

export const filterByDate = payload => ({
   type: FILTER_BY_DATE,
   payload
});

export const filterByTime = payload => ({
   type: FILTER_BY_TIME,
   payload
});

export const filterByMaxSize = payload => ({
   type: FILTER_BY_MAX_SIZE,
   payload
});

export const filterByMinSize = payload => ({
   type: FILTER_BY_MIN_SIZE,
   payload
});

export const filterByLocation = payload => ({
   type: FILTER_BY_LOCATION,
   payload
});

// const filterByMaxSkill = payload => ({
//    type: FILTER_BY_MAX_SKILL,
//    payload
// });

// const filterByMinSkill = payload => ({
//    type: FILTER_BY_MIN_SKILL,
//    payload
// });
