import { useCallback, useEffect, useState } from 'react';
import axios from '../../../Services/axios';
import DoctorCard from '../doctorCard';
import { BsSearch } from 'react-icons/bs'


function DoctorSearchPageStructure() {
const [docData,setDocData ]=useState([])
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
        console.log(res.data,"---------------------------33");
        setFilteredData(res.data)

        }else{
            const res= await axios.get(`/searchDoc/${search}`)
            console.log(res.data,"=========================================38");
            setFilteredData(res.data)
        }
        
    } catch (error) {
        console.log(error);
    }
    setIsSearch(true);
}, [search])



const handleCategory = (e) => {
    const filtered = docData.filter(
        (doc) => doc.doctorData[0] === e.target.value);
    setFilteredData(filtered);
    setIsSearch(true);

};
  return (
    <>
    <div className="row">
        <div className="col-4 col-md-3 bg-light p-1 text-center">
            <div className="outline-success mt-5">
                <h3>Departments</h3>
                <div className="text-start m-auto " style={{ maxWidth: '300px' }}>
                    <ul className="list-group ms-auto ">
                        {department ? (
                            department.map((dep) => (
                                <li className="list-group-item ps-1  pt-2 pb-2 p-0" key={dep._id}>
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
        <div className="col-8 col-md-9">
            <div className="d-flex p-4 pb-0">
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
    </div>
</>
  )
}

export default DoctorSearchPageStructure