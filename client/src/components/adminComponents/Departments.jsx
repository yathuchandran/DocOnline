import { useCallback, useEffect, useState } from "react";
import DataTables from "../dataTables";
import { validateCapitalLetter } from "../validator";
import axios from "../../Services/axios";

function Departments() {
  const [departmentList, setDepartList] = useState([]);
  const [newDep, setNewDep] = useState("");
  const adminToken = localStorage.getItem("adminToken");
  const [createStatus, setStatus] = useState("");
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  async function departmentData() {
    try {
      if (adminToken) {
        
        const res = await axios.get('admin/departments');
        if (res.status === 200) {
          setDepartList(res.data);
          setFilteredData(res.data);
        }
      }
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

 


  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const filtered = departmentList.filter((dep) =>
      dep.name.toLowerCase().startsWith(searchValue)
    );
    setFilteredData(filtered);
  };

  const blockDepartment = async (row) => {
    try {
      const res = await axios.patch(`/admin/manageDepartment`, {
        status: row.isBlocked,
        id: row._id,
      });
      if (res == 'error') {
        setStatus('');
        setTimeout(() => {
          setStatus('')
        }, 4000)
      }else{
        setRefresh(!refresh);
        setDepartList((prevDepartments) =>
          prevDepartments.map((department) => {
            if (department._id === row._id) {
              return {
                ...department,
                isBlocked: !department.isBlocked,
              };
            }
            return department;
          })
        );
      }

     
    } catch (error) {
      console.error(error);
      setStatus("Error occurred");
      setTimeout(() => {
        setStatus("");
      }, 4000);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "Image",
      selector: (row) => (
        <img className="m-2 ms-0" width={"100px"} src={row.image} alt="" />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className={`btn ${row.isBlocked ? "btn-danger" : "btn-success"}`}
          onClick={() => blockDepartment(row)}
        >
          {row.isBlocked === false ? "Block" : "Unblock"}
        </button>
      ),
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Set the image state to the reader result
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  const depform = {
    image: image,
    newDep: newDep,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateCapitalLetter(newDep)
    if (isValid) {

    const res = await axios.post("admin/createDepartment", depform);
    if (res.data) {
      setStatus(res.data);
      setTimeout(() => {
        setStatus("");
      }, 4000);
      departmentData()

    }else{
      setStatus("capLetter")
      setTimeout(() => {
        setStatus('')
      }, 4000)
    }
      setRefresh(!refresh); // Refresh the data after creating a department
    }
  };

  useEffect(() => {
    departmentData();
  }, [adminToken, refresh]);

  return (
    <>
      <div className="container mt-1  ">
      <h1 style={{ fontFamily: "Times New Roman, serif" }}>Create Department</h1>
        <form className="d-flex flex-column align-items-center">
          <div className="mb-3 ">
            {preview ? (
              <img
                className="mt-2"
                src={preview}
                alt="img"
                width={"100px"}
                height={"120px"}
              />
            ) : (
              <img
                className="mt-2"
                width={"150px"}
                height={"170px"}
                src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                alt="sf"
              />
            )}
          </div>
          <div className="mb-1">
            <label htmlFor="depName" className="form-label"style={{ fontFamily: "Times New Roman, serif" }}>
              Department Name
            </label>
            <input
              type="text"
              value={newDep}
              onChange={(e) => setNewDep(e.target.value)}
              className="form-control"
              id="depName"
              name="depName"
            />
            <p className="form-text  text-muted ps-4">
              Please note that the first letter should be capital
            </p>
          </div>

          <div className="">
            <label htmlFor="image" className="form-label" style={{ fontFamily: "Times New Roman, serif" }}>
              Upload image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control"
              id="image"
              name="image"
            />
          </div>

          <div className="mb-3 ">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              
            >
              Create Department
            </button>
          </div>
        </form>
      </div>

      {/* <div>
        <button type="button" className="btn mb-2 ms-1 btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Create Department</button>
      </div> */}
      <div className="ms-0" style={{ zIndex: "0" }}>
        {createStatus == "error" ? (
          <div className="alert alert-danger" role="alert">
            There was an error! cannot create depaprtment.
          </div>
        ) : createStatus == "success" ? (
          <div className="alert alert-success" role="alert">
            Department created successfully.
          </div>
        ) : createStatus === "exist" ? (
          <div className="alert alert-danger" role="alert">
            Department already exist.
          </div>
        ) : createStatus === "capLetter" ? (
          <div className="alert alert-danger" role="alert">
            First letter of department should be capital.
          </div>
        ) : (
          ""
        )}
        <h3 style={{ fontFamily: "Times New Roman, serif" }}>Departments List</h3>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
          className="form-control w-25 mb-2"
        />
        <DataTables columns={columns} title="Departments" data={filteredData} />
      </div>
    </>
  );
}

export default Departments;
