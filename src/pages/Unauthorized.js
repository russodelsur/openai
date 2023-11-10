import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Container className="container-home">
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page. Talk to the Russian.</p>
            <div className="flexGrow">
                <Button onClick={goBack}>Go Back Punk</Button>
            </div>
        </Container>
    )
}

export default Unauthorized