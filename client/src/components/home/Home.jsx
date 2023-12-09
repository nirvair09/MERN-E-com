import NavBar from "./NavBar";
import MyCarousel from "./Caraousel";
import DealOfTheDay from "../cardsToBeRendered/DealOfTheDay";
import Futniture from "../cardsToBeRendered/Futniture"
import Footer from "./Footer";
import ProductList from "../ProductList"

const Home = () => {


    return (
        <>
            <NavBar />

            <MyCarousel />

            {/* <DealOfTheDay />

            <Futniture /> */}

            <ProductList />

            <Footer />

        </>
    )
}

export default Home;