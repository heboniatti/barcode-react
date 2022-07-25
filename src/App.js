import React, { useEffect } from 'react';
import Quagga from 'quagga';

function App() {
  const [barcode, setBarcode] = React.useState('');
  const onDetected = result => {
    Quagga.offDetected(onDetected);

    let ean = result.codeResult.code;
    setBarcode(ean);
    Quagga.onDetected(onDetected)
  }

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#video'),
            constraints: {
              facingMode: "environment"
            }
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: ["ean_reader"],
          },
        },
        err => {
          if (err) {
            console.log(err);
            alert('Error loading camera');
            return;
          }
          Quagga.start();
        },
        Quagga.onDetected(onDetected)
      )
    }
  }, [])

  return (
    <>
      <p>Barcode: {barcode}</p>
      <div id="video"></div>
    </>
  );
}

export default App;
