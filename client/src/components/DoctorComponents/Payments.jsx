import { useEffect, useState } from 'react'
import DataTables from '../dataTables'
import axios from '../../Services/axios';
import { useSelector } from 'react-redux';

function Payments() {
  const [payments, setPayments] = useState('')
  const id=useSelector((state) => state.doctor.data)

  const getPayments = async () => {
    const res = await axios.post('/doctor/payments',id);
    setPayments(res.data);
  };

  const columns = [
    {
      name: 'Patient',
      selector: (row) => row.user.userName,
    },

    {
      name: 'Date',
      selector: (row) => <div>{row.createdAt && row.createdAt.split(' ')[0]}</div>
    },
    {
      name: 'Amount',
      selector: (row) => row.amount
    }
  ];

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
    <div className=" container mt-5 ms-auto " style={{ width:'40%',paddingLeft:'0', background: "linear-gradient(to bottom, rgb(220, 210, 225), #66a3ff)", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",}}>
    <div className='row m-auto' >
      <h3>Payments</h3>

      <DataTables
        columns={columns}
        title="Appointments"
        data={payments}
      />
      </div>
      </div>

    </>)
}

export default Payments