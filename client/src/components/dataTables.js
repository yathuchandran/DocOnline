import DataTable from "react-data-table-component"
import PropTypes from 'prop-types'
import './dt.css'

DataTables.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
}

function DataTables(props) {


    return (

            <DataTable
                style={{ zIndex: '-1' }}
                columns={props.columns}
                data={props.data}
                fixedHeader
                highlightOnHover
                pagination

            />
    )
}

export default DataTables