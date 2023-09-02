/**
 * Ennakkotehtävä: Ikälaskuri
 * @author Elisa Autonen
 */

import './App.css';
import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

/**
 * 
 * @param {id} param0 henkilötunnus 
 */
function PersonalId({id}) {

  if (id !== "") {
    const birthdate = id.substring(2, 4) + "/" + id.substring(0, 2) + "/" +  id.substring(4, 6);

    /**
     * Tarkistetaan pituus ja että ensimmäiset 6 merkkiä on numeroita.
     */
    if (id.length !== 11 || Number.isNaN(Number(id.substring(0, 6)))) {
      return (
        <div className='PersonalId'>
          <Card border="danger">
            <Card.Title>Virheellinen henkilötunnus</Card.Title>
            <Card.Text>
              Henkilötunnus on virheellinen. Tarkista henkilötunnuksen muotoilu!
            </Card.Text>
          </Card>
        </div>
      )
    }

    console.log(Number(id.substring(0, 2)));

    if (Number(id.substring(0, 2)) == 0) {
      return (
      <div className='PersonalId'>
            <Card border="danger">
              <Card.Title>Virheellinen henkilötunnus</Card.Title>
              <Card.Text>
                Henkilötunnus on virheellinen. Päivä tai kuukausi ei voi olla nolla!
              </Card.Text>
            </Card>
          </div>
      )
    }  

  let old = new Date(birthdate);
  let diff = Date.now() - old.getTime();
  let age_dt = new Date(diff);  
  let year = age_dt.getUTCFullYear(); 
  let agey = Math.abs(year - 1970);
  let month = age_dt.getUTCMonth();
  let date = age_dt.getUTCDate();
  
  
  /**
   * Palautetaan Card, jossa laskettu ikä tekstinä.
   */
  return (
    <div className='PersonalId'>
      <Card border="success">
        <Card.Title>Henkilön ikä</Card.Title>
        <Card.Text>
          Henkilötunnuksen perusteella laskettu ikä on {agey} vuotta, {month} kuukautta ja ja {date} päivää. 
        </Card.Text>
      </Card>
    </div>
  )
  } else {
    return
  }
}


/**
 * Näytetään infoa käyttäjälle
 */
function Infobutton() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Tämä laskuri laskee iän henkilötunnuksen perusteella. Syötä henkilötunnus ja klikkaa laske!
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
      <Button variant="success">Info</Button>
    </OverlayTrigger>
  );
}


/**
 * Tämä Appi laskee henkilön iän henkilötunnuksen perusteella.
 */
function App() {

  const [searchValue, setSearchValue] = useState(0)
  const [calculatedAge, setCalculatedAge] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    setCalculatedAge(searchValue)
  }
 
  return (
    <div className="App">
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Ikälaskuri</Navbar.Brand>
          <Infobutton/>
        </Container>
      </Navbar>
      <div className="d-flex flex-column bd-highlight mb-3">
      <h1>Ikälaskuri</h1>
      <div className="d-grid gap-2">
        <div className="p-2 bd-highlight">
          <Form className='mt-3"' onChange={(e) => setSearchValue(e.target.value)} onSubmit={handleSubmit} >
            <Form.Label>Henkilötunnus:</Form.Label> 
            <Form.Control type="ht" placeholder="Syötä henkilötunnus" />
            <Button variant="primary" size="lg" type='submit'>Laske</Button>
          </Form>
        </div>
        <div className="p-2 bd-highlight" >
          <PersonalId id={calculatedAge} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
