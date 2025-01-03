import Image from "next/image";
import vanillaImg from '../public/images/PikPng.com_vanilla-png_1412043.png';
import chocolateImg from '../public/images/PikPng.com_chocolate-png_534590.png';
import coconutImg from '../public/images/PikPng.com_coconut-png_533200.png';
import pistachiosImg from '../public/images/Pistachio-Nut-Transparent-PNG.png';
import sideViewWomen from '../public/images/side-view-smiley-women-eating-ice-cream.jpg';
import beautifulWoman from '../public/images/beautiful-young-women-having-fun-with-ice-cream-park.jpg';
import womenEatIceCream from '../public/images/women-eating-ice-cream-near-sea.jpg';

export default function Ingredients() {
    return (
        <section className="container">
          
        <div className="main-text">
            <h2>Our Ingredients</h2>
            <p>Only the Best for You</p>
        </div>
        <div className="container-box">

            <div className="c-mainbox">
                <div className="container-img">
                    <Image className="ingredient" src={vanillaImg} alt="box1" />
                </div>
                <div className="container-text">
                    <p>Vanilla sticks</p>
                </div>
            </div>
            <div className="c-mainbox">
                <div className="container-img">
                    <Image className="ingredient" src={chocolateImg} alt="box2" />
                </div>
                <div className="container-text">
                    <p>Belgian Chocolate</p>
                </div>
            </div>
            <div className="c-mainbox">
                <div className="container-img">
                    <Image className="ingredient" src={coconutImg} alt="box3" />
                </div>
                <div className="container-text">
                    <p>Fresh Coconuts</p>
                </div>
            </div>
            <div className="c-mainbox">
                <div className="container-img">
                    <Image className="ingredient" src={pistachiosImg} alt="box4" />
                </div>
                <div className="container-text">
                    <p>Ripe Pistachios</p>
                </div>
            </div>

        </div>

        <div className="enjoy-our-vaction">
            <div className="vacation-photos-title">The Customers</div>
            <div className="slider" style={{"--width": "300px", "--height": "85px", "--quantity": "6"}}>
                <div className="list">
                    <div className="item" style={{"--position": "1"}}><Image src={beautifulWoman} alt="" /></div>
                    <div className="item" style={{"--position": "2"}}><Image src={womenEatIceCream} alt="" /></div>
                    <div className="item" style={{"--position": "3"}}><Image src={sideViewWomen} alt="" /></div>
                    <div className="item" style={{"--position": "4"}}><Image src={womenEatIceCream} alt="" /></div>
                    <div className="item" style={{"--position": "5"}}><Image src={beautifulWoman} alt="" /></div>
                    <div className="item" style={{"--position": "6"}}><Image src={sideViewWomen} alt="" /></div>
                </div>
            </div>
        </div>
      </section>
    )
}