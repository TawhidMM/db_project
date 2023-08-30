import React from "react";
import PropTypes from "prop-types";
import formatString from "../util/StringFormat";

function TableHeaders({info}) {

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                {Object.keys(info[0]).map((key) => (
                    <th scope="col" key={key}> {formatString(key)} </th>
                ))}
            </tr>
            </thead>

            <tbody>
                {info.map((rows,rowIndex) =>
                    <tr key={rowIndex}>
                        {Object.keys(rows).map((key,colIndex) =>
                            <td key={key}>
                                {colIndex === 0 ? (
                                    <a href={rows['MED_URL']}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                        {rows[key]}
                                    </a>
                                ) : rows[key] }
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

TableHeaders.prototype = {
    info: PropTypes.array.isRequired
}

export default TableHeaders