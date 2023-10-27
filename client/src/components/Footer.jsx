import { FaInstagram, FaFacebook } from 'react-icons/fa'
function Footer() {

  return (
    <>
      <div className=" footer text-white text-center" style={{ backgroundColor: "#002147", color: "white",height:'15vh' }}>
        <div>
          Follow us on
        </div>
        <FaInstagram />

        <FaFacebook />
      </div>
    </>
  )
}

export default Footer