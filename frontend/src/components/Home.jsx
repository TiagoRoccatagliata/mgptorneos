import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AxiosInstance from './axiosInstance';
import styles from './Home.module.css';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

const images = [img1, img2, img3];

const Home = () => {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const GetData = () => {
    AxiosInstance.get('api/users/')
      .then((res) => {
        setMyData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <div className={styles.heroSection}>
        <div className={styles.content}>
          <p className={styles.highlightText}>CADA PARTIDO. CADA TORNEO.</p>
          <h1 className={styles.mainTitle}>GESTIÓN SIMPLIFICADA DE TORNEOS</h1>
          <p className={styles.description}>
            Únete a miles de jugadores que confían en MGP para gestionar sus torneos, organizar eventos y mantener a su comunidad informada y en competencia.
          </p>
          <div className={styles.buttonsContainer}>
            <button className={styles.mainButton} onClick={() => navigate("/register")}>REGISTRARSE</button>
            <button className={styles.secondaryButton} onClick={() => navigate("/torneos")}>PRÓXIMOS</button>
          </div>
        </div>
        <img src={images[currentImageIndex]} alt="Imagen descriptiva" className={styles.img} />
      </div>
    </div>
  );
};

export default Home;