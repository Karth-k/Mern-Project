import React, { useEffect } from "react";
import { Carousel as BootstrapCarousel } from "bootstrap";
import "../Styles/Carousel.css";

const Carousel = () => {
    useEffect(() => {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            new BootstrapCarousel(carousel, {
                interval: 2000,
                ride: "carousel"
            });
        });
    }, []);

    return (
        <div
            id="carouselExampleControls"
            className="carousel slide mt-4">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="carousel-slide-wrapper">
                        <img src="/Assets/banner_1.jpg" className="carousel-image" alt="banner1" />
                        <img src="/Assets/banner_2.jpg" className="carousel-image" alt="banner2" />
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="carousel-slide-wrapper">
                        <img src="/Assets/banner_3.jpg" className="carousel-image" alt="banner3" />
                        <img src="/Assets/banner_4.jpg" className="carousel-image" alt="banner4" />
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="carousel-slide-wrapper">
                        <img src="/Assets/banner_5.jpg" className="carousel-image" alt="banner5" />
                        <img src="/Assets/banner_8.jpg" className="carousel-image" alt="banner8" />
                    </div>
                </div>
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev" >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next" >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
