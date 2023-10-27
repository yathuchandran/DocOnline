import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

function Success() {
  const navigate = useNavigate()

  const handleHome = useCallback(() => {
    navigate('/doctor/')
  }, [navigate])

  const handlePrescription = useCallback(() => {
    navigate('/doctor/createPrscription')
  }, [navigate])

  return (
    <>
    <div className='text-center mt-5'>
  <div className="card" style={{ backgroundColor: "#ADD8E6" }}>
    <div className="card-body">
      <h1>You have completed the consultation</h1>
      <button className="btn btn-success" onClick={handleHome}>Home</button>
      <button className="btn btn-success ms-2" onClick={handlePrescription}>Write Prescription</button>
    </div>
  </div>
</div>

    </>
  )
}

export default Success