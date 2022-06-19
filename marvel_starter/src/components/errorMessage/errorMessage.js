import img from './error.gif';

const ErrorMessage = () => {
  
  return (
    <img src={img} style={{width:" 250px", height: "250px", display: "block",objectFit: 'contain', margin: "0 auto"}}/>
  )
}

export default ErrorMessage;