import emailjs from 'emailjs-com';
// import { emailConfig } from './firebase';
import config from '../config';

export async function sendEmail(fromList, toList) {
  // const { userId, template, serviceId } = emailConfig;
  // console.log('emailConfig', emailConfig)
  const { userId, template, serviceId } = config.email;

  console.log(fromList, toList)

  return new Promise((resolve, reject) => {
    const emailList = fromList.map((user, i) => {
      const params = {
        'from_name': user.name,
        'from_email': user.email,
        'to_name': toList[i].name,
      };

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
