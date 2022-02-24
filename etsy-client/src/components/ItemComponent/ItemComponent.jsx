import { Col } from "react-bootstrap"
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ItemComponent(props) {
    let homeItem = props.item
    return <div>

        <Col sm={2}>
            {homeItem.itemname}
            <br />
            {homeItem.itemimage}
            <FavoriteIcon
                style={{ color: 'red' }}
                onClick={() => { console.log("in favorite!") }} />
            <br>
            </br>
        </Col>


    </div>
}