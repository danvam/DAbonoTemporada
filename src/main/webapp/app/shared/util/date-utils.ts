import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z, APP_LOCAL_DATE_FORMAT_BC } from 'app/config/constants';

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate() : null);

export const displayDefaultDateTime = () => moment().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);

export const convertDateTimeBlockchain = date => (date ? moment(date).format(APP_LOCAL_DATE_FORMAT_BC) : null);
