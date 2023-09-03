import React from "react";
import PropTypes from "prop-types";
import formatString from "../util/StringFormat";

function TableHeaders({info, highlightedInfo, links, highlightedLinks}) {
    let header = []

    if(info.length !== 0)
        header = info
    else if(highlightedInfo.length !== 0)
        header = highlightedInfo
    else
        return <></>


    return (
        <table className="table table-striped">
            <thead>
            <tr>
                {
                    Object.keys(header[0]).map((key) => (
                    <th scope="col" key={key}> {formatString(key)} </th>
                ))}
            </tr>
            </thead>

            <tbody>

            {highlightedInfo.map((rows,rowIndex) =>
                <tr className="table-info" key={rowIndex}>
                    {Object.keys(rows).map((key,colIndex) =>
                        <td key={key}>
                            {colIndex === 0 ? (
                                <a href={highlightedLinks[rowIndex]}
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

            <tbody>
                {info.map((rows,rowIndex) =>
                    <tr key={rowIndex}>
                        {Object.keys(rows).map((key,colIndex) =>
                            <td key={key}>
                                {colIndex === 0 ? (
                                    <a href={links[rowIndex]}
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
    infoRouter: PropTypes.array.isRequired
}

export default TableHeaders