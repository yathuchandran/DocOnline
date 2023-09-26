import Chart from 'react-apexcharts'


function BarChart() {


    return (
        <>
            <div className="container-fluid mb-5">
                <div className="dropdown mb-4">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        
                    </button>
                    <ul className="dropdown-menu">
                        <li ><button className="dropdown-item btn" >2022</button></li>
                        {
                           
                                <li><button className="dropdown-item btn" ></button></li>
                            
                        }

                    </ul>
                </div>
                <Chart
                    type='bar'
                    width={'100%'}
                    height={500}

                    series={[
                        {
                            name: 'Revenue',
                            
                        }
                    ]}
                    options={{
                        title: {
                            text: "Revenue Chart",
                            style: { fontSize: 30 }
                        },
                        chart: {
                            background: '#ffffff',
                        },
                        colors: ["#00009F"],
                        theme: { mode: "light" },
                        xaxis: {
                            tickPlacement: 'on',
                            categories: [
                                'jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'
                            ],
                            title: {
                                text: 'Month',
                                style: { fontSize: 20 }
                            },
                        },
                        yaxis: {
                            labels: {
                                formatter: (val) => {
                                    return `${val}`
                                },
                                style: { fontSize: "15", colors: ['#f900000'] },
                            },
                            title: {
                                text: "No.of Appointments",
                                style: { fontSize: 20 }
                            }
                        },
                        legend: {
                            show: true,
                            position: 'right'
                        },
                        dataLabels: {
                            formatter: (val) => {
                                return 
                            },
                            style: {
                                colors: [`#f4f4f40`],
                                fontSize: 15
                            }
                        }
                    }}
                />
            </div>
        </>
    )
}

export default BarChart