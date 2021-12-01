import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert, Card,
  FloatingLabel,
  Form, ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button, CloseButton,
} from 'react-bootstrap';
import { sendEmail } from './services/email';
import './App.scss';
import './services/i18n';

const defaultUser = { name: '', email: '' };

console.log('Logo credits: Steve Lianardo. => https://iconarchive.com/artist/stevelianardo.html')

function App() {
  const { t } = useTranslation();
  const [list, setList] = useState([{...defaultUser}]);
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);

  function handleRemove(index) {
    const listCopy = [...list].filter((user, i) => i !== index)

    setList(listCopy);
  }

  function handleChange(key, value, i) {
    const newList = [...list];
    newList[i][key] = value;

    setList(newList);
    setError(false);
  }

  function handleAdd() {
    setList([...list, {...defaultUser}])
  }

  function checkEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function shuffle(){
    const listCopy = [...list].map((user, i) => ({ ...user, id: i }));
    const result = [];

    while (result.length < list.length) {
      const id = Math.floor(Math.random() * listCopy.length);

      if (listCopy[id].id !== result.length) {
        result.push(listCopy.splice(id, 1)[0]);
      } else if (listCopy.length === 1) { // only when last is the same in both arrays
        // swap two at the end
        result.push(result[result.length - 1]);
        result[result.length - 2] = listCopy.splice(id, 1)[0];
      }
    }

    sendEmail(list, result).then(() => {
      setOk(true)
      setList([{...defaultUser}])
    });
  }

  function handleSubmit() {
    const err = list.some(el => !el.name || !el.email || !checkEmail(el.email));
    setError(err)
    err || shuffle();
  }

  return (
    <div className="App">
      <div className="container mt-5 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Card className="w-100">
          <ListGroup className="list-group-flush">
            {
              list.map((user, i) => (
                <ListGroupItem key={i} className="list-item">
                  <Card.Title>{t('card.title', { number: i + 1 })}</Card.Title>

                  {
                    (list.length > 1) && (
                      <CloseButton className="close-button" title={t('card.remove')} onClick={() => handleRemove(i)} />
                    )
                  }

                  <FloatingLabel label={t('card.name')} className="mb-1">
                    <Form.Control
                      type="text"
                      value={user.name || ''}
                      placeholder={t('card.name')}
                      onChange={e => handleChange('name', e.target.value, i)}
                    />
                  </FloatingLabel>
                  <FloatingLabel label={t('card.email')}>
                    <Form.Control
                      type="email"
                      value={user.email || ''}
                      placeholder="name@example.com"
                      onChange={e => handleChange('email', e.target.value, i)}
                    />
                  </FloatingLabel>
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Card>

        <ButtonGroup className="w-100 mt-3">
          <Button
            type="button"
            variant="secondary"
            disabled={list.length >= 20}
            onClick={handleAdd}
          >
            {t('buttons.add')}
          </Button>
          <Button
            type="button"
            variant="danger"
            disabled={list.length < 3}
            onClick={handleSubmit}
          >
            {t('buttons.send')}
          </Button>
        </ButtonGroup>

        <div className="alerts">
          <Alert variant="danger" show={error} onClose={() => setError(false)} dismissible>
            <Alert.Heading>{t('alerts.error.title')}</Alert.Heading>
            <p>{t('alerts.error.body')}</p>
            <p>{t('alerts.error.footer', { send: t('buttons.send') })}</p>
          </Alert>

          <Alert show={ok} variant="info" onClose={() => setOk(false)} dismissible>
            <Alert.Heading>{t('alerts.success.title')}</Alert.Heading>
            <p>{t('alerts.success.body')}</p>
            <p>{t('alerts.success.footer')}</p>
          </Alert>
        </div>
      </div>
    </div>
  );
}

export default App;
