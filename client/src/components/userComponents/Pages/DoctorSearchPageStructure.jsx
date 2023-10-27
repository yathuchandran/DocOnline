import { useCallback, useEffect, useState } from 'react';
import axios from '../../../Services/axios';
import DoctorCard from '../doctorCard';
import { BsSearch } from 'react-icons/bs'


function DoctorSearchPageStructure() {
const [docData,setDocData ]=useState('')
const [filteredData, setFilteredData]=useState([])
const [search,setSearch]=useState('')
const [isSearch,setIsSearch]=useState(false)
const [department,setDepartment]=useState([])

useEffect(()=>{
    const filterDoctors=async()=>{
        try {
            const res=await axios.get(`/findDoctors`)
            setDocData(res.data.docs)
            setDepartment(res.data.deps);
        } catch (error) {
            console.log(error);
        }
    }
    filterDoctors()
},[])


const handleSearch=useCallback(async(e)=>{
    e.preventDefault()
    try {
        if (!search) {
        const res= await axios.get(`/searchDoc/all`)
        setFilteredData(res.data)

        }else{
            const res= await axios.get(`/searchDoc/${search}`)
            setFilteredData(res.data)
        }
        
    } catch (error) {
        console.log(error);
    }
    setIsSearch(true);
}, [search])



const handleCategory = (e) => {
    const filtered = docData.filter(
     
        (doc) => {
            if( doc.doctorData[0].name===e.target.value ){

                return  doc.doctorData[0] 
            }
        });
    setFilteredData(filtered);
    setIsSearch(true);
};
  return (
    <>
          <div className="col-12 m-0 mt-0 col-md-12">

    <div className="row">
        <div className="col-5 col-md-2 text-white p-0 text-center " style={{backgroundColor: "#002147",height:'135vh'}}>
            <div className="outline-success mt-5 ">
                <h3>Departments</h3>
                <div className="  m-auto " style={{ maxWidth: '240px'  }}>
                    <ul className=" ms-auto ">
                        {department ? (
                            department.map((dep) => (
                                <li className="list-group-item  ps-0  pt-4 pb-0 p-5" key={dep._id}>
                                    <input
                                        className="form-check-input me-1"
                                        type="radio"

                                        name="listGroupRadio"
                                        key={dep.name}
                                        value={dep.name}
                                        onClick={(e) => handleCategory(e)}
                                        id={dep.name}
                                    />
                                    <label className="form-check-label" htmlFor={dep.name} >
                                        {dep.name}
                                    </label>
                                </li>
                            ))
                        ) : (
                            <div>No departments available</div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-9  mt-0  col-md-9 ">
            <div className=" mt-4 d-flex align-items-center justify-content-center ">            
            <h1 style={{ fontFamily: "Times New Roman, serif" ,marginBottom:'0%' }}>Your home for health</h1>

                </div>
                <h3 style={{ fontFamily: "Times New Roman, serif" ,paddingLeft:'450px', marginTop:'0%'}}>Find and Book</h3>

            <div className="d-flex  pb-0  d-flex align-items-center justify-content-center">
                <input
                    type="text"
                    className="my-auto  bg-light form-control"
                    style={{ maxWidth: '60%' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search doctors..."
                />
                <button className='btn pt-0 ms-2 btn-success' 
                onClick={handleSearch}
                ><BsSearch /></button>

            </div>
<div className="m-1 ">
            {isSearch ? (
                <DoctorCard
                 docData={filteredData}
                  />
            ) : (
                
                <DoctorCard 
                docData={docData}

                 />
            )}
</div>
<div>
    
      
    </div>
    <div className="youtub m-3 mt-0 mb-0 ">
        <img src="/WhatsApp Image.jpeg" alt="" 
          width="1000"
          height="300"
          style={{ borderRadius: '1rem' }}
        />
      
      </div>

        </div>
    </div>
    </div>


</>
  )
}

export default DoctorSearchPageStructure





