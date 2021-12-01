import { initializeApp } from 'firebase/app';
// import { getRemoteConfig, getValue } from 'firebase/remote-config';
import config from '../config';

const app = initializeApp(config.firebase);
// const remoteConfig = getRemoteConfig(app);

// remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

// const userId = getValue(remoteConfig, 'userId');
// const template = getValue(remoteConfig, 'emailTemplate');
// const serviceId = getValue(remoteConfig, 'emailServiceId');

// export const emailConfig = { userId, template, serviceId }
