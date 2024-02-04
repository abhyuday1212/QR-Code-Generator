import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../Spinner/Spinner'
import QRimg from '../../assets/images/qr-img.jpg'
import Banner1 from '../../assets/images/banner1.png'
import QRCode from "react-qr-code";

const Home = () => {
  const [generatedImg, setGeneratedImg] = useState('')
  const [qrcode, setQrcode] = useState('')
  const [url, setUrl] = useState('');
  const [size, setSize] = useState('300');
  const [isSpinnerVisible, setSpinnerVisible] = useState(false);
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const showErrorRef = useRef(showError);
  const [bgcolor, setbgColor] = useState("")
  const [fgcolor, setFgColor] = useState("")
  const [density, setDensity] = useState("L")
  const [otherFrame, setOtherFrame] = useState("")

  const bannerFrame = otherFrame ? otherFrame : Banner1

  useEffect(() => {
    showErrorRef.current = showError;
  }, [showError]);

  const imgUrl = generatedImg ? generatedImg : QRimg;

  const showSpinner = () => {
    setSpinnerVisible(true);
  };

  const hideSpinner = () => {
    setSpinnerVisible(false);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    const form = document.getElementById('generate-form');

    const validateData = (e) => {
      e.preventDefault();

      if (url === '') {
        setShowError(true)

        setTimeout(() => {
          if (showErrorRef.current) {
            setShowError(false);
            setErrorMessage('');
          }
        }, 2000);
      } else {
        setShowError(false)


      }
    };

    form.addEventListener('submit', validateData);

    return () => {
      form.removeEventListener('submit', validateData);
    };
  }, [url, size, showError]);



  // Function to download QR Code image
  const onImageDownload = () => {
    const qrCodeElement = document.getElementById("qrcode");

    // Get the computed style to extract the width and height of the QR code
    const computedStyle = window.getComputedStyle(qrCodeElement);
    const qrCodeWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
    const qrCodeHeight = parseInt(computedStyle.getPropertyValue('height'), 10);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Set the canvas dimensions based on the dynamically computed size
      canvas.width = size;
      canvas.height = size;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, size, size);

      // Convert the canvas content to a data URL (PNG)
      const pngFile = canvas.toDataURL("image/png");

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode.png";
      downloadLink.href = `${pngFile}`;

      // Trigger the download
      downloadLink.click();
    };

    // Convert the QR code SVG to a data URL and set it as the source of the image
    const svgData = new XMLSerializer().serializeToString(qrCodeElement);
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <main>
      {isSpinnerVisible && <Spinner />}

      <div className="flex flex-col-reverse align-center justify-center m-auto md:max-w-4xl p-10 md:flex-row">

        <div className="w-full m-auto sm:mt-4 md:w-2/3 mr-24">
          <h1 className="text-3xl font-bold mb-5 md:text-4xl">QR Code Generator</h1>
          <p>
            Enter your URL below to generate a QR Code and download image for free!!!
          </p>

          <form id="generate-form" className="mt-4">

            <input id="url" type="text" placeholder="Enter a URL ONLY*"
              className="w-full border-2 border-gray-200 rounded p-3 text-grey-dark mr-2 focus:outline-none mb-5" value={url}
              onChange={handleUrlChange} />

            <select className="w-full border-2 border-gray-200 rounded p-3 text-grey-dark mr-2 focus:outline-none" name="size"
              id="size" onChange={handleSizeChange} value={size} style={{ marginBottom: '0' }}>
              <option value="100">100x100</option>
              <option value="200">200x200</option>
              <option value="300">300x300</option>
              <option value="400">400x400</option>
              <option value="500">500x500</option>
              <option value="600">600x600</option>
              <option value="700">700x700</option>
            </select>

            {showError && (
              <div style={{
                color: 'red',
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
                {errorMessage || 'Please fill all the required fields.'}
              </div>
            )}
            {/* <button className="bg-gray-600 rounded w-full text-white py-3 px-4 mt-8 mb-5 hover:bg-black" type="submit">
              Generate QR Code
            </button> */}

            <button id='download' className="button w-full py-3 px-4 mt-3 mb-5" type="button" onClick={onImageDownload}>
              <span className="button__text">Download</span>

              <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" className="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
            </button>

          </form>

        </div>

        <div className="w-fit-content m-auto p-5 md:h-80 md:w-1/3 self-center flex justify-center items-center">

          {/* <img src={imgUrl}
            style={{
              width: '100%',
              aspectRatio: "1/1",
              objectFit: 'contain',
              padding: "10px",
              border: "2px solid black",
              borderRadius: '14px',
            }}
            alt="" /> */}

          <div style={{
            id: "qrFrame",
            width: '100%',
            paddingTop: "0px",
            paddingBottom: "0px",
            marginBottom: "0px",
            height: 'auto',
            aspectRatio: "3/4",
            objectFit: 'contain',
            background: "red",
            border: "2px solid black",
            borderRadius: '8px',
            position: "relative"
          }}>
            <img src={bannerFrame}
              style={{
                position: "absolute",
                zIndex: "10",
                width: '100%',
                height: 'auto',
                aspectRatio: "3/4",
                objectFit: 'contain',
              }}
              alt="" />



            <QRCode id='qrcode'
              style={{
                position: "absolute",
                zIndex: "100",
                width: '100%',
                height: 'auto',
                aspectRatio: "1/1",
                objectFit: 'contain',
                padding: "2px",
                border: "1px solid black",
                borderRadius: '0px',
              }}
              size={size ? size : 256}
              bgColor={bgcolor ? bgcolor : "#FFFFFF"}
              fgColor={fgcolor ? fgcolor : "#000000"}
              level={density ? density : "L"}
              value={url ? url : 'https://github.com/abhyuday1212'}
            />

          </div>


          {isSpinnerVisible && <Spinner />}
        </div>

      </div>

    </main>
  )
}

export default Home