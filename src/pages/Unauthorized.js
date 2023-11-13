import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Container className="container-unauthorized">
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page. Talk to the Russian if you need anything.</p>
                <Button onClick={goBack}>Go Back Punk</Button>
        </Container>
    )
}

export default Unauthorized