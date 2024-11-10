import emailjs from 'emailjs-com';
// import { emailConfig } from './firebase';
import config from '../config';

export const getTemplate = (() => {
  const { templates } = config.email;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const templateParam = urlParams.get('template')

  return { name: templateParam, code: templates[templateParam] || templates.default};
})

export async function sendEmail(fromList, toList) {
  // const { userId, template, serviceId } = emailConfig;
  // console.log('emailConfig', emailConfig)

  const delay = fromList.length > 6;

  const { userId, serviceId } = config.email;

  return new Promise((resolve, reject) => {
    const emailList = fromList.map(({ name, email }, i) => {
      const params = {
        'from_name': name,
        'from_email': email,
        'to_name': toList[i].name,
      };

      const template = getTemplate().code;

      if (delay) {
        setTimeout(() => {
          return emailjs.send(serviceId, template, params, userId);
        }, i * 10000);
      }

      return emailjs.send(serviceId, template, params, userId);
    });

    Promise.all(emailList).then(res => {
      console.log(res)
      resolve();
    }).catch(err => {
      console.error(err)
      reject();
    })
  })
}
