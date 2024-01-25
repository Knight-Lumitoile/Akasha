import Msg from './components/Msg/Msg';
import LeyLines from './core/LeyLine';
import App from './pages/App';
import {GlobalStyles} from "@mui/material";

export default function Akasha() {

    return (
        <LeyLines>
            <GlobalStyles styles={{fontFamily:"Honkai, StarRail-EN, StarRail-ZH"}}/>
            <App />
            <Msg />
        </LeyLines>
    )
}
