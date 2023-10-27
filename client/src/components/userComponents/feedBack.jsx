import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import axios from "../../Services/axios";

function FeedBack() {
  const [value, setValue] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const data = useSelector((state) => state.appointment.appointment);
  const user=useSelector((state)=>state.user.data)
  const docId = data.doctor;
  const userId = data.user;
const userName=user.userName
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const navigate = useNavigate();

const datas={review:review,
             rating:rating,
             docId,
             userId,
             userName}
  const handleHome = useCallback(async () => {
    try {
      const res = await axios.post(`/rating`,datas);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);
  

  return (
    <>
      <div className="text-center">
        <h1>Thank you</h1>
        <p>
          Hope you had a good session with the doctor and we are here for your
          future assistance.
        </p>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h3 className="mt-2">Your Review & Ratings</h3>
            </Col>
          </Row>
          <Row
            className="justify-content-center "
            style={{ paddingLeft: "420px" }}
          >
            <Col>
              <Card
                className="mt-10 mb-10"
                style={{ width: "300px", boxShadow: "5px", paddingLeft: "0px" }}
              >
                <Card.Body>
                  <div>
                    <h3>Star Rating:</h3>
                    <ButtonGroup>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Button
                          key={value}
                          variant={rating >= value ? "warning" : "light"}
                          onClick={() => handleRatingClick(value)}
                        >
                          <FaStar />
                        </Button>
                      ))}
                    </ButtonGroup>
                    <p>You rated this {rating} stars.</p>
                  </div>

                  <h5 className="text-center">Write a feedback</h5>
                  <form>
                    <div className="text-center">
                      <input
                        type="text"
                        placeholder="Enter your reviews....."
                        style={{ height: "80px" }}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <br />
        <button className="btn btn-success" onClick={handleHome} >
          Submit
        </button>
      </div>
    </>
  );
}

export default FeedBack;
