import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function UserHome() {
    const [departments, setDepartments] = useState([]);
    const history = useNavigate();
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(import.meta.env.VITE_BASE_URL + 'departments');
          setDepartments(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, []);
  
  return (
<>
      <div className='banner relative '>
        <img className='banner-image' src="/marcelo-leal-k7ll1hpdhFA-unsplash.jpg" alt="" />
        <div className='hero-text'>
          <p className='text-bold font-bold top-3/4 left-20'>RELAX <br />FIND YOUR DOCTOR</p>
          <Button className='border-2 btn-success btn find left-20 px-2 py-1' onClick={() => history('/findDoctor')}>Find doctor</Button>
        </div>
      </div>
      <Container className="mt-5 mb-5 p-4">
        <h3>Departments Available</h3>
        <p>You can select the department you need to checkout.</p>
        <Row>
          {departments && departments.map(dep => (
            <Col md={3} sm={4} xs={6} key={dep._id}>
              <Card className='mt-3 mb-3'>
                <Card.Img className='depImage' src={dep.image} alt="" />
                <Card.Title className='mt-0'>{dep.name}</Card.Title>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="card p-4">
            <h6>We provide you the best services</h6>
            <p>We consider your entire wellness and we are intended to provide you the best doctors and services.</p>
            <Card className="docCardImg">
              <Card.Body>
                <p className='m-5 par'><b>Qualified and experienced doctors are available for each department. Book a slot for online consult.</b></p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>

    
    )
}

export default UserHome























